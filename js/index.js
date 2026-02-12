// ============================================
// PORTFOLIO - Jo Hyo Hee
// MetaLab-inspired Motion System
// ============================================

// -------- Dark Mode Toggle --------
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.setAttribute('data-theme', 'dark');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

// -------- Preloader --------
const preloader = document.getElementById('preloader');

function hidePreloader() {
  if (!preloader) return;
  preloader.classList.add('done');
  document.body.classList.remove('loading');
  // Trigger hero reveals after preloader fades
  setTimeout(() => {
    triggerHeroReveals();
  }, 400);
}

window.addEventListener('load', () => {
  setTimeout(hidePreloader, 2200);
});

// -------- Custom Reveal System (replaces AOS) --------
function triggerHeroReveals() {
  const heroReveals = document.querySelectorAll('.intro [data-reveal]');
  heroReveals.forEach(el => {
    const delay = parseInt(el.getAttribute('data-reveal-delay') || 0);
    setTimeout(() => {
      el.classList.add('revealed');
    }, delay);
  });
}

// IntersectionObserver for scroll-triggered reveals
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = parseInt(el.getAttribute('data-reveal-delay') || 0);

      // Don't reveal hero elements via observer — they use preloader timing
      if (el.closest('.intro')) return;

      setTimeout(() => {
        el.classList.add('revealed');
      }, delay);
      revealObserver.unobserve(el);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('[data-reveal]').forEach(el => {
  // Hero elements handled separately
  if (!el.closest('.intro')) {
    revealObserver.observe(el);
  }
});

// Stagger reveal observer
const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      staggerObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.stagger-reveal').forEach(el => {
  staggerObserver.observe(el);
});

// Section line + number reveal
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const line = entry.target.querySelector('.section-line');
      const num = entry.target.querySelector('.section-number');
      if (line) setTimeout(() => line.classList.add('revealed'), 300);
      if (num) setTimeout(() => num.classList.add('revealed'), 100);
      sectionObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.section-header').forEach(el => {
  sectionObserver.observe(el);
});

// -------- AOS Init (kept for any remaining data-aos elements) --------
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
  });
}

// -------- Typing Effect --------
const quotes = [
  `"A frontend developer who pursues a better web, even at this very moment."`
];
let quotesIndex = 0;
let charIndex = 0;
const quotesElement = document.getElementById('typing');

function type() {
  const current = quotes[quotesIndex];
  quotesElement.textContent = current.slice(0, charIndex + 1);
  charIndex++;
  if (charIndex < current.length) {
    setTimeout(type, 50);
  }
}
if (quotesElement) {
  quotesElement.textContent = '';
  // Delay typing to sync with preloader
  setTimeout(type, 3200);
}

// -------- Parallax Scroll --------
const parallaxElements = document.querySelectorAll('[data-parallax]');
const epilogueBigText = document.querySelector('.epilogue-big-text span');

function updateParallax() {
  const scrollY = window.scrollY;

  parallaxElements.forEach(el => {
    const speed = parseFloat(el.getAttribute('data-parallax'));
    const rect = el.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    const offset = (centerY - window.innerHeight / 2) * speed;
    el.style.transform = `translateY(${offset}px)`;
  });

  // Horizontal scroll effect on epilogue big text
  if (epilogueBigText) {
    const rect = epilogueBigText.getBoundingClientRect();
    const progress = 1 - (rect.top / window.innerHeight);
    if (progress > 0 && progress < 2) {
      const offset = (progress - 0.5) * -80;
      epilogueBigText.style.transform = `translateX(${offset}px)`;
    }
  }
}

window.addEventListener('scroll', updateParallax, { passive: true });

// -------- Magnetic Buttons --------
const magneticBtns = document.querySelectorAll('.magnetic');

magneticBtns.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});

