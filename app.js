// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  offset: 100
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Close mobile menu when clicking on a link
const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80; // Account for fixed nav
      const targetPosition = target.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar background on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('shadow-lg');
  } else {
    nav.classList.remove('shadow-lg');
  }
});

// Initialize Charts
function initCharts() {
  // Chart 1 - Lead Management Improvement
  const ctx1 = document.getElementById('chart1');
  if (ctx1) {
    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['Before', 'After'],
        datasets: [
          {
            label: 'Lead Response Time (hours)',
            data: [48, 12],
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2
          },
          {
            label: 'Pipeline Visibility (%)',
            data: [45, 95],
            backgroundColor: 'rgba(147, 51, 234, 0.8)',
            borderColor: 'rgba(147, 51, 234, 1)',
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          title: {
            display: true,
            text: 'Lead Management Performance',
            font: {
              size: 16,
              weight: 'bold'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }

  // Chart 2 - Time Savings from Automation
  const ctx2 = document.getElementById('chart2');
  if (ctx2) {
    new Chart(ctx2, {
      type: 'doughnut',
      data: {
        labels: ['Automated', 'Manual Work Remaining'],
        datasets: [{
          data: [75, 25],
          backgroundColor: [
            'rgba(234, 179, 8, 0.8)',
            'rgba(229, 231, 235, 0.8)'
          ],
          borderColor: [
            'rgba(234, 179, 8, 1)',
            'rgba(229, 231, 235, 1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'Workflow Automation Impact',
            font: {
              size: 16,
              weight: 'bold'
            }
          }
        }
      }
    });
  }

  // Chart 3 - Customer Service Metrics
  const ctx3 = document.getElementById('chart3');
  if (ctx3) {
    new Chart(ctx3, {
      type: 'line',
      data: {
        labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
        datasets: [
          {
            label: 'Customer Satisfaction (%)',
            data: [72, 78, 82, 88, 92, 96],
            borderColor: 'rgba(34, 197, 94, 1)',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            tension: 0.4,
            fill: true,
            borderWidth: 3
          },
          {
            label: 'Queue Time (minutes)',
            data: [25, 22, 18, 15, 12, 10],
            borderColor: 'rgba(239, 68, 68, 1)',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.4,
            fill: true,
            borderWidth: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          title: {
            display: true,
            text: 'Customer Service Improvement Over Time',
            font: {
              size: 16,
              weight: 'bold'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', initCharts);

// Contact form handling
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      service: formData.get('service'),
      message: formData.get('message')
    };
    
    // Disable submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
    
    try {
      const response = await axios.post('/.netlify/functions/contact', data);
      
      if (response.data.success) {
        formMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg';
        formMessage.textContent = response.data.message;
        formMessage.classList.remove('hidden');
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.classList.add('hidden');
        }, 5000);
      }
    } catch (error) {
      formMessage.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg';
      formMessage.textContent = error.response?.data?.error || 'An error occurred. Please try again.';
      formMessage.classList.remove('hidden');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.ceil(start);
    }
  }, 16);
}

// Animate counters when they come into view
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.stat-counter');
      counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        animateCounter(counter, target);
      });
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe stats section
const statsSection = document.querySelector('.grid.grid-cols-3');
if (statsSection) {
  observer.observe(statsSection);
}

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.card-hover');
serviceCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Log page load for analytics
console.log('Portfolio loaded successfully');
console.log('Built with Hono + Cloudflare Pages');
