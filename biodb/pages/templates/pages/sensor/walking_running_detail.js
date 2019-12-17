function onPageLoadWalkingAndRunningSensorDetail() {

    const tokenString = localStorage.getItem('biodb_token');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const dataString = this.responseText;
            const dataObj = JSON.parse(dataString);
            generateTableFromObject(dataObj);
        }
    }
    var detailURL = "/api/tsd-by-attribute-name?attribute_name=HKQuantityTypeIdentifierDistanceWalkingRunning"
    var url = "{{BACKEND_API_SERVER_ADDRESS}}" + detailURL
    xhttp.open("GET",url, true);
    xhttp.setRequestHeader('Authorization','Token '+tokenString)
    xhttp.send();
}

onPageLoadWalkingAndRunningSensorDetail()


function toGetUnitOfAttributes(name){
  if (name == 'HKQuantityTypeIdentifierStepCount') {
      return unit = "count"
  } else {
    return unit = "km"
  }
  }

function generateTableFromObject(dataObj) {

   var htmlText = "<tr>";

   htmlText += "<th>Sl.no</th>";
   htmlText += "<th>Attribute Name</th>";
   htmlText += "<th>Value</th>";
   htmlText += "<th>Creation Date</th>";
   htmlText += "</tr>";
   var pageCount = dataObj.count
   var nextPage = dataObj.next
   var previousPage = dataObj.previous
   console.log(pageCount)

   var instrumentArray = dataObj.results
   var i;
   for(i=0;i<instrumentArray.length;i++){
     var name = instrumentArray[i].attribute_name;
     var unit = toGetUnitOfAttributes(name)
     htmlText += "<tr>";
     htmlText += "<td>";
     htmlText += "<ul>"
     htmlText += "<tr>";
     htmlText += "<td>"+ (i+1).toString() + "</td>"
     htmlText += "<td>"+ name + "</td>"
     htmlText += "<td>"+((instrumentArray[i].value).toFixed(2)).toString() + " "+ unit +"</td>"
     htmlText += "<td>"+instrumentArray[i].creation_date+"</td>"
     htmlText += "</ul>"
     htmlText += "</td>"
     htmlText += "</tr>";

   }
     var tableElement = document.getElementById("data_table");
     tableElement.innerHTML = htmlText;
 }

 // $(document).ready(function() {
 //
 //   var pageItem = $("htmlText.pagination a").not("previousPage, nextPage");
 //
 //   pageItem.click(function() {
 //     pageItem.removeClass("active");
 //     $(this).not("previousPage, nextPage").addClass("active");
 //
 //     target = $(this).attr('href');
 //     $('.case-content > div').not(target).hide();
 //     $(target).fadeIn(600);
 //   });
 //
 //   $("previousPage").click(function() {
 //     $('a.active').removeClass('active').prev().addClass('active');
 //     if ($(this).hasClass("active"))
 //       $(this).removeClass('active').next().addClass('active');
 //     if ($(".case-content div:visible").prev().length != 0)
 //       $(".case-content > div:visible").prev().fadeIn(600).next().hide();
 //     return false;
 //   });
 //
 //   $("nextPage").click(function() {
 //     $('a.active').removeClass('active').next().addClass('active');
 //     if ($(this).hasClass("active"))
 //       // change below to next() if you want to put the brackets on the left
 //       $(this).removeClass('active').next().addClass('active');
 //     if ($(".case-content div:visible").next().length != 0)
 //       $(".case-content > div:visible").next().fadeIn(600).prev().hide();
 //     return false;
 //   });
 //
 // });
