function onLoginClick() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 400) {
            alert("Sorry, Username or Password is Incorrect!")
        } else if (this.readyState == 4 && this.status == 200) {
            const responseString = this.responseText;
            const tokenString = JSON.parse(responseString).token;
            console.log(tokenString);
            localStorage.setItem('biodb_token', tokenString); //token is stored in browser database
            window.location.href = "{% url 'dashboard_page' %}";
        }
    }

    xhttp.open("POST", "{{ BACKEND_API_SERVER_ADDRESS }}/api/login", true);
    xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhttp.send("username="+username+"&password="+password);
}
