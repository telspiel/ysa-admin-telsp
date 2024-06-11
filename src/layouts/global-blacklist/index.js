import "./../../scripts/app";
import "./styles";

import Form from "./../../scripts/form";
import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";

console.log("Welcome to Global Blacklist!");
console.log("Welcome to Global Blacklist! Mr. Arnav");


if (!User.isLoggedIn()) {
  window.location.href = "/login";
}


const bearerToken = User.getJWTToken();

document.getElementById('addButton').addEventListener('click', function() {
    const mobileNumber = document.getElementById('mobileNumber').value;
    const description = document.getElementById('description').value;

    if (!mobileNumber || !description) {
        alert('Please fill in both the mobile number and description.');
        return;
    }

    const fullMobileNumber = '91' + mobileNumber;

    const payload = {
        phoneNumber: fullMobileNumber,
        description: description
    };

    // Fetch the endpoint with authorization headers
    fetch(Endpoints.get("addBlacklistNumber"), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearerToken  
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        // Check if the response is not ok
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        // Determine the response content type
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();  // If JSON, parse it as JSON
        } else {
            return response.text();  // Otherwise, parse it as text
        }
    })
    .then(data => {
        let message = '';
        if (typeof data === 'string') {
            message = data;
            console.log(message);
        } else {
            // Validate the response data if it's JSON
            if (Endpoints.validateResponse(data)) {
                message = 'Success';
            } else {
                message = 'Failed to add number to blacklist.';
            }
        }

        const responseMessageElement = document.getElementById('responseMessage');
        responseMessageElement.textContent = message;
        responseMessageElement.style.display = 'block';

        // setting the background color based on the response message
        if (message === 'Number Added Successfully') {
            responseMessageElement.style.color = "#18705f";
            responseMessageElement.style.backgroundColor = '#d5f7f0';
            responseMessageElement.style.borderColor = "#c4f4eb";

        } else {
            responseMessageElement.style.color = "#852b3a";
            responseMessageElement.style.backgroundColor = '#ffdde2';
            responseMessageElement.style.borderColor = "#ffcfd7";
        }

        // Hide the response message after 3 seconds
        setTimeout(() => {
            responseMessageElement.style.display = 'none';
        }, 3000);

        window.scrollTo({ top: 0, behavior: "smooth" });

        //clearing input fields if API hit successfully
        document.getElementById('mobileNumber').value = '';
        document.getElementById('description').value = '';  
    })
    .catch(error => {
        console.error('Error calling the API:', error);
    });
});

  //clearing input fields when cancel button clicked
document.getElementById('cancelForm').addEventListener('click', function() {
    document.getElementById('mobileNumber').value = '';
    document.getElementById('description').value = '';
});


