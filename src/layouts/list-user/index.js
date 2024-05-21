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
  };
  console.log(grid);

  const headerRow = grid[0];
  let tableHeader = [];
  let formattedTableHeader = [];
  for (let key in headerRow) {
    if (headerRow.hasOwnProperty(key)) {
      tableHeader.push(key);
      formattedTableHeader.push(getHeading(key));
    }
  }
  const tableData = grid.map((row) => {
    var rowData = [];
    tableHeader.forEach((key) => {
      rowData.push(row[key] || "-");
    });
    return rowData;
  });

  console.log(tableData);

  if ($.fn.dataTable.isDataTable("#misTable")) {
    $("#misTable").DataTable().destroy();
  }
  $("#misTable").DataTable({
    data: tableData,
    searching: false,
    columns: [
      { title: "User Name" },
      { title: "Password" },
      { title: "Contact Number" },
      { title: "Email Id" },
      { title: "Account Type" },
      { title: "Customer Type" },
      { title: "Created Date" },
      { title: "Expiry Date" },
      { title: "Status" },
      { title: "Available Credits" },
      { title: "User Account Type" },
      { title: "Provider" },
    ],
    columnDefs: [
      {
        targets: [4],
        visible: false,
        searchable: false,
      },
    ],
  });

  //To download list user table data in cvs and xlsx format

  // document.getElementById("downloadBtn").addEventListener("click", function () {
  //   // Convert table data to desired format (CSV or XLSX)
  //   var table = document.getElementById("misTable");
  //   var tableData = new Array();
  //   for (var i = 0, row; (row = table.rows[i]); i++) {
  //     var rowData = new Array();
  //     for (var j = 0, col; (col = row.cells[j]); j++) {
  //       rowData.push(col.textContent.trim());
  //     }
  //     tableData.push(rowData.join(","));
  //   }
  //   // Convert to CSV or XLSX using SheetJS
  //   var wb = XLSX.utils.book_new();
  //   wb.SheetNames.push("Table Data");
  //   var wsData = XLSX.utils.aoa_to_sheet(
  //     tableData.map((row) => row.split(","))
  //   );
  //   wb.Sheets["Table Data"] = wsData;
  //   var wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  //   // Trigger download
  //   saveAs(
  //     new Blob([wbout], { type: "application/octet-stream" }),
  //     "table_data.xlsx"
  //   );
  // });

  const totalPageCount = (data.data || {}).totalPageCount || 0;

  console.log(data.data.listUserFormDataGrid.length);
  if (data.data.listUserFormDataGrid.length < 10) {
    $("#pageNext").hide();
  } else {
    var pageNumbers = data.data.totalPageCount;
    $("#pageNumber").val(pageNumbers);
    $("#pageNext").show();
  }
  if (data.data.totalPageCount == 1) {
    $("#pagePrev").hide();
  } else {
    $("#pagePrev").show();
  }
};

const now = moment(new Date()).format("DD-MM-YYYY");

$(() => {
  $("#controls-form").submit(function (e) {
    e.preventDefault();

    const data = {
      loggedInUserName: User.getName(),
      userName: $("." + this[0].value).val(),
      pageNumber: 1,
    };

    Request(Endpoints.get("searchExternalUser"), "POST", data, {
      showMainLoader: true,
    }).done((data) => {
      Alert.success(data.message, {
        clearTime: 10 * 60 * 1000,
      });
      renderDetailedMis(data);
    });
  });

  $("#resetBtn").click(function (e) {
    e.preventDefault();
    $("#controls-form")[0].reset();

    $("#view-external-user .adminNameDiv").addClass("d-none");
    $("#view-external-user .clientNameDiv").addClass("d-none");
    $("#view-external-user .sellerNameDiv").addClass("d-none");
    $("#view-external-user .resellerNameDiv").addClass("d-none");

    listUser();
  });
});

const data = {
  loggedInUserName: User.getName(),
  pageNumber: 1,
};

