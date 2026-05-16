// 1. Navbar Scroll Effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// 2. Mobile Menu Toggle
const mobileBtn = document.getElementById("mobileBtn");
const navLinks = document.getElementById("navLinks");

mobileBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  const icon = mobileBtn.querySelector("i");
  if (navLinks.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});

// Close mobile menu on link click
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    mobileBtn.querySelector("i").classList.replace("fa-xmark", "fa-bars");
  });
});

// 3. Typing Effect
const typeWriterElement = document.getElementById("typewriter");
const phrases = [
  "Precision Data Annotation at Scale",
  "Intelligent Workflow Automation",
  "AI-Ready Data for Modern Enterprises",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typeWriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typeWriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentPhrase.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500; // Pause before new phrase
  }

  setTimeout(type, typeSpeed);
}

// Start typing effect after short delay
setTimeout(type, 1000);

// 4. Counter Animation
const counters = document.querySelectorAll(".counter");
let countersAnimated = false;

const animateCounters = () => {
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const duration = 2000; // 2 seconds
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameRate);
    const increment = target / totalFrames;
    let currentCount = 0;

    const updateCount = () => {
      currentCount += increment;
      if (currentCount < target) {
        counter.innerText = Math.ceil(currentCount);
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};

// 5. Intersection Observer for Scroll Animations & Counters
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("appear");

      // Trigger counter animation once when stats section appears
      if (entry.target.id === "stats" && !countersAnimated) {
        animateCounters();
        countersAnimated = true;
      }

      // Unobserve after appearing to maintain state
      if (entry.target.id !== "stats") {
        observer.unobserve(entry.target);
      }
    }
  });
}, observerOptions);

// Observe all elements with fade-in class and the stats section
document.querySelectorAll(".fade-in, #stats").forEach((el) => {
  observer.observe(el);
});

// 6. Contact Form Mailto Handler
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // UI: Show loading state on button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML =
      'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      company: document.getElementById("company").value,
      message: document.getElementById("message").value,
    };

    try {
      // Replace with your production URL once deployed
      const response = await fetch(
        "https://arvionyx.onrender.com/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const result = await response.json();

      if (result.success) {
        alert("Success! Our team will contact you shortly.");
        contactForm.reset();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Failed to send message. Please try again later.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

// Copy-to-Clipboard Functionality for Team Cards
document.addEventListener("DOMContentLoaded", () => {
  const copyButtons = document.querySelectorAll(".copy-btn");
  const toast = document.getElementById("clipboard-toast");

  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const textToCopy = button.getAttribute("data-copy");

      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            showToast();
          })
          .catch((err) => {
            console.error("Could not copy text: ", err);
          });
      } else {
        // Fallback for older browser engines
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
          showToast();
        } catch (err) {
          console.error("Fallback copy failed", err);
        }
        document.body.removeChild(textArea);
      }
    });
  });

  function showToast() {
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2500); // Display toast window for 2.5 seconds
  }
});
