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

var globalKernalList = null;
loadConnects();

$("#viewConnects").click(() => {
  loadConnects();
});

$("#editConnects").click(() => {
  getConnects();
  $('#kernalPart').addClass('d-none');
  $('.updateKennals .kennalRow').not(':first').remove();
});

$("#updateKernal").submit((e) => {
  e.preventDefault();
  var form = $("#updateKernal").serializeArray()
  var data = getFormData(form);
  var sum = 0;

  Object.keys(data).forEach(function (key) {
    // console.log(key + ': ' + data[key]);
    sum += parseInt(data[key]);
  });

  if (sum != 100) {
    $(".alert").alert('close');
    Alert.error("Total of distribution should be equal to 100", {
      clearTime: 5 * 100
    });
    return;
  }

  const additionalData = {
    loggedInUsername: User.getName(),
    groupId: $("#groupSelect").val(),
    kannelList: data
  };
  Request(Endpoints.get("updatedKennalGroupMap"), "POST", additionalData, {
    showMainLoader: true
  }).done(data => {
    if (data.message) {
      $(".alert").alert('close');
      Alert.success(data.message, {
        clearTime: 5 * 1000
      });

      $("#updateKernal")[0].reset();
      loadConnects();

    }
  });
})
function loadConnects() {

  const getUserData = {
    "loggedInUsername": User.getName()
  };

  Request(Endpoints.get("viewRoutingGroups"), "POST", getUserData, {
    showMainLoader: true
  }).done(data => {
    // if (Endpoints.validateResponse(data)) {
    // console.log(data);
    var kernalList = data.data.groupKannelLoadMap;
    globalKernalList = kernalList;
    var html = "";
    // console.log(kernalList);
    // console.log(kernalList.Airtel_trans);
    // console.log(Object.keys(kernalList));
    for (let kernal of Object.keys(kernalList)) {
      var kernalItem = kernalList[kernal];
      html += "<li><a href='#'>" + kernal + "</a><table>";
      for (let k of Object.keys(kernalItem)) {
        html += "<tr><td><span class='keranlName'>" + k + "</span> </td><td class='keranlIcon'><i class='fa fa-long-arrow-right' aria-hidden='true'></i> </td><td> <span class='kernalPercentage'>" + kernalItem[k] + "%</span></td></tr>";
      }
      html += "</table></li>";
    }
    $('#tree2').html(html);
    $('#tree2').treed();
    // }
  });
}

var groupSelect = document.querySelector("#groupSelect");
var kernalSelect = document.querySelector(".kernalSelect");

var kernalList;

function getConnects() {

  const getUserData = {
    "loggedInUsername": User.getName()
  };

  Request(Endpoints.get("getUserRoutingGroups"), "POST", getUserData, {
    showMainLoader: true
  }).done(data => {
    if (Endpoints.validateResponse(data)) {
      var aList = data.data.userGroupAndGroupIdMap;
      groupSelect.options.length = 1;
      $.each(aList, function (key, value) {
        groupSelect.options[groupSelect.options.length] = new Option(key, value);
      });
    }
  });

  Request(Endpoints.get("getUserKennalList"), "POST", getUserData, {
    showMainLoader: true
  }).done(data => {
    if (Endpoints.validateResponse(data)) {
      kernalList = data.data.userKannelMap;
      fillKernalDropdown(null, null);
    }
  });
}

$("#updateKernal").on('reset', function () {
  $('#kernalPart').addClass('d-none');
  $('.updateKennals .kennalRow').not(':first').remove();
})

$("#groupSelect").on('change', function () {
  if (this.value) {
    $("#kernalPart").removeClass("d-none");

    $('.updateKennals .kennalRow').not(':first').remove(); // remove existing rows

    // $('#kernalSelect option:selected', this).remove();
    $('#kernalSelect option:selected', this).removeAttr('selected');

    let temp = $("#groupSelect option:selected").text();
    var kernalItem = globalKernalList[temp];
    if (Object.keys(kernalItem).length == 1) {
      console.log("3");

      for (let kernal of Object.keys(kernalItem)) {
        fillKernalDropdown(kernal, kernalItem[kernal]);
        //   $("#kernalSelect option").filter(function () {
        //     return this.text == kernal;
        //   }).attr('selected', true);
        //   console.log(kernal,kernalItem[kernal]);
        //   $('.kennalRow .kernalPercentage').val(kernalItem[kernal]);
      }
    } else {
      for (let kernal of Object.keys(kernalItem)) {
        if (Object.keys(kernalItem).indexOf(kernal) != 0) {
          console.log("2");
          appendingRows(kernal, kernalItem[kernal]);
        } else {
          console.log("1");
          fillKernalDropdown(kernal, kernalItem[kernal]);
          // $("#kernalSelect option").filter(function () {
          //   return this.text == kernal;
          // }).attr('selected', true);
          // console.log(kernal,kernalItem[kernal]);
          // $('.kennalRow .kernalPercentage').val(kernalItem[kernal]);
        }

      }
    }
  } else {
    $("#kernalPart").addClass("d-none");
  }
});

