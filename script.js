// Panda Min's ChemLab - Interactive JavaScript
// Professional portfolio interactions and animations

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Smooth scrolling and animations
    initScrollAnimations();
    
    // Interactive elements
    initInteractiveElements();
    
    // Typing animation for hero text
    initTypingAnimation();
    
    // Benzene ring animations
    //initMolecularAnimations();
});

// Navigation Management
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.querySelector('.nav-menu');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active navigation link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 메뉴 항목 클릭 시 자동 닫기
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('mobile-active')) {
            navMenu.classList.remove('mobile-active');
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '☰';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
            }
        });
    });

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-active');
            this.innerHTML = navMenu.classList.contains('mobile-active') ? '✕' : '☰';
            this.setAttribute('aria-expanded', String(open));
        });
    }

    // Auto-highlight current section
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger delay for grid items
                if (entry.target.parentElement && entry.target.parentElement.classList.contains('grid')) {
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .card, .research-card, .activity-card');
    
    animatedElements.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        
        observer.observe(el);
    });

    // Parallax effect for hero section
    //window.addEventListener('scroll', function() {
    //    const scrolled = window.pageYOffset;
    //    const heroSection = document.querySelector('.section-hero');
    //    
    //    if (heroSection && scrolled < heroSection.offsetHeight) {
    //        heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
    //    }
    //});
}

// Interactive Elements
function initInteractiveElements() {
    // Card hover effects
    const cards = document.querySelectorAll('.card, .research-card, .activity-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (this.classList.contains('btn-primary')) {
                this.style.background = 'linear-gradient(135deg, #1e40af, #0ea5e9)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (this.classList.contains('btn-primary')) {
                this.style.background = 'linear-gradient(135deg, #1e3a8a, #0891b2)';
            }
        });
    });

    // Stats counter animation
    initStatsCounter();
    
    // Timeline interaction
    initTimelineInteraction();
}

// Stats Counter Animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = target.textContent;
                
                // Extract number from text
                const numberMatch = finalNumber.match(/\d+/);
                if (numberMatch) {
                    const number = parseInt(numberMatch[0]);
                    animateNumber(target, 0, number, 2000, finalNumber);
                }
                
                statsObserver.unobserve(target);
            }
        });
    });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateNumber(element, start, end, duration, finalText) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(function() {
        current += increment;
        
        if (current >= end) {
            element.textContent = finalText;
            clearInterval(timer);
        } else {
            const displayNumber = Math.floor(current);
            element.textContent = finalText.replace(/\d+/, displayNumber);
        }
    }, 16);
}

// Timeline Interaction
function initTimelineInteraction() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            // Toggle expanded state
            this.classList.toggle('expanded');
            
            // Add ripple effect
            createRipple(this, event);
        });
    });
}

