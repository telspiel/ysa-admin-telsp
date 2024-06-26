import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";

const table = require("./../../partials/table.hbs");

console.log("Add Logo");

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}

// Function to load the saved image from local storage
function loadSavedImage() {
  const loggedInUserName = User.getName();
  const savedImage = localStorage.getItem(`uploadedImage_${loggedInUserName}`);
  if (savedImage) {
    $('#uploadedImage').attr('src', savedImage);
  }
}

// Call the function to load the saved image when the document is ready
$(document).ready(function() {
  loadSavedImage();
});

$("#fileUpload").click(function (e) {
  const file = $("#selectFile").get(0).files[0];

  if (!file) {
    Alert.info("Please select a file.");
    return;
  }
  const formData = new FormData();
  formData.append("loggedInUserName", User.getName()); //getting the logo image by the username
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
        console.log("Image uploaded successfully");

        // Display the uploaded image
        const imageUrl = URL.createObjectURL(file);

        // Create an image element
        const uploadedImage = $("<img>").attr({
          "src": imageUrl,
          "alt": "Uploaded Image",
          "width": 150,
          "height": 40,
        }).addClass("uploaded-image");

        // Show the image
        $("#uploadedImage").replaceWith(uploadedImage);

        // Save the uploaded image to local storage
        const loggedInUserName = User.getName();
        const reader = new FileReader();
        reader.onload = function(e) {
          const result = e.target.result;
          localStorage.setItem(`uploadedImage_${loggedInUserName}`, result);
        };
        reader.readAsDataURL(file);

        console.log("Image uploaded successfully");
      }

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

