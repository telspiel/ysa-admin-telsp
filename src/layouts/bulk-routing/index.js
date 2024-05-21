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
  $('.select2').select2();
});

var groupList = null;

const data = {
  loggedInUsername: User.getName(),
  groupNameId: "All",
  operationName: "All",
  routingType: "All"
};


var selectValues = {
  "all": "all"
};
var $mySelect = $('#group');
//
$.each(selectValues, function (key, value) {
  var $option = $("<option/>", {
    value: key,
    text: value
  });
  $mySelect.append($option);
});


callCircleOperatorSenderIDApi(data)
//viewRoutingGroupNameApi(data)

function callCircleOperatorSenderIDApi(data) {

  var groupSelect = document.querySelector(".group");

  Request(Endpoints.get("getAllRoutingDetailesForUser"), "POST", data, {
    showMainLoader: true
  }).done(data => {
    // console.log(data);
    if (Endpoints.validateResponse(data)) {

      groupList = data.groupData;
      groupSelect.options.length = 2;
      $.each(groupList, function (key, value) {
        groupSelect.options[groupSelect.options.length] = new Option(value.groupName, value.groupId);
      });
    }
  })
}



function viewRoutingGroupNameApi(data) {
  Request(Endpoints.get("viewRoutingForAllUserByGroupName"), "POST", data, {
    showMainLoader: true
  }).done(data => {
    console.log(data);
  })
}


$("#btnSubmit").click(function (e) {

  const data = {
    loggedInUsername: User.getName(),
    groupNameId: $("#group").val(),
    operationName: $("#userType option:selected").text(),
    routingType: $("#routingType option:selected").text()
  };

  viewRoutingGroupNameApi(data);
  populateTable(data);

});





