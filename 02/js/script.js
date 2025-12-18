// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animate skill bars on scroll
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                progressBar.style.width = width + '%';
                observer.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
};

// Animate stats counter
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(stat);
            }
        });
    }, {
        threshold: 0.5
    });

    stats.forEach(stat => {
        observer.observe(stat);
    });
};


// 은하수 커서 효과
const galaxyCursor = document.querySelector('.galaxy-cursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

if (galaxyCursor) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // 부드러운 커서 움직임
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;
        
        if (galaxyCursor) {
            galaxyCursor.style.left = cursorX + 'px';
            galaxyCursor.style.top = cursorY + 'px';
        }
        
        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // 호버 시 커서 확대 및 액션
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-category, .nav-link, .stat-item, .contact-item, .social-link, .tag, input, textarea');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (galaxyCursor) {
                galaxyCursor.classList.add('active');
                // 약간의 진동 효과
                galaxyCursor.style.transform = 'translate(-50%, -50%) scale(1.1)';
                setTimeout(() => {
                    if (galaxyCursor) {
                        galaxyCursor.style.transform = 'translate(-50%, -50%)';
                    }
                }, 200);
            }
        });
        el.addEventListener('mouseleave', () => {
            if (galaxyCursor) {
                galaxyCursor.classList.remove('active');
                galaxyCursor.style.transform = 'translate(-50%, -50%)';
            }
        });
    });

    // 모바일에서는 커서 효과 비활성화
    function checkMobile() {
        if (window.innerWidth <= 768) {
            if (galaxyCursor) galaxyCursor.style.display = 'none';
            document.body.style.cursor = 'auto';
        } else {
            if (galaxyCursor) galaxyCursor.style.display = 'block';
            document.body.style.cursor = 'none';
        }
    }

    checkMobile();
    window.addEventListener('resize', checkMobile);
}

// 섹션 타이틀 애니메이션
const sectionTitles = document.querySelectorAll('.section-title');
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.3
});

sectionTitles.forEach(title => {
    titleObserver.observe(title);
});

// 인트로 애니메이션
const introOverlay = document.querySelector('.intro-overlay');
const introSkip = document.querySelector('.intro-skip');
const body = document.body;

// 인트로 제거 함수
const removeIntro = () => {
    if (introOverlay) {
        introOverlay.classList.add('hidden');
        body.classList.remove('intro-active');
        
        // 인트로 제거 후 다른 애니메이션 시작
        setTimeout(() => {
            animateSkillBars();
            animateStats();
        }, 500);
    }
};

// 페이지 로드 즉시 인트로 표시 여부 결정
if (introOverlay) {
    // 서브페이지에서 돌아온 경우 인트로 건너뛰기 확인
    const referrer = document.referrer;
    
    // 서브페이지에서 돌아온 경우만 체크 (F5나 직접 접근 시에는 referrer가 없거나 같음)
    const isFromSubpage = referrer && referrer !== window.location.href && (
        referrer.includes('html/project-brand') ||
        referrer.includes('html/project-artwork') ||
        referrer.includes('html/project-video') ||
        referrer.includes('html/project-exhibition')
    );
    
    // URL 파라미터로 인트로 건너뛰기 확인
    const urlParams = new URLSearchParams(window.location.search);
    const skipIntroParam = urlParams.get('skipIntro') === 'true';
    
    // skip-intro 클래스가 이미 추가되어 있으면 (head 스크립트에서 추가됨) 건너뛰기
    const skipIntro = skipIntroParam || isFromSubpage || introOverlay.classList.contains('skip-intro');
    
    if (skipIntro) {
        // 서브페이지에서 돌아온 경우 즉시 인트로 숨기기
        introOverlay.style.display = 'none';
        introOverlay.classList.add('hidden', 'skip-intro');
        body.classList.remove('intro-active');
        
        // 애니메이션 시작
        setTimeout(() => {
            animateSkillBars();
            animateStats();
        }, 100);
    } else {
        // 인트로 표시 중에는 body 스크롤 막기
        body.classList.add('intro-active');
        
        // 스킵 버튼 클릭 시 인트로 즉시 제거
        if (introSkip) {
            introSkip.addEventListener('click', () => {
                removeIntro();
            });
        }
        
        // 2.5초 후 자동으로 인트로 제거
        setTimeout(() => {
            removeIntro();
        }, 2500);
    }
} else {
    // 인트로가 없으면 바로 시작
    document.addEventListener('DOMContentLoaded', () => {
        animateSkillBars();
        animateStats();
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // 인트로가 있으면 위에서 처리됨
    if (!introOverlay) {
        animateSkillBars();
        animateStats();
    }
});

// Add active class to nav link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add fade-in animation to project cards
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            projectObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    projectObserver.observe(card);
});

