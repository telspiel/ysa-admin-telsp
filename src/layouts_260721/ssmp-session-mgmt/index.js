import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";

// console.log("List User");

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}

const renderDetailedMis = (data) => {
  if (!Endpoints.validateResponse(data)) {
    return false;
  }

  // const grid = (data.data || {}).listUserFormDataGrid || [];
  const grid = JSON.parse(data.data);;
  const getHeading = (key) => {
    let result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
  let headerRow;
  let tableHeader = [];
  let formattedTableHeader = [];


  Object.keys(grid).forEach(key => {
    let data = grid[key];
    let row = data.sessionStats;
    row['username'] = data.username;
    // console.log(row);

    headerRow = row;
    for (let key in headerRow) {
      if (headerRow.hasOwnProperty(key)) {
        tableHeader.push(key);
        formattedTableHeader.push(getHeading(key));
      }
    }

  });
  // console.log(tabData);

  let tabData = Object.keys(grid).map(row => {
    var rowData = [];
    console.log(grid[row]);
    tableHeader.forEach((key) => {
      // rowData.push(grid[row].sessionStats[key] || "0")
      rowData[key] = grid[row].sessionStats[key] || "0";

    });
    return rowData;
  });
  console.log(tabData);

  if ($.fn.dataTable.isDataTable('#misTable')) {
    $('#misTable').DataTable().destroy();
  }
  let table = $('#misTable').DataTable({
    data: tabData,
    paging: false,
    searching: false,
    "bPaginate": false,
    "bLengthChange": false,
    "bFilter": true,
    "bInfo": false,
    "bAutoWidth": false,
    columns: [
      { title: "Client Name", data: "username" },
      { title: "Tx", data: 'txSessionCount' },
      { title: "Rx", data: 'rxSessionCount' },
      { title: "TRx", data: 'trxSessionCount' },
      { title: "Submit Tps", data: 'submitTps' },
      { title: "Deliver Tps", data: 'deliverTps' },
      { title: "action" },
      { title: "action2" }
    ],
    "columnDefs": [
      {
        "targets": -2,
        "data": null,
        "defaultContent": "<button class='btn btn-info showDetail'>Show Detail</button>"
      },
    {
      "targets": -1,
      "data": null,
      "defaultContent": "<button class='btn btn-info unBind'>Unbind</button>"
    }]
  });

  $('#misTable tbody').on('click', 'button.unBind', function () {
    const data = {
      username: User.getName()
    };
    var datas = table.row($(this).parents('tr')).data();
    console.log(datas['username']);
    console.log(datas);
    Request(Endpoints.get("unbindUserSession")+"/"+datas['username'], "POST",{}).done(data => {
      console.log(data.data);
      if (data.data) {
        Alert.success(data.data, {
          clearTime: 5 * 1000
        })
      }
      if (Endpoints.validateResponse(data)) {
      }
    });
  });

  $('#misTable tbody').on('click', 'button.showDetail', function () {
    var data = table.row($(this).parents('tr')).data();
    $('#tableModal').modal('show');
    let listArray = grid[data['username']].sessionStatsDetails;
    let tx = listArray.txSessionDetailsList;
    let rx = listArray.rxSessionDetailsList;
    let trx = listArray.trxSessionDetailsList;

    // let length = parseInt(data['txSessionCount']) + parseInt(data['rxSessionCount']) + parseInt(data['trxSessionCount']);
    // console.log(length);
    let largeCount = Math.max(data['txSessionCount'], data['rxSessionCount'], data['trxSessionCount']);
    if (largeCount != 0) {
      let testArr = parseInt(data['txSessionCount']) == largeCount ? tx : (parseInt(data['rxSessionCount']) == largeCount ? rx : trx)
      const headerRow = testArr[0];
      let tableHeader = [];

      for (let key in headerRow) {
        if (headerRow.hasOwnProperty(key)) {
          tableHeader.push(key);
        }
      }
      if (tx.length != 0) {
        $(".txSessionDetailsList").removeClass("d-none");
        renderDetailTable("txSessionDetailsList", tableHeader, tx);
      }
      if (rx.length != 0) {
        $(".rxSessionDetailsList").removeClass("d-none");
        renderDetailTable("rxSessionDetailsList", tableHeader, rx);
      }
      if (trx.length != 0) {
        $(".trxSessionDetailsList").removeClass("d-none");
        renderDetailTable("trxSessionDetailsList", tableHeader, trx);
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

const renderDetailTable = (id, tableHeader, session) => {

  const tableData = session.map(row => {
    var rowData = [];
    tableHeader.forEach((key) => {
      rowData[key] = row[key] || "0";
    });
    return rowData;
  });

  if ($.fn.dataTable.isDataTable('#' + id)) {
    $('#' + id).DataTable().destroy();
  }
  $('#' + id).DataTable({
    data: tableData,
    paging: false,
    searching: false,
    "bPaginate": false,
    "bLengthChange": false,
    "bFilter": true,
    "bInfo": false,
    "bAutoWidth": false,
    "columns": [
      { title: "bind Status", data: "bindStatus" },
      { title: "bind Time", data: "bindTime" },
      { title: "bind Type", data: "bindType" },
      { title: "isAlive", data: "isAlive" },
      { title: "remote Address", data: "remoteAdd" }
    ]
  });
}
const now = moment(new Date()).format("DD-MM-YYYY");

$(() => {
  $("#controls-form").submit(function (e) {
    e.preventDefault();
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
  username: User.getName()
};
Request(Endpoints.get("smppStatus"), "POST", data).done(data => {
  if (Endpoints.validateResponse(data)) {
    renderDetailedMis(data);
    // const source = (app.store.listUserFormDataGrid = data.data.listUserFormDataGrid.map(o => ({
    //   id: o.userName,
    //   name: o.userName
    // })));
  }
});