// Api to call single serach mobile number
document.getElementById('searchButton').addEventListener('click', function() {
    const mobileNumber = document.getElementById('blacklistMobileNumber').value;

    if (!mobileNumber) {
        alert('Please enter a mobile number to search.');
        return;
    }

    const fullMobileNumber = '91' + mobileNumber;

    // Construct the URL with the query parameter
    const url = new URL(Endpoints.get("searchMobileNumber"));
    url.searchParams.append('mobileNumber', fullMobileNumber);

    // Fetch the endpoint with authorization headers
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': bearerToken
        }
    })
    .then(response => {
        // Check if the response is not ok
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text();  // Assuming the response is text
    })
    .then(data => {
        console.log('Search Result:', data);

            //reseting the input fields
            document.getElementById('blacklistMobileNumber').value = '';

            // Clear existing table rows
            const tableBody = document.getElementById('blacklistTable').querySelector('tbody');
            tableBody.innerHTML = '';

            // Parse the data string into JSON
            const jsonData = JSON.parse(data);

            // Create a new row and append it to the table body
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${jsonData.phoneNumber}</td>
                <td>${jsonData.description}</td>
                <td><button class="delete-btn" data-id="${jsonData.phoneNumber}"> <i class="fas fa-trash-alt"></i></button></td>
            `;
            tableBody.appendChild(row);

               // Add event listener to the delete button
               row.querySelector('.delete-btn').addEventListener('click', function () {
                const phoneNumber = this.getAttribute('data-id');
                deleteBlacklistNumber(phoneNumber, row);
            });

    })
    .catch(error => {
        console.error('Error calling the API:', error);
        
    });
});


//API to delete phone number
function deleteBlacklistNumber(phoneNumber, row) {
    // Construct the URL with the query parameter
    const url = new URL(Endpoints.get("deleteBlacklistNumber"));
    url.searchParams.append('mobileNumber', phoneNumber);

    // Fetch the endpoint with authorization headers
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': bearerToken
        }
    })
    .then(response => {
        // Check if the response is not ok
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text();  // Assuming the response is text
    })
    .then(message => {

        const responseMessageElement = document.getElementById('deleteResponseMessage');
        responseMessageElement.textContent = message;
        responseMessageElement.style.display = 'block';
    
        if (message === 'Number Deleted Successfully') {
            responseMessageElement.style.color = "#18705f";
            responseMessageElement.style.backgroundColor = '#d5f7f0';
            responseMessageElement.style.borderColor = "#c4f4eb";
    
        } else {
            responseMessageElement.style.color = "#852b3a";
            responseMessageElement.style.backgroundColor = '#ffdde2';
            responseMessageElement.style.borderColor = "#ffcfd7";
        }
    
        // Hide the response message after 3 seconds
        setTimeout(() => {
            responseMessageElement.style.display = 'none';
        }, 3000);

        window.scrollTo({ top: 0, behavior: "smooth" });

        // Remove the row from the table when number gets deleted
        row.remove();
    })
    .catch(error => {
        console.error('Error deleting number:', error);
        // Show error message
        showResponseMessage('Failed to delete number.', false);
    });
}



//API to Upload Backlist Number in .txt file
document.getElementById('uploadButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileUpload');
    const uploadDescription = document.getElementById('uploadDescription').value;

    if (!fileInput.files.length) {
        alert('Please select a file to upload.');
        return;
    }

    if (!uploadDescription) {
        alert('Please enter a description.');
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
    // formData.append('uploadDescription', uploadDescription);

    // Construct the URL with the query parameter
    const url = new URL(Endpoints.get("uploadBlacklistNumber"));
    url.searchParams.append('fileType', 'txt');
    url.searchParams.append('uploadDescription', uploadDescription);


    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': bearerToken,
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Parse response as JSON (getting response in JSON only)
    })
    .then(data => {
        console.log('Upload Result:', data);
        const { totalCount, totalNumberSave } = data;

        // Verify if the values are correctly extracted
        console.log('Total Count:', totalCount);
        console.log('Total Number Save:', totalNumberSave);

        // Create the message string
        const message = `Total Count: ${totalCount}, Total Number Save: ${totalNumberSave}`;

        // Display the message
        const responseMessageElement = document.getElementById('uploadResponseMessage');
        responseMessageElement.textContent = message;
        responseMessageElement.style.display = 'block';
        responseMessageElement.style.color = "#18705f";
        responseMessageElement.style.backgroundColor = '#d5f7f0';
        responseMessageElement.style.borderColor = "#c4f4eb";

        // Hide the response message after 3 seconds
        setTimeout(() => {
            responseMessageElement.style.display = 'none';
        }, 3000);

        window.scrollTo({ top: 0, behavior: "smooth" });


        //reset input fields
        document.getElementById('fileUpload').value = '';
        document.getElementById('uploadDescription').value = '';
    })
    .catch(error => {
        console.error('Error uploading the file:', error);
    });
});

document.getElementById('cancelUploadForm').addEventListener('click', function() {
    document.getElementById('uploadDescription').value = '';
});