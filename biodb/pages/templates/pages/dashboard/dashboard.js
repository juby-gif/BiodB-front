
function onStepCountSensorClick() {
    const tokenString = localStorage.getItem('biodb_token');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const dataString = this.responseText;
            const dataObj = JSON.parse(dataString);
            generateTableFromObject(dataObj);
        }
    }
    var detailURL = "/api/tsd?attribute_name=HKQuantityTypeIdentifierStepCount"
    var url = "{{BACKEND_API_SERVER_ADDRESS}}" + detailURL
    xhttp.open("GET",url, true);
    xhttp.setRequestHeader('Authorization','Token '+tokenString)
    xhttp.send();
}

// Taken from:  https://stackoverflow.com/questions/21355766/using-filereader-to-read-an-image-from-html-form
function onUploadEvent(input) {
    if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var base64FileUpload = e.target.result;
                uploadAppleHealthKitToApiEndpoint(base64FileUpload);

            }
            reader.readAsDataURL(input.files[0]);
    }
}


function uploadAppleHealthKitToApiEndpoint(base64file) {
    const tokenString = localStorage.getItem('biodb_token');
    var fakePath = document.getElementById("upload-apple-healthkit-export-file").value;
    var fileName = fakePath.split("\\").pop();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const dataString = this.responseText;
            const dataObj = JSON.parse(dataString);
            alert("You have successfully Uploaded the file")
        }
      }
    var detailURL = "/api/ios-healthkit-uploads"
    var url = "{{BACKEND_API_SERVER_ADDRESS}}" + detailURL
    xhttp.open("POST",url, true);
    xhttp.setRequestHeader('Authorization','Token '+tokenString);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ "upload_file_name": fileName, "upload_file": base64file }));
}



function onWalkingAndRunningCountSensorClick() {
    const tokenString = localStorage.getItem('biodb_token');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const dataString = this.responseText;
            const dataObj = JSON.parse(dataString);
            generateTableFromObject(dataObj);
        }
    }
    var detailURL = "/api/tsd?attribute_name=HKQuantityTypeIdentifierDistanceWalkingRunning"
    var url = "{{BACKEND_API_SERVER_ADDRESS}}" + detailURL
    xhttp.open("GET",url, true);
    xhttp.setRequestHeader('Authorization','Token '+tokenString)
    xhttp.send();
}

function toGetUnitOfAttributes(name){
  if (name == 'HKQuantityTypeIdentifierStepCount') {
      return unit = "count"
  } else {
    return unit = "km"
  }
  }

function generateTableFromObject(dataObj) {
   var instrument = dataObj
   var name = instrument.name
   var unit = toGetUnitOfAttributes(name)
   var htmlText = "<tr>";
   htmlText += "<th>Attribute Name</th>";
   htmlText += "<th>Mean</th>";
   htmlText += "<th>Mode</th>";
   htmlText += "<th>Median</th>";
   htmlText += "<th>Highest</th>";
   htmlText += "<th>Lowest</th>";
   htmlText += "</tr>";
   htmlText += "<ul>"
   htmlText += "<tr>";
   htmlText += "<td>"+ name + "</td>"
   htmlText += "<td>"+instrument.mean.toString() + " "+ unit +"</td>"
   htmlText += "<td>"+instrument.mode.toString() + " "+ unit +"</td>"
   htmlText += "<td>"+instrument.median.toString() + " " + unit +"</td>"
   htmlText += "<td>"+instrument.maximum.toString() + " " + unit +"</td>"
   htmlText += "<td>"+instrument.minimum.toString() + " " + unit +"</td>"
   htmlText += "</tr>";
   htmlText += "</ul>"
   htmlText += "<td>";
   if(name == 'HKQuantityTypeIdentifierStepCount'){
   htmlText += "<button onclick='onStepCountViewClick();'>View Records</button>";
 }
   else if(name == 'HKQuantityTypeIdentifierDistanceWalkingRunning'){
   htmlText += "<button onclick='onWalkingAndRunningViewClick();'>View Records</button>";
 }
   htmlText += "</td>";
   var tableElement = document.getElementById("statistics_table");
   tableElement.innerHTML = htmlText;
 }

function onLogoutClick() {
    window.location.href = "{% url 'logout_page' %}";
}

function generateViewFromObject(dataObj) {
    if (dataObj.was_found === false) {
        alert("Sorry no records found!");
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
    xhttp.open("GET", detailURL, true);
    xhttp.setRequestHeader('Authorization','Token '+tokenString)
    xhttp.send();
}

onPageLoadRunGetProfileFromAPI();

function onListUploadsClick(){
  const tokenString = localStorage.getItem('biodb_token');
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          const dataString = this.responseText;
          const dataObj = JSON.parse(dataString);
          generateTableForListFromObject(dataObj);

        }
    }
  const detailURL = "{{ BACKEND_API_SERVER_ADDRESS }}/api/list/ios-healthkit-uploads";
  xhttp.open("GET", detailURL, true);
  xhttp.setRequestHeader('Authorization','Token '+tokenString)
  xhttp.send();

}
function onProfileClick() {
      window.location.href = "{% url 'retrieve_user' %}";
}

function onStepCountViewClick() {
  window.location.href = "{% url 'step_count_detail_page' %}";
  }

function onWalkingAndRunningViewClick() {
    window.location.href = "{% url 'walking_running_detail_page' %}";
  }
function onBackClick() {
  window.location.href = "{% url 'login_page' %}";
}

function generateTableForListFromObject(dataObj){
  var htmlText = "<tr>";
  htmlText += "<th>SL.No</th>";
  htmlText += "<th>File</th>";
  htmlText += "</tr>";
  var count = dataObj.count
  var nextPage = dataObj.next
  var previousPage = dataObj.previous

  var listArray = dataObj.results
  var i;
  for(i=0;i<listArray.length;i++){
    var file = listArray[i].data_file;
    htmlText += "<ul>"
    htmlText += "<tr>";
    htmlText += "<td>" + (i+1).toString() + "</td>";
    htmlText += "<td>" + file + "</td>";
    htmlText += "</tr>"

    htmlText += "</ul>";

  }
  var tableElement = document.getElementById("uploads_list");
  tableElement.innerHTML = htmlText;
}
