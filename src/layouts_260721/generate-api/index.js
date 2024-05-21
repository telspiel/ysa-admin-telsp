import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";
// ----------------Call Existing API--------------------------
$(document).ready(function () {
  $('.select2').select2();
});
  $(function () {
    $("#adminNameDiv .dropdown").on('change', function () {
            var value = this.value;
            let withValue = false;
            if(value && !withValue){
              withValue = true;
            $(this).addClass('active');
             var name=$(this).attr('name');
             $("#adminNameDiv .dropdown").not('.active').select2('destroy').val("").select2();
             $("#view ."+name).val(value);
             $(this).removeClass('active');
    }
      if (this.value) {
        const data = {
          loggedInUserName:User.getName(),
         userName: value,
         operation: "getUserApiKey"
        };
        Request(Endpoints.get("getUserApi"), "POST", data).done(data1 => {
         $("#ExistingApi").val(data1.data.apiKey);
        });
      }
    });
  });
// --------------Generate New API--------------
$("#generateNewApi").click(function(){
var  name= "";
var adminName = $("#adminNameDiv .adminName").children("option:selected").val();
var resellerSelect = $("#adminNameDiv .resellerName ").children("option:selected").val();
var sellerSelect = $("#adminNameDiv .sellerName ").children("option:selected").val();
var clientSelect = $("#adminNameDiv .clientName ").children("option:selected").val();
if (adminName.length>0) {
name= adminName;
}
if (resellerSelect.length>0) {
name= resellerSelect;
}
if (sellerSelect.length>0) {
name= sellerSelect;
}
if (clientSelect.length>0) {
name= clientSelect;
}
  const data = {
    loggedInUserName: User.getName(),
    userName: name,
    operation: "getUserApiKey"
  };

  var r = confirm("Are You sure you want to generate new Api ?");
  if (r == true) {

  Request(Endpoints.get("generateUserApi"), "POST", data, {
    showMainLoader: true
  }).done(data1 => {
    $(".alert").alert('close');
    $('#successMsg').css("display","block");
    $('#successMsg').html(data1.message);
    $("#ExistingApi").val(data1.data.apiKey);
    setTimeout(function() {
        $("#successMsg").hide('slow')
    }, 5000);
    });
}
});
// ------------------- Select User Name ------------
 $(document).ready(function() {
  const getUserData = {
    "loggedInUserName": User.getName()
  };
  var adminSelect = document.querySelector("#adminNameDiv .adminName");
  var resellerSelect = document.querySelector("#adminNameDiv .resellerName");
  var sellerSelect = document.querySelector("#adminNameDiv .sellerName");
  var clientSelect = document.querySelector("#adminNameDiv .clientName");

  Request(Endpoints.get("getAllUsers"), "POST", getUserData).done(data => {
    const aList = data.data.adminList;
    if (aList.length === 0) {
      $(".adminNameDiv").addClass('d-none');
    }
    adminSelect.options.length = 1;
    $.each(aList, function (key, value) {
      adminSelect.options[adminSelect.options.length] = new Option(value, value);
    });
    const rList = data.data.resellerList;
    if (rList.length === 0) {
      $(".resellerNameDiv").addClass('d-none');
    }
    resellerSelect.options.length = 1;
    $.each(rList, function (key, value) {
      resellerSelect.options[resellerSelect.options.length] = new Option(value, value);
    });

    const sList = data.data.sellerList;
    if (sList.length == 0) {
      $(".sellerNameDiv").addClass('d-none');
    }
    sellerSelect.options.length = 1;
    $.each(sList, function (key, value) {
      sellerSelect.options[sellerSelect.options.length] = new Option(value, value);
    });

    const cList = data.data.clientList;
    const cListClient=data.data.clientList;
    if (cList.length == 0) {
      $(".clientNameDiv").addClass('d-none');
    }
    clientSelect.options.length = 1;
    $.each(cList, function (key, value) {
      clientSelect.options[clientSelect.options.length] = new Option(value, value);
    });
  });
});
