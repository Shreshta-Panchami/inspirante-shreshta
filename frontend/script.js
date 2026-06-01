function login() {
  let u = document.getElementById("username").value;
  let p = document.getElementById("password").value;
  let role = document.getElementById("role").value;

  // Admin check
  if (role === "admin") {
    if (u === "admin" && p === "inspirante2026") {
      window.location.href = "admin.html";
    } else {
      document.getElementById("msg").innerText = "Invalid admin login";
    }
  }

  // Student check (basic demo)
  else {
    if (p === "student123") {
      window.location.href = "student.html";
    } else {
      document.getElementById("msg").innerText = "Invalid student login";
    }
  }
}