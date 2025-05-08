// src/utils/initDomScripts.js
export function initDomScripts() {
  if (typeof window === "undefined") return;

  // Mobile menu toggle
  document.addEventListener("DOMContentLoaded", () => {
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });

      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.classList.add("hidden");
        });
      });
    }
  });

  // Active nav link
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    // navLinks.forEach((link) => {
    //   link.classList.remove("active");
    //   if (link.getAttribute("href").substring(1) === current) {
    //     link.classList.add("active");
    //   }
    // });
  });

  // Back to top button
  const backToTopButton = document.getElementById("back-to-top");
  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.remove("opacity-0", "invisible");
        backToTopButton.classList.add("opacity-100", "visible");
      } else {
        backToTopButton.classList.add("opacity-0", "invisible");
        backToTopButton.classList.remove("opacity-100", "visible");
      }
    });

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Particle animation
  function createParticles() {
    const particles = document.getElementById("particles");
    if (!particles) return;

    const particleCount = 50;
    const colors = ["#FF1493", "#9370DB", "#D8BFD8"];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      const size = Math.random() * 5 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const opacity = Math.random() * 0.5 + 0.1;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 10;

      particle.style.position = "absolute";
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.borderRadius = "50%";
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.opacity = opacity;
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;

      particles.appendChild(particle);
    }
  }

  // Form submission handler
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const formspreeUrl = "https://formspree.io/f/xqapnorp";
    const formData = { name, email, subject, message };

    try {
      await fetch(formspreeUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log("Message sent to Formspree!");
      alert("Your message has been sent successfully!");
    } catch (error) {
      console.error("Error sending to Formspree:", error);
      alert("There was an error sending your message. Please try again later.");
    }
  };

  // Add floating animation styles
  const style = document.createElement("style");
  style.textContent = `
    @keyframes float {
      0%, 100% {
        transform: translateY(0) translateX(0);
      }
      25% {
        transform: translateY(-20px) translateX(10px);
      }
      50% {
        transform: translateY(-10px) translateX(20px);
      }
      75% {
        transform: translateY(-30px) translateX(-10px);
      }
    }
  `;
  document.head.appendChild(style);
  createParticles();

  // Skill bar animation
  const skillBars = document.querySelectorAll(".skill-bar");
  const observerOptions = { threshold: 0.5 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const bar = entry.target.querySelector(".skill-progress");
      if (entry.isIntersecting) {
        bar.style.animation = "fillBar 1.5s ease-out forwards";
      } else {
        bar.style.animation = "none";
        bar.style.transform = "scaleX(0)";
      }
    });
  }, observerOptions);

  skillBars.forEach((bar) => observer.observe(bar));
}