function createRipple(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(30, 58, 138, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Typing Animation
function initTypingAnimation() {
    const typingElements = document.querySelectorAll('[data-type]');
    
    typingElements.forEach(element => {
        const text = element.dataset.type;
        element.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(function() {
            element.textContent += text.charAt(i);
            i++;
            
            if (i > text.length) {
                clearInterval(typeInterval);
            }
        }, 100);
    });
}

// Molecular Animations
//function initMolecularAnimations() {
//    // Benzene ring rotation
//    const benzeneRings = document.querySelectorAll('.benzene-ring');
    
//    benzeneRings.forEach(ring => {
//        // Add dynamic rotation speed based on scroll
//        window.addEventListener('scroll', function() {
//            const scrollSpeed = Math.abs(window.pageYOffset - (window.lastScrollTop || 0));
//            window.lastScrollTop = window.pageYOffset;
//            
//            const rotationSpeed = Math.min(scrollSpeed / 10, 5);
//            ring.style.animationDuration = `${Math.max(5 - rotationSpeed, 1)}s`;
//        });
//    });

    // Molecular background animation
//    createFloatingMolecules();
}

function createFloatingMolecules() {
    const benzeneBackgrounds = document.querySelectorAll('.benzene-bg');
    
    benzeneBackgrounds.forEach(bg => {
        // Create floating molecular structures
        for (let i = 0; i < 3; i++) {
            const molecule = document.createElement('div');
            molecule.className = 'floating-molecule';
            molecule.innerHTML = '⬢';
            
            molecule.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 20 + 10}px;
                color: rgba(30, 58, 138, 0.05);
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
                pointer-events: none;
                z-index: 0;
            `;
            
            bg.appendChild(molecule);
        }
    });
}

// Video Modal Functions
function openVideoModal() {
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.style.animation = 'fadeIn 0.3s ease-out';
        document.body.style.overflow = 'hidden';
    }
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Keyboard Navigation
document.addEventListener('keydown', function(event) {
    // ESC key to close modal
    if (event.key === 'Escape') {
        closeVideoModal();
    }
    
    // Arrow keys for section navigation
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        const sections = document.querySelectorAll('section[id]');
        const currentSection = getCurrentSection();
        
        if (currentSection) {
            const currentIndex = Array.from(sections).findIndex(s => s.id === currentSection);
            let targetIndex;
            
            if (event.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                targetIndex = currentIndex + 1;
            } else if (event.key === 'ArrowUp' && currentIndex > 0) {
                targetIndex = currentIndex - 1;
            }
            
            if (targetIndex !== undefined) {
                sections[targetIndex].scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    return current;
}

// Performance optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler
window.addEventListener('scroll', debounce(function() {
    updateActiveNavLink();
}, 10));

// Smooth page transitions
function initPageTransitions() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Add loading animation
                document.body.style.cursor = 'wait';
                
                setTimeout(() => {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    document.body.style.cursor = 'default';
                }, 100);
            }
        });
    });
}

// Initialize page transitions
initPageTransitions();



// Loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Print optimization
window.addEventListener('beforeprint', function() {
    // Expand all collapsed sections for printing
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.classList.add('expanded');
    });
});

window.addEventListener('afterprint', function() {
    // Restore collapsed state after printing
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.classList.remove('expanded');
    });
});

// Accessibility improvements
document.addEventListener('keydown', function(event) {
    // Tab navigation enhancement
    if (event.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add keyboard navigation styles
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 3px solid var(--primary-teal);
        outline-offset: 2px;
    }
`;
document.head.appendChild(keyboardStyle);

/* ===== Accordion (Community) ===== */
(function() {
  const acc = document.getElementById('community-accordion');
  if (!acc) return;

  const items = acc.querySelectorAll('.acc-item');

  function toggleItem(btn, panel, closeOthers = true) {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    if (closeOthers) {
      items.forEach(it => {
        const b = it.querySelector('.acc-button');
        const p = it.querySelector('.acc-panel');
        if (b !== btn) { b.setAttribute('aria-expanded', 'false'); p.classList.remove('open'); }
      });
    }
    btn.setAttribute('aria-expanded', !expanded);
    panel.classList.toggle('open', !expanded);
  }

  items.forEach(it => {
    const btn = it.querySelector('.acc-button');
    const panel = it.querySelector('.acc-panel');

    // 초기 상태
    btn.setAttribute('aria-expanded', 'false');
    panel.classList.remove('open');

    // 클릭/키보드
    btn.addEventListener('click', () => toggleItem(btn, panel));
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleItem(btn, panel); }
    });
  });

  // 해시로 특정 항목 열기 (#community-outreach 등)
  const hash = window.location.hash.replace('#', '');
  const map = {
    'community-outreach': 'button-outreach',
    'community-leadership': 'button-leadership',
    'community-events': 'button-events',
    'community-life': 'button-life'
  };
  if (map[hash]) {
    const btn = document.getElementById(map[hash]);
    if (btn) btn.click();
    // 스크롤 포커스
    setTimeout(() => btn.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }
})();

