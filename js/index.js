// ✅ 타이핑 문장 (HTML 포함)
const quotes = [
  `“끊임없이 배우고, 만들어내며, 성장해왔습니다. <br>지금 이 순간도 더 나은 웹을 고민하는<br>프론트엔드 개발자입니다.”`
];

let quotesIndex = 0;
let charIndex = 0;
const quotesElement = document.getElementById('typing');

function type() {
  const current = quotes[quotesIndex];

  quotesElement.innerHTML = current.slice(0, charIndex + 1);
  charIndex++;

  // 문장 다 출력한 경우
  if (charIndex === current.length) {
    // 다음 문장 없으면 멈춤 or 다시 반복
    return; 
  } else {
    setTimeout(type, 50); // 타이핑 속도 조절
  }
}

type();


let swiperInstance;

// 요소 선택
const checkboxes = document.querySelectorAll('input[name="filter"]');
const cards = document.querySelectorAll('.project-card');
const modal = document.getElementById('projectModal');
const modalClose = modal.querySelector('.modal-close');
const modalSwiperWrapper = document.getElementById('modalSwiperWrapper');

// 카드별 모달 데이터 저장
const modalSlides = [
  {
    title: '주택관리공단',
    desc: '주택관리공단 홈페이지를<br> 리디자인하여 제작하였습니다.',
    skills: ['html', 'css', 'javascript', 'figma', 'Github'],
    gif: 'project01.gif',
    bg: 'project01-bg.png',
    links: {
      plan: 'https://docs.google.com/presentation/d/1rr1J4pH5-m-hv2dVzhk0ZfMPW3qt5pR5/edit?usp=sharing&ouid=108859944500099032843&rtpof=true&sd=true',
      figma: 'https://www.figma.com/design/uJCBtUTc8osVIkqO6Qm7Vc/Untitled?node-id=0-1&t=JzeTtCOpd71xYzkX-1',
      github: 'https://github.com/hyohee22/housingManagement.git',
      site: 'https://hyohee22.github.io/housingManagement/'
    }
  },
  {
    title: '스튜디오 지브리',
    desc: '스튜디오 지브리 홈페이지를<br> 리디자인하여 제작하였습니다.',
    skills: ['html', 'scss', 'javascript', 'figma', 'Github'],
    gif: 'project02.gif',
    bg: 'project02-bg.png',
    links: {
      plan: 'https://example.com/plan2.pdf',
      figma: 'https://www.figma.com/design/TE2nAzbjTP02nyKJGLW35W/Untitled?node-id=0-1&t=v4LxSbg91PcX6aFH-1',
      github: 'https://github.com/hyohee22/WebsiteREdesign-Ghibli.git',
      site: 'https://hyohee22.github.io/WebsiteREdesign-Ghibli/'
    }
  },
    {
    title: '프립',
    desc: '프립 홈페이지를<br> 리디자인하여 제작하였습니다.',
    skills: ['html', 'scss', 'javascript', 'figma', 'Github'],
    gif: 'project03.gif',
    bg: 'project03-bg.png',
    links: {
      plan: 'https://example.com/plan2.pdf',
      figma: 'https://figma.com/project2',
      github: 'https://github.com/hyohee22/frip.git',
      site: 'https://hyohee22.github.io/frip/'
    }
  },
    {
    title: '롯데리아',
    desc: '롯데리아 홈페이지를<br> 리디자인하여 제작하였습니다.',
    skills: ['html', 'scss', 'javascript', 'figma', 'Github'],
    gif: 'project04.gif',
    bg: 'project04-bg.png',
    links: {
      plan: 'https://example.com/plan2.pdf',
      figma: 'https://www.figma.com/design/ccfH1wfZ0SsSsYr6sj7Qdq/Untitled?node-id=0-1&t=nk8TpipzmSVYEhzx-1',
      github: 'https://github.com/hyohee22/webRedesign-Lotteria.git',
      site: 'https://hyohee22.github.io/webRedesign-Lotteria/'
    }
  },
    {
    title: '와일드 리프트',
    desc: '와일드 리프트 홈페이지를<br> 리디자인하여 제작하였습니다.',
    skills: ['html', 'scss', 'javascript', 'figma', 'Github'],
    gif: 'project05_.gif',
    bg: 'project05-bg.png',
    links: {
      plan: 'https://example.com/plan2.pdf',
      figma: 'https://www.figma.com/design/sBI4tArVHDgKL6nuWS3zXf/Untitled?node-id=0-1&t=fJBgCjIQRmnF05HC-1',
      github: 'https://github.com/hyohee22/webRedesign-WildRift.git',
      site: 'https://hyohee22.github.io/webRedesign-WildRift/'
    }
  }
];

