import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";

const table = require("./../../partials/table.hbs");

// console.log("Welcome to Error Details Page!");

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}

const renderDetailedMis = (data) => {
  if (!Endpoints.validateResponse(data)) {
    return false;
  }
  const grid = (data.data || {}).errorCodeList || [];
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
      rowData.push(row[key] || "0")
    });
    return rowData;
  });

  if ($.fn.dataTable.isDataTable('#misTable')) {
    $('#misTable').DataTable().destroy();
  }
  $('#misTable').DataTable({
    data: tableData,
    "columns": [
      { title: "Error Code" },
      { title: "description" }
    ],
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

const data = {
  loggedInUserName: User.getName()

};
Request(Endpoints.get("errorCode"), "POST", data).done(data => {
  renderDetailedMis(data);

});
