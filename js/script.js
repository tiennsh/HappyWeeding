document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rsvp-form");
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxhe4MACkc2q093fj3ITwIiBLTLs95qtHeaLmnIUautDYXcAvs6937QCW1vXzL9rQzm/exec"; // thay bằng URL của bạn

  // ====== Xử lý form RSVP ======
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const attend = form.querySelector("input[name='attend']:checked")?.value;
      if (!attend) {
        alert("Vui lòng chọn tham dự hoặc không.");
        return;
      }

      const fd = new FormData(form);

      fetch(SCRIPT_URL, {
        method: "POST",
        body: fd
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === "success") {
            alert("Cảm ơn bạn đã xác nhận tham dự!");
            form.reset();
          } else {
            alert("Có lỗi: " + (data.message || "Vui lòng thử lại"));
          }
        })
        .catch(err => {
          console.error("Fetch error:", err);
          alert("Không thể gửi, vui lòng thử lại.");
        });
    });
  }

  // ====== Scale Wedding Content ======
  function scaleWedding() {
    const content = document.querySelector(".wedding-content");
    if (!content) return;

    const baseWidth = 1080;
    let scale = window.innerWidth / baseWidth;

    if (scale < 0.5) scale = 0.5;
    if (scale > 1.5) scale = 1.5;

    content.style.transform = `scale(${scale})`;
    content.style.transformOrigin = "top center";
  }

  window.addEventListener("resize", scaleWedding);
  window.addEventListener("load", scaleWedding);
  scaleWedding();

  // ====== Hiệu ứng reveal on scroll ======
  const reveals = document.querySelectorAll(".fade-in");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  const music = document.getElementById("bg-music");
  document.addEventListener("click", enableSound);

  // Khi load vào, thử phát nhạc (mute)
  music.play().catch(err => {
    console.log("Autoplay bị chặn:", err);
  });

  // Sau khi user click lần đầu -> bỏ mute, nhạc phát bình thường
  function enableSound() {
    if (music.muted) {
      music.muted = false;
      music.play();
      document.removeEventListener("click", enableSound);
    }
  }

  const img = document.querySelector(".zoomable-img");

    img.addEventListener("click", (e) => {
      e.stopPropagation();
      img.classList.add("zoomed");
      document.body.classList.add("zoom-active");
    });

    // Khi click ra ngoài vùng ảnh → thu nhỏ lại
    document.addEventListener("click", () => {
      if (img.classList.contains("zoomed")) {
        img.classList.remove("zoomed");
        document.body.classList.remove("zoom-active");
      }
    });
});
