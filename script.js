document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    const users = [
        { name: "User1", email: "user1@example.com", password: "password1" },
        { name: "User2", email: "user2@example.com", password: "password2" },
        { name: "User3", email: "user3@example.com", password: "password3" }
    ];

    function loginUser(email, password) {
        const user = users.find(u => u.email === email && u.password === password);
        return user ? user.name : null;
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;
            const userName = loginUser(email, password);
            if (userName) {
                // Autenticação bem-sucedida, salva no localStorage e redireciona
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("userName", userName);
                window.location.href = "chamada.html";
            } else {
                alert("Email ou senha incorretos.");
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Cadastro realizado com sucesso!");
        });
    }
});

function checkAuthentication() {
    if (!localStorage.getItem("isAuthenticated")) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "login.html";
    }
}

function logout() {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userName");
    window.location.href = "login.html";
}