// -------- Custom Cursor --------
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline && window.innerWidth > 768) {
  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX - 4 + 'px';
    cursorDot.style.top = mouseY - 4 + 'px';
  });

  function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const hoverTargets = document.querySelectorAll('a, button, .project-card, input, label');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
  });
}

// -------- Scroll Progress Bar --------
const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  if (scrollProgress) {
    scrollProgress.style.width = scrollPercent + '%';
  }
}, { passive: true });

// -------- Navigation Scroll Effect --------
const mainNav = document.querySelector('.main-nav');
window.addEventListener('scroll', () => {
  if (mainNav) {
    if (window.scrollY > 50) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }
  }
}, { passive: true });

// -------- Active Section Detection --------
const sections = document.querySelectorAll('main, section');
const navLinks = document.querySelectorAll('.nav-link');
const dots = document.querySelectorAll('.section-dots .dot');

function updateActiveSection() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 200;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === current) {
      link.classList.add('active');
    }
  });

  dots.forEach(dot => {
    dot.classList.remove('active');
    if (dot.getAttribute('data-section') === current) {
      dot.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveSection, { passive: true });

// -------- Mobile Nav Toggle --------
const navToggle = document.querySelector('.nav-toggle');
const navLinksContainer = document.querySelector('.nav-links');

if (navToggle && navLinksContainer) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
  });

  navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinksContainer.classList.remove('open');
    });
  });
}

// -------- Project Carousel --------
let swiperInstance;
let projectSwiper;
const modal = document.getElementById('projectModal');
const modalClose = modal.querySelector('.modal-close');
const modalOverlay = modal.querySelector('.modal-overlay');
const modalSwiperWrapper = document.getElementById('modalSwiperWrapper');
const projectSwiperWrapper = document.getElementById('projectSwiperWrapper');

