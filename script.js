// Функция для получения данных с API
async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Ошибка при получении пользователей:", error);
    return [];
  }
}

// Функция для отображения списка пользователей
function renderUserList(users) {
  const userListElement = document.getElementById("user-list");
  userListElement.innerHTML = "";

  users.forEach((user) => {
    const userElement = document.createElement("div");
    userElement.classList.add("user");

    const idSpan = document.createElement("span");
    idSpan.textContent = `ID: ${user.id}`;
    userElement.appendChild(idSpan);

    const nameSpan = document.createElement("span");
    nameSpan.textContent = `Имя: ${user.name}`;
    userElement.appendChild(nameSpan);

    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Удалить";
    deleteBtn.addEventListener("click", () => deleteUser(user.id));
    userElement.appendChild(deleteBtn);

    userListElement.appendChild(userElement);
  });
}

// Функция для удаления пользователя
function deleteUser(userId) {
  const userList = getUsersFromLocalStorage();
  const updatedUserList = userList.filter((user) => user.id !== userId);
  saveUsersToLocalStorage(updatedUserList);
  renderUserList(updatedUserList);
}

function getUsersFromLocalStorage() {
  return JSON.parse(localStorage.getItem("userList")) || [];
}

function saveUsersToLocalStorage(users) {
  localStorage.setItem("userList", JSON.stringify(users));
}

// Загрузка пользователей при загрузке страницы
window.addEventListener("load", loadUsers);

async function loadUsers() {
  const users = await getUsers();
  saveUsersToLocalStorage(users);
  renderUserList(users);
}

function saveUsersToLocalStorage(users) {
  localStorage.setItem("userList", JSON.stringify(users));
}
