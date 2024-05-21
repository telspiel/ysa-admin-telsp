import "./../../scripts/app";
import "./styles";


import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";

const table = require("./../../partials/table.hbs");

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}

$(document).ready(function () {
  $('.select2').select2({ dropdownAutoWidth: true });
});




//var kennalList = null;


// Upload Error Code Map--------------------------------------------------------------------------------------------------


const data = {
  loggedInUsername: User.getName()
};


getUserKannelListApi(data)


function getUserKannelListApi(data) {

  var groupSelect = document.querySelector(".upload-kennalName");

  Request(Endpoints.get("getUserKennalList"), "POST", data, {
    showMainLoader: true
  }).done(data => {
    console.log(data);

    if (Endpoints.validateResponse(data)) {



      let kennalobj = data.data.userKannelMap;

      let keyofkennal = Object.keys(kennalobj)
      let valofkennal = Object.values(kennalobj)

      console.log(keyofkennal);
      console.log(valofkennal);

      const result = keyofkennal.map((kennalName, i) => ({ kennalName, kennalId: valofkennal[i] }));
      console.log(result);





      groupSelect.options.length = 1;
      $.each(result, function (key, value) {
        groupSelect.options[groupSelect.options.length] = new Option(value.kennalName, value.kennalId);
      });
    }
  })
}

$("#selectFile").change(function () {
  $("#fileName").text(this.files[0].name);
});

$("#btnSubmit").click(function (e) {

  console.log($("#upload-kennalName").val());


  const file = $("#selectFile").get(0).files[0];

  if (!file) {
    Alert.info("Please select a file.");
    return;
  }

  let ukn = $('#upload-kennalName').val();
  if (ukn == 0) {
    Alert.info("Please select a Kennal.");
    return;
  }

  if(!$('input[name="upload-retry"]').is(':checked')){
    Alert.info("Please select the option.");
    return;
  }

  if(!$('input[name="upload-cretry"]').is(':checked')){
    Alert.info("Please select the option.");
    return;
  }

  let peci = $('#upload-platformErrorCodeId').val();
  if (peci == "") {
    Alert.info("Please select Platform Error Code Id.");
    return;
  }


  const formData = new FormData();
  formData.append("userName", User.getName());
  // formData.append("fileType", $("input[name=fileType]:checked").val());
  formData.append("file", file);
  formData.append("fileType", "xlsx");
  formData.append("isRetryEnabled", $('input[name="upload-retry"]:checked').val());
  formData.append("isCarrierRetryEnabled", $('input[name="upload-cretry"]:checked').val());
  formData.append("platformErrorCodeId", $("#upload-platformErrorCodeId").val());
  formData.append("kannelId", $("#upload-kennalName").val());


  Request(Endpoints.get("uploadErrorCodeFile"), "POST", formData, {
    showMainLoader: true,
    contentType: false,
    processData: false,
    data: formData
  }).done(data => {
    console.log(data);
    if (Endpoints.validateResponse(data)) {

      data.message &&
        (data.result === "Success"
          ? Alert.success(data.message, {
            clearTime: 10 * 1000
          })
          : Alert.error(data.message, {
            clearTime: 10 * 1000
          }));
    }
  });





});


// Add Error Code --------------------------------------------------------------------------------------------------


getUserKannelListAddApi(data)

function getUserKannelListAddApi(data) {

  var groupSelect = document.querySelector(".add-kennalName");

  Request(Endpoints.get("getUserKennalList"), "POST", data, {
    showMainLoader: true
  }).done(data => {
    console.log(data);

    if (Endpoints.validateResponse(data)) {



      let kennalobj = data.data.userKannelMap;

      let keyofkennal = Object.keys(kennalobj)
      let valofkennal = Object.values(kennalobj)

      console.log(keyofkennal);
      console.log(valofkennal);

      const result = keyofkennal.map((kennalName, i) => ({ kennalName, kennalId: valofkennal[i] }));
      console.log(result);





      groupSelect.options.length = 1;
      $.each(result, function (key, value) {
        groupSelect.options[groupSelect.options.length] = new Option(value.kennalName, value.kennalId);
      });
    }
  })
}



function addErrorCodeMappingApi(addformData) {
  Request(Endpoints.get("addNewErrorCode"), "POST", addformData, {
    showMainLoader: true,
    // contentType: false,
    processData: false,
    // data: addformData
  }).done(data => {
    console.log(data);
    if (Endpoints.validateResponse(data)) {

      data.message &&
        (data.result === "Success"
          ? Alert.success(data.message, {
            clearTime: 10 * 1000
          })
          : Alert.error(data.message, {
            clearTime: 10 * 1000
          }));
    }
  })
}



$("#add-btnSubmit").click(function (e) {

  console.log($("#add-kennalName").val());
  console.log($.type(User.getName()));

  var sVal = $("#add-kennalName").val();
  var kid = parseInt(sVal)
  console.log($.type(kid));

  let akn = $('#add-kennalName').val();
  if (akn == 0) {
    Alert.info("Please select a Kennal.");
    return;
  }

  if(!$('input[name="add-retry"]').is(':checked')){
    Alert.info("Please select the option.");
    return;
  }

  if(!$('input[name="add-cretry"]').is(':checked')){
    Alert.info("Please select the option.");
    return;
  }
  

  // var pVal = $("#add-platformErrorCode").val();
  // var pid = parseInt(pVal)
  // console.log($.type(pid));

  // const addformData = new FormData();
  // addformData.append("userName", User.getName());
  // // formData.append("fileType", $("input[name=fileType]:checked").val());
  // addformData.append("isRetryEnabled", $('input[name="add-retry"]:checked').val());
  // addformData.append("isCarrierRetryEnabled", $('input[name="add-cretry"]:checked').val());
  // addformData.append("platformErrorCodeId", $("#add-platformErrorCodeId").val());
  // addformData.append("kannelId", kid);
  // addformData.append("error_code", $("#errorCode").val());
  // addformData.append("error_desc", $("#errorDesc").val());
  // addformData.append("platform_error_code", pid);
  // addformData.append("platform_error_desc", $("#platformErrorDesc").val());


  const addformData = {
    userName: User.getName(),
    isRetryEnabled: $('input[name="add-retry"]:checked').val(),
    isCarrierRetryEnabled: $('input[name="add-cretry"]:checked').val(),
    platformErrorCodeId: $("#add-platformErrorCodeId").val(),
    kannelId: kid,
    error_code: $("#errorCode").val(),
    error_desc: $("#errorDesc").val(),
    platform_error_code: $("#add-platformErrorCode").val(),
    platform_error_desc: $("#platformErrorDesc").val()
  }

  // Request(Endpoints.get("addNewErrorCode"), "POST", addformData, {
  //   showMainLoader: true,
  //   contentType: false,
  //   processData: false,
  //   data: addformData
  // }).done(data => {
  //     console.log(data);
  //   if (Endpoints.validateResponse(data)) {

  //     data.message &&
  //       (data.result === "Success"
  //         ? Alert.success(data.message, {
  //           clearTime: 10 * 1000
  //         })
  //         : Alert.error(data.message, {
  //           clearTime: 10 * 1000
  //         }));
  //   }
  // });

  addErrorCodeMappingApi(addformData)



});