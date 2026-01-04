function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("error");

    // validation
    if (username === "" || password === "") {
        error.textContent = "Please enter username and password";
        return;
    }

    // Allow any user to login
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("user", username);

    // Redirect to quiz page
    window.location.href = "index.html";
}
