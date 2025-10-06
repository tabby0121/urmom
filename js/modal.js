const modal = document.querySelector(".modal");
const modalContainer = document.querySelector(".modalContainer");
const btn = document.querySelector(".mainBtn");
const downloadBtn = document.querySelector(".downloadBtn");
const closeBtn = document.querySelector(".closeBtn");

function close() {
  closeBtn.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });
}



btn.addEventListener("click", () => {
  modalContainer.style.display = "flex";

  close();
});
