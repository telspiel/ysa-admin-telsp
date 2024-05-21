import "./../../scripts/app";
import "./styles";

import Form from "./../../scripts/form";
import Schema from "./../../schema/credits";
import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";
const table = require("./../../partials/table.hbs");

// console.log("Welcome to credits management!");

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}
$(".nav-item").click(() => {
  $("#nav-tabContent .dropdown")
    .not(".active")
    .select2("destroy")
    .val("")
    .select2();
  $("#deduct-credits")[0].reset();
  $("#add-credit")[0].reset();
  $("#view-credits")[0].reset();
});
$(document).ready(function () {
  $(".select2").select2();
});
var userAccessArr = User.getUserPrivilage().split(",");
$.each(userAccessArr, function (index, value) {
  console.log(value);
  if (value == "SHOW_CREDIT_HISTORY_PAGE") {
    $("#view-credits-history").removeClass("d-none");
  }
});

const renderDetailedMis = (data) => {
  if (!Endpoints.validateResponse(data)) {
    return false;
  }
  const grid = (data.data || {}).grid || [];
  const getHeading = (key) => {
    let result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };
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

  if ($.fn.dataTable.isDataTable("#misTable")) {
    $("#misTable").DataTable().destroy();
  }
  $("#misTable").DataTable({
    data: tableData,
    columns: [
      { title: "Created Date" },
      { title: "Credit" },
      { title: "Status" },
      { title: "Updated Credit" },
      { title: "Updated By" },
      { title: "Comment" },
    ],
    order: [[0, "desc"]],
  });

  //To download credit history table data in cvs and xlsx format

  // document
  //   .getElementById("downloadBtn")
  //   .addEventListener("click", function downloadTable() {
  //     // Convert table data to desired format (CSV or XLSX)
  //     var table = document.getElementById("misTable");
  //     var tableData = new Array();
  //     for (var i = 0, row; (row = table.rows[i]); i++) {
  //       var rowData = new Array();
  //       for (var j = 0, col; (col = row.cells[j]); j++) {
  //         rowData.push(col.textContent.trim());
  //       }
  //       tableData.push(rowData.join(","));
  //     }
  //     // Convert to CSV or XLSX using SheetJS
  //     var wb = XLSX.utils.book_new();
  //     wb.SheetNames.push("Table Data");
  //     var wsData = XLSX.utils.aoa_to_sheet(
  //       tableData.map((row) => row.split(","))
  //     );
  //     wb.Sheets["Table Data"] = wsData;
  //     var wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  //     // Trigger download
  //     saveAs(
  //       new Blob([wbout], { type: "application/octet-stream" }),
  //       "table_data.xlsx"
  //     );
  //     // Remove event listener after the download is triggered
  //     document
  //       .getElementById("downloadBtn")
  //       .removeEventListener("click", downloadTable);
  //   });

  const totalPageCount = (data.data || {}).totalPageCount || 0;
  $("#totalPages").val(totalPageCount);

  const pageNumber = +$("#pageNumber").val();
  if (totalPageCount > pageNumber) {
    $("#pageNext").show();
  } else {
    $("#pageNext").hide();
  }

  if (pageNumber > 1) {
    $("#pagePrev").show();
  } else {
    $("#pagePrev").hide();
  }
};

// new Form(Schema).render("#add-credits-form");

// $("#cancelForm").click(() => {
//   $("#add-credit")[0].reset();
// });

$("#add-credit").submit(function (e) {
  e.preventDefault();
  var data = getFormData($("#add-credit").serializeArray());
  const additionalData = {
    loggedInUserName: User.getName(),
    operation: "addCredit",
  };
  Request(
    Endpoints.get("updateCredit"),
    "POST",
    $.extend({}, data, additionalData)
  ).done((data) => {
    if (Endpoints.validateResponse(data)) {
      // console.log(data);
      $("#add-credit")[0].reset();
      $(".alert").alert("close");
      data.message &&
        (data.result === "Success"
          ? Alert.success(data.message)
          : Alert.error(data.message));
    }
  });
});

