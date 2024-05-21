import Validator from "./../scripts/validator";

const Schema = {
  id: "add-user",
  action: "#",
  method: "post",
  fields: [
    {
      label: "User Name",
      type: "text",
      id: "userName",
      name: "userName",
      title: "Enter User name.",
      placeholder: "User Name",
      required: true,
      disabled: true
    },
    {
      label: "Password",
      type: "text",
      id: "userPass",
      name: "userPassword",
      title: "Enter User Password.",
      placeholder: "Enter User Password",
      required: true
    },
    {
      label: "User Type",
      type: "select",
      id: "customerType",
      name: "customerType",
      title: "Enter User type.",
      placeholder: "User Type",
      required: true,
      options: [
        {
          label: "Account Manager",
          value: "accountmanager"
        },
        {
          label: "Support",
          value: "support"
        }
      ]
    },

    {
      label: "Email Id",
      type: "email",
      id: "userEmail",
      name: "email",
      pattern: Validator.email,
      title: "Please enter valid email.",
      placeholder: "User Email",
      required: true
    },
    {
      label: "Mobile Number",
      type: "tel",
      id: "mobile",
      name: "mobile",
      pattern: Validator.phone,
      title: "Please enter valid mobile number.",
      placeholder: "User Mobile Number",
      required: true
    },

    // {
    //   label: "Account Type",
    //   type: "text",
    //   id: "editAccountType",
    //   name: "accountType",
    //   title: "Account Type",
    //   required: true,
    //   disabled: true
    // },
    {
      label: "Expiry",
      type: "text",
      id: "userExpiryDate",
      name: "userExpiryDate",
      title: "Expiry",
      placeholder: "Expiry Date",
      class: "form-control datetimepicker",
      required: true
    },
    {
      label: "Status",
      type: "select",
      id: "userStatus",
      name: "status",
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
    },
  ],
  buttons: [
    {
      type: "submit",
      value: "Save",
      id: "saveForm",
      class: "btn-success"
    },
    {
      type: "button",
      value: "Reset",
      id: "cancelForm",
      class: "btn-danger"
    }
  ]
};

Schema.view = {
  id: "view-user",
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
    },
    {
      label: "User Name",
      type: "text",
      id: "userNameView",
      name: "nameView",
      title: "Enter User name.",
      placeholder: "User Name",
      required: true
    }
  ]
};

Schema.edit = {
  id: "edit-user",
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
    },
    {
      label: "User Name",
      type: "text",
      id: "userNameEdit",
      name: "nameEdit",
      title: "Enter User name.",
      placeholder: "User Name",
      required: true
    }
  ]
};

export default Schema;

