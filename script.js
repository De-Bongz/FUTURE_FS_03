"use strict";

/* ================= THEME TOGGLE ================= */
function toggleTheme() {
    const body = document.body;
    const button = document.getElementById("themeToggle");

    body.classList.toggle("light-mode");

    button.textContent = body.classList.contains("light-mode")
        ? "🌙 Dark Mode"
        : "☀️ Light Mode";
}

/* ================= ACTIVE NAV HIGHLIGHT ================= */
const sections = document.querySelectorAll("section, header");
const navLinks = document.querySelectorAll(".navbar ul li a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const top = section.offsetTop - 120;
        const height = section.clientHeight;

        if (window.scrollY >= top && window.scrollY < top + height) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/* ================= SCROLL ANIMATION (CLEAN VERSION) ================= */
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll(".section, .service-card, .price-card, .testimonial-card")
.forEach(el => observer.observe(el));

/* ================= MOBILE MENU ================= */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");

        // change icon
        menuToggle.textContent = navMenu.classList.contains("active")
            ? "✖"
            : "☰";
    });

    // close menu on link click
    document.querySelectorAll(".navbar ul li a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.textContent = "☰";
        });
    });
}

/* ================= NAVBAR SCROLL EFFECT ================= */
let navbar = document.querySelector(".navbar");

let lastScroll = 0;

window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
});

/* ================= FORM VALIDATION ================= */
const form = document.querySelector(".contact-form");
const popup = document.getElementById("popupMessage");

function showPopup(message, color = "#25D366") {
    popup.textContent = message;
    popup.style.background = color;
    popup.style.display = "block";

    setTimeout(() => {
        popup.style.display = "none";
    }, 3000);
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.querySelector("input[type='text']").value.trim();
    const email = form.querySelector("input[type='email']").value.trim();
    const message = form.querySelector("textarea").value.trim();

    // Validation
    if (!name || !email || !message) {
        showPopup("⚠️ Please fill in all fields", "#ef4444");
        return;
    }

    // Email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showPopup("⚠️ Enter a valid email", "#ef4444");
        return;
    }

    // Success
    showPopup("✅ Message sent successfully!");

    form.reset();
});