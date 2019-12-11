function onPageLoadGetDashboardAPI() {

    const tokenString = localStorage.getItem('biodb_token');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const dataString = this.responseText;
            const dataObj = JSON.parse(dataString);
            // generateTableFromObject(dataObj);
        }
    }
    xhttp.open("GET","{{BACKEND_API_SERVER_ADDRESS}}/api/dashboard", true);
    xhttp.setRequestHeader('Authorization','Token '+tokenString)
    xhttp.send();
}

onPageLoadGetDashboardAPI();

function onLogoutClick() {
    window.location.href = "{% url 'login_page' %}";
}


function generateViewFromObject(dataObj) {
    if (dataObj.was_found === false) {
        alert("Sorry we could not find that instrument!");
        onBackClick();
    } else {
        var firstNameInputElement = document.getElementById("first_name");
        firstNameInputElement.innerHTML = dataObj.first_name;

    }
}

function onPageLoadRunGetProfileFromAPI() {

    const tokenString = localStorage.getItem('biodb_token');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const dataString = this.responseText;
            const dataObj = JSON.parse(dataString);
            generateViewFromObject(dataObj);
        }
    }
    const detailURL = "{{ BACKEND_API_SERVER_ADDRESS }}/api/user-profile/retrieve";
    console.log(detailURL);
    xhttp.open("GET", detailURL, true);
    xhttp.setRequestHeader('Authorization','Token '+tokenString)
    xhttp.send();
}

onPageLoadRunGetProfileFromAPI();


// function generateTableFromObject(dataObj) {
//    //This is the code which will create
//    // the table header row.
//    var htmlText = "<tr>";
//    htmlText += "<th>Attribute Name</th>";
//    htmlText += "<th>Value</th>";
//    htmlText += "<th>Creation Date</th>";
//    htmlText += "<th></th>";
//    htmlText += "</tr>";
//    const attributesArray = dataObj;
//
//
//    for (attributesObj of attributesArray) {
//        var idString = attributesObj.id.toString();
//        htmlText += "<tr>";
//        htmlText += "<td>"+attributesObj.attribute_name+"</td>"
//        htmlText += "<td>";
//        htmlText += "<ul>";
//        // var temperatureObj = instrumentObj.temperature;
//        // htmlText += "<li>Mean:" + temperatureObj.mean + "</li>"; // <li> means "list item"
//        // htmlText += "<li>Median:" + temperatureObj.median + "</li>";
//        // htmlText += "<li>Mode:" + temperatureObj.mode + "</li>";
//        // htmlText += "</ul>";
//        // htmlText += "</td>"; // TEMPERATURE ROW ENDS HERE
//
//        htmlText += "<td>";
//
//        htmlText += "<button onclick='onViewClick("+idString+");'>View</button>";
//        htmlText += "</td>";
//
//        htmlText += "</tr>";
//    }
//    var tableElement = document.getElementById("attributes_list");
//    tableElement.innerHTML = htmlText;
// }
