import "./../../scripts/app";
import "./styles";

import Form from "./../../scripts/form";
import Schema from "./../../schema/user";
import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";

// console.log("Welcome to user management!");

//new Form(Schema).render("#add-user-form");

// const now = moment(new Date()).format("YYYY-MM-DD HH:mm");
// $("#expiryTime").val(now).datetimepicker({
//   format: "YYYY-MM-DD HH:mm"
// });


$("#cancelForm").click(() => {
  $("#add-user")[0].reset();
});

$(function() {

var form = $("#add-user");
form.validate({
    errorPlacement: function errorPlacement(error, element) { element.before(error); },
    // rules: {
    //     confirm: {
    //         equalTo: "#password"
    //     }
    // }
});
form.children("div").steps({
    headerTag: "h3",
    bodyTag: "section",
    transitionEffect: "slideLeft",
    onStepChanging: function (event, currentIndex, newIndex)
    {
        form.validate().settings.ignore = ":disabled,:hidden";
        return form.valid();
    },
    onFinishing: function (event, currentIndex)
    {
        form.validate().settings.ignore = ":disabled";
        return form.valid();
    },
    onFinished: function (event, currentIndex)
    {
      const formData = {};

      $("#add-user")
        .serializeArray()
        .forEach(i => {
          formData[i.name] = i.value;
        });

      const org = (app.store.organisationList || []).find(
        o => o.name === formData.orgName
      );

      const dept = (app.store.departmentList || []).find(
        o => o.name === formData.deptName
      );

      if (!org) {
        $(".alert").alert('close');
        Alert.info("Please select organisation from suggestions.");
        return false;
      }

      if (!dept) {
        $(".alert").alert('close');
        Alert.info("Please select department from suggestions.");
        return false;
      }

      const expiry = $("#expiry").val()+" "+$("#expiryTime").val();
      const additionalData = {
        loggedInUserName: User.getName(),
        operation: "addUser",
        orgId: (org || {}).id,
        deptId: (dept || {}).id,
        userExpiryDate: expiry
      };

      Request(
        Endpoints.get("saveUser"),
        "POST",
        $.extend({}, formData, additionalData)
      ).done(data => {
        if (Endpoints.validateResponse(data)) {
          // console.log(data);
          $("#add-user")[0].reset();
          $(".alert").alert('close');
          data.message &&
            (data.result === "Success"
              ? Alert.success(data.message)
              : Alert.error(data.message));
        }
      });
    }
});
});

const data = {
  loggedInUserName: User.getName()
};

const onOrganisationSelect = org => {
  const data = {
    loggedInUserName: User.getName(),
    orgId: org.id,
    orgName: org.name
  };
  Request(Endpoints.get("getAllDepartmentList"), "POST", data).done(data => {
    if (Endpoints.validateResponse(data)) {
      const source = (app.store.departmentList = data.data.departmentList.map(
        o => ({
          id: o.deptId,
          name: o.deptName
        })
      ));
      $("#deptName")
        .attr("autocomplete", "off")
        .typeahead({ source });
    }
  });
};

Request(Endpoints.get("getAllOrganisationList"), "POST", data).done(data => {
  if (Endpoints.validateResponse(data)) {
    const source = (app.store.organisationList = data.data.organisationList.map(
      o => ({
        id: o.orgId,
        name: o.orgName
      })
    ));

    $("#orgName")
      .attr("autocomplete", "off")
      .typeahead({ source, afterSelect: onOrganisationSelect });


// console.log(source);

    $("#orgName")
      .attr("autocomplete", "off").typeahead({
        source, afterSelect: onOrganisationSelect
    });
  }
});

$("#add-user").submit(function(e) {
  e.preventDefault();


});

$("#view-user-tab").click(() => {
  new Form(Schema.view).render("#view-user-form");

  const data = {
    loggedInUserName: User.getName()
  };

  const renderViewForm = (org, dept, user) => {
    const data = {
      loggedInUserName: User.getName(),
      orgId: org.id,
      deptId: dept.id,
      userId: user.id,
      operation: 'viewUser'
    };
    Request(Endpoints.get("viewUser"), "POST", data).done(data => {
      if (Endpoints.validateResponse(data)) {
        const user = data.data.user;
        const viewSchema = $.extend(true, {}, Schema);
        viewSchema.fields.forEach((field) => {
          field.value = user[field.name];
          field.disabled = true;
        });
        delete viewSchema.buttons;
        viewSchema.id = Schema.view.id;
        new Form(viewSchema).render("#view-user-form");
      }
    });
  };

  const onDepartmentSelect = (org, dept) => {
    const data = {
      loggedInUserName: User.getName(),
      orgId: org.id,
      deptId: dept.id
    };
    Request(Endpoints.get("getAllUserList"), "POST", data).done(data => {
      if (Endpoints.validateResponse(data)) {
        const source = (app.store.userList = data.data.userList.map(
          o => ({
            id: o.userId,
            name: o.userName
          })
        ));
        $("#userNameView")
          .attr("autocomplete", "off")
          .typeahead({ source, afterSelect: renderViewForm.bind(this, org, dept) });
      }
    });
  };

  const onOrganisationSelect = org => {
    const data = {
      loggedInUserName: User.getName(),
      orgId: org.id
    };
    Request(Endpoints.get("getAllDepartmentList"), "POST", data).done(data => {
      if (Endpoints.validateResponse(data)) {
        const source = (app.store.departmentList = data.data.departmentList.map(
          o => ({
            id: o.deptId,
            name: o.deptName
          })
        ));
        $("#deptNameView")
          .attr("autocomplete", "off")
          .typeahead({ source, afterSelect: onDepartmentSelect.bind(this, org) });
      }
    });
  };

  Request(Endpoints.get("getAllOrganisationList"), "POST", data).done(data => {
    if (Endpoints.validateResponse(data)) {
      const source = (app.store.organisationList = data.data.organisationList.map(
        o => ({
          id: o.orgId,
          name: o.orgName
        })
      ));

      $("#orgNameView")
        .attr("autocomplete", "off")
        .typeahead({ source, afterSelect: onOrganisationSelect });
    }
  });
});

