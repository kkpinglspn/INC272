function headingCreator(text, level) {
  const heading = document.createElement(`h${level}`);

  heading.textContent = text;

  document.body.appendChild(heading);
}

function logoutButton() {
  const button = document.createElement("button");

  button.textContent = "Logout";
  button.classList.add("btn", "btn-danger", "text-white", "logout-button");
  button.addEventListener("click", () => {
    if (localStorage.getItem("loggedIn") === "true") {
      localStorage.removeItem("loggedIn");
      Swal.fire({
        title: "Logged out",
        text: "You have been logged out successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.href = "/";
      });
    }
  });

  document.body.appendChild(button);
}
