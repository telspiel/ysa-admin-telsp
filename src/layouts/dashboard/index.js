import "./../../scripts/app";
import "./styles";

import Form from "./../../scripts/form";
import Schema from "./../../schema/organization";
import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";

console.log("Welcome to dashboard!");

// new Form(Schema).render("#add-organization-form");

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}

const renderStats = (data) => {
  for (let key in data) {
    $("#" + key).html(data[key]);
  }
}

const renderHourlyGraph = (data) => {

  const getHeading = (key) => {
    let result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  let statsData = [];
  let tableData = [];
  const grid = data.grid[0];

  for (let key in grid) {
    if (grid.hasOwnProperty(key)) {
      statsData.push({
        heading: getHeading(key),
        value: grid[key]
      });
      tableData.push(grid[key]);
    }
  }

  const hdata = data.grid;
  const totalSubmit = [];
  const totalDelivered = [];
  const newhoursList = [];
  for (var i = 0; i < 24; i++) {
    totalSubmit[i] = 0;
    totalDelivered[i] = 0;
    
    newhoursList[i] = year + "-" + month + "-" + day+"T" + i + ":00:00";
  }
  //var totalSubmit = [];
  for (let row in hdata) {
    var summaryHour = hdata[row]['summaryHour'];
    totalSubmit[summaryHour] = hdata[row]['totalSubmit'];
    totalDelivered[summaryHour] = hdata[row]['totalDelivered'];
  }


  var options = {
    chart: {
      height: 350,
      type: 'area',
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    series: [{
      name: 'Total Delivered',
      data: totalDelivered
    }, {
      name: 'Total Submit',
      data: totalSubmit
    }],

    xaxis: {
      type: 'datetime',
      categories: newhoursList,
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    }
  }
  // console.log(options);
  var chart = new ApexCharts(
    document.querySelector("#hourlyGraph"),
    options
  );

  chart.render();

}

const renderSummaryReportGraph = (data) => {
  const getHeading = (key) => {
    let result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  const grid = data.grid[0];

  let tableHeader = [];
  let tableData = [];
  let formattedTableHeader = [];
  for (let key in grid) {
    if (key !== "summaryDate") {
      if (grid.hasOwnProperty(key)) {
        tableHeader.push(key);
        formattedTableHeader.push(getHeading(key));
        tableData.push(grid[key]);
      }
    }
  }
  var colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A'];
  var options = {
    chart: {
      height: 350,
      type: 'bar',
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    series: [{

      data: tableData
    }],
    xaxis: {
      categories: formattedTableHeader,
      labels: {
        style: {
          colors: colors
        }
      }
    }
  }

  var chart = new ApexCharts(
    document.querySelector("#summaryReport"),
    options
  );

  chart.render();
}

function kFormatter(num) {
  return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
}

Request(Endpoints.get("dashboard"), "POST", {
  username: User.getName()
}).done(data => {
  if (Endpoints.validateResponse(data)) {
    const dashboardData = data.data || {};
    renderStats(dashboardData);
  }
});

Request(Endpoints.get("getHourlyReport"), "POST", {
  loggedInUserName: User.getName()
}).done(data => {
  //console.log(data);
  if (Endpoints.validateResponse(data)) {
    const dashboardData = data.data || {};
    renderHourlyGraph(dashboardData);

  }
});
// Arnav Changes for notification alert start 27-05-2024---------------------------------------

const bearerToken = User.getJWTToken()
console.log(bearerToken);

const userName = User.getName();
console.log(userName);
const url = `${Endpoints.get("creditAlertNotification")}?userName=${encodeURIComponent(userName)}`;
// Make the Fetch request
fetch(url, {
  method: 'GET', // or 'POST' if the endpoint expects a POST request
  headers: {
    'Authorization': bearerToken,
    'Content-Type': 'application/json' // Ensure the correct content type if necessary
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the response JSON
  })
  .then(data => {
    console.log(data);
    const messageCountElement = document.getElementById('messageCount');
    if (data && data.length > 0) {
      const messageCount = data.length; //set the notification count equals to the length of response

      //if notification count is more than 0, bg color of badge will be green
      messageCountElement.textContent = messageCount;
      messageCountElement.style.backgroundColor = 'red';
    } else {
      //if notification count is 0, bg color of badge will be red
      messageCountElement.textContent = 0;
      messageCountElement.style.backgroundColor = 'grey';
    }

    const tableBody = document.querySelector('#notificationModal .table-content tbody');
    tableBody.innerHTML = ''; // Clear existing content

    data.forEach(item => {
      const row = document.createElement('tr');
      const userNameCell = document.createElement('td');
      const availableCreditCell = document.createElement('td');

      userNameCell.textContent = item.userName;
      availableCreditCell.textContent = item.availableCredit;

      row.appendChild(userNameCell);
      row.appendChild(availableCreditCell);
      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('There was a problem with the Fetch operation:', error);
  });
 
// Arnav Changes for notification alert end--------------------------------------------------

var d = new Date();
var day = d.getDate();
var month = d.getMonth() + 1;
var year = d.getFullYear();
// console.log(year + "-" + month + "-" + day);

var todayDate = year + "-" + month + "-" + day;
// replace this variable in from and to date.. once it is live
Request(Endpoints.get("summaryReport"), "POST", {
  loggedInUserName: User.getName(),
  fromDate: todayDate,
  toDate: todayDate
}).done(data => {
  if (Endpoints.validateResponse(data)) {
    const dashboardData = data.data || {};
    renderSummaryReportGraph(dashboardData);
  }
});
