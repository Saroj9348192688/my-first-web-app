document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("loginForm");
  const result = document.getElementById("result");

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // stop page refresh

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    result.innerText = "Checking credentials... ⏳";
    result.style.color = "black";

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      const data = await response.json();

      if (data.success) {
        result.innerText = data.message;
        result.style.color = "green";
      } else {
        result.innerText = data.message;
        result.style.color = "red";
      }

    } catch (error) {
      result.innerText = "Server not reachable ❌";
      result.style.color = "red";
      console.error(error);
    }

  });

});
