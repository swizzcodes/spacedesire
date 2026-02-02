document.addEventListener("DOMContentLoaded", () => {

  document.querySelector(".loader_holder").style.display='none';
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
    '.section_2, #cw, #cw2, #cw3, #cw4, .section_3, .section_4, .section_5, .parent, .confusion_box, .more_features_section, .f1, .f2, .f3, .f4, .f5, .rb1, .rb2, .section_4, .form_section, .contact_box'
  );

  if (amts && amtsCloser) {
    amtsCloser.addEventListener("click", () => amts.style.display = "none");
  }

  document.querySelector(".estimator").addEventListener("click", ()=>{
    document.querySelector("#loader_holder").style.display='flex';
  })

const madParent = document.querySelector(".center_holder");
const madContent = document.querySelector(".mad_content");
const madCloser = document.getElementById("madCloser");

if (madCloser && madContent && window.gsap) {
  madCloser.addEventListener("click", () => {
    gsap.to(madContent, {
      duration: 0.4,
      scale: 0.7,
      opacity: 0,
      ease: "back.in(1.7)",
      onComplete: () => {
        madParent.style.display = "none";

      }
    });
  });
}

document.querySelector(".mad").addEventListener("click", () => {
  madParent.style.setProperty('display', 'flex', 'important');

  gsap.fromTo(
    madContent,
    { scale: 0.7, opacity: 0 },
    { duration: 0.4, scale: 1, opacity: 1, ease: "back.out(1.7)" }
  );
});

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

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(Draggable);

    if (window.ScrollToPlugin) gsap.registerPlugin(ScrollToPlugin);

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
  }

  const s3_imgs = [
    "assets/section_3.png",
    "assets/s3_2.png",
    "assets/s3_3.png",
    "assets/s3_4.png"
  ];

  let imgIndex = 0;
  s3_imgs.forEach(src => new Image().src = src);

  if (s3_image && window.gsap) {
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

  if (box && window.gsap) {
    const imgElements = box.querySelectorAll("img");
    let totalWidth = 0;
    imgElements.forEach(img => totalWidth += img.offsetWidth + 20);

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

  const phoneInput = document.getElementById("phone");
  if (phoneInput && window.intlTelInput) {
    window.intlTelInput(phoneInput, {
      initialCountry: "in",
      separateDialCode: true,
      utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@19/build/js/utils.js"
    });
  }

  const form = document.getElementById("estimateForm");
  const statusText = document.getElementById("formStatus");
  const submitBtn = document.getElementById("submitBtn");

  if (form && submitBtn && statusText) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      submitBtn.disabled = true;
      submitBtn.innerText = "Sending...";
      statusText.innerText = "";

      document.querySelector(".loader_holder").style.display='flex';

      fetch(form.action, { method: "POST", body: new FormData(form) })
        .then(res => res.text())
        .then(result => {
          statusText.style.display = "block";
          if (result.trim() === "success") {
            statusText.innerText = "Thank you for reaching out. We will get in touch with you shortly.";
            statusText.style.color = "green";
            form.reset();
          } else {
            statusText.innerText = "Something went wrong. Please try again later.";
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
                      document.querySelector(".loader_holder").style.display='none';

        });
    });
  }

});

document.querySelectorAll('#rmb1, #rmb2, #rmb1, #about_btn, #estimate_btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const target = document.querySelector(this.dataset.target);
    if (!target || !window.gsap) return;

    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: target, offsetY: 100 },
      ease: "power3.out"
    });
  });
});

const counters = [
  { el: document.getElementById("years"), value: 10 },
  { el: document.getElementById("cities"), value: 3 },
  { el: document.getElementById("percent"), value: 100 },
  { el: document.getElementById("projects"), value: 30 }
];

counters.forEach(({ el, value }) => {
  if (!el || !window.gsap || !window.ScrollTrigger) return;

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

gsap.set(".estimation_caller", { y: "100%" });
gsap.set("#whatsappBtn, #phoneBtn", { x: 100, autoAlpha: 0 });
ScrollTrigger.create({
  start: () => window.innerHeight, 

  onEnter: () => {
    gsap.to(".estimation_caller", { y: 0, duration: 0.4, ease: "power2.out" });
    gsap.to("#whatsappBtn", { x: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out" });
    gsap.to("#phoneBtn", { x: 0, autoAlpha: 1, duration: 0.5, delay: 0.1, ease: "power2.out" });
  },
  onLeaveBack: () => {
    gsap.to(".estimation_caller", { y: "100%", duration: 0.3, ease: "power2.in" });
    gsap.to("#whatsappBtn", { x: 100, autoAlpha: 0, duration: 0.3, ease: "power2.in" });
    gsap.to("#phoneBtn", { x: 100, autoAlpha: 0, duration: 0.3, ease: "power2.in" });
  }
});

  ScrollTrigger.create({
    start: () => window.innerHeight, 

    onEnter: () => {
      gsap.to(".estimation_caller", {
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    },
    onLeaveBack: () => {
      gsap.to(".estimation_caller", {
        y: "100%",
        duration: 0.3,
        ease: "power2.in"
      });
    }
  });

   Draggable.create("#whatsappBtn", {
    type: "y",                 

    edgeResistance: 0.65,      

    inertia: true              

  });
   Draggable.create("#phoneBtn", {
    type: "y",                 

    edgeResistance: 0.65,      

    inertia: true              

  });

document.getElementById("whatsappBtn").addEventListener("click", function() {
  const number = "919538344570"; 

  const message = "Hello%2C%20Can%20I%20get%20more%20info%20on%20this%3F"; 

  window.open(`https://wa.me/${number}?text=${message}`, "_blank");
});

document.getElementById("phoneBtn").addEventListener("click", function() {
 const phoneNumber = "919538344570"; 

  window.open(`tel:${phoneNumber}`);
});