// All project data with type
const allProjects = [
  {
    type: 'publishing',
    title: '주택관리공단',
    card: 'project-card01.jpg',
    tag: 'Single',
    desc: '주택관리공단 홈페이지를<br>리디자인하여 제작하였습니다.',
    Contribution: '<strong>기여도 : 100%</strong>',
    skills: ['html', 'css', 'javascript', 'figma', 'Github'],
    bg: 'project-card01.png',
    links: {
      plan: 'https://docs.google.com/presentation/d/1rr1J4pH5-m-hv2dVzhk0ZfMPW3qt5pR5/edit?usp=sharing&ouid=108859944500099032843&rtpof=true&sd=true',
      figma: 'https://www.figma.com/design/uJCBtUTc8osVIkqO6Qm7Vc/Untitled?node-id=0-1&t=JzeTtCOpd71xYzkX-1',
      github: 'https://github.com/hyohee22/housingManagement.git',
      site: 'https://hyohee22.github.io/housingManagement/'
    }
  },
  {
    type: 'publishing',
    title: '스튜디오 지브리',
    card: 'project-card02.jpg',
    tag: 'Team',
    desc: '스튜디오 지브리 홈페이지를<br>리디자인하여 제작하였습니다.',
    Contribution: '<strong>기여도 : 39%</strong> <br> 제작페이지: 메인페이지(헤더, 이벤트, 지도), 서브페이지(회사정보, 소식, 이벤트, QnA)',
    skills: ['html', 'scss', 'javascript', 'figma', 'Github'],
    bg: 'project-card02.png',
    links: {
      plan: 'https://example.com/plan2.pdf',
      figma: 'https://www.figma.com/design/TE2nAzbjTP02nyKJGLW35W/Untitled?node-id=0-1&t=v4LxSbg91PcX6aFH-1',
      github: 'https://github.com/hyohee22/WebsiteREdesign-Ghibli.git',
      site: 'https://hyohee22.github.io/WebsiteREdesign-Ghibli/'
    }
  },
  {
    type: 'publishing',
    title: '프립',
    card: 'project-card03.jpg',
    tag: 'Single',
    desc: '프립 홈페이지를<br>리디자인하여 제작하였습니다.',
    Contribution: '<strong>기여도 : 100%</strong>',
    skills: ['html', 'scss', 'javascript', 'figma', 'Github'],
    bg: 'project-card03.png',
    links: {
      plan: '',
      figma: '',
      github: 'https://github.com/hyohee22/frip.git',
      site: 'https://hyohee22.github.io/frip/'
    }
  },
  {
    type: 'publishing',
    title: '롯데리아',
    card: 'project-card04.jpg',
    tag: 'Team',
    desc: '롯데리아 홈페이지를<br>리디자인하여 제작하였습니다.',
    Contribution: '<strong>기여도 : 43%</strong> <br> 제작페이지: 메인페이지(메인푸터, 배너, 숏츠, 매장찾기, 서브푸터), 서브페이지(브랜드)',
    skills: ['html', 'scss', 'javascript', 'figma', 'Github'],
    bg: 'project-card04.png',
    links: {
      plan: '',
      figma: 'https://www.figma.com/design/ccfH1wfZ0SsSsYr6sj7Qdq/Untitled?node-id=0-1&t=nk8TpipzmSVYEhzx-1',
      github: 'https://github.com/hyohee22/webRedesign-Lotteria.git',
      site: 'https://hyohee22.github.io/webRedesign-Lotteria/'
    }
  },
  {
    type: 'publishing',
    title: '와일드 리프트',
    card: 'project-card05_.jpg',
    tag: 'Team',
    desc: '와일드 리프트 홈페이지를<br>리디자인하여 제작하였습니다.',
    Contribution: '<strong>기여도 : 29%</strong> <br> 제작페이지: 메인페이지(캐릭터소개, 배너, 관련게임), 서브페이지(캐릭터 소개)',
    skills: ['html', 'scss', 'javascript', 'figma', 'Github'],
    bg: 'project-card05.png',
    links: {
      plan: '',
      figma: 'https://www.figma.com/design/sBI4tArVHDgKL6nuWS3zXf/Untitled?node-id=0-1&t=fJBgCjIQRmnF05HC-1',
      github: 'https://github.com/hyohee22/webRedesign-WildRift.git',
      site: 'https://hyohee22.github.io/webRedesign-WildRift/'
    }
  },
  {
    type: 'publishing',
    title: '세르보테크',
    card: 'project-card07_.png',
    tag: 'Team',
    desc: '제품 정보를 한눈에 확인할 수 있도록 슬라이더 기반의 UI를 적용했으며,<br>부드러운 디자인 톤을 통해 산업 분야의 무거운 이미지를 완화하고<br> 사용자에게 친근하게 다가갈 수 있도록 제작했습니다.',
    Contribution: '<strong>기여도 : 40%</strong>',
    skills: ['html', 'css', 'javascript', 'figma'],
    bg: 'project-card08.png',
    links: {
      plan: '',
      figma: '',
      github: '',
      site: 'http://servotech23.com/'
    }
  },
  {
    type: 'publishing',
    title: '티벌컨',
    card: 'project-card08_.png',
    tag: 'Team',
    desc: '기업의 전문성과 신뢰감을 효과적으로 전달할 수 있도록 전체적인 디자인을 세련되고 <br> 정돈된 방향으로 구성했습니다. 불필요한 요소를 최소화하고 깔끔한 레이아웃과<br> 컬러 톤을 적용하여 신뢰할 수 있는 기업 이미지를 전달하는 데 중점을 두었습니다.',
    Contribution: '<strong>기여도 : 40%</strong>',
    skills: ['html', 'css', 'javascript', 'figma'],
    bg: 'project-card09.png',
    links: {
      plan: '',
      figma: '',
      github: '',
      site: 'http://www.t-vulcan.com/'
    }
  },
  {
    type: 'publishing',
    title: '리얼디자인테크',
    card: 'project-card09_.png',
    tag: 'Team',
    desc: '운동기구를 개발하는 기업의 특성을 고려하여 신뢰감 있고 안정적인<br>  기업 이미지를 전달하는 데 중점을 두었습니다. 특히 제품의 기능과 시스템 구조가 명확하게<br>  전달될 수 있도록 기능 중심의 정보 구성과 레이아웃으로 디자인을 진행했습니다.',
    Contribution: '<strong>기여도 : 40%</strong>',
    skills: ['html', 'css', 'javascript', 'figma'],
    bg: 'project-card10.gif',
    links: {
      plan: '',
      figma: 'https://www.figma.com/design/ei9tRpf04Z712B3Iirl6qJ/Untitled?node-id=0-1&t=JTsvHfcUjIcTK8ck-1',
      github: '',
      site: ''
    }
  },
  // ---- AI Projects ----
  {
    type: 'ai',
    title: '라움건축사사무소',
    card: 'project-card11.jpg',
    tag: 'AI/Design',
    desc: 'AI를 활용하여<br>제작하였습니다.',
    Contribution: '',
    skills: ['Claude', 'figma'],
    bg: 'project-card11.gif',
    links: { plan: '', figma: 'https://www.figma.com/design/G6VJMW187Mn5sXMV5Fi7F0/Untitled?node-id=0-1&t=9c3XcFGYJSMpPmmv-1', github: '', site: '' }
  },
  {
    type: 'ai',
    title: '해빗 트레커',
    card: 'project-card13.png',
    tag: 'AI',
    desc: 'AI를 활용하여<br>제작하였습니다.',
    Contribution: '<strong>기여도 : 100%</strong>',
    skills: ['AI Studio'],
    bg: 'project-card13.gif',
    links: { plan: '', figma: '', github: '', site: '' }
  }
];

