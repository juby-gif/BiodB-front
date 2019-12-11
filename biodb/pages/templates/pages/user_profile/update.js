function generateViewFromObject(dataObj) {
    if (dataObj.was_found === false) {
        alert("Sorry we could not find that instrument!");
        onBackClick();
    } else {
        var firstNameInputElement = document.getElementById("first_name");
        firstNameInputElement.value = dataObj.first_name;
        var lastNameInputElement = document.getElementById("last_name");
        lastNameInputElement.value = dataObj.last_name;
        var emailInputElement = document.getElementById("email");
        emailInputElement.value = dataObj.email;
        var usernameInputElement = document.getElementById("username");
        usernameInputElement.value = dataObj.username;
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


function onBackClick() {
    window.location.href = "{% url 'dashboard_page' %}";
}

function onSubmitClick() {
  const username = document.getElementById("username").value;
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const tokenString = localStorage.getItem('biodb_token');
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 400) {
          alert("Sorry, Username or Password is Incorrect!")
      } else if (this.readyState == 4 && this.status == 200) {
          const responseString = this.responseText;
          window.location.href = "{% url 'retrieve_user' %}";
      }
  }

  xhttp.open("PUT", "{{ BACKEND_API_SERVER_ADDRESS }}/api/user-profile/update", true);
  xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  xhttp.setRequestHeader('Authorization','Token '+tokenString)
  xhttp.send("username="+username+"&first_name="+first_name+"&last_name="+last_name+"&email="+email);
}
