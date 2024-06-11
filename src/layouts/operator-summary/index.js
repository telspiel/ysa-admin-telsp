import "./../../scripts/app";
import "./styles";

import Form from "./../../scripts/form";
import Schema from "./../../schema/senderId";
import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";
import Cookie from "./../../scripts/cookie";
const table = require("./../../partials/table.hbs");

console.log("Welcome to Operator Summary");

// new Form(Schema).render("#add-senderId-form");

// $(() => {
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

$('.datepicker').val(date);

$('#from').datetimepicker({
  format: 'Y-m-d',
  timepicker: false,
  closeOnDateSelect: true
}).attr('readonly', 'readonly');

$('#to').datetimepicker({
  format: 'Y-m-d',
  timepicker: false,
  closeOnDateSelect: true
}).attr('readonly', 'readonly');


$("#connect-summary-tab").click(() => {
  loadConnectSummary();
});

$("#senderId-traffic-tab").click(() => {

  const data1 = {
    loggedInUsername: User.getName(),
    "fromDate": date,
    "toDate": date
  };

  loadSenderIdTraffic(data1);
});

$("#controls-form").submit(function (e) {
  e.preventDefault();

  const data = {
    loggedInUsername: User.getName(),
    fromDate: this[0].value,
    toDate: this[1].value,
  };
  loadSenderIdTraffic(data);

});

$("#todayTableHeader").click(function () {
  $(this).toggleClass("active");
  $(".todayTableDisplay").toggleClass("d-none");
});

$("#yesterDayTableHeader").click(function () {
  $(this).toggleClass("active");
  $(".yesterDayTableDisplay").toggleClass("d-none");
});

$("#currentMonthTableHeader").click(function () {
  $(this).toggleClass("active");
  $(".currentMonthTableDisplay").toggleClass("d-none");
});

$("#lastMonthTableHeader").click(function () {
  $(this).toggleClass("active");
  $(".lastMonthTableDisplay").toggleClass("d-none");
});

const data = {
  loggedInUsername: User.getName(),
  receiveDate: date
};

loadConnectSummary();

function loadConnectSummary() {
  Request(Endpoints.get("connectSummary"), "POST", data, {
    showMainLoader: true
  }).done(data => {
    if (Endpoints.validateResponse(data)) {
      if (data.message) {
        $(".alert").alert('close');
        Alert.success(data.message, {
          clearTime: 5 * 1000
        })
      }

      const todayData = (data.data || {}).todayDataGrid || [];
      const getHeading = (key) => {
        let result = key.replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1);
      }
      const headerRow = todayData[0];
      let tableHeader = [];
      let formattedTableHeader = [];
      for (let key in headerRow) {
        if (headerRow.hasOwnProperty(key)) {
          tableHeader.push(key);
          formattedTableHeader.push(getHeading(key));
        }
      }

      var todayTableData = todayData.map(row => {
        var rowData = [];
        tableHeader.forEach((key) => {
          rowData.push(row[key] || "-")
        });
        return rowData;
      });

      const yesterdayData = (data.data || {}).previousDayDataGrid || [];
      var yesterdayTableData = yesterdayData.map(row => {
        var rowData = [];
        tableHeader.forEach((key) => {
          rowData.push(row[key] || "-")
        });
        return rowData;
      });

      const currentMonthData = (data.data || {}).currentMonthDataGrid || [];
      var currentMonthTableData = currentMonthData.map(row => {
        var rowData = [];
        tableHeader.forEach((key) => {
          rowData.push(row[key] || "-")
        });
        return rowData;
      });

      const lastMonthData = (data.data || {}).previousMonthDataGrid || [];
      var lastMonthTableData = lastMonthData.map(row => {
        var rowData = [];
        tableHeader.forEach((key) => {
          rowData.push(row[key] || "-")
        });
        return rowData;
      });

      $("#downloadTodayReport").html(data.data.downloadTodayReport);
      $("#downloadPreviousDayReport").html(data.data.downloadPreviousDayReport);
      $("#currentMonthTableDownload").html(data.data.downloadCurrentMonthReport);
      $("#downloadPreviousMonthReport").html(data.data.downloadPreviousMonthReport);
      if (data.data.downloadTodayReport) {
        $("#downloadTodayReport").addClass("btn btn-primary float-right");
        getDownloadableFiles("downloadTodayReport");
      }
      if (data.data.downloadPreviousDayReport) {
        $("#downloadPreviousDayReport").addClass("btn btn-primary float-right");
        getDownloadableFiles("downloadPreviousDayReport");
      }
      if (data.data.downloadCurrentMonthReport) {
        $("#currentMonthTableDownload").addClass("btn btn-primary float-right");
        getDownloadableFiles("currentMonthTableDownload");
      }
      if (data.data.downloadPreviousMonthReport) {
        $("#downloadPreviousMonthReport").addClass("btn btn-primary float-right");
        getDownloadableFiles("downloadPreviousMonthReport");
      }

      renderTable("todaysTable", todayTableData);
      renderTable("yesterDayTable", yesterdayTableData);
      renderTable("currentMonthTable", currentMonthTableData);
      renderTable("lastMonthTable", lastMonthTableData);
    }
  });
}

