document.addEventListener("DOMContentLoaded", () => {
  // --- Typewriter Effect ---
  const typewriterText = "I wrote some code for you...";
  const typewriterElement = document.querySelector(".typewriter");
  let i = 0;

  function typeWriter() {
    if (i < typewriterText.length) {
      typewriterElement.innerHTML += typewriterText.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }
  // No border change needed with new animation

  // Set a timeout to start the typing animation after the initial hero text fades in
  setTimeout(typeWriter, 1500);

  // --- Smooth Scroll for Run Program Button ---
  window.scrollToSection = function (id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  // --- Scroll Animations ---
  const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };
  const sectionsToAnimate = document.querySelectorAll(
    ".timeline-item, .reason-card, .final-message-section"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  }, observerOptions);

  sectionsToAnimate.forEach((section) => observer.observe(section));

  // --- Gallery Lightbox ---
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close-btn");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      lightbox.style.display = "block";
      lightboxImg.src = item.src;
    });
  });

  const closeLightbox = () => {
    lightbox.style.display = "none";
  };

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) {
      closeLightbox();
    }
  });

  // --- NEW: Theme Toggle Functionality ---
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Function to set the theme
  const setTheme = (isDark) => {
    if (isDark) {
      body.classList.add("dark-mode");
      themeToggle.textContent = "☀️"; // Sun icon for light mode
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark-mode");
      themeToggle.textContent = "🌙"; // Moon icon for dark mode
      localStorage.removeItem("theme");
    }
  };

  // Check for saved theme in localStorage on page load
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark" || (savedTheme === null && prefersDark)) {
    setTheme(true);
  } else {
    setTheme(false);
  }

  // Event listener for the toggle button
  themeToggle.addEventListener("click", () => {
    const isDarkMode = body.classList.contains("dark-mode");
    setTheme(!isDarkMode);
  });
});
