import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";
import Cookie from "./../../scripts/cookie";
const table = require("./../../partials/table.hbs");

// console.log("Summary Report");

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}

const renderDetailedMis = (data) => {
  if (!Endpoints.validateResponse(data)) {
    return false;
  }
  const grid = (data.data || {}).grid || [];
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
  var searchTable = $('#misTable').DataTable({
    data: tableData,
    "columns": [
      { title: "User Name" },
      { title: "Summary Date" },
      { title: "Total Request" },
      { title: "Total Rejected" },
      { title: "Total Submit" },
      { title: "Total Delivered" },
      { title: "Total Failed" },
      { title: "Total Awaited" }
    ],
    paging: false,
    // https://datatables.net/examples/advanced_init/footer_callback.html
    "footerCallback": function (row, data, start, end, display) {
      var api = this.api(), data;

      // Remove the formatting to get integer data for summation
      var intVal = function (i) {
        return typeof i === 'string' ?
          i.replace(/[\$,]/g, '') * 1 :
          typeof i === 'number' ?
            i : 0;
      };

      var columnCount = 7;
      for (let i = 2; i <= columnCount; i++) {

        // Total over this page
        var pageTotal = api
          .column(i, { page: 'current' })
          .data()
          .reduce(function (a, b) {
            return intVal(a) + intVal(b);
          }, 0);

        // Update footer
        $(api.column(i).footer()).html(pageTotal);
$(".Total").text("Total");
$('tfoot td').css("font-weight", "bold");
$('.Total').css("text-align", "center")
      }
    }
  });

  const totalPageCount = (data.data || {}).totalPageCount || 0;
  $("#totalPages").val(totalPageCount);

  const pageNumber = +($("#pageNumber").val());
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
}

$(() => {
  // $(".datepicker").datepicker({
  //   maxDate:0,
  //   mask:true,
  //   format:'Y-m-d'
  // });
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

  $("#controls-form").submit(function (e) {
    e.preventDefault();

    // console.log($(this).serializeArray());
    const data = {
      loggedInUserName: User.getName(),
      fromDate: this[0].value,
      toDate: this[1].value,
    };
    Request(Endpoints.get("userSummaryReport"), "POST", data, {
      showMainLoader: true
    }).done(data1 => {
      $(".alert").alert('close');
      Alert.success(data1.message, {
        clearTime: 60 * 60 * 1000
      })
      if (data1.code == 11002) {
        //	alert(data.message);
      } else {
        renderDetailedMis(data1);
        var donwloadlink = data1.data.downloadReportLink;
        if (donwloadlink != null) {
          $("#donwloadFileButton").html(donwloadlink);
          getDownloadableFile();
          $("#donwloadFileButton").removeClass("d-none");
          // $(document).ready(function () {
          //   $("tfoot td").html("");
          //   $('#misTable thead th').each(function (i) {
          //     // calculateColumn(i);
          //   });
          // });
        } else {
          $("#donwloadFileButton").addClass("d-none");
          $("tfoot td").html("");
        }
      }
    });

  });
  $("#pageNext").click(() => {
    const pageNumber = +($("#pageNumber").val());
    const totalPages = +($("#totalPages").val());
    if (pageNumber < totalPages) {
      $("#pageNumber").val(pageNumber + 1);
      $("#controls-form").submit();
    }
  });
  $("#pagePrev").click(() => {
    const pageNumber = +($("#pageNumber").val());
    if (pageNumber > 1) {
      $("#pageNumber").val(pageNumber - 1);
      $("#controls-form").submit();
    }
  });
});

// function calculateColumn(index) {
//   var total = 0;
//   $('#misTable tbody tr').each(function () {
//     var value = parseInt($('td', this).eq(index).text());
//     if (!isNaN(value)) {
//       total += value;
//     }
//   });
//   if (index == 1) {
//     $('tfoot td:nth-child(2)').css("display", "none");
//   }
//   else {
//     $('tfoot td').eq(index).text(total);
//     $('tfoot td:first-child').eq(index).text("Total");
//     $('tfoot td').css("font-weight", "bold");
//     $('#total').attr('colspan', 2);
//     $('#total').css("text-align", "center")
//   }
//
// }

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
const data1 = {
  "loggedInUserName": User.getName(),
  "fromDate": date,
  "toDate": date
};

Request(Endpoints.get("userSummaryReport"), "POST", data1).done(data => {
  renderDetailedMis(data);
  var donwloadlink = data.data.downloadReportLink;
  if (donwloadlink != null) {
    $("#donwloadFileButton").html(donwloadlink);
    getDownloadableFile();
    $("#donwloadFileButton").removeClass("d-none");
    $(document).ready(function () {
      $("tfoot td").html("");
      $('#misTable thead th').each(function (i) {
        // calculateColumn(i);
      });
    });
  } else {
    $("#donwloadFileButton").addClass("d-none");
    $("tfoot td").html("");
  }
});
function getDownloadableFile() {
  $('#donwloadFileButton').on('click', 'a', function (e) {
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
        a.download =  User.getName()+"-"+dTime+"-userSummaryReport.csv";
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