$("#deduct-credits").submit(function (e) {
  e.preventDefault();
  var data = getFormData($("#deduct-credits").serializeArray());
  const additionalData = {
    loggedInUserName: User.getName(),
    operation: "deductCredit",
  };
  Request(
    Endpoints.get("updateCredit"),
    "POST",
    $.extend({}, data, additionalData)
  ).done((data) => {
    if (Endpoints.validateResponse(data)) {
      // console.log(data);
      $("#deduct-credits")[0].reset();
      data.message &&
        (data.result === "Success"
          ? Alert.success(data.message)
          : Alert.error(data.message));
    }
  });
});

$("#deduct-credits-tab").click(() => {
  // new Form(Schema.view).render("#view-credits-form");
  loadDropdowns("deduct-credits");
});

$("#view-credits-tab").click(() => {
  // new Form(Schema.view).render("#view-credits-form");
  loadDropdowns("view-credits");
});

$("#view-credits .dropdown").on("change", function () {
  var value = this.value;
  let withValue = false;
  var selected = this.value;
  if (value && !withValue) {
    withValue = true;
    $(this).addClass("active");
    var name = $(this).attr("name");
    $("#view-credits .dropdown")
      .not(".active")
      .select2("destroy")
      .val("")
      .select2();
    $("." + name).val(value);
    $(this).removeClass("active");
  }

  if (this.value) {
    var data = getFormData($("#view-credits").serializeArray());
    data["loggedInUserName"] = User.getName();
    Request(Endpoints.get("viewCredit"), "POST", data).done((data) => {
      if (Endpoints.validateResponse(data)) {
        if (data.result === "Success") {
          var result = data.data.userCredit;
          $.each(result, function (key, val) {
            $("#view-credits ." + key).val(val);
          });
        } else {
          Alert.error(selected + " : " + data.message);
          $("#view-credits")[0].reset();
        }
      }
    });
  }
});

$("#deduct-credits .dropdown").on("change", function () {
  var value = this.value;
  let withValue = false;
  var selected = this.value;
  if (value && !withValue) {
    withValue = true;
    $(this).addClass("active");
    var name = $(this).attr("name");
    $("#deduct-credits .dropdown")
      .not(".active")
      .select2("destroy")
      .val("")
      .select2();
    $("." + name).val(value);
    $(this).removeClass("active");
  }
  if (this.value) {
    var data = getFormData($("#deduct-credits").serializeArray());
    data["loggedInUserName"] = User.getName();
    Request(Endpoints.get("viewCredit"), "POST", data).done((data) => {
      if (Endpoints.validateResponse(data)) {
        if (data.result === "Success") {
          var result = data.data.userCredit;
          $.each(result, function (key, val) {
            $("#deduct-credits ." + key).val(val);
          });
        } else {
          Alert.error(selected + " : " + data.message);
          $("#deduct-credits")[0].reset();
        }
      }
    });
  }
});

$(function () {
  loadDropdowns("add-credit");
  $("#add-credit .dropdown").on("change", function () {
    var value = this.value;
    let withValue = false;
    var selected = this.value;
    if (value && !withValue) {
      withValue = true;
      $(this).addClass("active");
      var name = $(this).attr("name");
      $("#add-credit .dropdown")
        .not(".active")
        .select2("destroy")
        .val("")
        .select2();
      $("." + name).val(value);
      $(this).removeClass("active");
    }
    if (this.value) {
      var data = getFormData($("#add-credit").serializeArray());
      data["loggedInUserName"] = User.getName();
      Request(Endpoints.get("viewCredit"), "POST", data).done((data) => {
        if (Endpoints.validateResponse(data)) {
          if (data.result === "Success") {
            var result = data.data.userCredit;
            $.each(result, function (key, val) {
              $("#add-credit ." + key).val(val);
            });
          } else {
            Alert.error(selected + " : " + data.message);
            $("#add-credit")[0].reset();
          }
        }
      });
    }
  });
});
$(function () {
  loadDropdowns("credit-history");
  $("#credit-history .dropdown").on("change", function () {
    var value = this.value;
    let withValue = false;
    var selected = this.value;
    if (value && !withValue) {
      withValue = true;
      $(this).addClass("active");
      var name = $(this).attr("name");
      $("#credit-history .dropdown")
        .not(".active")
        .select2("destroy")
        .val("")
        .select2();
      $("." + name).val(value);
      $(this).removeClass("active");
    }
    if (this.value) {
      var data = getFormData($("#credit-history").serializeArray());
      data["loggedInUserName"] = User.getName();
      Request(Endpoints.get("viewCredit"), "POST", data).done((data) => {
        if (Endpoints.validateResponse(data)) {
          if (data.result === "Success") {
            var result = data.data.userCredit;
            $.each(result, function (key, val) {
              $("#credit-history ." + key).val(val);
            });
          } else {
            Alert.error(selected + " : " + data.message);
            $("#credit-history")[0].reset();
          }
        }
      });
    }
  });
});
$("#add-credit").on("reset", function (e) {
  // $(".dropdown").prop('disabled', false);
});

