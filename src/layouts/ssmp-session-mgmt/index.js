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

 // const grid = data.smppResult

 // const grid = JSON.parse("{\"demosmpp4\":{\"sessionStatsDetails\":{\"rxSessionDetailsList\":[],\"trxSessionDetailsList\":[{\"bindType\":\"TRANSCEIVER\",\"bindStatus\":\"BOUND\",\"bindTime\":\"2022-07-26 14:08:56\",\"remoteAdd\":\"115.112.190.41\",\"isAlive\":\"true\"},{\"bindType\":\"TRANSCEIVER\",\"bindStatus\":\"BOUND\",\"bindTime\":\"2022-07-26 14:08:56\",\"remoteAdd\":\"115.112.190.41\",\"isAlive\":\"true\"}],\"txSessionDetailsList\":[]},\"sessionStats\":{\"trxSessionCount\":2,\"totalDelivered\":0,\"totalSubmit\":0,\"submitTps\":0.0,\"rxSessionCount\":0,\"txSessionCount\":0,\"deliverTps\":0.0},\"username\":\"demosmpp4\"}}")

  const grid = data.smppResult
   
  //  const grid = JSON.parse(data.data)
   console.log(grid);

   console.log(typeof(grid));

   // get first value of the object

   // check if the object is empty


   const smppType1 = Object.keys(grid)[0];

    console.log(smppType1);

   const smppType2 = Object.keys(grid)[1];
   
    console.log(smppType2);



    

   




    
    
    
    




    

   
    const grid1 = Object.values(grid)[0] || {};
    console.log(grid1);
    console.log(typeof(grid1));
    

    // add 



   // get second value of the object
    const grid2 = Object.values(grid)[1] || {};
    console.log(grid2);
    console.log(typeof(grid2));
    
    // // concatenate both strings 

    // const grid3 = Object.values(grid)[0] +"/n"+ Object.values(grid)[1]
    // console.log(grid3);
    // console.log(typeof(grid3));

    // // split the string

    // const grid4 = grid3.split("/n")
    // console.log(grid4);
    // console.log(typeof(grid4));


    // make object from the string of grid1

    
    
    

    const grid5 = JSON.parse(grid1) || {};
    console.log(grid5);
    console.log(typeof(grid5));

    
    // Object.keys(grid5).forEach(key => {
    //   let data = grid5[key];
    //   console.log(data);
    //   let row = data.sessionStats;
    //   console.log(row);
    //   console.log(typeof(row));
    //   row['smppType'] = smppType1;
     
    // }
    // );

    // add smpptype value inside sessionStats in each object of grid5 

    Object.keys(grid5).forEach(key => {
      let data = grid5[key];
      console.log(data);
      let row = data.sessionStats;
      console.log(row);
      console.log(typeof(row));
      row['smppType'] = 'SMPP-1';
    }
    );




    



      
    



    





    


    

    
    


    



    

    
    

    
    

    // make object from the string of grid2

    const grid6 = JSON.parse(grid2) || {};
    console.log(grid6);
    console.log(typeof(grid6));

    Object.keys(grid6).forEach(key => {
      let data = grid6[key];
      console.log(data);
      let row = data.sessionStats;
      console.log(row);
      console.log(typeof(row));
      row['smppType'] = 'SMPP-2';
    }
    );

    // combine as object of grid5 and grid6

    var grid7 = Object.assign(grid5, grid6) || {};
    console.log(grid7);
    console.log(typeof(grid7));


    


    


    



    

    



    // parse the string to object

    // const grid5 = JSON.parse(grid4)
    // console.log(grid5);
    // console.log(typeof(grid5));

     



    

    


    


    


    

   

    


    
    


   

