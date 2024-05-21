import "./../../scripts/app";
import "./styles";

import Form from "./../../scripts/form";
import Schema from "./../../schema/organization";
import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";

// console.log("Welcome to organization management!");

$(document).ready(function () {
  $('.select2').select2();
});

$("#add-organization").submit(function (e) {
  e.preventDefault();

  const formData = {};

  $(this)
    .serializeArray()
    .forEach(i => {
      formData[i.name] = i.value;
    });

  const additionalData = {
    loggedInUserName: User.getName(),
    operation: "addOrganisation"
  };

  Request(
    Endpoints.get("saveOrganization"),
    "POST",
    $.extend({}, formData, additionalData)
  ).done(data => {
    if (Endpoints.validateResponse(data)) {
      // console.log(data);
      $(".alert").alert('close');
      $("#add-organization")[0].reset();
      data.message &&
        (data.result === "Success"
          ? Alert.success(data.message)
          : Alert.error(data.message));
    }
  });
});

function enableFormSubmitAction() {

  $("#edit-organization").submit(function (e) {
    // console.log("save");
    e.preventDefault();

    const formData = {};

    $(this)
      .serializeArray()
      .forEach(i => {
        formData[i.name] = i.value;
      });
    var item = orgList.find(x => x.orgName == formData['orgName']);
    const additionalData = {
      loggedInUserName: User.getName(),
      operation: "editOrganisation",
      orgId: item.orgId
    };

    Request(
      Endpoints.get("saveOrganization"),
      "POST",
      $.extend({}, formData, additionalData)
    ).done(data => {
      if (Endpoints.validateResponse(data)) {
        // console.log(data);
        $("#edit-organization")[0].reset();
        $(".alert").alert('close');
        data.message &&
          (data.result === "Success"
            ? Alert.success(data.message)
            : Alert.error(data.message));
      }
    });
  });
}

$("#view-organization-tab").click(() => {
  $("#view-organization-form").html("");
  loadDropdowns();
});

$("#view #name.select2").on('change', function () {
  // var item = orgList.find(x => x.orgName == this.value);
  // if (item) {
  dropdownChange("view-organization-form", this.value, true);
  // }
});

$("#edit #name1.select2").on('change', function () {
  // var item = orgList.find(x => x.orgName == this.value);
  // if (item) {
  dropdownChange("edit-organization-form", this.value, false);
  // }
});

$("#edit-organization-tab").click(() => {
  $("#edit-organization-form").html("");
  loadDropdowns();

});

function dropdownChange(formId, value, disable) {
  if (value == 0) {
    return null;
  }
  const getUserData = {
    "loggedInUserName": User.getName(),
    "orgId": value,
  };

  Request(Endpoints.get("getOrganization"), "POST", getUserData, {
    showMainLoader: true
  }).done(data => {
    if (data.message) {
      $(".alert").alert('close');
      Alert.success(data.message, {
        clearTime: 5 * 1000
      });
    }
    const user = data.data.organisation;
    // console.log(user);
    const viewSchema = $.extend(true, {}, Schema);
    viewSchema.fields.forEach((field) => {
      // console.log(field);
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
    viewSchema.buttons[1].class = `reset-${Schema.view.id}` + " btn btn-danger";
    new Form(viewSchema).render("#" + formId);
    $("." + `reset-${Schema.view.id}`).click(() => {
      // console.log("reset-view-user");
      $("#" + formId).html("");
    });
    enableFormSubmitAction();
  });
}

var orgList;
function loadDropdowns() {

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

    var selectField = document.getElementById("name");
    selectField.options.length = 1;
    $.each(rList, function (key, value) {
      selectField.options[selectField.options.length] = new Option(value.orgName, value.orgId);
    });

    var selectField1 = document.getElementById("name1");
    selectField1.options.length = 1;
    $.each(rList, function (key, value) {
      selectField1.options[selectField1.options.length] = new Option(value.orgName, value.orgId);
    });

  });

}
