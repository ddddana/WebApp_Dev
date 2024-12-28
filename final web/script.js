javascript 
function addToCart(productName, price) { 
    alert(`${productName} has been added to your cart for $${price}.`); 
} 
// Состояние входа пользователя (имитация)
let isLoggedIn = true; // Установите true для залогиненного пользователя, false для неавторизованного

// Загрузка профиля
function loadProfile() {
    const profileContent = document.getElementById('profile-content');

    if (isLoggedIn) {
        // Если пользователь залогинен, показываем профиль
        profileContent.innerHTML = `
            <p>Name: John Doe</p>
            <p>Email: john.doe@example.com</p>
            <button onclick="logOut()">Log Out</button>
        `;
    } else {
        // Если пользователь не залогинен, предлагаем войти
        profileContent.innerHTML = `
            <p>You are not logged in.</p>
            <button onclick="redirectToLogin()">Log In</button>
        `;
    }
}

// Функция выхода
function logOut() {
    isLoggedIn = false;
    alert("You have been logged out.");
    loadProfile();
}

// Перенаправление на страницу входа
function redirectToLogin() {
    window.location.href = "login.html";
}

// Загружаем профиль при загрузке страницы
document.addEventListener('DOMContentLoaded', loadProfile);
