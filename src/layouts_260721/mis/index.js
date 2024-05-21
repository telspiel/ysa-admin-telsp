import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";
import Cookie from "./../../scripts/cookie";
const table = require("./../../partials/table.hbs");

// console.log("MIS!");

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}
$(document).ready(function () {
  $('.select2').select2();
});
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
  $('#misTable').DataTable({
    data: tableData,
    "columns": [
      { title: "Receive Date" },
      { title: "Message Id" },
      { title: "Mobile Number" },
      { title: "Sent Date" },
      { title: "Sender Id" },
      { title: "Delivery Status" },
      { title: "Delivery Error Code" },
      { title: "Delivery DateTime" },
      { title: "Message Text" },
      { title: "Message Count" }
    ]
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

    var data = getFormData($(this).serializeArray());

    var dpCount = 0;
    var mobileNumber = $("#mobileNumber").val();
    var From_date = new Date($("#from").val());
    var To_date = new Date($("#to").val());
    var start = new Date(From_date);
    var end = new Date(To_date);
    var diff = new Date(end - start);
    var days = diff / 1000 / 60 / 60 / 24;
    // console.log(Math.round(days));
    var DateValidation = Math.round(days);
    for (var k in data) {
      if (k == "adminName" || k == "resellerName" || k == "sellerName" || k == "clientName") {
        dpCount++;
      }
    }
    if (dpCount > 1) {
      $(".alert").alert('close');
      Alert.error("Please select only one from the dropdown", {
        clearTime: 10 * 1000
      })
      return;
    } else if (dpCount == 0) {
      $(".alert").alert('close');
      Alert.error("Please select any one from the dropdown", {
        clearTime: 10 * 1000
      })
      return;
    }
    // else if (mobileNumber.length == 0) {
    //   Alert.error("Please Enter Mobile Number", {
    //     clearTime: 10 * 1000
    //   })
    //   return;
    // }
    else if (DateValidation > 7) {
      $(".alert").alert('close');
      Alert.error("You can select max 7 days in date range", {
        clearTime: 10 * 1000
      })
      return;
    }

    data['loggedInUserName'] = User.getName();
    data['pageNumber'] = 1;
    if (mobileNumber > 0) {
      data['mobileNumber'] = "91" + mobileNumber;
    }
    else {
        data['mobileNumber'] = "";
    }

    // console.log(getFormData($(this).serializeArray()));
    Request(Endpoints.get("detailedMis"), "POST", data, {
      showMainLoader: true
    }).done(data1 => {
      $(".alert").alert('close');
      Alert.success(data1.message, {
        clearTime: 10 * 1000
      })
      if (data1.code == 11002) {
        //	alert(data.message);
      } else {
        renderDetailedMis(data1);
        $("#pageNumber").val(1);
        var donwloadlink = data1.data.downloadReportLink;
        if (donwloadlink != null) {
          $("#donwloadFileButton").html(donwloadlink);
          getDownloadableFile();
          $("#donwloadFileButton").removeClass("d-none");
        } else {
          $("#donwloadFileButton").addClass("d-none");
        }
      }
    });

  });
  $("#pageNext").click(() => {
    const pageNumber = +($("#pageNumber").val());
    const totalPages = +($("#totalPages").val());
    if (pageNumber < totalPages) {
      $("#pageNumber").val(pageNumber + 1);
      // $("#controls-form").submit();
      detailMisReport();
    }
  });
  $("#pagePrev").click(() => {
    const pageNumber = +($("#pageNumber").val());
    if (pageNumber > 1) {
      $("#pageNumber").val(pageNumber - 1);
      // $("#controls-form").submit();
      detailMisReport();
    }
  });
});

function getFormData(unindexed_array) {
  // var unindexed_array = $form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function (n, i) {
    if (n['value'] != "") {
      indexed_array[n['name']] = n['value'];
    }
  });

  return indexed_array;
}

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

const getUserData = {
  "loggedInUserName": User.getName()
};

var adminSelect = document.getElementById("adminName");
var resellerSelect = document.getElementById("resellerName");
var sellerSelect = document.getElementById("sellerName");
var clientSelect = document.getElementById("clientName");

Request(Endpoints.get("getAllUsers"), "POST", getUserData).done(data => {
  const aList = data.data.adminList;
  if (aList.length === 0) {
    $(".adminName").addClass('d-none');
  }
  $.each(aList, function (key, value) {
    adminSelect.options[adminSelect.options.length] = new Option(value, value);
  });

  const rList = data.data.resellerList;
  if (rList.length === 0) {
    $(".resellerName").addClass('d-none');
  }
  $.each(rList, function (key, value) {
    resellerSelect.options[resellerSelect.options.length] = new Option(value, value);
  });

  const sList = data.data.sellerList;
  if (sList.length == 0) {
    $(".sellerName").addClass('d-none');
  }
  $.each(sList, function (key, value) {
    sellerSelect.options[sellerSelect.options.length] = new Option(value, value);
  });

  const cList = data.data.clientList;
  if (cList.length == 0) {
    $(".clientName").addClass('d-none');
  }
  $.each(cList, function (key, value) {
    clientSelect.options[clientSelect.options.length] = new Option(value, value);
  });
});

// dropdown change
$("#controls-form .dropdown").on('change', function () {
        var value = this.value;
        let withValue = false;
        if(value && !withValue){
          withValue = true;
        $(this).addClass('active');
         var name=$(this).attr('name');
         $("#controls-form .dropdown").not('.active').select2('destroy').val("").select2();
         $("#controls-form ."+name).val(value);
         $(this).removeClass('active');
}
});

function detailMisReport(){
    var mobileNumber = $("#mobileNumber").val();
    var data = getFormData($('#controls-form').serializeArray());
  var From_date = new Date($("#from").val());
  var To_date = new Date($("#to").val());
  var start = new Date(From_date);
  var end = new Date(To_date);
  var diff = new Date(end - start);
  var days = diff / 1000 / 60 / 60 / 24;
  // console.log(Math.round(days));
  var DateValidation = Math.round(days);
   if (DateValidation > 7) {
    $(".alert").alert('close');
    Alert.error("You can select max 7 days in date range", {
      clearTime: 10 * 1000
    })
    return;
  }
  data['loggedInUserName'] = User.getName();
  data['pageNumber'] = $("#pageNumber").val();
  if (mobileNumber > 0) {
    data['mobileNumber'] = "91" + mobileNumber;
  }
  else {
      data['mobileNumber'] = "";
  }

  // console.log(getFormData($(this).serializeArray()));
  Request(Endpoints.get("detailedMis"), "POST", data, {
    showMainLoader: true
  }).done(data1 => {
    $(".alert").alert('close');
    Alert.success(data1.message, {
      clearTime: 10 * 1000
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
      } else {
        $("#donwloadFileButton").addClass("d-none");
      }
    }
  });
}
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
        a.download =  User.getName()+"-"+dTime+"-detailedReport.csv";
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
