import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";

const table = require("./../../partials/table.hbs");

// console.log("Add Logo");

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}

$(document).ready(function () {
  $('.select2').select2();
});


var circleList = null;
var operatorList = null;
var senderIdList = null;
var groupList = null;

loadRoutes("view-routing-form");
loadCircles();
loadOperators();
loadSenderID();
loadGroups();



function loadRoutes(containerID) {
    var adminSelect = document.querySelector("#" + containerID + " .adminName");
    var resellerSelect = document.querySelector("#" + containerID + " .resellerName");
    var sellerSelect = document.querySelector("#" + containerID + " .sellerName");
    var clientSelect = document.querySelector("#" + containerID + " .clientName");
  
    const getUserData = {
      "loggedInUsername": User.getName(),
      "userId": User.getUserid()
      // "userRole":"admin",// optional
    };
  
    Request(Endpoints.get("getAllChildForUser"), "POST", getUserData, {
      showMainLoader: true
    }).done(data => {
      if (data.message) {
        $(".alert").alert('close');
        Alert.success(data.message, {
          clearTime: 5 * 1000
        })
      }
      const allChildMap = data.data.userAllChildMap;
      const aList = allChildMap.ADMIN;
      // console.log("<0></0>");
      var countKey = Object.keys(aList).length;
    if (countKey === 0) {
      $(".adminNameDiv").addClass('d-none');
    }
    else{
      $(".adminNameDiv").removeClass('d-none');
    }
      adminSelect.options.length = 1;
      $.each(aList, function (key, value) {
        adminSelect.options[adminSelect.options.length] = new Option(key, value);
      });
      const rList = allChildMap.RESELLER;
      var countKey2 = Object.keys(rList).length;
      // console.log("rList " + countKey);
      if (countKey2 === 0) {
        $(".resellerNameDiv").addClass('d-none');
      } else {
        $(".resellerNameDiv").removeClass('d-none');
      }
      resellerSelect.options.length = 1;
      // resellerSelect.options[resellerSelect.options.length] = new Option("All", "0");
      $.each(rList, function (key, value) {
        resellerSelect.options[resellerSelect.options.length] = new Option(key, value);
      });
  
      const sList = allChildMap.SELLER;
      var countKey3 = Object.keys(sList).length;
      if (countKey3 == 0) {
        $(".sellerNameDiv").addClass('d-none');
      }
      else {
        $(".sellerNameDiv").removeClass('d-none');
      }
      sellerSelect.options.length = 1;
      // sellerSelect.options[sellerSelect.options.length] = new Option("All", "0");
      $.each(sList, function (key, value) {
        sellerSelect.options[sellerSelect.options.length] = new Option(key, value);
      });
  
      const cList = allChildMap.CLIENT;
      var countKey4 = Object.keys(cList).length;
      if (countKey4 == 0) {
        $(".clientNameDiv").addClass('d-none');
      } else {
        $(".clientNameDiv").removeClass('d-none');
      }
      clientSelect.options.length = 1;
      // clientSelect.options[clientSelect.options.length] = new Option("All", "0");
      $.each(cList, function (key, value) {
        clientSelect.options[clientSelect.options.length] = new Option(key, value);
      });
    });
  
  }

  $(".dropdown.adminName").on('change', function () {
    dropdownChange("view-routing-form", this.value, "admin");
  });
  
  $(".dropdown.resellerName").on('change', function () {
    dropdownChange("view-routing-form", this.value, "reseller");
  });
  
  $(".dropdown.sellerName").on('change', function () {
    dropdownChange("view-routing-form", this.value, "seller");
  });




  function dropdownChange(containerID, value, parent) {
    // const containerID = "view-routing-form";
    var adminSelect = document.querySelector("#" + containerID + " .adminName");
    var resellerSelect = document.querySelector("#" + containerID + " .resellerName");
    var sellerSelect = document.querySelector("#" + containerID + " .sellerName");
    var clientSelect = document.querySelector("#" + containerID + " .clientName");
  
    if (value == 0) {
      return null;
    }
  
    // const userRole = $(this).attr("data-name");
    const getUserData = {
      "loggedInUsername": User.getName(),
      "userId": value,
      // "userRole": $(this).attr("data-name"),// optional
    };
  
    Request(Endpoints.get("getAllChildForUser"), "POST", getUserData, {
      showMainLoader: true
    }).done(data => {
      if (data.message) {
        $(".alert").alert('close');
        Alert.success(data.message, {
          clearTime: 5 * 1000
        });
      }
  
      const allData = data.data.userAllChildMap;
      const rList = allData.RESELLER;
      const sList = allData.SELLER;
      const cList = allData.CLIENT;
  
      // var countKey = Object.keys(rList).length;
      // if (countKey === 0) {
      //   $("#view-routing-form .resellerNameDiv").addClass('d-none');
      // }
      // else{
      //   $("#view-routing-form .resellerNameDiv").removeClass('d-none');
      // }
  
      if (parent === "admin" || parent === null) {
        if (Object.keys(rList).length != 0) {
          resellerSelect.options.length = 1;
          // resellerSelect.options[resellerSelect.options.length] = new Option("All", "0");
          $.each(rList, function (key, value) {
            resellerSelect.options[resellerSelect.options.length] = new Option(key, value);
          });
        } else {
          resellerSelect.options.length = 1;
        }
  
        if (Object.keys(sList).length == 0) {
          sellerSelect.options.length = 1;
        }
  
        if (Object.keys(cList).length == 0) {
          clientSelect.options.length = 1;
        }
      }
  
  
      // var countKey = Object.keys(sList).length;
      // console.log("sList " + countKey);
      // if (countKey === 0) {
      //   $("#view-routing-form .sellerNameDiv").addClass('d-none');
      // }
      // else{
      //   $("#view-routing-form .sellerNameDiv").removeClass('d-none');
      // }
      if (parent === "admin" || parent === "reseller" || parent === null) {
        if (Object.keys(sList).length != 0) {
          sellerSelect.options.length = 1;
          // sellerSelect.options[sellerSelect.options.length] = new Option("All", "0");
          $.each(sList, function (key, value) {
            sellerSelect.options[sellerSelect.options.length] = new Option(key, value);
          });
        } else {
          sellerSelect.options.length = 1;
        }
  
        if (Object.keys(cList).length == 0) {
          clientSelect.options.length = 1;
        }
      }
  
  
      // var countKey = Object.keys(cList).length;
  
      // if (countKey === 0) {
      //   $("#view-routing-form .clientNameDiv").addClass('d-none');
      // }
      // else{
      //   $("#view-routing-form .clientNameDiv").removeClass('d-none');
      // }
      if (parent === "admin" || parent === "seller" || parent === null) {
  
        if (Object.keys(cList).length != 0) {
          clientSelect.options.length = 1;
          // clientSelect.options[clientSelect.options.length] = new Option("All", "0");
          $.each(cList, function (key, value) {
            clientSelect.options[clientSelect.options.length] = new Option(key, value);
          });
        } else {
          clientSelect.options.length = 1;
        }
      }
    });
  }

  $("#resetButton").on('click', function () {
    dropdownChange("view-routing-form", User.getUserid());
  });

  function populateTable(data) {
    Request(Endpoints.get("getAllRoutingForUser"), "POST", data, {
      showMainLoader: true
    }).done(data => {
      if (data.message) {
        $(".alert").alert('close');
        Alert.success(data.message, {
          clearTime: 5 * 1000
        })
      }
  
      const grid = (data.data || {}).userRoutingDataList || [];
  
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
      formattedTableHeader.push("Action");
  
      let tabData = grid.map(row => {
        var rowData = [];
        tableHeader.forEach((key) => {
          rowData.push(row[key] || "-")
        });
        return rowData;
      });
  
      const transRouting = (data.data || {}).transRoutingDataList || [];
      const promoRouting = (data.data || {}).promoRoutingDataList || [];
      const transPromoDndRouting = (data.data || {}).transPromoDndRoutingDataList || [];
      const transPromoNonDndRouting = (data.data || {}).transPromoNonDndRoutingDataList || [];
  
      $("#routingTableView").html(table({
        id: "routingTable",
        formattedTableHeader: formattedTableHeader,
        // tableData: tabData,
        transRoutingData: transRouting,
        transPromoDndRoutingData: transPromoDndRouting,
        transPromoNonDndRoutingData: transPromoNonDndRouting,
        promoRoutingData: promoRouting
      })).promise().done(function () {
        $('[data-toggle="toggle"]').change(function () {
          $(this).parents().next('.hide').toggle();
          $(this).parents('.routingTh').toggleClass("toggle");
        });
  
        $("#routingTable").find('tr.routingRow').each(function (i, el) {
          var $tds = $(this).find('td'),
            circleId = $tds.eq(0).text(),
            operatorId = $tds.eq(1).text(),
            senderId = $tds.eq(2).text(),
            groupId = $tds.eq(3).text();
          $tds.eq(0).attr("data-id", circleList[circleId]);
          $tds.eq(1).attr("data-id", operatorList[operatorId]);
          $tds.eq(2).attr("data-id", senderIdList[senderId]);
          $tds.eq(3).attr("data-id", groupList[groupId]);
        });
  
        updateEditDeleteEvent();
        $(".saveRouting").click(function (e) {
          var rType = $(this).closest('button').attr("name");
          var reqData = [];
          // console.log(rType);
          $("#routingTable").find('tr.' + rType).each(function (i, el) {
            // console.log("entry point");
            let row = {};
            var $tds = $(this).find('td'),
              circleId = $tds.eq(0).data("id"),
              operatorId = $tds.eq(1).data("id"),
              senderId = $tds.eq(2).data("id"),
              groupId = $tds.eq(3).data("id");
            row["circleId"] = circleId;
            row["operatorId"] = operatorId;
            row["senderId"] = senderId;
            row["groupId"] = groupId;
            reqData.push(row);
          });
          // console.log(reqData);
  
          const getUserData = {
            loggedInUsername: User.getName(),
            adminId: $(".adminName").val(),
            resellerId: $(".resellerName").val(),
            idOfsenderId: $(".sellerName").val(),
            clientId: $(".clientName").val(),
            routingType: rType,
            userRoutingDataList: reqData
          };
  
          Request(Endpoints.get("updateRoutingForUser"), "POST", getUserData, {
            showMainLoader: true
          }).done(data => {
            // console.log(data);
            if (data.message) {
              $(".alert").alert('close');
              Alert.success(data.message, {
                clearTime: 5 * 1000
              });
            }
          });
  
        });
      });
    });
    // console.log(data);
  }

  const data = {
    loggedInUsername: User.getName(),
    resellerId: "",
    sellerId: "",
    clientId: "",
  };
  populateTable(data);

  $("#btnSubmit").click(function (e) {
    const data = {
      loggedInUsername: User.getName(),
      resellerId: $(".adminName").val(),
      resellerId: $(".resellerName").val(),
      sellerId: $(".sellerName").val(),
      clientId: $(".clientName").val(),
    };
    populateTable(data);
  });


  function loadCircles() {
    var circleSelect = document.querySelector(".circle");
    const data = {
      loggedInUsername: User.getName()
    };
    Request(Endpoints.get("getAllCircleList"), "POST", data, {
      showMainLoader: true
    }).done(data => {
      if (Endpoints.validateResponse(data)) {
        circleList = data.data.circleAndIdMap;
        circleSelect.options.length = 1;
        circleSelect.options[circleSelect.options.length] = new Option("All", "0");
        $.each(circleList, function (key, value) {
          circleSelect.options[circleSelect.options.length] = new Option(key, value);
          // circleSelect.options[circleSelect.options.length] = new Option(key, key);
        });
      }
      (data);
    });
  };
  
  function loadOperators() {
    var operatorSelect = document.querySelector(".operator");
    const data = {
      loggedInUsername: User.getName()
    };
    Request(Endpoints.get("getAllOperatorList"), "POST", data, {
      showMainLoader: true
    }).done(data => {
      if (Endpoints.validateResponse(data)) {
        operatorList = data.data.operatorAndIdMap;
        operatorSelect.options.length = 1;
        operatorSelect.options[operatorSelect.options.length] = new Option("All", "0");
        $.each(operatorList, function (key, value) {
          operatorSelect.options[operatorSelect.options.length] = new Option(key, value);
          // operatorSelect.options[operatorSelect.options.length] = new Option(key, key);
        });
      }
      (data);
    });
  };
  
  
  function loadSenderID() {
    var senderIDSelect = document.querySelector(".senderId");
    const data = {
      loggedInUsername: User.getName()
    };
    Request(Endpoints.get("getUserSenderIdList"), "POST", data, {
      showMainLoader: true
    }).done(data => {
      if (Endpoints.validateResponse(data)) {
        senderIdList = data.data.userSenderIdMap;
        senderIDSelect.options.length = 1;
        senderIDSelect.options[senderIDSelect.options.length] = new Option("All", "0");
        $.each(senderIdList, function (key, value) {
          senderIDSelect.options[senderIDSelect.options.length] = new Option(key, value);
          // senderIDSelect.options[senderIDSelect.options.length] = new Option(key, key);
        });
      }
      // (data);
    });
  };
  
  
  function loadGroups() {
    var groupSelect = document.querySelector(".group");
    const data = {
      loggedInUsername: User.getName()
    };
    Request(Endpoints.get("getUserRoutingGroups"), "POST", data, {
      showMainLoader: true
    }).done(data => {
      if (Endpoints.validateResponse(data)) {
        groupList = data.data.userGroupAndGroupIdMap;
        groupSelect.options.length = 1;
        // groupSelect.options[groupSelect.options.length] = new Option("All", "0");
        $.each(groupList, function (key, value) {
          groupSelect.options[groupSelect.options.length] = new Option(key, value);
          // groupSelect.options[groupSelect.options.length] = new Option(key, key);
        });
      }
      // (data);
    });
  };

  $('#myModal').on('hidden.bs.modal', function (e) {
    // do something...
    // console.log("on hide");
    // $("#routingTable").find("tr.editRow").remove();
  });

  function updateEditDeleteEvent() {
    $(".deleteRow").click(function (e) {
      $(this).closest('tr').remove();
    });
  
    $(".editModal").click(function (e) {
      var rType = $(this).closest('button').attr("name");
      // console.log(rType);
      $("#routingTypeData").html(rType);
      $('#myModal').modal('show');
  
      $(this).closest('tr').addClass("editRow");
  
      var $tds = $(this).closest('tr').find('td');
      // console.log($(this).closest('tr').find('td:first-child').text());
  
      // $("#circleLabel1").html($tds.eq(1).text());
      // $("#operatorLabel1").html($tds.eq(2).text());
      // $("#senderIdLabel1").html($tds.eq(3).text());
      // $("#groupLabel1").html($tds.eq(4).text());
  
      $("#circle option").filter(function () {
        return this.text == $tds.eq(0).text();
      }).attr('selected', true);
  
      $("#operator option").filter(function () {
        return this.text == $tds.eq(1).text();
      }).attr('selected', true);
  
      $("#senderId option").filter(function () {
        return this.text == $tds.eq(2).text();
      }).attr('selected', true);
  
      $("#group option").filter(function () {
        return this.text == $tds.eq(3).text();
      }).attr('selected', true);
  
    });
  
    $(".addModal").click(function (e) {
      var rType = $(this).closest('button').attr("name");
      // console.log(rType);
      $("#routingTypeData").html(rType);
      $('#myModal').modal('show');
      $("#circleLabel").html("");
      $("#operatorLabel").html("");
      $("#senderIdLabel").html("");
      $("#groupLabel").html("");
    });
  
  
  }

  $('#update').on('click', function () {

    // $("#routingTable").find("tr.editRow").remove();
    // console.log($("#routingTable").find("tr.editRow").length);
  
    var editrowCount = $("#routingTable").find("tr.editRow").length;
    if (parseInt(editrowCount) === 1) {
      // console.log("return");
      $("#routingTable").find("tr.editRow").remove();
    }
    // console.log("no return");
    // var myTable = $('#example1').DataTable();
    var transLength = $('#routingTable').find('tr.TRANS').length;
    var promoLength = $('#routingTable').find('tr.PROMO').length;
    var transPromoDndLength = $('#routingTable').find('tr.TRANS_PROMO_DND').length;
    var transPromoNonDndLength = $('#routingTable').find('tr.TRANS_PROMO_NON_DND').length;
    var rType = $("#routingTypeData").html();
    var i = 0;
    // console.log(rType);
    if (rType == "TRANS") {
      i = transLength;
    } else if (rType == "PROMO") {
      i = (parseInt(transLength) + parseInt(promoLength) + 1);
    } else if (rType == "TRANS_PROMO_DND") {
      i = (parseInt(transLength) + parseInt(promoLength) + parseInt(transPromoDndLength) + 2);
    } else if (rType == "TRANS_PROMO_NON_DND") {
      i = (parseInt(transLength) + parseInt(promoLength) + parseInt(transPromoDndLength) + parseInt(transPromoNonDndLength) + 3);
    }
    // console.log(i);
    // console.log($("#circle").children("option:selected").text());
    var html = "<tr class=" + $("#routingTypeData").html() + ">" +
      //    "<td>" + $("#routingTypeData").html() + "</td>" +
      "<td data-id=" + $("#circle").val() + ">" + $("#circle").children("option:selected").text() + "</td>" +
      "<td data-id=" + $("#operator").val() + ">" + $("#operator").children("option:selected").text() + "</td>" +
      "<td data-id=" + $("#senderId").val() + ">" + $("#senderId").children("option:selected").text() + "</td>" +
      "<td data-id=" + $("#group").val() + ">" + $("#group").children("option:selected").text() + "</td>" +
      '<td><a data-toggle="modal" class="btn btn-outline-primary btn-sm editModal" href="#myModal">' +
      '<i class="fa fa-pencil"></i>' +
      '</a> &nbsp;&nbsp;&nbsp;' +
      '<button type="button" class="btn btn-outline-danger btn-sm deleteRow">' +
      '<i class="fa fa-trash"></i>' +
      '</button>' +
      "</td>";
    $('#routingTable > tbody > tr').eq(i).after(html).promise().done(function () {
      updateEditDeleteEvent();
    });
  
  });