function onRegisterClick() {
    const firstName = document.getElementById("first_name").value
    const lastName = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 400) {
            alert("Error! Please try again!");
        } else if (this.readyState == 4 && this.status == 201) {
            window.location.href = "{% url 'register_success_page' %}";
        }
    }

    xhttp.open("POST", "{{ BACKEND_API_SERVER_ADDRESS }}/api/register", true);
    xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhttp.send("first_name="+firstName+"&last_name="+lastName+"&email="+email+"&username="+username+"&password="+password);
}