let activeTab = 'publishing';
let filteredProjects = [];

// Build carousel slides from data
function buildCarousel(tab) {
  activeTab = tab;
  filteredProjects = allProjects.filter(p => p.type === tab);

  // Destroy old swiper
  if (projectSwiper && projectSwiper.destroy) {
    projectSwiper.destroy(true, true);
  }

  if (filteredProjects.length === 0) {
    projectSwiperWrapper.innerHTML = '<div class="project-empty">준비 중입니다.</div>';
    document.querySelector('#projectScrollbar').style.display = 'none';
    return;
  }

  document.querySelector('#projectScrollbar').style.display = '';

  // Build slide HTML
  projectSwiperWrapper.innerHTML = filteredProjects.map((p, i) => `
    <div class="swiper-slide">
      <div class="project-card" data-index="${i}">
        <div class="project-card-img">
          <img src="images/${p.card}" alt="${p.title}">
        </div>
        <div class="project-card-info">
          <p>${p.title}</p>
          <span class="project-tag">${p.tag}</span>
        </div>
      </div>
    </div>
  `).join('');

  // Init swiper
  projectSwiper = new Swiper('.project-swiper', {
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    initialSlide: 0,
    speed: 600,
    spaceBetween: 24,
    freeMode: {
      enabled: true,
      sticky: true,
      momentumRatio: 0.6,
      momentumVelocityRatio: 0.6,
      momentumBounce: true,
      momentumBounceRatio: 0.8,
    },
    scrollbar: {
      el: '#projectScrollbar',
      draggable: true,
      hide: false,
      snapOnRelease: true,
      dragSize: 36,
    },
  });
}

// Init first tab
buildCarousel('publishing');

// Tab click
document.querySelectorAll('.project-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    if (tab.dataset.tab === activeTab) return;
    document.querySelectorAll('.project-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    buildCarousel(tab.dataset.tab);
  });
});

// Skill icon mapping
function getSkillIcon(skill) {
  const map = {
    html: 'skill01.png',
    css: 'skill02.png',
    scss: 'skill03.png',
    javascript: 'skill05.png',
    figma: 'skill10.png',
    Github: 'skill07.png',
    react: 'skill06.png',
    bootstrap: 'skill08.png',
    Claude: 'skill-claude.png',
    'AI Studio': 'skill-aistudio.png'
  };
  return map[skill] || 'skill00.png';
}

