document.addEventListener('DOMContentLoaded', () => {
    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.querySelector('.theme-toggle');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.classList.add('fa-sun');
                icon.classList.remove('fa-moon');
            }
        }
    }

    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-mode');
            const icon = themeToggle.querySelector('i');

            if (icon) {
                icon.classList.toggle('fa-sun');
                icon.classList.toggle('fa-moon');
            }

            // Save user's theme preference
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Hamburger toggle (Collapsible navbar)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('open');
        });

        // Close the navbar when clicking outside
        document.addEventListener('click', (event) => {
            if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('open');
            }
        });
    }

    // Close navbar when a link is clicked (mobile-friendly)
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach((item) => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('open');
        });
    });

    // Form submission (dummy)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message!');
            contactForm.reset();
        });
    }
});
const roles = [
    "I'm a Web Developer",
    "I'm a Full Stack Developer",
    "I'm a UI/UX Designer",
    "I'm a Software Engineer"
];

const textElement = document.getElementById("typewriter-text");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentRole = roles[roleIndex];
    
    // Display the current text
    textElement.textContent = currentRole.substring(0, charIndex);
    
    if (!isDeleting && charIndex < currentRole.length) {
        // Typing the next character
        charIndex++;
        typingSpeed = 100;
    } else if (isDeleting && charIndex > 0) {
        // Deleting the previous character
        charIndex--;
        typingSpeed = 50;
    } else if (charIndex === currentRole.length) {
        // Finished typing, wait then start deleting
        isDeleting = true;
        typingSpeed = 1500; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next role
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before next word
    }
    
    setTimeout(type, typingSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
    // Start the typewriter effect
    setTimeout(type, 500);
});

// JavaScript for Interactive Slider
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.certificate-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  // Event Listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });

  // Auto-rotate (optional)
  // setInterval(nextSlide, 5000);
});

document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('projectModal');
  const closeModal = document.querySelector('.close-modal');

  // GitHub links for each project (add your actual links here)
  const githubLinks = {
  "Mobile Shopping Platform Website": "https://github.com/N1vas-B/Intern",
  "Task Management App": "https://github.com/N1vas-B/TaskApplication",
  "Book Store Management API": "https://github.com/N1vas-B/bookstore",
  "Blog Platform": "https://github.com/N1vas-B/MyPortfolio.git"
};


  projectCards.forEach(card => {
    const viewBtn = card.querySelector('.view-details-btn');
    
    viewBtn.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent card click from triggering
      
      const title = card.getAttribute('data-title');
      const image = card.getAttribute('data-image');
      const description = card.getAttribute('data-description');
      const tech = card.getAttribute('data-tech').split(', ');
      const duration = card.getAttribute('data-duration');
      const features = card.getAttribute('data-features').split('|');
      const githubLink = githubLinks[title] || "#";
      
      // Set modal content
      document.getElementById('modalProjectTitle').textContent = title;
      document.getElementById('modalProjectImage').src = image;
      document.getElementById('modalProjectImage').alt = title;
      document.getElementById('modalProjectDescription').textContent = description;
      document.getElementById('modalProjectLink').href = githubLink;
      document.getElementById('modalProjectDuration').textContent = duration;
      
      // Set technologies
      const techContainer = document.getElementById('modalProjectTech');
      techContainer.innerHTML = '';
      tech.forEach(techItem => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = techItem.trim();
        techContainer.appendChild(tag);
      });
      
      // Set features
      const featuresContainer = document.getElementById('modalProjectFeatures');
      featuresContainer.innerHTML = '';
      features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature.trim();
        featuresContainer.appendChild(li);
      });
      
      // Show modal
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  // Close when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});
function openSidebar() {
    document.getElementById("mySidebar").style.left = "0";
    document.getElementById("overlay").style.display = "block";
    document.querySelector('.brand-toggle').style.display = 'none';
  }

  function closeSidebar() {
    document.getElementById("mySidebar").style.left = "-260px";
    document.getElementById("overlay").style.display = "none";
    document.querySelector('.brand-toggle').style.display = 'flex';
  }
