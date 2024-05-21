import Validator from "./../scripts/validator";

const Schema = {
  id: "add-department",
  action: "#",
  method: "post",
  fields: [
    // {
    //   label: "Organization",
    //   type: "text",
    //   id: "orgName",
    //   name: "orgName",
    //   title: "Enter Organization name.",
    //   placeholder: "Organization Name",
    //   required: true
    // },
    {
      label: "Department",
      type: "text",
      id: "deptName",
      name: "deptName",
      title: "Enter Department name.",
      placeholder: "Department Name",
      required: true
    },
    {
      label: "Email",
      type: "email",
      id: "deptEmail",
      name: "deptEmailId",
      pattern: Validator.email,
      title: "Please enter valid email.",
      placeholder: "Department Email",
      required: true
    },
    {
      label: "Phone Number",
      type: "tel",
      id: "deptPhone",
      name: "deptContactNumber",
      pattern: Validator.phone,
      title: "Please enter valid phone number.",
      placeholder: "Department Phone Number",
      required: true
    },
    {
      label: "Status",
      type: "select",
      id: "deptStatus",
      name: "deptStatus",
      title: "Department Status",
      options: [
        {
          label: "Active",
          value: "active"
        },
        {
          label: "Inactive",
          value: "inactive"
        }
      ]
    }
  ],
  buttons: [
    {
      type: "submit",
      value: "Save",
      class : "btn-success"
    },
    {
      type: "button",
      value: "Reset",
      id: "cancelForm",
      class : "btn-danger"
    }
  ]
};

Schema.view = {
  id: "view-department",
  action: "#",
  method: "post",
  fields: [
    {
      label: "Organization",
      type: "text",
      id: "orgNameView",
      name: "orgNameView",
      title: "Enter Organization name.",
      placeholder: "Organization Name",
      required: true
    },
    {
      label: "Department",
      type: "text",
      id: "deptNameView",
      name: "deptNameView",
      title: "Enter Department name.",
      placeholder: "Department Name",
      required: true
    }
  ]
};

Schema.edit = {
  id: "edit-department",
  action: "#",
  method: "post",
  fields: [
    {
      label: "Organization",
      type: "text",
      id: "orgNameEdit",
      name: "orgNameEdit",
      title: "Enter Organization name.",
      placeholder: "Organization Name",
      required: true
    },
    {
      label: "Department",
      type: "text",
      id: "deptNameEdit",
      name: "deptNameEdit",
      title: "Enter Department name.",
      placeholder: "Department Name",
      required: true
    }
  ]
};

export default Schema;
