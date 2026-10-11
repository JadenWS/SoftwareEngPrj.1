const form = document.getElementById('post-form');
const message = document.getElementById('message');
const categorySelect = document.getElementById('category');

// fill the category dropdown from the server so the list lives in one place
fetch('/api/categories')
  .then((r) => r.json())
  .then((categories) => {
    categories.forEach((name) => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      categorySelect.appendChild(option);
    });
  });

function showErrors(errors) {
  message.className = 'error';
  message.textContent = '';
  const list = document.createElement('ul');
  errors.forEach((text) => {
    const item = document.createElement('li');
    item.textContent = text;
    list.appendChild(item);
  });
  message.appendChild(list);
  message.hidden = false;
}

function showSuccess(text) {
  message.className = 'success';
  message.textContent = text;
  message.hidden = false;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  message.hidden = true;

  const data = Object.fromEntries(new FormData(form).entries());

  try {
    const response = await fetch('/api/listings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (!response.ok) {
      showErrors(result.errors);
      return;
    }

    showSuccess('Thanks! Your post was created.');
    form.reset();
  } catch (err) {
    showErrors(['Could not reach the server. Please try again.']);
  }
});
