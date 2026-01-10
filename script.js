document.addEventListener("DOMContentLoaded", () => {
  if (!gsap || !ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);


  const amts = document.getElementById("amts");
  const amtsCloser = document.getElementById("amts_b2");
  const s3_image = document.getElementById("sec3img");
  const images = document.querySelectorAll(".gal_img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lb-img");
  const closeBtn = document.querySelector(".lb-close");
  const box = document.querySelector(".image_box");
  const sections = document.querySelectorAll('.section_2, .section_3, .section_4, .section_5, .parent, .more_features_section, .form_section, .contact_box');

  if (amts && amtsCloser) {
    amtsCloser.addEventListener("click", () => amts.style.display = "none");
  }

  new Swiper(".swiper", {
    loop: true,
    speed: 900,
    autoplay: { delay: 4000, disableOnInteraction: false },
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
  });

  sections.forEach(section => {
    gsap.from(section, {
      scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none none" },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out"
    });
  });

  const s3_imgs = ["assets/section_3.png","assets/s3_2.png","assets/s3_3.png","assets/s3_4.png"];
  let index = 0;
  s3_imgs.forEach(src => new Image().src = src);

  if (s3_image) {
    setInterval(() => {
      gsap.to(s3_image, {
        opacity: 0.85,
        scale: 0.98,
        duration: 0.3,
        ease: "power1.inOut",
        onComplete: () => {
          index = (index + 1) % s3_imgs.length;
          s3_image.src = s3_imgs[index];
          gsap.to(s3_image, { opacity: 1, scale: 1, duration: 0.3, ease: "power1.inOut" });
        }
      });
    }, 3000);
  }

  images.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
      if (box) box.style.animationPlayState = "paused";
    });
  });

  const closeLightbox = () => {
    lightbox.style.display = "none";
    if (box) box.style.animationPlayState = "running";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (lightbox) lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });

  const imgs = ["assets/f1.jpg","assets/f2.jpg","assets/f3.jpg"];
  let totalWidth = 0;
  imgs.forEach(img => totalWidth += img.offsetWidth + 20);

  if (box) {
    gsap.to(".image_box", {
      x: `-${totalWidth}px`,
      duration: 20,
      ease: "linear",
      repeat: -1,
      modifiers: { x: gsap.utils.unitize(x => parseFloat(x) % totalWidth * -1) }
    });
  }

  const marquee = document.querySelector(".marquee");
  if (marquee) {
    marquee.addEventListener("mouseenter", () => gsap.globalTimeline.pause());
    marquee.addEventListener("mouseleave", () => gsap.globalTimeline.resume());
  }

  const input = document.getElementById("phone");
  window.intlTelInput(input, {
    initialCountry: "in",
    separateDialCode: true,
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@19/build/js/utils.js"
  });

  const form = document.getElementById("estimateForm");
  const statusText = document.getElementById("formStatus");
  const submitBtn = document.getElementById("submitBtn");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";
    statusText.innerText = "";
    statusText.style.color = "#000";

    fetch(form.action, {
      method: "POST",
      body: new FormData(form)
    })
    .then(response => response.text())
    .then(result => {
      if (result.trim() === "success") {
        statusText.style.display="block";
        statusText.innerText = "Thank you! Your estimate request has been sent successfully.";
        statusText.style.color = "green";
        form.reset();
      } else {
         statusText.style.display="block";
        statusText.innerText = "Something went wrong. Please try again later.";
        statusText.style.color = "red";
      }
    })
    .catch(() => {
       statusText.style.display="block";
      statusText.innerText = "Server error. Please try again later.";
      statusText.style.color = "red";
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerText = "Get free estimate now";
    });
  });
});
document.querySelectorAll('#rmb1, #rmb2').forEach(btn => {
  btn.addEventListener('click', function () {
    const targetSelector = this.dataset.target;
    const target = document.querySelector(targetSelector);
    if (!target) return;

    // Scroll so the top of the section is visible, with 100px offset from top
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: target, offsetY: 100 },
      ease: "power3.out"
    });
  });
});