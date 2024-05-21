const Schema = {
  id: "add-senderId",
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
      label: "Sender Id",
      type: "text",
      id: "senderId",
      name: "senderId",
      title: "Enter senderId.",
      placeholder: "sender Id",
      required: true
    },
    {
      label: "Status",
      type: "select",
      id: "senderIdStatus",
      name: "status",
      title: "Sender Id Status",
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
      label: "Default",
      type: "radio",
      id: "defaultSenderId",
      name: "default",
      title: "Default SenderId",
      options: [
        {
          label: "Yes",
          value: "true"
        },
        {
          label: "No",
          value: "false"
        }
      ]
    },
    {
      label: "Active",
      type: "radio",
      id: "activeSenderId",
      name: "active",
      title: "Active SerderId",
      options: [
        {
          label: "Yes",
          value: "true"
        },
        {
          label: "No",
          value: "false"
        }
      ]
    },
     {
      label: "Non DND Number Allowed",
      type: "radio",
      id: "nonDNDSenderId",
      name: "nonDND",
      title: "Non DND Number Allowed",
      options: [
        {
          label: "Yes",
          value: "true"
        },
        {
          label: "No",
          value: "false"
        }
      ]
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
  id: "view-senderId",
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

Schema.edit = {
  id: "edit-senderId"
};

export default Schema;
