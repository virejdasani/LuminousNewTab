// shows the modal when the user clicks open-btn
openBtn.addEventListener("click", function () {
  modalBackground.style.display = "block";
});

// hides the modal when the user clicks close-btn
closeBtn.addEventListener("click", function () {
  modalBackground.style.display = "none";
});

// hides the modal when the user clicks outside the modal
window.addEventListener("click", function (event) {
  // check if the event happened on the modal-background
  if (event.target === modalBackground) {
    // hides the modal
    modalBackground.style.display = "none";
  }
});
