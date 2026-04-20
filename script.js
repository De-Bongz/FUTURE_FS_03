// Smooth scroll for nav links
document.querySelectorAll('.navbar a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Theme Toggle
function toggleTheme() {
  document.body.classList.toggle("light-mode");
  const themeBtn = document.getElementById("themeToggle");
  if (document.body.classList.contains("light-mode")) {
    themeBtn.textContent = "🌙 Dark Mode";
  } else {
    themeBtn.textContent = "☀️ Light Mode";
  }
}
