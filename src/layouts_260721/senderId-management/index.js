import "./../../scripts/app";
import "./styles";

import Form from "./../../scripts/form";
import Schema from "./../../schema/senderId";
import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";

const table = require("./../../partials/table.hbs");

// ("Welcome to senderId management!");

// new Form(Schema).render("#add-senderId-form");

$("#cancelForm").click(() => {
  $("#add-senderId")[0].reset();
});


$(document).ready(function(){
  $('.select2').select2();
})
$("#add-senderId").submit(function (e) {
  e.preventDefault();
  var senderId=$("#senderId").val();
  console.log(senderId);
var  senderIdType=  $("input[name=senderIdType]:checked").val();
  var rege = /^(?=.*[a-zA-Z0-9])(?!^\d+$)[a-ziA-Z0-9]{6,6}$/;
  var numRegx = /^[0-9]{6,6}$/;
  console.log(senderIdType);
    if (senderIdType=="others") {
  if ((rege.test(senderId)) || numRegx.test(this[0].value)) {
  } else {
    $(".alert").alert('close');
      Alert.error("Sender ID must contain 6 alpha numeric characters, special characters are not allowed", {
        clearTime: 10 * 10 * 1000
          })
    return;
  }
}
else {
if(($.isNumeric(senderId))){
}
else {
  $(".alert").alert('close');
Alert.error("Sender ID must contain 6  numeric characters, special characters are not allowed", {
  clearTime: 10 * 10 * 1000
    })
return;
}
}
  const formData = {};

  $(this)
    .serializeArray()
    .forEach(i => {
      formData[i.name] = i.value;
    });
  // var userItem = userList.find(x => x.userName == $("#add .dropdown.userName").val());
  // formData['userId'] = userItem.userId;

  const additionalData = {
    loggedInUserName: User.getName(),
    operation: "addSenderId",
    entityId: $("#addentityid").val(),
    headerId: $("#headerid").val()
  };

  Request(
    Endpoints.get("saveSenderId"),
    "POST",
    $.extend({}, formData, additionalData)
  ).done(data => {
    if (Endpoints.validateResponse(data)) {
      // (data);
      $(".alert").alert('close');
      $("#add-senderId")[0].reset();
      data.message &&
        (data.result === "Success"
          ? Alert.success(data.message)
          : Alert.error(data.message));
    }
  });
});

var userList;
const data = {
  loggedInUserName: User.getName()
};

Request(Endpoints.get("getAllUserList"), "POST", data).done(data => {
  if (Endpoints.validateResponse(data)) {
    if (data.message) {
      $(".alert").alert('close');
      Alert.success(data.message, {
        clearTime: 5 * 1000
      })
    }
    const allChildMap = data.data.userList;
    const rList = allChildMap;
    userList = allChildMap;
    // var rData = [];
    var selectField = document.getElementById("userName");
    $.each(rList, function (key, value) {
      selectField.options[selectField.options.length] = new Option(value.userName, value.userId);
    });
/*
    $.each(rList, function (key, value) {
      rData.push({ "id": value.userId, "name": value.userName, "ignore": false });
    });

    // (rData);
    $('.userName').autocomplete({
      nameProperty: 'name',
      valueField: '#hidden-field',
      dataSource: rData
    });
*/
  }
});

$("#approve-senderId-tab").click(() => {
  const data = {
    loggedInUserName: User.getName(),
    isApprovedSenderIdList: "Y"
  };

  Request(Endpoints.get("getAllSenderIdsForUser"), "POST", data).done(data => {
    if (Endpoints.validateResponse(data)) {
      if (data.message) {
        $(".alert").alert('close');
        Alert.success(data.message, {
          clearTime: 5 * 1000
        })
      }

      const grid = (data.data || {}).senderIdList || [];
      const getHeading = (key) => {
        let result = key.replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1);
      }
      const headerRow = grid[0];
      let tableHeader = [];
      let formattedTableHeader = [];
      for (let key in headerRow) {
        if (headerRow.hasOwnProperty(key)) {
          tableHeader.push(key);
          formattedTableHeader.push(getHeading(key));
        }
      }

      const tableData = grid.map(row => {
        var rowData = [];
        tableHeader.forEach((key) => {
          rowData.push(row[key] || "-")
        });
        return rowData;
      });

      if ($.fn.dataTable.isDataTable('#senderIDTable')) {
        $('#senderIDTable').DataTable().destroy();
      }
      var table = $('#senderIDTable').DataTable({
        data: tableData,
        // colReorder: {
        //     order: [ 0,5,6,1,2,3,7,8,9]
        // },
        "columns": [
          { title: "senderId" },
          { title: "status" },
          { title: "is Default" },
          { title: "is NonDndNumberAllowed" },
          { title: "userName" },
          { title: "idOfSenderId" },
          { title: "Entity Id" },
          { title: "Header Id" },
          { title: "Sender Id Type" },
          { title: "action" }
        ],
        "columnDefs": [
          {
            "targets": [5],
            "visible": false,
            "searchable": false
          },
          {
            "targets": -1,
            "data": null,
            "defaultContent": "<button class='btn btn-info'> <i class='fa fa-pencil' aria-hidden='true'></i> Edit</button>"
          }],
        paging: false
      });

      $('#senderIDTable tbody').on('click', 'button', function () {

        var table = $('#senderIDTable').DataTable();
      var data = table.row($(this).parents('tr')).data();
    //  var data = table.row( this ).data();
        $('#myModal').modal('show');
        console.log(data);
         // console.log( table.row( this ).data() );
        // console.log(data);
         $(".editSenderId #senderId").html(data[0]);
        $(".editSenderId #userName").html(data[4]);
        $("#idOfSenderId").html(data[5]);
        if (data[6] != "-") {
          $(".editSenderId #updateEntityid").val(data[6]);
        }
        else {
          $(".editSenderId #updateEntityid").val("");
        }
        if (data[7] != "-") {
          $(".editSenderId #updateHeaderid").val(data[7]);
        }
        else {
          $(".editSenderId #updateHeaderid").val("");
        }
        // $(".editSenderId");
      });

    }
  });
});