function loadDropdowns(containerID) {
  // $(".dropdown").prop('disabled', false);

  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const getUserData = {
    loggedInUserName: User.getName(),
  };

  var adminSelect = document.querySelector("#" + containerID + " .adminName");
  var resellerSelect = document.querySelector(
    "#" + containerID + " .resellerName"
  );
  var sellerSelect = document.querySelector("#" + containerID + " .sellerName");
  var clientSelect = document.querySelector("#" + containerID + " .clientName");

  Request(Endpoints.get("getAllUsers"), "POST", getUserData).done((data) => {
    const aList = data.data.adminList;
    if (aList.length === 0) {
      $(".adminNameDiv").addClass("d-none");
    }
    adminSelect.options.length = 1;
    $.each(aList, function (key, value) {
      adminSelect.options[adminSelect.options.length] = new Option(
        value,
        value
      );
    });

    const rList = data.data.resellerList;
    if (rList.length === 0) {
      $(".resellerNameDiv").addClass("d-none");
    }
    resellerSelect.options.length = 1;
    $.each(rList, function (key, value) {
      resellerSelect.options[resellerSelect.options.length] = new Option(
        value,
        value
      );
    });

    const sList = data.data.sellerList;
    if (sList.length == 0) {
      $(".sellerNameDiv").addClass("d-none");
    }
    sellerSelect.options.length = 1;
    $.each(sList, function (key, value) {
      sellerSelect.options[sellerSelect.options.length] = new Option(
        value,
        value
      );
    });

    const cList = data.data.clientList;
    if (cList.length == 0) {
      $(".clientNameDiv").addClass("d-none");
    }
    clientSelect.options.length = 1;
    $.each(cList, function (key, value) {
      clientSelect.options[clientSelect.options.length] = new Option(
        value,
        value
      );
    });
  });
}

function getFormData(unindexed_array) {
  // var unindexed_array = $form.serializeArray();
  var indexed_array = {};
  $.map(unindexed_array, function (n, i) {
    if (n["value"] != "") {
      // if (n['value'] !== "" || n['value'] !== null) {
      indexed_array[n["name"]] = n["value"];
    }
  });
  return indexed_array;
}

const now = moment(new Date()).format("YYYY-MM-DD");
$(() => {
  $(".datepicker").val(now);
  $("#from").datetimepicker({
    format: "Y-m-d",
    timepicker: false,
  });

  $("#to").datetimepicker({
    format: "Y-m-d",
    timepicker: false,
  });
});
$("#credit-history").submit(function (e) {
  e.preventDefault();
  var data = getFormData($("#credit-history").serializeArray());
  const additionalData = {
    loggedInUserName: User.getName(),
  };
  Request(
    Endpoints.get("getCreditHistory"),
    "POST",
    $.extend({}, additionalData, data)
  ).done((data) => {
    renderDetailedMis(data);
  });
});
$("#view-credits-history").click(function () {
  const data = {
    loggedInUserName: User.getName(),
    fromDate: $("#from").val(),
    toDate: $("#to").val(),
  };
  Request(Endpoints.get("getCreditHistory"), "POST", data).done((data) => {
    renderDetailedMis(data);
  });
});
