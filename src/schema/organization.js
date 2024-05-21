import Validator from "./../scripts/validator";

const Schema = {
  id: "add-organization",
  action: "#",
  method: "post",
  fields: [
    {
      label: "Name",
      type: "text",
      id: "orgName",
      name: "orgName",
      title: "Enter Organization name.",
      placeholder: "Organization Name",
      required: true,
      disabled: true
    },
    {
      label: "Address",
      type: "textarea",
      rows: 3,
      id: "orgAddress",
      name: "orgAddress",
      title: "Enter Organization address.",
      placeholder: "Organization Address"
    },
    {
      label: "Email",
      type: "email",
      id: "orgEmail",
      name: "orgEmailId",
      pattern: Validator.email,
      title: "Please enter valid email.",
      placeholder: "Organization Email",
      required: true
    },
    {
      label: "GST Number",
      type: "text",
      id: "orgGst",
      name: "orgGstNumber",
      title: "Please enter GST number.",
      placeholder: "Organization GST"
    },
    {
      label: "Phone Number",
      type: "tel",
      id: "orgPhone",
      name: "orgContactNumber",
      pattern: Validator.phone,
      title: "Please enter valid phone number.",
      placeholder: "Organization Phone Number",
      required: true
    },
    {
      label: "Primary Contact",
      type: "text",
      id: "orgPrimaryContact",
      name: "orgPrimaryContact",
      title: "Enter Primary Contact Name",
      placeholder: "Primary Contact Name"
    },
    {
      label: "Billing Cycle",
      type: "select",
      id: "orgBillingCycle",
      name: "orgBillingCycle",
      title: "Organization Billing Cycle",
      options: [
        {
          label: "Monthly",
          value: "monthly"
        },
        {
          label: "Quarterly",
          value: "quarterly"
        }
      ]
    },
    {
      label: "Billing Type",
      type: "select",
      id: "orgBillingType",
      name: "orgBillingType",
      title: "Organization Billing Type",
      options: [
        {
          label: "Prepaid",
          value: "prepaid"
        }, {
          label: "Postpaid",
          value: "postpaid"
        }
      ]
    },
// start 
// {
//   label: "Is Visualize Allowed",
//   type: "text",
//   id: "orgIs Visualize Allowed",
//   name: "orgIs Visualize Allowed",
//   title: "Is Visualize Allowed",
//   placeholder: "Is Visualize Allowed",
//   required: true,
//   options: [
//     {
//       label: "Yes",
//       value: "Yes"
//     }, {
//       label: "Yes",
//       value: "Yes"
//     }
//   ]
// },


// end

    {
      label: "Status",
      type: "select",
      id: "orgStatus",
      name: "orgStatus",
      title: "Organization Status",
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
  id: "view-organization",
  action: "#",
  method: "post",
  fields: [
    {
      label: "Name",
      type: "text",
      id: "orgNameView",
      name: "orgNameView",
      title: "Enter Organization name.",
      placeholder: "Organization Name",
      required: true
    }
  ]
};

Schema.edit = {
  id: "edit-organization",
  action: "#",
  method: "post",
  fields: [
    {
      label: "Name",
      type: "text",
      id: "orgNameEdit",
      name: "orgNameEdit",
      title: "Enter Organization name.",
      placeholder: "Organization Name",
      required: true
    }
  ]
};

export default Schema;
