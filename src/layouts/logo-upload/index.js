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

$("#fileUpload").click(function (e) {
  const file = $("#selectFile").get(0).files[0];

  if (!file) {
    Alert.info("Please select a file.");
    return;
  }
  const formData = new FormData();
  formData.append("loggedInUserName", User.getName());
  // formData.append("fileType", $("input[name=fileType]:checked").val());
  formData.append("file", file);
  // $("#controls-form")[0].reset();
  // $(".custom-file-label").html('Choose file');
  Request(Endpoints.get("uploadLogo"), "POST", formData, {
    showMainLoader: true,
    contentType: false,
    processData: false,
    data: formData
  }).done(data => {
    if (Endpoints.validateResponse(data)) {
      $("#controls-form")[0].reset();
      $(".custom-file-label").html('Choose file');
      if (data.result === "Success") {
//        fileName = data.data.fileName;
        console.log("Image uploaded successfully");
      }

//  if (data.result === "Success") {
//         // Display the uploaded image
//         const imageUrl = URL.createObjectURL(file);

//         // Create an image element
//         const uploadedImage = $("<img>").attr({
//           "src": imageUrl,
//           "alt": "Uploaded Image",
//           "width": 250,
//           "height": 100
//         }).addClass("uploaded-image");

//         // Show the image
//         $("#uploadedImage").replaceWith(uploadedImage);

//         console.log("Image uploaded successfully");
//       }

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

