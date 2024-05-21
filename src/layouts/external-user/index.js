import "./../../scripts/app";
import "./styles";

import Form from "./../../scripts/form";
import Schema from "./../../schema/ext-user";
import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";

// console.log("Welcome to user management!");

console.log("telSpiel");

$("#cancelForm").click(() => {
  $("#add-user")[0].reset();
});

$(".nav-item").click(() => {
  loadAllUserTypes();
});

$(document).ready(function () {
  $("#expiry")
    .datetimepicker({
      //     format: 'Y-m-d H:i:s',
      // defaultTime: '23:59:59',
      format: "Y-m-d 23:59:59",
      timepicker: false,
      // defaultTime:'23:59:59',
      minDate: 0,
      // closeOnstep: 1,
      // // minDate: 0,
      DateSelect: true,
    })
    .attr("readonly", "readonly");

  $(".select2").select2();
  $("#userName").val("");
});
$(document).ready(function () {
  // make api call to set prepaid and postpaid accoording to billing type
  // pass user id in api call

  let data = {
    userId: User.getUserid(),
  };
  fetch("/api/billing_type/billing", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      let billingType = res.billingType;
      console.log(billingType);
      var postpaidDropdown = document.getElementById("billingType");
      if (billingType == 1) {
        console.log("billing type is 1");
        postpaidDropdown.value = "prepaid";
        postpaidDropdown.disabled = true;
      } else if (billingType == 2) {
        console.log("billing type is 2");
        // let prepaidDropdown = document.getElementById("billingType");
        postpaidDropdown.value = "postpaid";
        postpaidDropdown.disabled = true;
      }
    })
    .catch((err) => console.log(err));

  let roleList = [{ key: "client", role: "Client" }];

  if (User.getRole() == "superadmin") {
    roleList.push({ key: "admin", role: "Admin" });
    roleList.push({ key: "reseller", role: "Reseller" });
    roleList.push({ key: "seller", role: "Seller" });
  }

  if (User.getRole() == "admin") {
    roleList.push({ key: "reseller", role: "Reseller" });
    roleList.push({ key: "seller", role: "Seller" });
  }

  if (User.getRole() == "reseller") {
    roleList.push({ key: "seller", role: "Seller" });
  }

  var customerTypeField = document.getElementById("customerType");
  customerTypeField.options.length = 0;
  $.each(roleList, function (key, value) {
    customerTypeField.options[customerTypeField.options.length] = new Option(
      value.role,
      value.key
    );
  });

  $("#userName").blur(function () {
    var username = $(this).val();
    if (username.length > 0) {
      // Check if username contains spaces or special characters
      if (/[\s~`!@#$%^&*()+={}\[\]:;"'<>,.?\\/]/.test(username)) {
        Alert.error(
          "Username should not contain spaces or special characters."
        );
        $(".actions.clearfix").css("display", "none");
        return;
      }

      if (!/[a-zA-Z]/.test(username)) {
        Alert.error(
          "Username should contain at least one alphabetical character."
        );
        $(".actions.clearfix").css("display", "none");
        return;
      }
      const data = {
        loggedInUserName: User.getName(),
        userName: username,
        operation: "external user",
      };
      Request(Endpoints.get("saveUser"), "POST", data).done((data) => {
        console.log(data);
        $(".alert").alert("close");
        data.message &&
          (data.result === "Success"
            ? Alert.success(data.message)
            : Alert.error(data.message));
        if (data.result === "Failure") {
          $(".actions.clearfix");
          // $(".actions.clearfix").css("display", "none");
        }
        if (data.result === "Success") {
          $(".actions.clearfix").css("display", "block");
        }
      });
    }
  });
});
$("#view .dropdown").on("change", function () {
  var value = this.value;
  let withValue = false;
  if (value && !withValue) {
    withValue = true;
    $(this).addClass("active");
    var name = $(this).attr("name");
    dropdownChange("view-external-user", value, name, "view-user-form", true);
    $("#view .viewUser").not(".active").select2("destroy").val("").select2();
    $("#view ." + name).val(value);
    $(this).removeClass("active");
  }
});

$("#edit .dropdown").on("change", function () {
  var value = this.value;
  let withValue = false;
  if (value && !withValue) {
    withValue = true;
    $(this).addClass("active");
    var name = $(this).attr("name");
    dropdownChange("edit-external-user", value, name, "edit-user-form", false);
    $("#edit .editUser").not(".active").select2("destroy").val("").select2();
    $("#edit ." + name).val(value);
    $(this).removeClass("active");
  }
});

// $("#userAccountType").on('change', function() {
//   console.log(this.value);
// });

// "view-external-user"
loadAllUserTypes();

loadUserDropdown();

$(function () {
  var form = $("#add-user");
  form.validate({
    errorPlacement: function errorPlacement(error, element) {
      element.before(error);
    },
    // rules: {
    //     confirm: {
    //         equalTo: "#password"
    //     }
    // }
  });

  function1(stepperInit, function () {
    initRadioSelection("#add");

    loadOrgDropdown();

    $("#add .select2.orgName").on("change", function () {
      loadDeptList(this.value);
    });

    $("#userAccountType").on("change", function () {
      if (this.value != "SMPP") {
        $(".smppCharset").addClass("d-none");
        $(".userAccountTypeTRxDiv").addClass("d-none");
        $(".userAccountTypeRxDiv").addClass("d-none");
        $(".userAccountTypeTxDiv").addClass("d-none");
      } else {
        $(".smppCharset").removeClass("d-none");
        $(".userAccountTypeTRxDiv").removeClass("d-none");
        $(".userAccountTypeRxDiv").removeClass("d-none");
        $(".userAccountTypeTxDiv").removeClass("d-none");
      }
    });

    // $("#userAccountTypeRx").on('change', function() {
    //     $(".userAccountTypeTRxDiv").removeClass("d-none");
    //     $(".userAccountTypeTxDiv").addClass("d-none");
    // });
  });
});

function function1(param, callback) {
  callback();
}

var form = $("#add-user");
var stepperInit = form.children("div").steps({
  headerTag: "h3",
  bodyTag: "section",
  transitionEffect: "slideLeft",
  onStepChanging: function (event, currentIndex, newIndex) {
    form.validate().settings.ignore = ":disabled,:hidden";
    return form.valid();
  },
  onFinishing: function (event, currentIndex) {
    form.validate().settings.ignore = ":disabled";
    return form.valid();
  },
  onFinished: function (event, currentIndex) {
    const formData = {};

    $("#add-user")
      .serializeArray()
      .forEach((i) => {
        formData[i.name] = i.value;
      });

    // formData['userExpiryDate'] = formData['userExpiryDate']+":59";
    // const expiry = $("#expiry").val() + " " + $("#expiryTime").val();
    formData["billingType"] = $("#billingType").val();
    console.log(formData);
    const additionalData = {
      loggedInUserName: User.getName(),
      operation: "addUser",
      accountType: "trans",
    };

    Request(
      Endpoints.get("saveUser"),
      "POST",
      $.extend({}, formData, additionalData)
    ).done((data) => {
      if (Endpoints.validateResponse(data)) {
        // console.log(data);
        $("#add-user")[0].reset();
        $(".alert").alert("close");
        data.message &&
          (data.result === "Success"
            ? Alert.success(data.message)
            : Alert.error(data.message));
        $("#steps-uid-0-t-0").trigger("click");
        var form = $("#add-user");
        form.validate({
          errorPlacement: function errorPlacement(error, element) {
            element.before(error);
          },
          //  successPlacement: function errorPlacement(success, element) { element.before(success); },
        });
      }
    });
  },
});

function editUSerSubmit() {
  console.log("enters");
  $("#save-view-user").click(function (e) {
    console.log("enters yes");
    e.preventDefault();
    const formData = {};

    const key = Object.keys(lastEditSelected)[0];
    const value = lastEditSelected[key];

    $("#edit-user")
      .serializeArray()
      .forEach((i) => {
        formData[i.name] = i.value;
      });
    console.log(formData);
    var orgItem = orgList.find((x) => x.orgName == formData["orgName"]);
    var deptItem = deptList.find((x) => x.deptName == formData["deptName"]);

    const additionalData = {
      loggedInUserName: User.getName(),
      operation: "editUser",
      orgId: orgItem.orgId,
      deptId: deptItem.deptId,
      accountManagerName: $(
        "#edit #accountManagerNameedit option:selected"
      ).text(),
    };

    delete formData["orgName"];
    delete formData["deptName"];

    additionalData[key] = value;

    Request(
      Endpoints.get("saveUser"),
      "POST",
      $.extend({}, formData, additionalData)
    ).done((data) => {
      if (Endpoints.validateResponse(data)) {
        $(".alert").alert("close");

        // console.log(data);
        $("#add-user")[0].reset();
        data.message &&
          (data.result === "Success"
            ? Alert.success(data.message)
            : Alert.error(data.message));
      }
    });
  });
}

var lastEditSelected = {};
function dropdownChange(containerID, value, key, formId, disable) {
  if (value == 0 || value == "") {
    return;
  }

  const getUserData = {
    loggedInUserName: User.getName(),
  };
  getUserData[key] = value;
  lastEditSelected[key] = value;
  Request(Endpoints.get("viewExternalUser"), "POST", getUserData, {
    showMainLoader: true,
  }).done((data) => {
    if (data.message) {
      $(".alert").alert("close");
      Alert.success(data.message, {
        clearTime: 5 * 1000,
      });
    }

    const user = data.data.user;
    const viewSchema = $.extend(true, {}, Schema);
    viewSchema.fields.forEach((field) => {
      field.value = user[field.name];
      field.disabled = disable;

      if (field.type == "select") {
        var selectList = field.options;
        selectList.forEach(function (value) {
          if (value.value == user[field.name]) {
            value.selected = true; //true
          }
        });
      }
    });
    if (disable) {
      delete viewSchema.buttons[0];
      viewSchema.id = Schema.view.id;
    } else {
      viewSchema.id = Schema.edit.id;
      viewSchema.buttons[0].id = `save-${Schema.view.id}`;
    }

    viewSchema.buttons[1].id = `reset-${Schema.view.id}`;
    new Form(viewSchema).render("#" + formId);

    // $("#edit #userAccountType").prop('disabled', 'disabled');

    //Freezing userAccountType field in edit section
    $("#edit #userAccountType").addClass("make-it-freeze");

    //Freeze billingType field in edit section
    $("#edit #billingType").addClass("make-it-freeze");

    $("#edit #editAccountType").prop("disabled", "disabled");

    //we cannot change the expiry date on mousewheel, unless we click to change that field
    $("#edit #userExpiryDate").bind("mousewheel", function () {
      if ($.browser.webkit === true) {
        return false;
      }
    });

    // $('#isVisualizeAllowed').val(Schema.isVisualizeAllowed);

    $("#edit #accountManagerNameedit").select2();
    var selectField = document.getElementById("accountManagerNameedit");
    var selectedId = 0;
    selectField.options.length = 0;
    $.each(accountManagerList, function (key, value) {
      if (user["accountManagerName"] == value.userName) {
        selectedId = value.userId;
      }
      selectField.options[selectField.options.length] = new Option(
        value.userName,
        value.userId
      );
    });
    var editUserAccountTypeValue = $(
      "#edit #userAccountType option:selected"
    ).text();
    var viewUserAccountTypeValue = $(
      "#view-user #userAccountType option:selected"
    ).text();

    if (editUserAccountTypeValue != "SMPP") {
      console.log(editUserAccountTypeValue);
      $("#edit #smppCharset").parent().parent().css("display", "none");
      $("#edit #smppCharset").parent().parent().css("display", "none");
      $("#edit #txSession").parent().parent().css("display", "none");
      $("#edit #rxSession").parent().parent().css("display", "none");
      $("#edit #trxSession").parent().parent().css("display", "none");
    }
    if (viewUserAccountTypeValue != "SMPP") {
      console.log(viewUserAccountTypeValue);
      $("#view-user #smppCharset").parent().parent().css("display", "none");
      $("#view-user #smppCharset").parent().parent().css("display", "none");
      $("#view-user #txSession").parent().parent().css("display", "none");
      $("#view-user #rxSession").parent().parent().css("display", "none");
      $("#view-user #trxSession").parent().parent().css("display", "none");
    }

    $("#edit #accountManagerNameedit").val(selectedId);
    $("#edit #accountManagerNameedit").trigger("change"); // Notify any JS components that the value changed
    $("#view-user #accountManagerNameedit").val(selectedId);
    $("#view-user #accountManagerNameedit").trigger("change");
    $("#" + `reset-${Schema.view.id}`).click(() => {
      $("#" + formId).html("");
    });

    if (!disable) {
      $("#edit-user .datetimepicker")
        .datetimepicker({
          format: "Y-m-d 23:59:59",
          timepicker: false,
          minDate: 0,
          // defaultTime:'23:59:59',
          closeOnDateSelect: true,
        })
        .attr("readonly", "readonly");
      editUSerSubmit();
    }

    var orgItem = orgList.find((x) => x.orgName == user.orgName);
    loadDeptList(orgItem.orgId);
  });
}
function initRadioSelection(containerID) {
  // console.log("init Radio");
  $(
    containerID +
      " #isContentFilterAllowed-0," +
      containerID +
      " #isContentFilterAllowed-1"
  ).click(function () {
    if ($(this).val() == "Yes") {
      $("#abusingWordsLimit").prop("disabled", false);
    } else {
      $("#abusingWordsLimit").prop("disabled", true);
    }
  });

  $(containerID + " #dlrRetry-0," + containerID + " #dlrRetry-1").click(
    function () {
      if ($(this).val() == "Yes") {
        $("#dlrRetryCount").prop("disabled", false);
      } else {
        $("#dlrRetryCount").prop("disabled", true);
      }
    }
  );

  $(
    containerID + " #isLowCreditAlert-0," + containerID + " #isLowCreditAlert-1"
  ).click(function () {
    if ($(this).val() == "Yes") {
      $("#lowCreditAlertLimit").prop("disabled", false);
    } else {
      $("#lowCreditAlertLimit").prop("disabled", true);
    }
  });

  $(
    containerID + " #isLowCreditAlert-0," + containerID + " #isLowCreditAlert-1"
  ).click(function () {
    if ($(this).val() == "Yes") {
      $("#creditAlertMode").prop("disabled", false);
    } else {
      $("#creditAlertMode").prop("disabled", true);
    }
  });

  $(
    containerID +
      " #mobileNumberMasking-0," +
      containerID +
      " #mobileNumberMasking-1"
  ).click(function () {
    if ($(this).val() == "Yes") {
      $("#numberMaskingCount").prop("disabled", false);
    } else {
      $("#numberMaskingCount").prop("disabled", true);
    }
  });

  $("#expiry")
    .datetimepicker({
      //     format: 'Y-m-d H:i:s',
      // defaultTime: '23:59:59',
      format: "Y-m-d 23:59:59",
      timepicker: false,
      // defaultTime:'23:59:59',
      minDate: 0,
      closeOnDateSelect: true,
    })
    .attr("readonly", "readonly");
  // $("#expiry").datetimepicker({
  //   timepicker: false,
  //   maxDate: '0',
  //   dateFormat: 'yyyy-mm-dd',
  //   format: 'Y-m-d',
  //   closeOnDateSelect: true
  // }).attr('readonly', 'readonly');
}
function loadAllUserTypes() {
  const getUserData = {
    loggedInUsername: User.getName(),
    userId: User.getUserid(),
    // "userRole":"admin",// optional
  };
  var adminSelect = document.querySelector("#view-external-user .adminName");
  var resellerSelect = document.querySelector(
    "#view-external-user .resellerName"
  );
  var sellerName = document.querySelector(
    "#view-external-user .sellerNameDiv .sellerName"
  );
  var clientName = document.querySelector("#view-external-user .clientName");
  var adminEdit = document.querySelector("#edit .adminName");
  var resellerEdit = document.querySelector("#edit .resellerNameEdit");
  var sellerEdit = document.querySelector("#edit  .sellerNameEdit");
  var clientEdit = document.querySelector("#edit .clientNameEdit");

  Request(Endpoints.get("getAllChildForUser"), "POST", getUserData, {
    showMainLoader: true,
  }).done((data) => {
    if (data.message) {
      $(".alert").alert("close");
      Alert.success(data.message, {
        clearTime: 5 * 1000,
      });
    }
    const allChildMap = data.data.userAllChildMap;
    const aList = allChildMap.ADMIN;
    var countKey = Object.keys(aList).length;
    if (countKey === 0) {
      $(".adminNameDiv").addClass("d-none");
    }
    adminSelect.options.length = 1;
    adminEdit.options.length = 1;
    $.each(aList, function (key, value) {
      adminSelect.options[adminSelect.options.length] = new Option(key, key);
      adminEdit.options[adminEdit.options.length] = new Option(key, key);
    });

    const rList = allChildMap.RESELLER;
    var countKey = Object.keys(rList).length;
    if (countKey === 0) {
      $(".resellerNameDiv").addClass("d-none");
    }
    resellerSelect.options.length = 1;
    resellerEdit.options.length = 1;
    // var rData = [];
    $.each(rList, function (key, value) {
      // rData.push({ "id": value, "name": key, "ignore": false });
      resellerSelect.options[resellerSelect.options.length] = new Option(
        key,
        key
      );
      resellerEdit.options[resellerEdit.options.length] = new Option(key, key);
    });

    // $('.resellerName').autocomplete({
    //   nameProperty: 'name',
    //   valueField: '#hidden-field',
    //   dataSource: rData
    // });

    const sList = allChildMap.SELLER;
    var countKey = Object.keys(sList).length;
    if (countKey == 0) {
      $(".sellerNameDiv").addClass("d-none");
    }
    sellerName.options.length = 1;
    sellerEdit.options.length = 1;
    // var sData = [];
    $.each(sList, function (key, value) {
      // sData.push({ "id": value, "name": key, "ignore": false });
      sellerName.options[sellerName.options.length] = new Option(key, key);
      sellerEdit.options[sellerEdit.options.length] = new Option(key, key);
    });

    // $('.sellerName').autocomplete({
    //   nameProperty: 'name',
    //   valueField: '#hidden-field',
    //   dataSource: sData
    // });

    const cList = allChildMap.CLIENT;
    var countKey = Object.keys(cList).length;
    if (countKey == 0) {
      $(".clientNameDiv").addClass("d-none");
    }
    clientName.options.length = 1;
    clientEdit.options.length = 1;
    $.each(cList, function (key, value) {
      clientName.options[clientName.options.length] = new Option(key, key);
      clientEdit.options[clientEdit.options.length] = new Option(key, key);
    });

    // $('.clientName').autocomplete({
    //   nameProperty: 'name',
    //   valueField: '#hidden-field',
    //   dataSource: cData
    // });
  });
}

var orgList;
function loadOrgDropdown() {
  const getUserData = {
    loggedInUserName: User.getName(),
  };

  Request(Endpoints.get("getAllOrganization"), "POST", getUserData, {
    showMainLoader: true,
  }).done((data) => {
    if (data.message) {
      $(".alert").alert("close");
      Alert.success(data.message, {
        clearTime: 5 * 1000,
      });
    }
    const allChildMap = data.data.organisationList;

    orgList = allChildMap;
    const rList = allChildMap;

    var selectField = document.getElementById("orgName");
    $.each(rList, function (key, value) {
      selectField.options[selectField.options.length] = new Option(
        value.orgName,
        value.orgId
      );
    });

    if (rList) {
      loadDeptList(rList[0].orgId);
    }
  });
}

var deptList;
function loadDeptList(orgId) {
  const getUserData = {
    loggedInUserName: User.getName(),
    orgId: orgId,
  };

  Request(Endpoints.get("getAlldepartment"), "POST", getUserData, {
    showMainLoader: true,
  }).done((data) => {
    $(".alert").alert("close");
    if (data.message) {
      Alert.success(data.message, {
        clearTime: 5 * 1000,
      });
    }
    const allChildMap = data.data.departmentList;

    deptList = allChildMap;
    const rList = allChildMap;

    var selectField = document.getElementById("deptName");
    selectField.options.length = 0;
    $.each(rList, function (key, value) {
      selectField.options[selectField.options.length] = new Option(
        value.deptName,
        value.deptId
      );
    });
  });
}

var accountManagerList;
function loadUserDropdown() {
  const getUserData = {
    loggedInUserName: User.getName(),
    // "userId": User.getUserid()
    // "userRole":"admin",// optional
  };

  Request(Endpoints.get("listInternalusers"), "POST", getUserData, {
    showMainLoader: true,
  }).done((data) => {
    if (data.message) {
      $(".alert").alert("close");
      Alert.success(data.message, {
        clearTime: 5 * 1000,
      });
    }
    const allChildMap = data.data.userList;
    const rList = allChildMap;
    if (rList.length === 0) {
      $(".userNameDiv").addClass("d-none");
    }
    accountManagerList = rList;
    var selectField = document.getElementById("accountManagerName");
    $.each(rList, function (key, value) {
      selectField.options[selectField.options.length] = new Option(
        value.userName,
        value.userName
      );
    });
  });
}

$("#view-user-tab").click(() => {
  if (User.getRole() == "superadmin") {
    $(
      " .adminNameDiv, .resellerNameDiv, .sellerNameDiv, .clientNameDiv"
    ).removeClass("d-none");
  }

  if (User.getRole() == "admin") {
    $(".adminNameDiv").addClass("d-none");
    $(".resellerNameDiv").removeClass("d-none");
    $(".sellerNameDiv").removeClass("d-none");
    $(".clientNameDiv").removeClass("d-none");
  }

  // if (User.getRole() == "reseller") {
  //     $('.adminNameDiv, .resellerNameDiv').addClass("d-none");
  //     $('.sellerNameDiv').removeClass('d-none');
  //     $('.clientNameDiv').removeClass('d-none');
  // }
  if (User.getRole() == "seller") {
    $(".adminNameDiv, .resellerNameDiv, .sellerNameDiv").addClass("d-none");
  }
  $("#edit-user-form").html("");
  loadAllUserTypes();
});
$("#edit-user-tab").click(() => {
  if (User.getRole() == "superadmin") {
    $(
      " .adminNameDiv, .resellerNameDiv, .sellerNameDiv, .clientNameDiv"
    ).removeClass("d-none");
  }

  if (User.getRole() == "admin") {
    $(".adminNameDiv").addClass("d-none");
    $(".resellerNameDiv").removeClass("d-none");
    $(".sellerNameDiv").removeClass("d-none");
    $(".clientNameDiv").removeClass("d-none");
  }

  if (User.getRole() == "reseller") {
    $(".adminNameDiv, .resellerNameDiv").addClass("d-none");
    $(".sellerNameDiv").removeClass("d-none");
    $(".clientNameDiv").removeClass("d-none");
  }
  if (User.getRole() == "seller") {
    $(".adminNameDiv, .resellerNameDiv, .sellerNameDiv").addClass("d-none");
    $(".clientNameDiv").removeClass("d-none");
  }
  $("#view-user-form").html("");
  loadAllUserTypes();
});
