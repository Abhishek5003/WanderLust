const btn = document.getElementById("theme-btn");

const body = document.body;

const icon = btn.querySelector("i");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  body.classList.add("dark");

  icon.className = "fa-solid fa-sun";
}

btn.addEventListener("click", () => {
  body.classList.toggle("dark");

  const dark = body.classList.contains("dark");

  icon.className = dark ? "fa-solid fa-sun" : "fa-solid fa-moon";

  localStorage.setItem("theme", dark ? "dark" : "light");
});
