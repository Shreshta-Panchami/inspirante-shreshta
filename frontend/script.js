async function login() {

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let role = document.getElementById("role").value;

  try {

    const response = await fetch("http://localhost:4731/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        role
      })
    });

    const data = await response.json();

    if (!response.ok) {
      document.getElementById("msg").innerText = data.message;
      return;
    }

    localStorage.setItem("username", username);

    if (data.role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "student.html";
    }

  } catch (error) {

    console.log(error);

    document.getElementById("msg").innerText =
      "Unable to connect to server";
  }
}