// ========================================
// 한국무예위원회 (KMC) - main script
// ========================================

// 1. 네비게이션 스크롤 효과
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// 2. 모바일 메뉴 토글
function toggleNav() {
  const mnav = document.getElementById('mnav');
  const movl = document.getElementById('movl');
  if (!mnav || !movl) return;
  mnav.classList.toggle('open');
  movl.classList.toggle('open');
  document.body.style.overflow = mnav.classList.contains('open') ? 'hidden' : 'auto';
}

// 3. 페이지 로드 시 스크롤 정상화
document.addEventListener('DOMContentLoaded', function () {
  document.body.style.overflow = 'auto';
});

// 4. 스크롤 애니메이션 (Intersection Observer)
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('vis');
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
);
document.querySelectorAll('.rv').forEach((el) => revealObserver.observe(el));

// 5. 숫자 카운트 업 애니메이션
function animCount(el) {
  const target = +el.dataset.target;
  const duration = 1800;
  const startTime = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target).toLocaleString('ko-KR');
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target.toLocaleString('ko-KR');
    }
  };
  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.count').forEach(animCount);
      }
    });
  },
  { threshold: 0.3 }
);

const statsEl = document.querySelector('.stats-inner');
if (statsEl) statsObserver.observe(statsEl);