// 필터 함수
checkboxes.forEach(cb => cb.addEventListener('change', applyFilter));

function applyFilter() {
  const selected = [...checkboxes]
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  cards.forEach(card => {
    const tags = card.dataset.category.split(' ');
    if (selected.includes('all') || selected.length === 0) {
      card.style.display = 'block';
    } else {
      const isMatch = selected.some(tag => tags.includes(tag));
      card.style.display = isMatch ? 'block' : 'none';
    }
  });
}

// 카드 클릭 시 모달 열기
cards.forEach((card, index) => {
  card.addEventListener('click', () => {
    modal.style.display = 'flex';

    // ✅ 모바일일 경우 클래스 추가
  if (window.innerWidth <= 768) {
    modal.classList.add('mobile');
  } else {
    modal.classList.remove('mobile');
  }

    // 보여지는 카드 기준으로 슬라이드 생성
    const visibleCards = [...cards].filter(c => c.style.display !== 'none');
    const visibleIndexes = visibleCards.map(c => [...cards].indexOf(c));
    const startIndex = visibleCards.indexOf(card);

    const slidesHtml = visibleIndexes.map(i => {
      const data = modalSlides[i];
      return `
        <div class="swiper-slide">
          <div class="modal-slide-inner">
            <div class="modal-text-box">
              <h3>${data.title}</h3>
              <h1>ReDesign</h1>
              <p>${data.desc}</p>
              <div class="skill-icons">
                ${data.skills.map(skill => `<img src="images/skill${getSkillIndex(skill)}.png" alt="${skill}">`).join('')}
              </div>
            </div>
            <div class="modal-img-box">
              <img src="images/${data.gif}" alt="프로젝트 미리보기" class="project-gif">
              <img src="images/${data.bg}" alt="프로젝트 사진" class="mobile-preview">
            </div>
            <div class="btn-group">
              <a href="${data.links.plan}" target="_blank" class="modal-btn">기획서</a>
              <a href="${data.links.figma}" target="_blank" class="modal-btn">Figma</a>
              <a href="${data.links.github}" target="_blank" class="modal-btn">Github</a>
              <a href="${data.links.site}" target="_blank" class="modal-btn pint">홈페이지</a>
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
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    `;

    // Swiper 초기화
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
        on: {
          init: function () {
            // 초기화 완료 후 슬라이드 이동
            this.slideTo(startIndex || 0);
          }
        }
      });
  
    }, 0); // ✅ 이거 안 닫아서 생긴 오류야!!
  });
    

// 스킬 아이콘 이미지 번호 매칭
function getSkillIndex(skill) {
  const map = {
    html: '01',
    css: '02',
    scss: '03',
    javascript: '05',
    figma: '10',
    Github: '07'
  };
  return map[skill] || '00';
}

// 모달 닫기
modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
  modal.classList.remove('mobile');
});

// 필터 적용
applyFilter();

//이메일 복사
const emailElement = document.getElementById('email');

emailElement.addEventListener('click', () => {
  const email = emailElement.innerText;

  navigator.clipboard.writeText(email)
    .then(() => {
      // ✅ 복사 성공 시 효과
      const originalText = emailElement.innerText;
      emailElement.innerText = '📋 복사 완료';
      emailElement.classList.add('copied');

      setTimeout(() => {
        emailElement.innerText = originalText;
        emailElement.classList.remove('copied');
      }, 800);
    })
    .catch((err) => {
      alert('복사 실패');
      console.error(err);
    });
});
});
