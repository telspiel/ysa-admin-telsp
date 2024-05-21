const Schema = {
  id: "add-credit",
  action: "#",
  method: "post",
  fields: [
    {
      label: "Organization",
      type: "text",
      id: "orgName",
      name: "orgName",
      title: "Enter Organization name.",
      placeholder: "Organization Name",
      required: true
    },
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
      label: "User",
      type: "text",
      id: "userName",
      name: "userName",
      title: "Enter User name.",
      placeholder: "User Name",
      required: true
    },
    {
      label: "Available Credit",
      type: "text",
      id: "availableCredit",
      name: "availableCredit",
      title: "Available Credit",
      disabled: true
    },
    {
      label: "Add Credit",
      type: "number",
      id: "creditToBeAdded",
      name: "creditToBeAdded",
      title: "Add Credit",
      placeholder: "Enter Credit Amount",
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
      label: "User",
      type: "text",
      id: "userNameView",
      name: "userNameView",
      title: "Enter User name.",
      placeholder: "User Name",
      required: true
    }
  ]
};

export default Schema;
