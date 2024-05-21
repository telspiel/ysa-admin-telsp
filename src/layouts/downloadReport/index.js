import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";
import Cookie from "./../../scripts/cookie";
const table = require("./../../partials/table.hbs");

console.log("Welcome to detailed mis!");

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}
$(document).ready(function () {
  $('.select2').select2();
});
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
$("#fromDate,#toDate").datetimepicker({
  timepicker: false,
  maxDate: '0',
  // dateFormat: 'yyyy-mm-dd',
  dateFormat:'dd-mm-yyyy',
  value: '12.03.2013',
  // format: 'Y-m-d',
  format :'d-m-Y',
  closeOnDateSelect: true
}).attr('readonly', 'readonly');

const renderDetailedMis = (data) => {
  if (!Endpoints.validateResponse(data)) {
    return false;
  }
  const grid = (data.data || {}).grid || [];
  // grid.reverse();
  const getHeading = (key) => {
    let result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
  const headerRow = grid[0];
  let tableHeader = ["id"];
  let formattedTableHeader = [];
  for (let key in headerRow) {
    if (headerRow.hasOwnProperty(key)) {
      tableHeader.push(key);
      formattedTableHeader.push(getHeading(key));
    }
  }
  for (let g in grid) {
    let a = grid[g];
    a['id'] = g;
  }

  // console.log(grid);
  const tableData = grid.map(row => {
    var rowData = [];
    tableHeader.forEach((key) => {
      var url = key;
      // if (url.charAt(0) === '"' && url.charAt(url.length - 1) === '"') {
      //   console.log(url.substr(1, url.length - 2));
      // }
      rowData.push(row[url] || "-")
    });
    return rowData;
  });

  //  $("#misTable").html(table({ formattedTableHeader, tableData }));
  // var td = tableData.reverse();
  if ($.fn.dataTable.isDataTable('#misTable')) {
    $('#misTable').DataTable().destroy();
  }

  $('#misTable').DataTable({
    data: tableData,
    bPaginate: false,
    order: [[0, "desc"]],
    "columns": [
      { title: "id" },
      { title: "From Date" },
      { title: "To Date" },
      { title: "Status" },
      { title: "Download Report Link" }
    ],
    "columnDefs": [
      {
        "targets": [0],
        "visible": false,
        "searchable": false
      }
    ]
  });
  $('#misTable tbody').on('click', 'a', function (e) {

    e.preventDefault();

    getDownloadableFile(this.getAttribute('href'));

    // console.log(this.getAttribute('href'));
    //   Request(this.getAttribute('href'), "GET").done(resData => {
    //   });
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

const now = moment(new Date()).format("DD-MM-YYYY");
$(function () {
  $("#controls-form .dropdown").on('change', function () {
    var value = this.value;
     var name=$(this).attr('name');
         $('#controls-form .dropdown').prop('selectedIndex',0);
          $("."+name).val(value);
    if (this.value) {
      const data = {
        username:User.getName(),
      };
      data[name] = value;
      Request(Endpoints.get("downloadReport"), "POST", data).done(data => {
        renderDetailedMis(data);
$(".alert").alert('close');
        data.message &&
          (data.result === "Success"
            ? Alert.success(data.message, {
              clearTime: 10 * 1000
            })
            : Alert.error(data.message, {
              clearTime: 10 * 1000
            }));

      });
    }
  });
});
$(() => {

  $("#controls-form").submit(function (e) {
    e.preventDefault();
    var data = getFormData($(this).serializeArray());
      var dpCount = 0;
    for (var k in data) {
      if (k == "adminName" || k == "resellerName" || k == "sellerName" || k == "clientName") {
        dpCount++;
        console.log(dpCount);
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
    // const data = {
    //   username: User.getName(),
    //   fromDate: $("#fromDate").val(),
    //   toDate: $("#toDate").val(),
    //   mobileNumber: this[2].value,
    //   pageNumber: +this[3].value,
    // };
    data['username'] = User.getName();
    data['fromDate'] = $("#fromDate").val();
    data['toDate'] = $("#toDate").val();
    Request(Endpoints.get("generateReport"), "POST", data, {
      showMainLoader: true
    }).done(data => {
      renderDetailedMis(data);
$(".alert").alert('close');
      data.message &&
        (data.result === "Success"
          ? Alert.success(data.message, {
            clearTime: 10 * 1000
          })
          : Alert.error(data.message, {
            clearTime: 10 * 1000
          }));

    });
    // call report
    Request(Endpoints.get("downloadReport"), "POST", data).done(data => {
      renderDetailedMis(data);
$(".alert").alert('close');
      data.message &&
        (data.result === "Success"
          ? Alert.success(data.message, {
            clearTime: 10 * 1000
          })
          : Alert.error(data.message, {
            clearTime: 10 * 1000
          }));

    }); 
    // end code 
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

const data = {
  username: User.getName(),
  fromDate: now,
  toDate: now,
  mobileNumber: "",
  pageNumber: 1
};
Request(Endpoints.get("downloadReport"), "POST", data).done(data => {
  renderDetailedMis(data);
$(".alert").alert('close');
  data.message &&
    (data.result === "Success"
      ? Alert.success(data.message, {
        clearTime: 10 * 1000
      })
      : Alert.error(data.message, {
        clearTime: 10 * 1000
      }));

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
const getUserData = {
  "loggedInUserName": User.getName()
};
var adminSelect = document.getElementById("adminName");
var resellerSelect = document.getElementById("resellerName");
var sellerSelect = document.getElementById("sellerName");
var clientSelect = document.getElementById("clientName");

Request(Endpoints.get("getAllUsers"), "POST", getUserData).done(data => {
  console.log(data);
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
function getDownloadableFile(url) {
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
        a.download =  User.getName()+"-"+dTime+".zip";
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
      }
    };
    // Post data to URL which handles post request
    xhttp.open("GET", url);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    xhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
    xhttp.setRequestHeader("Authorization", Cookie.get("resellerJWT"));
    // You should set responseType as blob for binary responses
    xhttp.responseType = 'blob';
    xhttp.send();
    exit();
}