function populateTable(data) {
  Request(Endpoints.get("viewRoutingForAllUserByGroupName"), "POST", data, {
    showMainLoader: true
  }).done(data => {
    if (data.message) {
      $(".alert").alert('close');
      Alert.success(data.message, {
        clearTime: 5 * 1000
      })
    }


    //console.log(JSON.stringify(data));

    // data = JSON.stringify(data)

    //       $.each(data.routingData, function (dt) {
    //           console.log("Working");
    //       $("#tdata").append("<tr>"+
    //       "<td>"+dt+"</td>"
    //       +"</tr>"
    //       )
    //   }
    //   )



    // $('#tdata').DataTable({
    //   data: data,
    //   searching: false,
    //   paging: false,
    //   destroy:true,
    //   "columns": [
    //     { title: "Select All" },
    //     { title: "User Name" },
    //     { title: "Routing Type" }
    //   ],
    //   "columnDefs": [
    //     {
    //       "targets": 3,
    //       "visible": false,
    //       "searchable": false,
    //     }
    //   ]
    // });



    const allData = data.routingData;
    const pList = allData.promoRouting;
    const tpdList = allData.transPromoDNDRouting;
    const tpndList = allData.transPromoNonDNDRouting;
    const tList = allData.transRouting;


    // For pList------------------------------------------------------------------
    const userpList = Object.values(pList).map(nested => Object.values(nested)[0])
    // console.log(userpList);
    //  const result = Object.values(allData).map(nested =>Object.values(nested).map(inest =>Object.values(inest)[0]))
    const routeidp = Object.values(pList).map(nested => Object.values(nested)[3][0].routingId)
    console.log(routeidp);
    
    //  const newArr = Array.prototype.concat(...result);
    // const pListKey = Object.keys(allData)

    const pele = Object.keys(allData)
    const pval = pele[1];



    if (userpList.length !== 0) {

      //  var objpList = Object.assign.apply({}, userpList.map((v) => ({ [v]: pListKey[1] })));
      // console.log(objpList);
      //  var finalpList = Object.entries(objpList);
      // console.log(finalpList);
      // var objprouteList = Object.assign.apply([], finalpList.map((v,i) => ({ [v]: routeidp[i] })));
      // var fsccc = Object.entries(objprouteList);
      // console.log(fsccc);


      var n = userpList.length;
      var val = pval;

      var arr = Array(n).fill(val);
      console.log(arr);


      const result = userpList.map((username, i) => ({ username, routingType: arr[i], routingId: routeidp[i] }));
      console.log(result);

      var finalpList = result.map(obj => Object.values(obj));
      console.log(finalpList);


    }



    // For tpd List------------------------------------------------------------------------------
    const usertpdList = Object.values(tpdList).map(nested => Object.values(nested)[0])
    //const tpdListKey = Object.keys(allData)

    const routeidtpd = Object.values(tpdList).map(nested => Object.values(nested)[3][0].routingId)
    console.log(routeidtpd)

    var tpdval = pele[2];

    if (usertpdList.length !== 0) {

      // var objtpdList = Object.assign.apply({}, usertpdList.map((v) => ({ [v]: tpdListKey[2] })));
      // var finaltpdList = Object.entries(objtpdList);

      var n = usertpdList.length;
      var val = tpdval;

      var arr = Array(n).fill(val);
      console.log(arr);


      const result2 = usertpdList.map((username, i) => ({ username, routingType: arr[i], routingId: routeidtpd[i] }));
      console.log(result2);

      var finaltpdList = result2.map(obj => Object.values(obj));
      console.log(finaltpdList);



    }
    // For tpnd List------------------------------------------------------------------------------
    const usertpndList = Object.values(tpndList).map(nested => Object.values(nested)[0])
    //const tpndListKey = Object.keys(allData)

    const routeidtpnd = Object.values(tpndList).map(nested => Object.values(nested)[3][0].routingId)
    console.log(routeidtpnd)

    var tpndval = pele[3];


    if (usertpndList.length !== 0) {

      // var objtpndList = Object.assign.apply({}, usertpndList.map((v) => ({ [v]: tpndListKey[3] })));
      // var finaltpndList = Object.entries(objtpndList);


      var n = usertpndList.length;
      var val = tpndval;

      var arr = Array(n).fill(val);
      console.log(arr);


      const result3 = usertpndList.map((username, i) => ({ username, routingType: arr[i], routingId: routeidtpnd[i] }));
      console.log(result3);

      var finaltpndList = result3.map(obj => Object.values(obj));
      console.log(finaltpndList);



    }

    // For t List------------------------------------------------------------------------------
    const usertList = Object.values(tList).map(nested => Object.values(nested)[0])
    //const tListKey = Object.keys(allData)


    const routeidt = Object.values(tList).map(nested => Object.values(nested)[3][0].routingId)
    console.log(routeidt)

    var tval = pele[0];



    if (usertList.length !== 0) {
    //  var objtList = Object.assign.apply({}, usertList.map((v) => ({ [v]: tListKey[0] })));
    //  var finaltList = Object.entries(objtList);


    var n = usertList.length;
      var val = tval;

      var arr = Array(n).fill(val);
      console.log(arr);


      const result4 = usertList.map((username, i) => ({ username, routingType: arr[i], routingId: routeidt[i] }));
      console.log(result4);

      var finaltList = result4.map(obj => Object.values(obj));
      console.log(finaltList);


    }


    if (usertList.length == 0) {
      finaltList = []
    }
    if (userpList.length == 0) {
      finalpList = []
    }
    if (usertpdList.length == 0) {
      finaltpdList = []
    }
    if (usertpndList.length == 0) {
      finaltpndList = []
    }



    var finalAll = Array.prototype.concat.apply([], [finaltList, finalpList, finaltpdList, finaltpndList]);






    console.log(finalAll);








    $(document).ready(function () {
      const table = $('#tdata').DataTable({
        data: finalAll,
        destroy: true,
        "columns": [
          { title: "Select All" },
          { title: "User Name" },
          { title: "Routing Type" },
        ],

        'columnDefs': [
          {
            'targets': 0,
            'checkboxes': {
              'selectRow': true
            },
            'data': null
          },
          {
            'targets': 1,
            'data': 0
          },
          {
            'targets': 2,
            'data': 1
          }
        ],
        //  'order': [[2, 'asc']]


      });

      $('#update-btn').on('click', function (e) {

        console.log(table.columns().checkboxes.selected()[0]);

        var grabbed = table.columns().checkboxes.selected()[0]

        function getCol(matrix, col) {
          var column = [];
          for (var i = 0; i < matrix.length; i++) {
            column.push(matrix[i][col]);
          }
          return column; // return column data..
        }

        var getarrofrid = getCol(grabbed, 2)

        console.log(getarrofrid);

        var result5 = getarrofrid.map((routingId, i) => ({ routingId, routingId: getarrofrid[i] }));
        console.log(result5);

       

        
function updateGroupRoutingDetailsApi(data) {
  Request(Endpoints.get("updateGroupRoutingDetailsForAllUser"), "POST", data, {
    showMainLoader: true
  }).done(data => {
    console.log(data);
  })
}





$("#update-grp").click(function (e) {
  const data = {
    loggedInUsername: User.getName(),
    groupId: $("#update-group").val(),
    transAllUserListData: result5,
    promoAllUserListData: result5,
    transPromoDNDAllUserListData: result5,
    transPromoNonDNDAllUserListData: result5
  };

  updateGroupRoutingDetailsApi(data);


});


        

        // let routeresult = Object.values(allData).map(nested => Object.values(nested).map(inest => Object.values(inest)[3][0]));
        // let newroute = Array.prototype.concat(...routeresult)
        // console.log(newroute);

        // let ListwithRoute = Object.assign.apply({}, finalAll.map((v) => ({ [v]: newroute })));
        // console.log(ListwithRoute);

      })



      // var trHTML = '';

      // $.each(data.routingData, function (i, item) {

      //   trHTML += '<tr><td>' + "<input type = 'checkbox'/>" + '</td><td>' + data.routingData[i][i] + '</td><td>' + data.routingData[i][i] + '</td></tr>' ;
      // });

      // $('#tdata').append(trHTML);






      // console.log(Object.keys(tList));
      // console.log(Object.values(tList))
      //   Object.values(tList).forEach(value => {
      //     console.log(value);
      // });

    })
  })
}



function updateGroupApi(data) {

  var upgroupSelect = document.querySelector(".update-group");

  Request(Endpoints.get("getAllRoutingDetailesForUser"), "POST", data, {
    showMainLoader: true
  }).done(data => {
    //console.log(data);
    if (Endpoints.validateResponse(data)) {

      groupList = data.groupData;
      upgroupSelect.options.length = 0;
      $.each(groupList, function (key, value) {
        upgroupSelect.options[upgroupSelect.options.length] = new Option(value.groupName, value.groupId);
      });
    }
  })
}





$("#update-btn").click(function (e) {

  const data = {
    loggedInUsername: User.getName(),
    groupNameId: $("#group").val(),
    operationName: $("#userType option:selected").text(),
    routingType: $("#routingType option:selected").text()
  };

  updateGroupApi(data);

});



