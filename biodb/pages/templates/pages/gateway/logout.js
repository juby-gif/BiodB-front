function onLogoutClick() {
    localStorage.removeItem('biodb_token');

    window.location.href = "{% url 'login_page' %}";
}