$('#update').on('click', function () {
  const additionalData = {
    loggedInUserName: User.getName(),
    operation: "updateSenderId",
    "senderId": $(".editSenderId #senderId").html(),
    "isDefault": $("#isDefault").val(),
    "isNonDndNumberAllowed": $("#isNonDndNumberAllowed").val(),
    "isActive": $("#isActive").val(),
    "idOfSenderId": parseInt($("#idOfSenderId").html()),
    entityId: $("#updateEntityid").val(),
    headerId: $("#updateHeaderid").val()
  };

  Request(
    Endpoints.get("saveSenderId"),
    "POST",
    $.extend({}, additionalData)
  ).done(data => {
    if (Endpoints.validateResponse(data)) {
      $(".alert").alert('close');
      data.message &&
        (data.result === "Success"
          ? Alert.success(data.message)
          : Alert.error(data.message));
      $("#approve-senderId-tab").trigger("click");
    }
  });

});

$("#pending-senderId-tab").click(() => {
  loadPendingSenderId();
});

function loadPendingSenderId() {
  const data = {
    loggedInUserName: User.getName(),
    isApprovedSenderIdList: "N"
  };

  Request(Endpoints.get("getAllSenderIdsForUser"), "POST", data).done(data => {
    if (Endpoints.validateResponse(data)) {
      if (data.message) {
    $(".alert").alert('close');
        Alert.success(data.message, {
          clearTime: 5 * 1000
        })
      }

      const grid = (data.data || {}).senderIdList || [];
      const getHeading = (key) => {
        let result = key.replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1);
      }
      const headerRow = grid[0];
      let tableHeader = [];
      let formattedTableHeader = [];
      for (let key in headerRow) {
        if (headerRow.hasOwnProperty(key)) {
          tableHeader.push(key);
          formattedTableHeader.push(getHeading(key));
        }
      }

      const tableData = grid.map(row => {
        var rowData = [];
        tableHeader.forEach((key) => {
          rowData.push(row[key] || "-")
        });
        return rowData;
      });

      if ($.fn.dataTable.isDataTable('#pendingApprovalTable')) {
        $('#pendingApprovalTable').DataTable().destroy();
      }
      var table = $('#pendingApprovalTable').DataTable({
        data: tableData,
        "columns": [
          { title: "senderId" },
          { title: "status" },
          { title: "is Default" },
          { title: "is NonDndNumberAllowed" },
          { title: "userName" },
          { title: "idOfSenderId" },
          { title: "action" }
        ],
        "columnDefs": [
          {
            "targets": [5],
            "visible": false,
            "searchable": false
          },
          {
            "targets": -1,
            "data": null,
            "defaultContent": "<button class='btn btn-info'> <i class='fa fa-check' aria-hidden='true'></i> Approve</button>"
          }],
        paging: false
      });

      $('#pendingApprovalTable tbody').on('click', 'button', function () {
        var table = $('#pendingApprovalTable').DataTable();
        var data = table.row($(this).parents('tr')).data();
  $(".alert").alert('close');
        const additionalData = {
          loggedInUserName: User.getName(),
          operation: "updateSenderId",
          "senderId": data[0],
          "isDefault": data[2],
          "entityId":data[6],
          "headerId":data[7],
          "isNonDndNumberAllowed": data[3],
          "isActive": "Y",
          "idOfSenderId": data[5]
        };

        Request(
          Endpoints.get("saveSenderId"),
          "POST", additionalData
        ).done(data => {
          if (Endpoints.validateResponse(data)) {
            loadPendingSenderId();
            $(".alert").alert('close');
            data.message &&
              (data.result === "Success"
                ? Alert.success(data.message)
                : Alert.error(data.message));
          }
        });

      });

    }
  });
}