// Card click -> open modal (event delegation)
document.querySelector('.project-swiper').addEventListener('click', (e) => {
  const card = e.target.closest('.project-card');
  if (!card) return;
  const idx = parseInt(card.dataset.index);
  if (isNaN(idx)) return;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  const slidesHtml = filteredProjects.map((data) => {
    return `
      <div class="swiper-slide">
        <div class="modal-slide-inner">
          <div class="modal-text-box">
            <h3>ReDesign</h3>
            <h1>${data.title}</h1>
            <p>${data.desc}</p>
            <p class="modal-text-span">${data.Contribution}</p>
            <div class="skill-icons">
              ${data.skills.map(skill => `<img src="images/${getSkillIcon(skill)}" alt="${skill}">`).join('')}
            </div>
          </div>
          <div class="modal-img-box">
            ${data.gif ? `<img src="images/${data.gif}"
            alt="프로젝트 미리보기"
            class="project-gif ${data.title === '공차' ? 'gongcha-gif' : data.title === '포트폴리오' ? 'portfolio-gif' : ''}">` : ''}
            <img src="images/${data.bg}" alt="프로젝트 사진" class="mobile-preview">
          </div>
          <div class="btn-group">
            ${data.links.plan ? `<a href="${data.links.plan}" target="_blank" class="modal-btn">기획서</a>` : ''}
            ${data.links.figma ? `<a href="${data.links.figma}" target="_blank" class="modal-btn">Figma</a>` : ''}
            ${data.links.github ? `<a href="${data.links.github}" target="_blank" class="modal-btn">Github</a>` : ''}
            ${data.links.site ? `<a href="${data.links.site}" target="_blank" class="modal-btn pint">홈페이지</a>` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');

  modalSwiperWrapper.innerHTML = `
    <div class="swiper modal-swiper">
      <div class="swiper-wrapper">
        ${slidesHtml}
      </div>
      <div class="swiper-button-prev"><i class="bi bi-chevron-left"></i></div>
      <div class="swiper-button-next"><i class="bi bi-chevron-right"></i></div>
    </div>
  `;

  setTimeout(() => {
    if (swiperInstance && swiperInstance.destroy) {
      swiperInstance.destroy(true, true);
    }

    swiperInstance = new Swiper('.modal-swiper', {
      loop: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      observer: true,
      observeParents: true,
      initialSlide: idx,
    });
  }, 0);
});

// Close modal
function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
if (modalOverlay) {
  modalOverlay.addEventListener('click', closeModal);
}

// ESC key close modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    closeModal();
  }
});

// -------- Email Copy --------
const emailElement = document.getElementById('email');
if (emailElement) {
  emailElement.addEventListener('click', () => {
    const email = 'whgygml2580@naver.com';

    navigator.clipboard.writeText(email)
      .then(() => {
        const originalHTML = emailElement.innerHTML;
        emailElement.textContent = 'Copied!';
        emailElement.classList.add('copied');

        setTimeout(() => {
          emailElement.innerHTML = originalHTML;
          emailElement.classList.remove('copied');
        }, 1200);
      })
      .catch((err) => {
        console.error('Copy failed:', err);
      });
  });
}

// -------- Top Button with progress ring --------
const topBtn = document.getElementById('topBtn');
const topBtnFill = document.getElementById('topBtnFill');
const CIRCUMFERENCE = 2 * Math.PI * 21; // r=21

if (topBtn) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;

    // Show / hide
    if (scrollTop > 400) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }

    // Update progress ring
    if (topBtnFill) {
      const offset = CIRCUMFERENCE * (1 - progress);
      topBtnFill.style.strokeDashoffset = offset;
    }
  }, { passive: true });

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// -------- Smooth scroll for anchor links --------
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
