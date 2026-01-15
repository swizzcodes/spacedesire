document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     GSAP PLUGINS CHECK & REGISTER
  =============================== */
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);
  if (window.ScrollToPlugin) gsap.registerPlugin(ScrollToPlugin);

  /* ===============================
     DOM ELEMENTS
  =============================== */
  const amts = document.getElementById("amts");
  const amtsCloser = document.getElementById("amts_b2");

  const s3_image = document.getElementById("sec3img");

  const images = document.querySelectorAll(".gal_img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lb-img");
  const closeBtn = document.querySelector(".lb-close");

  const box = document.querySelector(".image_box");
  const marquee = document.querySelector(".marquee");

  const sections = document.querySelectorAll(
    '.section_2, #cw, #cw2, #cw3, #cw4, .section_4, .section_5, .parent, .more_features_section, .form_section, .contact_box'
  );

  /* ===============================
     AMTS CLOSE BUTTON
  =============================== */
  if (amts && amtsCloser) {
    amtsCloser.addEventListener("click", () => amts.style.display = "none");
  }

  /* ===============================
     SWIPER
  =============================== */
  if (document.querySelector(".swiper")) {
    new Swiper(".swiper", {
      loop: true,
      speed: 900,
      autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });
  }

  /* ===============================
     SCROLL FADE ANIMATIONS
  =============================== */
  sections.forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out"
    });
  });

  /* ===============================
     SECTION 3 IMAGE ROTATION
  =============================== */
  const s3_imgs = [
    "assets/section_3.png",
    "assets/s3_2.png",
    "assets/s3_3.png",
    "assets/s3_4.png"
  ];

  let imgIndex = 0;
  s3_imgs.forEach(src => new Image().src = src);

  if (s3_image) {
    setInterval(() => {
      gsap.to(s3_image, {
        opacity: 0.85,
        scale: 0.98,
        duration: 0.3,
        onComplete: () => {
          imgIndex = (imgIndex + 1) % s3_imgs.length;
          s3_image.src = s3_imgs[imgIndex];
          gsap.to(s3_image, {
            opacity: 1,
            scale: 1,
            duration: 0.3
          });
        }
      });
    }, 3000);
  }

  /* ===============================
     LIGHTBOX
  =============================== */
  images.forEach(img => {
    img.addEventListener("click", () => {
      if (!lightbox || !lightboxImg) return;
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
      if (box) box.style.animationPlayState = "paused";
    });
  });

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.style.display = "none";
    if (box) box.style.animationPlayState = "running";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", e => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  /* ===============================
     MARQUEE (FIXED)
  =============================== */
  if (box) {
    const imgElements = box.querySelectorAll("img");
    let totalWidth = 0;

    imgElements.forEach(img => {
      totalWidth += img.offsetWidth + 20;
    });

    const marqueeTween = gsap.to(box, {
      x: `-${totalWidth}px`,
      duration: 20,
      ease: "linear",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth * -1)
      }
    });

    if (marquee) {
      marquee.addEventListener("mouseenter", () => marqueeTween.pause());
      marquee.addEventListener("mouseleave", () => marqueeTween.resume());
    }
  }

  /* ===============================
     PHONE INPUT
  =============================== */
  const phoneInput = document.getElementById("phone");
  if (phoneInput && window.intlTelInput) {
    window.intlTelInput(phoneInput, {
      initialCountry: "in",
      separateDialCode: true,
      utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@19/build/js/utils.js"
    });
  }

  /* ===============================
     FORM SUBMISSION
  =============================== */
  const form = document.getElementById("estimateForm");
  const statusText = document.getElementById("formStatus");
  const submitBtn = document.getElementById("submitBtn");

  if (form && submitBtn && statusText) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      submitBtn.disabled = true;
      submitBtn.innerText = "Sending...";
      statusText.innerText = "";

      fetch(form.action, {
        method: "POST",
        body: new FormData(form)
      })
        .then(res => res.text())
        .then(result => {
          statusText.style.display = "block";
          if (result.trim() === "success") {
            statusText.innerText =
              "Thank you! Your estimate request has been sent successfully.";
            statusText.style.color = "green";
            form.reset();
          } else {
            statusText.innerText =
              "Something went wrong. Please try again later.";
            statusText.style.color = "red";
          }
        })
        .catch(() => {
          statusText.style.display = "block";
          statusText.innerText = "Server error. Please try again later.";
          statusText.style.color = "red";
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.innerText = "Get free estimate now";
        });
    });
  }
});

/* ===============================
   SCROLL BUTTONS
=============================== */
document.querySelectorAll('#rmb1, #rmb2').forEach(btn => {
  btn.addEventListener('click', function () {
    const target = document.querySelector(this.dataset.target);
    if (!target) return;

    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: target, offsetY: 100 },
      ease: "power3.out"
    });
  });
});

/* ===============================
   COUNTER ANIMATIONS
=============================== */
const counters = [
  { el: document.getElementById("years"), value: 10 },
  { el: document.getElementById("cities"), value: 3 },
  { el: document.getElementById("percent"), value: 100 },
  { el: document.getElementById("projects"), value: 30 }
];

counters.forEach(({ el, value }) => {
  if (!el) return;

  gsap.fromTo(el,
    { innerText: 0 },
    {
      innerText: value,
      duration: 2,
      snap: { innerText: 1 },
      ease: "power1.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        once: true
      },
      onUpdate: () => {
        el.innerText = Math.ceil(el.innerText);
      }
    }
  );
});
