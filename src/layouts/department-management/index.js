import "./../../scripts/app";
import "./styles";

import Form from "./../../scripts/form";
import Schema from "./../../schema/department";
import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";

// console.log("Welcome to department management!");

// new Form(Schema).render("#add-department-form");

loadOrgList();


// $("#reset-edit-department").click(() => {
//   $("#edit-department")[0].reset();
//   $("#edit-department-form").html("");
// });

$("#add-department").submit(function (e) {
  e.preventDefault();

  const formData = {};

  $(this)
    .serializeArray()
    .forEach(i => {
      formData[i.name] = i.value;
    });

  // console.log(orgList);

  var item = orgList.find(x => x.orgName == formData['orgName']);
  if (item) {
    delete formData['orgName'];
    formData['orgId'] = item.orgId;
  }

  const additionalData = {
    loggedInUserName: User.getName(),
    operation: "addDepartment"
  };

  Request(
    Endpoints.get("saveDepartment"),
    "POST",
    $.extend({}, formData, additionalData)
  ).done(data => {
    if (Endpoints.validateResponse(data)) {
      // console.log(data);
      $("#add-department")[0].reset();
      $(".alert").alert('close');
      data.message &&
        (data.result === "Success"
          ? Alert.success(data.message)
          : Alert.error(data.message));
    }
  });
});

function enableFormSubmitAction() {

  $("#edit-department").submit(function (e) {
    // console.log("save");
    e.preventDefault();

    const formData = {};

    $(this)
      .serializeArray()
      .forEach(i => {
        formData[i.name] = i.value;
      });
    // console.log(formData);
    var deptItem = deptList.find(x => x.deptName == $("#edit .dropdown.deptName").val());
    var orgItem = orgList.find(x => x.orgName == $("#edit .dropdown.orgName").val());
    const additionalData = {
      loggedInUserName: User.getName(),
      operation: "editOrganisation",
      deptId: deptItem.deptId,
      orgId: orgItem.orgId
    };

    Request(
      Endpoints.get("saveDepartment"),
      "POST",
      $.extend({}, formData, additionalData)
    ).done(data => {
      if (Endpoints.validateResponse(data)) {
        // console.log(data);
        $(".alert").alert('close');
        $("#edit-department")[0].reset();
        data.message &&
          (data.result === "Success"
            ? Alert.success(data.message)
            : Alert.error(data.message));
      }
    });
  });
}

$("#view-department-tab").click(() => {
  $("#view-department-form").html("");
});

$("#view .dropdown.orgName").on('change', function () {
  // console.log(orgList);
  var item = orgList.find(x => x.orgName == this.value);
  if (item) {
    // console.log(item);
    $("#view #deptDropDown").removeClass("d-none");
    loadDeptList(item.orgId);
  }
});


$("#edit .dropdown.orgName").on('change', function () {
  var item = orgList.find(x => x.orgName == this.value);
  if (item) {
    $("#edit #deptDropDown").removeClass("d-none");
    loadDeptList(item.orgId);
  }
});

$("#view .dropdown.deptName").on('change', function () {
  var orgItem = orgList.find(x => x.orgName == $("#view .dropdown.orgName").val());
  var deptItem = deptList.find(x => x.deptName == this.value);
  if (orgItem && deptItem) {
    // console.log("entry");
    dropdownChange("view-department-form", orgItem.orgId, deptItem.deptId, true);
  }
});

$("#edit .dropdown.deptName").on('change', function () {
  var orgItem = orgList.find(x => x.orgName == $("#edit .dropdown.orgName").val());
  var deptItem = deptList.find(x => x.deptName == this.value);
  if (orgItem && deptItem) {
    // console.log("entry");
    dropdownChange("edit-department-form", orgItem.orgId, deptItem.deptId, false);
  }
});


$("#edit-department-tab").click(() => {
  $("#edit-department-form").html("");
});

function dropdownChange(formId, orgId, deptId, disable) {

  const getUserData = {
    "loggedInUserName": User.getName(),
    "orgId": orgId,
    "deptId": deptId,
  };

  Request(Endpoints.get("getDepartment"), "POST", getUserData, {
    showMainLoader: true
  }).done(data => {
    $(".alert").alert('close');
    if (data.message) {
      Alert.success(data.message, {
        clearTime: 5 * 1000
      });
    }
    const user = data.data.department;
    // console.log(user);
    const viewSchema = $.extend(true, {}, Schema);
    viewSchema.fields.forEach((field) => {
      field.value = user[field.name];
      field.disabled = disable;

      if (field.type == "select") {
        var selectList = field.options;
        selectList.forEach(function (value) {
          if (value.value == user[field.name]) {
            value.selected = true;
          }
        });
      }

    });
    if (disable) {
      delete viewSchema.buttons[0];
      viewSchema.id = Schema.view.id;
    } else {
      viewSchema.id = Schema.edit.id;
    }

    viewSchema.buttons[1].id = `reset-${Schema.view.id}`;
    new Form(viewSchema).render("#" + formId);
    $("#reset-view-department").click(() => {
      // console.log("reset-view-user");
      $("#" + formId).html("");
    });
    enableFormSubmitAction();
  });
}

var deptList;
function loadDeptList(orgId) {

  const getUserData = {
    "loggedInUserName": User.getName(),
    "orgId": orgId
  };

  Request(Endpoints.get("getAlldepartment"), "POST", getUserData, {
    showMainLoader: true
  }).done(data => {
    $(".alert").alert('close');
    if (data.message) {
      Alert.success(data.message, {
        clearTime: 5 * 1000
      })
    }
    const allChildMap = data.data.departmentList;

    deptList = allChildMap;
    const rList = allChildMap;

    var rData = [];
    $.each(rList, function (key, value) {
      rData.push({ "id": value.deptId, "name": value.deptName, "ignore": false });
    });
    // console.log(rData);
    $('.deptName').autocomplete({
      nameProperty: 'name',
      valueField: '#hidden-field',
      dataSource: rData
    });

  });

}

var orgList;
function loadOrgList() {

  const getUserData = {
    "loggedInUserName": User.getName()
  };

  Request(Endpoints.get("getAllOrganization"), "POST", getUserData, {
    showMainLoader: true
  }).done(data => {
    if (data.message) {
      $(".alert").alert('close');
      Alert.success(data.message, {
        clearTime: 5 * 1000
      })
    }
    const allChildMap = data.data.organisationList;
    orgList = allChildMap;
    const rList = allChildMap;

    var rData = [];
    $.each(rList, function (key, value) {
      rData.push({ "id": value.orgId, "name": value.orgName, "ignore": false });
    });

    // console.log(rData);
    $('.orgName').autocomplete({
      nameProperty: 'name',
      valueField: '#hidden-field',
      dataSource: rData
    });

  });

}
