"use strict";

/* ================= THEME TOGGLE ================= */
function toggleTheme() {
    const body = document.body;
    const button = document.getElementById("themeToggle");

    body.classList.toggle("light-mode");

    if (button) {
        button.textContent = body.classList.contains("light-mode")
            ? "🌙 Dark Mode"
            : "☀️ Light Mode";
    }
}

/* ================= SMOOTH SCROLL ================= */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

/* ================= ACTIVE NAV ================= */
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

/* ================= SCROLL ANIMATION ================= */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(
    ".section, .service-card, .price-card, .testimonial-card"
).forEach(el => observer.observe(el));

/* ================= MOBILE MENU ================= */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");

        menuToggle.textContent = navMenu.classList.contains("active")
            ? "✖"
            : "☰";
    });

    document.querySelectorAll(".navbar ul li a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.textContent = "☰";
        });
    });
}

/* ================= NAVBAR SCROLL EFFECT ================= */
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

/* ================= POPUP MESSAGE ================= */
const popup = document.getElementById("popupMessage");

function showPopup(message, color = "#25D366") {
    if (!popup) return;

    popup.textContent = message;
    popup.style.background = color;
    popup.style.display = "block";

    setTimeout(() => {
        popup.style.display = "none";
    }, 3000);
}

/* ================= CONTACT FORM (BACKEND CONNECTED) ================= */
const form = document.querySelector(".contact-form");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = form.querySelector("input[type='text']").value.trim();
        const email = form.querySelector("input[type='email']").value.trim();
        const message = form.querySelector("textarea").value.trim();

        // Validation
        if (!name || !email || !message) {
            showPopup("⚠️ Please fill in all fields", "#ef4444");
            return;
        }
        const submitBtn = form.querySelector("button");
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showPopup("⚠️ Enter a valid email", "#ef4444");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, message })
            });

            const data = await response.json();

            if (data.success) {
                showPopup("✅ Message sent successfully!");
                form.reset();
            } else {
                showPopup("❌ Failed to send message", "#ef4444");
            }
            submitBtn.textContent = "Send Message";
            submitBtn.disabled = false;

        } catch (error) {
            showPopup("⚠️ Server error. Try again later.", "#ef4444");
        }
    });
}