$("#edit-user-tab").click(() => {
  new Form(Schema.edit).render("#edit-user-form");

  const data = {
    loggedInUserName: User.getName()
  };

  const renderEditForm = (org, dept, user) => {
    const data = {
      loggedInUserName: User.getName(),
      orgId: org.id,
      deptId: dept.id,
      userId: user.id,
      operation: 'viewUser'
    };
    Request(Endpoints.get("viewUser"), "POST", data).done(data => {
      if (Endpoints.validateResponse(data)) {
        const user = data.data.user;
        user.orgName = org.name;///////////
        user.deptName = dept.name;//////////////
        const editSchema = $.extend(true, {}, Schema);
        editSchema.fields.forEach((field) => {
          field.value = user[field.name];
        });
        editSchema.id = Schema.edit.id;
        editSchema.buttons[1].id = `cancel-${Schema.edit.id}`;
        new Form(editSchema).render("#edit-user-form");

        $("#edit-user").find("#expiry").datetimepicker({
            format: "YYYY-MM-DD HH:mm"
        });

        $("#edit-user").submit(function(e) {
          e.preventDefault();

          const formData = {};

          $(this)
            .serializeArray()
            .forEach(i => {
              formData[i.name] = i.value;
            });

          const org = (app.store.organisationList || []).find(
            o => o.name === formData.orgName
          );

          const dept = (app.store.departmentList || []).find(
            o => o.name === formData.deptName
          );

          if (!org) {
            $(".alert").alert('close');
            Alert.info("Please select organisation from suggestions.");
            return false;
          }

          if (!dept) {
            $(".alert").alert('close');
            Alert.info("Please select department from suggestions.");
            return false;
          }

          const additionalData = {
            loggedInUserName: User.getName(),
            operation: "editUser",
            orgId: (org || {}).id,
            deptId: (dept || {}).id,
            userExpiryDate: `${$("#expiry").val()}:00`
          };

          Request(
            Endpoints.get("saveUser"),
            "POST",
            $.extend({}, formData, additionalData)
          ).done(data => {
            if (Endpoints.validateResponse(data)) {
              new Form(Schema.edit).render("#edit-user-form");
              $(".alert").alert('close');
              data.message &&
                (data.result === "Success"
                  ? Alert.success(data.message)
                  : Alert.error(data.message));
            }
          });
        });

        $(`#${editSchema.buttons[1].id}`).click(() => {
          $(`#${editSchema.id}`)[0].reset();
        });
      }
    });
  };

  const onDepartmentSelect = (org, dept) => {
    const data = {
      loggedInUserName: User.getName(),
      orgId: org.id,
      deptId: dept.id
    };
    Request(Endpoints.get("getAllUserList"), "POST", data).done(data => {

      if (Endpoints.validateResponse(data)) {
        const source = (app.store.userList = data.data.userList.map(
          o => ({
            id: o.userId,
            name: o.userName
          })
        ));
        $("#userNameEdit")
          .attr("autocomplete", "off")
          .typeahead({ source, afterSelect: renderEditForm.bind(this, org, dept) });
      }
    });
  };

  const onOrganisationSelect = org => {
    const data = {
      loggedInUserName: User.getName(),
      orgId: org.id
    };
    Request(Endpoints.get("getAllDepartmentList"), "POST", data).done(data => {
      if (Endpoints.validateResponse(data)) {
        const source = (app.store.departmentList = data.data.departmentList.map(
          o => ({
            id: o.deptId,
            name: o.deptName
          })
        ));
        $("#deptNameEdit")
          .attr("autocomplete", "off")
          .typeahead({ source, afterSelect: onDepartmentSelect.bind(this, org) });
      }
    });
  };

  Request(Endpoints.get("getAllOrganisationList"), "POST", data).done(data => {
    if (Endpoints.validateResponse(data)) {
      const source = (app.store.organisationList = data.data.organisationList.map(
        o => ({
          id: o.orgId,
          name: o.orgName
        })
      ));

      $("#orgNameEdit")
        .attr("autocomplete", "off")
        .typeahead({ source, afterSelect: onOrganisationSelect });
    }
  });
});
