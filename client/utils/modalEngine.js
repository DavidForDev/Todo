const ModalFun = (container, menuRef) => {
  const modalButtons = document.querySelectorAll("[aria-label]");
  const modalCloser = document.querySelectorAll(".modal_closer");

  // ========== Modal Opener ========== \\
  modalButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector(btn.ariaLabel).style.display = "flex";
    });
  });

  // ========== Modal Closer ========== \\
  modalCloser.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.parentElement.parentElement.parentElement.parentElement;
      modal.style.display = "none";
    });
  });
};

export default ModalFun;
