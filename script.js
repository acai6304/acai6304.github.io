function randomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function sample(array){
  return array[randomInt(0, array.length - 1)];
}

document.addEventListener('DOMContentLoaded', () => {
  const cardsContainer = document.querySelector('.cards');
  const cardNodes = document.querySelectorAll('.card');
  const cards = Array.from(cardNodes); 

  const randomBtn = document.getElementById('randomBtn'); 

  if (cardsContainer) {
    cardsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.toggle');
      if (!btn) return;
      const details = btn.nextElementSibling;
      const isHidden = details?.hasAttribute('hidden');
      if (isHidden){
        details.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
        btn.textContent = 'Hide details';
      } else {
        details.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = 'Show details';
      }
    });
  }

  if (randomBtn) {
    randomBtn.addEventListener('click', () => {
      const visible = cards.filter(c => c.style.display !== 'none');
      if (visible.length === 0) return;
      const pick = sample(visible);
      visible.forEach(c => c.classList.remove('highlight'));
      pick.classList.add('highlight');
      pick.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  const suggestForm = document.querySelector('form.suggest');
  const visitedCheckbox = suggestForm?.querySelector('#visited');
  const successMessage = suggestForm?.querySelector('.success');

  if (suggestForm && visitedCheckbox && successMessage) {
    suggestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!visitedCheckbox.checked) {
        visitedCheckbox.setCustomValidity('Please confirm you have been there.');
      } else {
        visitedCheckbox.setCustomValidity('');
      }
      if (!suggestForm.checkValidity()) {
        suggestForm.reportValidity();
        successMessage.hidden = true;
        return;
      }
      successMessage.hidden = false;
    });
    const resetSuccessState = () => {
      successMessage.hidden = true;
      if (visitedCheckbox.checked) {
        visitedCheckbox.setCustomValidity('');
      }
    };
    suggestForm.addEventListener('input', resetSuccessState);
    suggestForm.addEventListener('change', resetSuccessState);
  }
});