//   {
//     "SMPP-83.136.248.245:4081": "{\"demosmpp3\":{\"sessionStatsDetails\":{\"rxSessionDetailsList\":[],\"trxSessionDetailsList\":[{\"bindType\":\"TRANSCEIVER\",\"bindStatus\":\"BOUND\",\"bindTime\":\"2022-07-26 14:15:40\",\"remoteAdd\":\"115.112.190.41\",\"isAlive\":\"true\"}],\"txSessionDetailsList\":[]},\"sessionStats\":{\"trxSessionCount\":1,\"totalDelivered\":0,\"totalSubmit\":0,\"submitTps\":0.0,\"rxSessionCount\":0,\"txSessionCount\":0,\"deliverTps\":0.0},\"username\":\"demosmpp3\"}}",
//     "SMPP-94.237.121.119:4081": "{\"demosmpp4\":{\"sessionStatsDetails\":{\"rxSessionDetailsList\":[],\"trxSessionDetailsList\":[{\"bindType\":\"TRANSCEIVER\",\"bindStatus\":\"BOUND\",\"bindTime\":\"2022-07-26 14:08:56\",\"remoteAdd\":\"115.112.190.41\",\"isAlive\":\"true\"},{\"bindType\":\"TRANSCEIVER\",\"bindStatus\":\"BOUND\",\"bindTime\":\"2022-07-26 14:08:56\",\"remoteAdd\":\"115.112.190.41\",\"isAlive\":\"true\"}],\"txSessionDetailsList\":[]},\"sessionStats\":{\"trxSessionCount\":2,\"totalDelivered\":0,\"totalSubmit\":0,\"submitTps\":0.0,\"rxSessionCount\":0,\"txSessionCount\":0,\"deliverTps\":0.0},\"username\":\"demosmpp4\"}}"
//   }
  

// // convert to string

//   const gridString = JSON.stringify(grid);
//   console.log(gridString);

// // remove the first and last bracket

//   const gridString2 = gridString.substring(1, gridString.length - 1);
//   console.log(gridString2);

// // remove text after smpp




  


  

  
  



  







  





  
  

  

  
  

  


  

  


  
  


  


  
  


  



  



  



  


  



  
  






 






  
   


  





   

  
  const getHeading = (key) => {
    let result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

 
  

  let headerRow;
  let tableHeader = [];
  let formattedTableHeader = [];

  


  // add smpp type to the header 

  tableHeader.push("smppType");
  formattedTableHeader.push("smppType");
  

  
  


  

  Object.keys(grid7).forEach(key => {
    let data = grid7[key];
    console.log(data);
    let row = data.sessionStats;
    console.log(row);
    console.log(typeof(row));
    row['username'] = data.username;
    

   
    headerRow = row;
    for (let key in headerRow) {
      if (headerRow.hasOwnProperty(key)) {
        tableHeader.push(key);
        formattedTableHeader.push(getHeading(key));
      }
    }

  });

  
  // add smpp type to table data

  


  


  

  // console.log(tabData);

  let tabData = Object.keys(grid7).map(row => {
    
    var rowData = [];
    console.log(grid7[row]);
    tableHeader.forEach((key) => {
      // rowData.push(grid[row].sessionStats[key] || "0")
      rowData[key] = grid7[row].sessionStats[key] || "0";

    });
    return rowData;
  });
  console.log(tabData);


  // add smpp type to table data

  



  console.log(tableHeader);

  console.log(formattedTableHeader);

  console.log(tabData);

  



  


  if ($.fn.dataTable.isDataTable('#misTable')) {
    $('#misTable').DataTable().destroy();
  }
  let table = $('#misTable').DataTable({
    data: tabData,
    paging: true,
    searching: true,
    "bPaginate": false,
    "bLengthChange": true,
    "bFilter": true,
    "bInfo": true,
    "bAutoWidth": false,
    columns: [
      { title: "Client Name", data: "username" },
      { title: "SMPP", data: "smppType" },
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
    let listArray = grid7[data['username']].sessionStatsDetails;
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
    console.log(data);
    // const source = (app.store.listUserFormDataGrid = data.data.listUserFormDataGrid.map(o => ({
    //   id: o.userName,
    //   name: o.userName
    // })));
  }
});
