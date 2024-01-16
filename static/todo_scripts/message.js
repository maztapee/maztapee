function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.style.visibility = "visible";
    messageDiv.textContent = message;
    messageDiv.className = type;
    messageDiv.style.opacity = 1;

    setTimeout(() => {
      messageDiv.style.opacity = 0;
    }, 3000); // Adjust the time (in milliseconds) you want the message to be visible
    messageDiv.style.visibility = "hidden";
  }