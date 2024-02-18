function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.classList.replace('message', type);
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
      messageDiv.style.opacity = 0;
    }, 3000); // Adjust the time (in milliseconds) you want the message to be visible
  }