document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:5000/getAll")
    .then((res) => res.json())
    .then((data) => loadHTMLTable(["data"]));
});

const btn = document.querySelector("#add_to_do");

btn.onclick = function () {
  const nameInput = document.querySelector("#input");
  const name = nameInput.value;
  (nameInput.value = ""),
    fetch("http://localhost:5000/insert", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name: name }),
    })
      .then((res) => res.json())
      .then((data) => insertRowIntoTable(data["data"]));
};

function insertRowIntoTable(params) {}

function loadHTMLTable(data) {
  const table = document.querySelector("li");

  if (data.length === 0) {
    table.innerHTML = "<i><p>No Data</p></i>";
  }
}
