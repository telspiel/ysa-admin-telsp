import "./../../scripts/app";
import "./styles";

import Form from "./../../scripts/form";
import Schema from "./../../schema/user";
import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";

// console.log("Welcome to user management!");

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}

$("#cancelForm").click(() => {
  $("#add-user")[0].reset();
});

$('#expiry').datetimepicker({
  dateFormat: 'yyyy-mm-dd',
  timeFormat: 'HH:mm:ss',
  format: 'Y-m-d H:i:s',
  step: 1,
  minDate: 0,
});

$(document).ready(function () {
  $('.select2').select2();
});

$("#add-user").submit(function (e) {
  e.preventDefault();

  const formData = {};

  $("#add-user")
    .serializeArray()
    .forEach(i => {
      formData[i.name] = i.value;
    });

  const additionalData = {
    loggedInUserName: User.getName(),
    operation: "addInternalUser",
    userRole: "internaluser"
  };

  Request(
    Endpoints.get("saveInternalUser"),
    "POST",
    $.extend({}, formData, additionalData)
  ).done(data => {
    if (Endpoints.validateResponse(data)) {
      // console.log(data);
      $(".alert").alert('close');
      $("#add-user")[0].reset();
      data.message &&
        (data.result === "Success"
          ? Alert.success(data.message)
          : Alert.error(data.message));
    }
  });
});

$("#view-user-tab").click(() => {
  $("#view-user-form").html("");
  loadDropdowns("userName1");
});

$("#edit-user-tab").click(() => {
  $("#edit-user-form").html("");
  loadDropdowns("userName2");
});

$("#view-routing-form .select2").on('change', function () {
  dropdownChange("view-user-form", this.value, true);
});

$("#edit-routing-form .select2").on('change', function () {
  dropdownChange("edit-user-form", this.value, false);
});

function dropdownChange(formId, value, disable) {
  // console.log(value);
  if (value == 0) {
    return null;
  }

  // const userRole = $(this).attr("data-name");
  const getUserData = {
    "loggedInUserName": User.getName(),
    "userName": value,
    // "userRole": $(this).attr("data-name"),// optional
  };

  Request(Endpoints.get("getInternalUserData"), "POST", getUserData, {
    showMainLoader: true
  }).done(data => {
    if (data.message) {
      $(".alert").alert('close');
      Alert.success(data.message, {
        clearTime: 5 * 1000
      });
    }
    const user = data.data.user;
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

    // viewSchema.id = Schema.view.id;
    viewSchema.buttons[1].id = `reset-${Schema.view.id}`;
    viewSchema.buttons[1].class = `reset-${Schema.view.id}` + " btn btn-danger";

    new Form(viewSchema).render("#" + formId);
    $("." + `reset-${Schema.view.id}`).click(() => {
      // console.log("reset-view-user");
      $("#" + formId).html("");
      // $("#ViewUserName").val("");
      // loadDropdowns("viewUserForm");
    });
    enableFormSubmitAction();
    $('#userExpiryDate').datetimepicker({
      dateFormat: 'yyyy-mm-dd',
      timeFormat: 'HH:mm:ss',
      format: 'Y-m-d H:i:s',
      step: 1,
      minDate: 0,
    });
  });
}

function loadDropdowns(containerID) {

  const getUserData = {
    "loggedInUserName": User.getName(),
    // "userId": User.getUserid()
    // "userRole":"admin",// optional
  };

  Request(Endpoints.get("listInternalusers"), "POST", getUserData, {
    showMainLoader: true
  }).done(data => {
    if (data.message) {
      $(".alert").alert('close');
      Alert.success(data.message, {
        clearTime: 5 * 1000
      })
    }
    const allChildMap = data.data.userList;

    const rList = allChildMap;
    if (rList.length === 0) {
      $(".userNameDiv").addClass('d-none');
    }
    console.log(allChildMap);
    var selectField = document.getElementById(containerID);
    selectField.options.length = 1;
    $.each(allChildMap, function (key, value) {
      selectField.options[selectField.options.length] = new Option(value.userName, value.userName);
    });

    // var rData = [];
    // $.each(rList, function (key, value) {
    //   rData.push({ "id": value.userId, "name": value.userName, "ignore": false });
    // });

    // $('.userName').autocomplete({
    //   nameProperty: 'name',
    //   valueField: '#hidden-field',
    //   dataSource: rData
    // });

  });

}

function enableFormSubmitAction() {

  $("#edit-user-form form").submit(function (e) {
    e.preventDefault();

    const formData = {};

    $("#edit-user")
      .serializeArray()
      .forEach(i => {
        formData[i.name] = i.value;
      });

    const additionalData = {
      loggedInUserName: User.getName(),
      operation: "editInternalUser",
      userRole: "internaluser"
    };

    Request(
      Endpoints.get("saveInternalUser"),
      "POST",
      $.extend({}, formData, additionalData)
    ).done(data => {
      if (Endpoints.validateResponse(data)) {
        // console.log(data);
        $(".alert").alert('close');
        $("#edit-user")[0].reset();
        data.message &&
          (data.result === "Success"
            ? Alert.success(data.message)
            : Alert.error(data.message));
      }
    });
  });
}
// user validation
$(document).ready(function(){
$("#userName").blur(function(){
  var username = $(this).val();
  if(username.length>0){
  const data ={
    loggedInUserName : User.getName(),
    userName : username,
    operation : "internal user"
  }
  Request(
    Endpoints.get("saveInternalUser"),
    "POST",data
  ).done(data => {
    $(".alert").alert('close');
      data.message &&
        (data.result === "Success"
          ? Alert.success(data.message)
          : Alert.error(data.message));
          if (data.result === "Failure") {
           $("#submit").addClass("d-none")
          }
          if (data.result === "Success") {
           $("#submit").removeClass("d-none")
          }
  });
}
});
});
