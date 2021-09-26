const inputEl = document.querySelector(".input");
const btn = document.querySelector(".btn");
const wrapper = document.querySelector(".wrapper");
let users;

window.addEventListener("DOMContentLoaded", onLoad);
btn.addEventListener("click", onClick);

function fetchUsers() {
  return fetch("https://jsonplaceholder.typicode.com/users").then(
    (responce) => {
      return responce.json();
    }
  );
}

function onLoad() {
  fetchUsers().then((data) => {
    users = data;
    console.log(users);
    const markup = createMarkup(data);
    wrapper.insertAdjacentHTML("beforeend", markup);
  });
}

function createMarkup(arr) {
  return arr
    .map((e) => {
      return `<div>
  <p>${e.name}</p>
  <p>${e.email}</p>
</div>`;
    })
    .join("");
}

function createElMarkup(arr) {
  return arr
    .map((e) => {
      return `<div>
  <p>${e.name}</p>
  <p>${e.email}</p>
    <p>${e.address.city}</p>
      <p>${e.phone}</p>
        <p>${e.username}</p>
        <p>${e.website}</p>
</div>`;
    })
    .join("");
}

function onClick() {
  const valueInput = inputEl.value.toLowerCase();
  const newArr = users.filter((e) => e.name.toLowerCase().includes(valueInput));
  if (newArr.length === 0) {
    return (wrapper.innerHTML = `<p>No information</p>`);
  }
  if (newArr.length === 1) {
    wrapper.innerHTML = "";
    return wrapper.insertAdjacentHTML("beforeend", createElMarkup(newArr));
  }
  wrapper.innerHTML = "";
  wrapper.insertAdjacentHTML("beforeend", createMarkup(newArr));
}
