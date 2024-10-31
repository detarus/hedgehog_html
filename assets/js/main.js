
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.go-to');

// Smooth scroll on anchor links
navLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({
      behavior: 'smooth', 
      block: 'start' 
    });
  });
});

// ------------------------------------------------

// add active class to navigation links on scroll
window.addEventListener('scroll', () => {
  let scrollPosition = window.scrollY;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPosition >= (sectionTop - 100) && scrollPosition < sectionTop + sectionHeight) {
      const currentId = section.getAttribute('id');
      navLinks.forEach((link) => {
        const closest = link.closest('LI');
        if(closest) {
          link.closest('LI').classList.remove('active');
        }
        
      });
      document.querySelector(`.header__nav ul li a[href="#${currentId}"]`).closest('LI').classList.add('active');
    }
  });
});

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

  const languageLinks = document.querySelectorAll('.languages a');
  languageLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      const targetLang = event.target.textContent.trim();
      setLanguage(targetLang === 'Russian' ? 'RU' : 'EN');
    });
  });
});

// ------------------------------------------------


// Mobile menu open

const menuBtn = document.querySelector('.header__burger');
const menuBtnClose = document.querySelector('.header__close');
const tabletMenu = document.querySelector('.header__menu');
const mobileMenu = document.querySelector('.header__mobile-menu')
const closeMenu = document.querySelector('.close-menu');

if(menuBtn && window.innerWidth > 520) {
  menuBtn.addEventListener('click', () => {
    tabletMenu.classList.toggle('active')
    menuBtn.classList.toggle('active')
    menuBtnClose.classList.add('active')
  })
  menuBtnClose.addEventListener('click', () => {
    tabletMenu.classList.remove('active')
    menuBtn.classList.remove('active')
    menuBtnClose.classList.remove('active')
  })
} else {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active')
    document.body.classList.add('isMobileOpen')

  })
  closeMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active')
    document.body.classList.remove('isMobileOpen')
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

          try {
              const response = await fetch('/mail', {
                  method: 'POST',
                  body: formData
              });
       
              if (response.ok) {
                success.classList.add('active')
                form.reset();
                form.querySelectorAll("[required]").forEach(input => input.classList.remove("required"));
              } else {
                  alert("Возникла ошибка!");
              }
          } catch (error) {
              alert("Возникла ошибка!");
          } finally {
              submitButton.removeAttribute("disabled");
          }
      });
  }

  if(closeButton) {
    closeButton.addEventListener('click', () => {
      success.classList.remove('active')
    })
  }

});
