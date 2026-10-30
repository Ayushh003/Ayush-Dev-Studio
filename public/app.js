const form = document.getElementById('contactForm');
const alertBox = document.getElementById('formAlert');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    service: document.getElementById('service').value,
    message: document.getElementById('message').value
  };

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.success) {
      alertBox.className = 'alert-box alert-success';
      alertBox.textContent = result.message;
      form.reset();
    } else {
      alertBox.className = 'alert-box alert-error';
      alertBox.textContent = result.error;
    }
  } catch (err) {
    alertBox.className = 'alert-box alert-error';
    alertBox.textContent = 'Server connection error.';
  }
});
