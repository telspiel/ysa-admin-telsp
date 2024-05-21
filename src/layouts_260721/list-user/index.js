import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";

const table = require("./../../partials/table.hbs");

// console.log("List User");

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}

const renderDetailedMis = (data) => {
  if (!Endpoints.validateResponse(data)) {
    return false;
  }
  const grid = (data.data || {}).listUserFormDataGrid || [];
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

  if ($.fn.dataTable.isDataTable('#misTable')) {
    $('#misTable').DataTable().destroy();
  }
  $('#misTable').DataTable({
    data: tableData,
    "columns": [
      { title: "User Name" },
      { title: "Password" },
      { title: "Contact Number"},
      { title: "Email Id"},
      { title: "Account Type"},
      { title: "Customer Type" },
      { title: "Created Date" },
      { title: "Expiry Date" },
      { title: "Status" },
      { title: "Available Credits" },
      { title: "User Account Type" },
      { title: "Provider" }
    ],
    "columnDefs": [
      {
        "targets": [4],
        "visible": false,
        "searchable": false
      }
    ]
  });

  const totalPageCount = (data.data || {}).totalPageCount || 0;

  console.log(data.data.listUserFormDataGrid.length);
  if(data.data.listUserFormDataGrid.length<10){
     $("#pageNext").hide();
  }
  else {
    var pageNumbers = data.data.totalPageCount;
    $("#pageNumber").val(pageNumbers);
    $("#pageNext").show();
  }
  if(data.data.totalPageCount==1){
      $("#pagePrev").hide();
  }
  else {
    $("#pagePrev").show();
  }
  // if (totalPageCount > pageNumber) {
  //   $("#pageNext").show();
  // } else {
  //   $("#pageNext").hide();
  // }
  //
  // if (pageNumber > 1) {
  //   $("#pagePrev").show();
  // } else {
  //   $("#pagePrev").hide();
  // }
}

const now = moment(new Date()).format("DD-MM-YYYY");

$(() => {
  $("#controls-form").submit(function (e) {
    e.preventDefault();

/*
    var rege = /^[0-9a-zA-Z]{6,6}$/;
    if (rege.test(this[0].value)) {
    } else {
      Alert.error("Sender ID must contain 6 characters, special characters are not allowed", {
        clearTime: 10 * 10 * 1000
      })
      return;
    }

    const data = {
      loggedInUserName: User.getName(),
      operation: "addSenderId",
      userId: "1",
      senderId: this[0].value,
    };
    Request(Endpoints.get("addSenderId"), "POST", data, {
      showMainLoader: true
    }).done(data => {
      Alert.success(data.message, {
        clearTime: 60 * 60 * 1000
      })
      if (data.code == 11002) {
        //	alert(data.message);
      } else {
        renderDetailedMis(data);
      }
    });
*/
  });

  // $("#pageNext").click(() => {
  //   console.log("working");
  //   const pageNumber = +($("#pageNumber").val());
  //   const totalPages = +($("#totalPages").val());
  //   if (pageNumber < totalPages) {
  //     $("#pageNumber").val(pageNumber + 1);
  //     $("#controls-form").submit();
  //   }
  // });
  // $("#pagePrev").click(() => {
  //   console.log("working");
  //   const pageNumber = +($("#pageNumber").val());
  //   if (pageNumber > 1) {
  //     $("#pageNumber").val(pageNumber - 1);
  //     $("#controls-form").submit();
  //   }
  // });
});

const data = {
  loggedInUserName: User.getName(),
  pageNumber:1
};
Request(Endpoints.get("listUser"), "POST", data).done(data => {
  if (Endpoints.validateResponse(data)) {
    renderDetailedMis(data);
    const source = (app.store.listUserFormDataGrid = data.data.listUserFormDataGrid.map(o => ({
      id: o.userName,
      name: o.userName
    })));
    $("#userName")
      .attr("autocomplete", "off")
      .typeahead({ source });
  }
});

// list user functionality

$("#pageNext").click(() => {
  var value = $("#pageNumber").val();
  var pageNextvalue = parseInt(value) + 1;
  $("#pageNumber").val(pageNextvalue);
  listUser();
});
$("#pagePrev").click(() => {
  var value = $("#pageNumber").val();
  var pageNumber = parseInt(value) -1;
  $("#pageNumber").val(pageNumber);

  listUser();
});

function listUser(){
  const data = {
    loggedInUserName: User.getName(),
    pageNumber:$("#pageNumber").val()
  };
  Request(Endpoints.get("listUser"), "POST", data).done(data => {
    if (Endpoints.validateResponse(data)) {
      renderDetailedMis(data);
      const source = (app.store.listUserFormDataGrid = data.data.listUserFormDataGrid.map(o => ({
        id: o.userName,
        name: o.userName
      })));
      $("#userName")
        .attr("autocomplete", "off")
        .typeahead({ source });
    }
  });
}
