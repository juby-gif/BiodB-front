var nextUrl = null;
var previousUrl = null;

function onPageLoadStepCountSensorDetail() {

    const tokenString = localStorage.getItem('biodb_token');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const dataString = this.responseText;
            const dataObj = JSON.parse(dataString);
            console.log(dataObj.count)
            generateTableFromObject(dataObj);
            nextUrl = dataObj.next;
            previousUrl = dataObj.previous;

        }
    }
    var detailURL = "/api/tsd-by-attribute-name?attribute_name=HKQuantityTypeIdentifierStepCount";
    var url = "{{BACKEND_API_SERVER_ADDRESS}}" + detailURL;
    xhttp.open("GET",url, true);
    xhttp.setRequestHeader('Authorization','Token '+tokenString)
    xhttp.send();
}

onPageLoadStepCountSensorDetail()

function onNextClick()
{
  const tokenString = localStorage.getItem('biodb_token');
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          const dataString = this.responseText;
          const dataObj = JSON.parse(dataString);
          generateTableFromObject(dataObj);
          nextUrl = dataObj.next;
          previousUrl = dataObj.previous;
          }
  }
  if( nextUrl == null){
    alert("This is the Last Page!")
  }
  xhttp.open("GET",nextUrl, true);
  xhttp.setRequestHeader('Authorization','Token '+tokenString)
  xhttp.send();
}

function onPreviousClick()
{
  const tokenString = localStorage.getItem('biodb_token');
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          const dataString = this.responseText;
          const dataObj = JSON.parse(dataString);
          console.log(dataObj.count)
          generateTableFromObject(dataObj);
          nextUrl = dataObj.next;
          previousUrl = dataObj.previous;

      }
  }
  if (previousUrl == null){
    alert("This is the First Page!")
  }
  xhttp.open("GET",previousUrl, true);
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

   var htmlText = "<tr>";
   htmlText += "<th>Attribute Name</th>";
   htmlText += "<th>Value</th>";
   htmlText += "<th>Creation Date</th>";
   htmlText += "</tr>";
   var pageCount = dataObj.count
   var nextPage = dataObj.next
   var previousPage = dataObj.previous

   var instrumentArray = dataObj.results
   var i;
   for(i=0;i<instrumentArray.length;i++){
     var name = instrumentArray[i].attribute_name;
     var unit = toGetUnitOfAttributes(name)
     htmlText += "<tr>";

     htmlText += "<td>";
     htmlText += "<ul>"
     htmlText += "<tr>";
     htmlText += "<td>"+ name + "</td>"
     htmlText += "<td>"+((instrumentArray[i].value).toFixed(2)).toString() + " "+ unit +"</td>"
     htmlText += "<td>"+instrumentArray[i].creation_date.toString() +"</td>"
     htmlText += "</ul>"
     htmlText += "</td>"
     htmlText += "</tr>";

   }
     var tableElement = document.getElementById("data_table");
     tableElement.innerHTML = htmlText;
 }


function onBackClick() {
    window.location.href = "{% url 'dashboard_page' %}";
  }
