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
      required: true
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
      label: "Email",
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
    {
      label: "Customer Type",
      type: "select",
      id: "customerType",
      name: "customerType",
      title: "Customer Type",
      options: [
        {
          label: "Admin",
          value: "admin"
        },
        {
          label: "Reseller",
          value: "reseller"
        },
        {
          label: "Seller",
          value: "seller"
        },
        {
          label: "Client",
          value: "Client"
        }
      ]
    },
    {
      label: "Billing Type",
      type: "select",
      id: "billingType",
      name: "billingType",
      title: "Billing Type",
      options: [
        {
          label: "PostPaid",
          value: "postpaid"
        },
        {
          label: "PrePaid",
          value: "prepaid"
        }
      ]
    },
    {
      label: "Billing Cycle",
      type: "select",
      id: "billingCycle",
      name: "billingCycle",
      title: "Billing Cycle",
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
    {
      label: "DLR Push URL",
      type: "text",
      id: "dlrPushUrl",
      name: "dlrPushUrl",
      title: "DLR",
      placeholder: "DLR Push URL",
      required: true
    },
    {
      label: "Created Date",
      type: "text",
      id: "createdDate",
      name: "createdDate",
      title: "Created",
      placeholder: "Created Date",
      required: true
    },
    {
      label: "Expiry",
      type: "text",
      id: "userExpiryDate",
      name: "userExpiryDate",
      title: "Expiry",
      placeholder: "Expiry Date",
      required: true
    }
  ],
  buttons: [
    {
      type: "submit",
      value: "Save"
    },
    {
      type: "button",
      value: "Cancel",
      id: "cancelForm"
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

