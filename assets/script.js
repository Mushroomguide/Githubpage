const modal = document.getElementById('mushroom-modal');
const modalTitle = document.getElementById('modal-title');
const modalSubtitle = document.getElementById('modal-subtitle');
const optionLinks = document.querySelectorAll('.modal__options .option');
let activeMushroom = null;

const mushroomMap = {
  'psilocybe-semilanceata': {
    name: 'Psilocybe semilanceata',
  },
  'psilocybe-cyanescens': {
    name: 'Psilocybe cyanescens',
  },
  'panaeolus-cinctulus': {
    name: 'Panaeolus cinctulus',
  },
  'amanita-pantherina': {
    name: 'Amanita pantherina',
  },
  'amanita-muscaria': {
    name: 'Amanita muscaria',
  },
};

const optionPaths = {
  lookalikes: 'lookalikes',
  chemistry: 'chemistry',
  basics: 'basics',
  safety: 'safety',
};

function openModal(mushroomKey) {
  activeMushroom = mushroomKey;
  modalTitle.textContent = `Explore ${mushroomMap[mushroomKey].name}`;
  modalSubtitle.textContent = 'Where should we begin?';
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  optionLinks.forEach((link) => {
    const option = link.dataset.option;
    const basePath = optionPaths[option];
    link.href = `${basePath}/${mushroomKey}.html`;
  });
}

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  activeMushroom = null;
}

function handleCardClick(event) {
  const card = event.currentTarget;
  const mushroomKey = card.dataset.mushroom;
  if (!mushroomKey) return;
  openModal(mushroomKey);
}

function handleKeydown(event) {
  if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
    closeModal();
  }
}

document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('click', handleCardClick);
  card.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick(event);
    }
  });
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
});

modal.addEventListener('click', (event) => {
  if (event.target.hasAttribute('data-close')) {
    closeModal();
  }
});

document.addEventListener('keydown', handleKeydown);