$("#addMoreRows").click(function () {
  appendingRows(null, null);
});

function appendingRows(option, value) {
  $('.updateKennals').append(`<div class="kennalRow row">
  <div class="col-md-3"><select type="text" class="form-control dropdown kernalSelect" name="kernalSelect" required><option value="">-- Select --</option></select></div>
  <div class="col-md-2"><input type="number" class="form-control kernalPercentage" name="kernalPercentage" value="" title="Percentage" placeholder="" required="" min="1" max="100"></div>
  <span>%</span>
  <div class="col-md-2"><button type="button" id="removeMoreRows" class="btn btn-danger removeMoreRows"><i class="fa fa-minus" aria-hidden="true"></i>&ensp;Remove</button></div>
  <br/><br/><br/>
</div>`);
  fillKernalDropdown(option, value);

  $('.removeMoreRows').click(function (e) {
    e.stopImmediatePropagation();
    if (confirm('Are you sure? Do you want to remove this?')) {
      $(this).closest('.kennalRow').remove();
    } else {
      return false;
    }
  })
}
function fillKernalDropdown(option, value) {
  // console.log(option)
  var kernalSelectAll = document.querySelectorAll("select.kernalSelect");
  var last = kernalSelectAll[kernalSelectAll.length - 1];
  last.options.length = 1;
  $.each(kernalList, function (key, value) {
    last.options[last.options.length] = new Option(key, value);
  });

  $(".updateKennals .kennalRow:last-child select.kernalSelect option").filter(function () {
    return this.text == option;
  }).attr('selected', true);
  $('.updateKennals .kennalRow:last-child input.kernalPercentage').val(value);

}
$.fn.extend({
  treed: function (o) {

    var openedClass = 'fa fa-minus-circle';
    var closedClass = 'fa fa-plus-circle';

    if (typeof o != 'undefined') {
      if (typeof o.openedClass != 'undefined') {
        openedClass = o.openedClass;
      }
      if (typeof o.closedClass != 'undefined') {
        closedClass = o.closedClass;
      }
    };

    //initialize each of the top levels
    var tree = $(this);
    tree.addClass("tree");
    tree.find('li').has("table").each(function () {
      var branch = $(this); //li with children ul
      branch.prepend("<i class='indicator glyphicon " + closedClass + "'></i>");
      branch.addClass('branch');
      branch.on('click', function (e) {
        if (this == e.target) {
          var icon = $(this).children('i:first');
          icon.toggleClass(openedClass + " " + closedClass);
          $(this).children().children().toggle();
        }
      })
      branch.children().children().toggle();
    });
    //fire event from the dynamically added icon
    tree.find('.branch .indicator').each(function () {
      $(this).on('click', function () {
        $(this).closest('li').click();
      });
    });
    //fire event to open branch if the li contains an anchor instead of text
    tree.find('.branch>a').each(function () {
      $(this).on('click', function (e) {
        $(this).closest('li').click();
        e.preventDefault();
      });
    });
    //fire event to open branch if the li contains a button instead of text
    tree.find('.branch>button').each(function () {
      $(this).on('click', function (e) {
        $(this).closest('li').click();
        e.preventDefault();
      });
    });
  }
});

$('#tree1').treed();

function getFormData(unindexed_array) {
  // var unindexed_array = $form.serializeArray();
  // console.log("length : " + unindexed_array.length);
  var indexed_array = {};
  let j = 0;
  for (let i = 0; i < unindexed_array.length / 2; i++) {
    var k = j + i;
    indexed_array[unindexed_array[k]['value']] = unindexed_array[k + 1]['value'];
    j = i + 1;
  }
  return indexed_array;
}
