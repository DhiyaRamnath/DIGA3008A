

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("invite-carousel");
  const openBtn = document.querySelector(".open-carousel");
  const closeBtn = document.querySelector(".close-carousel");
  const images = document.querySelectorAll(".carousel-image");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let currentIndex = 0;

  openBtn.addEventListener("click", function (e) {
    e.preventDefault();
    modal.style.display = "block";
    images[currentIndex].style.display = "block";
  });

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
    images[currentIndex].style.display = "none";
    currentIndex = 0;
  });

  prevBtn.addEventListener("click", function () {
    images[currentIndex].style.display = "none";
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    images[currentIndex].style.display = "block";
  });

  nextBtn.addEventListener("click", function () {
    images[currentIndex].style.display = "none";
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].style.display = "block";
  });
});
