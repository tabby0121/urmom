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

function download() {
  downloadBtn.addEventListener("click", function () {
    const link = document.createElement("a");
    link.href = "img/reward/reward.png"; // change to your file path
    link.download = "moonflower.png"; // name for the downloaded file
    link.click();
  });
}

btn.addEventListener("click", () => {
  modalContainer.style.display = "flex";
  download();
  close();
});