function loadSenderIdTraffic(data1) {

  Request(Endpoints.get("connectSenderIdSummary"), "POST", data1, {
    showMainLoader: true
  }).done(data => {
    if (Endpoints.validateResponse(data)) {
      $("#displayDownloadBtn").html(data.data.downloadReportLink);
          getDownloadableFile();
      $("#displayDownloadBtn #summary_donwload").addClass("btn btn-info");
      if (data.message) {
        $(".alert").alert('close');
        Alert.success(data.message, {
          clearTime: 5 * 1000
        })
      }

      const todayData = (data.data || {}).senderIdDataGrid || [];
      const getHeading = (key) => {
        let result = key.replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1);
      }
      const headerRow = todayData[0];
      let tableHeader = [];
      let formattedTableHeader = [];
      for (let key in headerRow) {
        if (headerRow.hasOwnProperty(key)) {
          tableHeader.push(key);
          formattedTableHeader.push(getHeading(key));
        }
      }

      var senderIdData = todayData.map(row => {
        var rowData = [];
        tableHeader.forEach((key) => {
          rowData.push(row[key] || "-")
        });
        return rowData;
      });

      renderSenderIDTable("senderIdTable", senderIdData);
    }
  });
}

function renderTable(id, tableData) {

  if ($.fn.dataTable.isDataTable("#" + id)) {
    $("#" + id).DataTable().destroy();
  }
  var totalRow = tableData[tableData.length - 1];
  var index = tableData.indexOf(totalRow);
  tableData.splice(index, 1);
  var table = $("#" + id).DataTable({
    data: tableData,
    "columns": [
      { title: "date" },
      { title: "Connect Name" },
      { title: "Total Submit" },
      { title: "Delivered" },
      { title: "Failed" },
      { title: "Total DN" },
      { title: "Delvery %" },
      { title: "Total DN %" }
    ],
    paging: false,
    searching: false,
    "bPaginate": false,
    "bLengthChange": false,
    "bFilter": true,
    "bInfo": false,
    "bAutoWidth": false,
    "footerCallback": function (row, data, start, end, display) {
      var api = this.api(), data;
      // https://datatables.net/examples/advanced_init/footer_callback.html
      $(api.column(2).footer()).html(totalRow[2]);
      $(api.column(3).footer()).html(totalRow[3]);
      $(api.column(4).footer()).html(totalRow[4]);
      $(api.column(5).footer()).html(totalRow[5]);
      $(api.column(6).footer()).html(totalRow[6]);
      $(api.column(7).footer()).html(totalRow[7]);
    }
  });
}


function renderSenderIDTable(id, tableData) {

  if ($.fn.dataTable.isDataTable("#" + id)) {
    $("#" + id).DataTable().destroy();
  }
  var totalRow = tableData[tableData.length - 1];
  var index = tableData.indexOf(totalRow);
  tableData.splice(index, 1);
  var table = $("#" + id).DataTable({
    data: tableData,
    "columns": [
      { title: "receiveDate" },
      { title: "userName" },
      { title: "connectName" },
      { title: "senderId" },
      { title: "totalSubmit" },
      { title: "delivered" },
      { title: "failed" }
    ],
    'columnDefs': [
      { "className": "dt-center", "targets": "_all" }
    ],
    paging: false,
    searching: false,
    "bPaginate": false,
    "bLengthChange": false,
    "bFilter": true,
    "bInfo": false,
    "bAutoWidth": false,
    "footerCallback": function (row, data, start, end, display) {
      var api = this.api(), data;
      // https://datatables.net/examples/advanced_init/footer_callback.html
      $(api.column(4).footer()).html(totalRow[4]);
      $(api.column(5).footer()).html(totalRow[5]);
      $(api.column(6).footer()).html(totalRow[6]);
    }
  });
}
function getDownloadableFile() {
  $('#displayDownloadBtn').on('click', 'a', function (e) {
    e.preventDefault();
    console.log(this.getAttribute('href'));
    // Use XMLHttpRequest instead of Jquery $ajax
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      var a;
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        // Trick for making downloadable link
        a = document.createElement('a');
        a.href = window.URL.createObjectURL(xhttp.response);
        // Give filename you wish to download
        const dTime = moment(new Date()).format("DDMMYYYY-HHmm");
        a.download =  User.getName()+"-"+dTime+"-operatorSummary.csv";
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
      }
    };
    // Post data to URL which handles post request
    xhttp.open("GET", this.getAttribute('href'));
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    xhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
    xhttp.setRequestHeader("Authorization", Cookie.get("resellerJWT"));
    // You should set responseType as blob for binary responses
    xhttp.responseType = 'blob';
    xhttp.send();
    exit();
  });
}
function getDownloadableFiles(id) {
  $('#'+id).on('click', 'a', function (e) {
    e.preventDefault();
    console.log(this.getAttribute('href'));
    // Use XMLHttpRequest instead of Jquery $ajax
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      var a;
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        // Trick for making downloadable link
        a = document.createElement('a');
        a.href = window.URL.createObjectURL(xhttp.response);
        // Give filename you wish to download
        const dTime = moment(new Date()).format("DDMMYYYY-HHmm");
        a.download =  User.getName()+"-"+dTime+"-operatorSummary.csv";
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
      }
    };
    // Post data to URL which handles post request
    xhttp.open("GET", this.getAttribute('href'));
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    xhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
    xhttp.setRequestHeader("Authorization", Cookie.get("resellerJWT"));
    // You should set responseType as blob for binary responses
    xhttp.responseType = 'blob';
    xhttp.send();
    exit();
  });
}