Request(Endpoints.get("listUser"), "POST", data).done((data) => {
  if (Endpoints.validateResponse(data)) {
    renderDetailedMis(data);
    const source = (app.store.listUserFormDataGrid =
      data.data.listUserFormDataGrid.map((o) => ({
        id: o.userName,
        name: o.userName,
      })));
    $("#userName").attr("autocomplete", "off").typeahead({ source });
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
  var pageNumber = parseInt(value) - 1;
  $("#pageNumber").val(pageNumber);

  listUser();
});

function listUser() {
  const data = {
    loggedInUserName: User.getName(),
    pageNumber: $("#pageNumber").val(),
  };
  Request(Endpoints.get("listUser"), "POST", data).done((data) => {
    if (Endpoints.validateResponse(data)) {
      renderDetailedMis(data);
      const source = (app.store.listUserFormDataGrid =
        data.data.listUserFormDataGrid.map((o) => ({
          id: o.userName,
          name: o.userName,
        })));
      $("#userName").attr("autocomplete", "off").typeahead({ source });
    }
  });
}

$("#view-external-user .dropdown").on("change", function () {
  var value = this.value;

  switch (value) {
    case "adminName": {
      $("#view-external-user .adminNameDiv").removeClass("d-none");
      $("#view-external-user .clientNameDiv").addClass("d-none");
      $("#view-external-user .sellerNameDiv").addClass("d-none");
      $("#view-external-user .resellerNameDiv").addClass("d-none");
      break;
    }

    case "resellerName": {
      $("#view-external-user .adminNameDiv").addClass("d-none");
      $("#view-external-user .clientNameDiv").addClass("d-none");
      $("#view-external-user .sellerNameDiv").addClass("d-none");
      $("#view-external-user .resellerNameDiv").removeClass("d-none");
      break;
    }

    case "clientName": {
      $("#view-external-user .adminNameDiv").addClass("d-none");
      $("#view-external-user .clientNameDiv").removeClass("d-none");
      $("#view-external-user .sellerNameDiv").addClass("d-none");
      $("#view-external-user .resellerNameDiv").addClass("d-none");
      break;
    }
  }
});

loadallUserDropdown();

function loadallUserDropdown() {
  const getUserData = {
    loggedInUsername: User.getName(),
    userId: User.getUserid(),
  };

  var userSelect = document.querySelector("#view-external-user .userType");
  var adminSelect = document.querySelector("#view-external-user .adminName");
  var resellerSelect = document.querySelector(
    "#view-external-user .resellerName"
  );
  var sellerName = document.querySelector(
    "#view-external-user .sellerNameDiv .sellerName"
  );
  var clientName = document.querySelector("#view-external-user .clientName");

  Request(Endpoints.get("getAllChildForUser"), "POST", getUserData, {
    showMainLoader: true,
  }).done((data) => {
    if (data.message) {
      $(".alert").alert("close");
      Alert.success(data.message, {
        clearTime: 5 * 1000,
      });
    }

    const userTypes = Object.keys(data.data.userAllChildMap);
    console.log(userTypes);
    // $.each(aList, function (key, value) {
    //   userSelect.options[adminSelect.options.length] = new Option(key, key);
    // });
    userSelect.options.length = 1;

    const allChildMap = data.data.userAllChildMap;
    const aList = allChildMap.ADMIN;
    var countKey = Object.keys(aList).length;
    if (countKey === 0) {
      $(".adminNameDiv").addClass("d-none");
    } else {
      userSelect.options[userSelect.options.length] = new Option(
        "Admin",
        "adminName"
      );
    }
    adminSelect.options.length = 1;
    $.each(aList, function (key, value) {
      adminSelect.options[adminSelect.options.length] = new Option(key, key);
    });

    const rList = allChildMap.RESELLER;
    var countKey = Object.keys(rList).length;
    if (countKey === 0) {
      $(".resellerNameDiv").addClass("d-none");
    } else {
      userSelect.options[userSelect.options.length] = new Option(
        "Reseller",
        "resellerName"
      );
    }
    resellerSelect.options.length = 1;
    $.each(rList, function (key, value) {
      resellerSelect.options[resellerSelect.options.length] = new Option(
        key,
        key
      );
    });

    const sList = allChildMap.SELLER;
    var countKey = Object.keys(sList).length;
    if (countKey == 0) {
      $(".sellerNameDiv").addClass("d-none");
    } else {
      userSelect.options[userSelect.options.length] = new Option(
        "Seller",
        "sellerName"
      );
    }
    sellerName.options.length = 1;
    $.each(sList, function (key, value) {
      sellerName.options[sellerName.options.length] = new Option(key, key);
    });

    const cList = allChildMap.CLIENT;
    var countKey = Object.keys(cList).length;
    if (countKey == 0) {
      $(".clientNameDiv").addClass("d-none");
    } else {
      userSelect.options[userSelect.options.length] = new Option(
        "Client",
        "clientName"
      );
    }
    clientName.options.length = 1;
    $.each(cList, function (key, value) {
      clientName.options[clientName.options.length] = new Option(key, key);
    });
  });
}
