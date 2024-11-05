
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.go-to');

// Smooth scroll on anchor links
navLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    smoothScroll(targetSection, 1500); // 1000 мс = 1 секунда
  });
});

function smoothScroll(target, duration) {
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}


// ------------------------------------------------

// // add active class to navigation links on scroll
// window.addEventListener('scroll', () => {
//   let scrollPosition = window.scrollY;
//   sections.forEach((section) => {
//     const sectionTop = section.offsetTop;
//     const sectionHeight = section.offsetHeight;

//     if (scrollPosition >= (sectionTop - 100) && scrollPosition < sectionTop + sectionHeight) {
//       const currentId = section.getAttribute('id');
//       navLinks.forEach((link) => {
//         const closest = link.closest('LI');
//         if(closest) {
//           link.closest('LI').classList.remove('active');
//         }
        
//       });
//       document.querySelector(`.header__nav ul li a[href="#${currentId}"]`).closest('LI').classList.add('active');
//     }
//   });
// });

// Language switcher
document.addEventListener('DOMContentLoaded', function() {
  const languageToggle = document.querySelector('.languages__current');
  const currentURL = window.location.pathname;

  function setLanguage(lang) {
    languageToggle.textContent = lang;
  }

  if (currentURL.includes('/ru')) {
    setLanguage('RU');
  } else {
    setLanguage('EN');
  }

  const languageLinks = document.querySelectorAll('.languages ul li a');
  languageLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      const targetLang = event.target.textContent.trim();
      setLanguage(targetLang === 'Russian' ? 'RU' : 'EN');
    });
  });
});

// ------------------------------------------------


// Mobile menu open

const menuBtnTablet = document.querySelector('.header__burger.tablet');
const menuBtnMobile = document.querySelector('.header__burger.mobile');
const menuBtnClose = document.querySelector('.header__close');
const tabletMenu = document.querySelector('.header__menu');
const mobileMenu = document.querySelector('.c-modal')
const closeMenu = document.querySelector('.close-menu');
const mobileLinks = document.querySelectorAll('.mobile-link-js');


  menuBtnTablet.addEventListener('click', () => {
    tabletMenu.classList.toggle('active')
    menuBtnTablet.classList.toggle('active')
    menuBtnClose.classList.add('active')
  })
  menuBtnClose.addEventListener('click', () => {
    tabletMenu.classList.remove('active')
    menuBtnTablet.classList.remove('active')
    menuBtnClose.classList.remove('active')
  })

  menuBtnMobile.addEventListener('click', () => {
    mobileMenu.classList.toggle('active')
    document.body.classList.add('isMobileOpen')

  })
  closeMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active')
    document.body.classList.remove('isMobileOpen')
  })


if(mobileLinks) {
  mobileLinks.forEach(item => {
    item.addEventListener('click', () => {
      document.body.classList.remove('isMobileOpen')
      mobileMenu.classList.remove('active')
    })
  })
}

// ------------------------------------------------


// Lazy loading images function
function preloadImage(img) {
  const src = img.getAttribute('data-src');
  if (!src) {
    return;
  }
  img.src = src;
}


const observerOptions = {
  root: null, 
  rootMargin: '100px', 
  threshold: 0 
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      preloadImage(entry.target);
      observer.unobserve(entry.target); 
    }
  });
}, observerOptions);


const lazyImages = document.querySelectorAll('img[data-src]');
lazyImages.forEach(image => {
  observer.observe(image);
});

// ------------------------------------------------


// MAIL SENDER
window.addEventListener('DOMContentLoaded', function () {
  const formButton = document.querySelector(".contacts__form-button");
  const form = document.getElementById("contacts__form");
  const success = document.querySelector('.contacts__form-success');
  const closeButton = this.document.querySelector('.i-close');

  if (formButton && form) {

      formButton.addEventListener('click', function () {
        form.querySelectorAll("[required]").forEach(input => {
            if (input.value.trim() === "") {
                input.classList.add("required");
            } else {
                input.classList.remove("required");
            }
        });
      });

      form.addEventListener('submit', async function (e) {
          e.preventDefault();

          const submitButton = form.querySelector("button");
          submitButton.setAttribute("disabled", "disabled");

          const formData = new FormData(form);
          success.classList.add('active')
          // try {
          //     const response = await fetch('/mail', {
          //         method: 'POST',
          //         body: formData
          //     });
       
          //     if (response.ok) {
          //       success.classList.add('active')
          //       form.reset();
          //       form.querySelectorAll("[required]").forEach(input => input.classList.remove("required"));
          //     } else {
          //         alert("Возникла ошибка!");
          //     }
          // } catch (error) {
          //     alert("Возникла ошибка!");
          // } finally {
          //     submitButton.removeAttribute("disabled");
          // }
      });
  }

  if(closeButton) {
    closeButton.addEventListener('click', () => {
      success.classList.remove('active')
    })
  }

});
