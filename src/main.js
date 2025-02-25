const body = document.body;
const searchInput = document.querySelector('.search-input');
const selectBtn = document.querySelector('.btn-all');
const tittle = document.querySelectorAll('.item-tittle');
const addBtn = document.querySelector('.add-btn');
const deleteList = document.querySelector('.delete-list');
const modeToggle = document.querySelector('.mode-toggle');

const svgUse = document.querySelector('.toggle-icon');

const modalAdd = document.querySelector('.add-modal');
const inputModal = document.querySelector('.input-modal-add');
const applyTaskAdd = document.querySelector('.apply');
const cancelBtn = document.querySelector('.cancel');

const modalEdit = document.querySelector('.edit-modal');
const inputModalEdit = document.querySelector('.input-modal-edit');
const applyTaskEdit = document.querySelector('.apply-changes');
const cancelTaskEdit = document.querySelector('.cancel-edit');

const modalDelete = document.querySelector('.delete-modal');
const applyTaskDelete = document.querySelector('.delete-yes');
const cancelTaskDelete = document.querySelector('.delete-no');

const modalListDelete = document.querySelector('.delete-list-modal');

const emptyImg = document.querySelector('.empty-element');
const taskList = document.querySelector('.task-list');

// console.log(window.location.href);
document.addEventListener('DOMContentLoaded', () => {
  const savedFilter = localStorage.getItem('filter') || 'all';
  selectBtn.value = savedFilter;
  filterTasks(savedFilter);

  if (localStorage.getItem('theme') === 'dark') {
    // svgUse.setAttribute('href', './img/symbol-defs.svg#icon-sun');
    svgUse.setAttribute('href', './img/symbol-defs.svg#icon-sun');

    // https://nataliiakopychynska.github.io/to-do-list-js/
    darkTheme();
  } else {
    // svgUse.setAttribute('href', './img/symbol-defs.svg#icon-moon');
    svgUse.setAttribute('href', './img/symbol-defs.svg#icon-moon');

    lightTheme();
  }
});

//

let tasksArray = JSON.parse(localStorage.getItem('tasksArray')) || [];
emptyList();

addBtn.addEventListener('click', () => {
  modalAdd.classList.remove('hidden');
});

deleteList.addEventListener('click', event => {
  modalListDelete.classList.remove('hidden');

  const deleteList = document.querySelector('.delete-list-btn');
  const cancelDelete = document.querySelector('.cancel-delete-list-btn');
  cancelDelete.addEventListener('click', () => {
    console.log(5);
    modalListDelete.classList.add('hidden');
  });

  deleteList.addEventListener('click', () => {
    console.log(4);
    tasksArray = [];
    createElement(tasksArray, taskList);
    localStorage.setItem('tasksArray', JSON.stringify(tasksArray));

    modalListDelete.classList.add('hidden');
  });

  // if (event.target.classList.contains('delete-yes')) {
  //   console.log(1);
  //   taskList.innerHTML = '';
  //   modalListDelete.classList.add('hidden');
  // } else if (event.target.classList.contains('delete-no')) {
  //   console.log(2);

  //   modalListDelete.classList.add('hidden');
  // }
});

modeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');

  if (document.body.classList.contains('dark-theme')) {
    svgUse.setAttribute('href', './img/symbol-defs.svg#icon-sun');
    localStorage.setItem('theme', 'dark');
    darkTheme();
  } else {
    svgUse.setAttribute('href', './img/symbol-defs.svg#icon-moon');
    localStorage.setItem('theme', 'light');
    lightTheme();
  }
});

applyTaskAdd.addEventListener('click', () => {
  const inputValue = inputModal.value;
  const idItem = Date.now();
  tasksArray.push({ text: inputValue, id: idItem, completed: false });
  localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
  console.log(tasksArray);

  hiddenElement(modalAdd);

  if (tasksArray.length > 0) {
    emptyImg.classList.add('hidden');
  }

  createElement(tasksArray, taskList);

  inputModal.value = '';
  console.log(inputValue);
});

cancelBtn.addEventListener('click', () => {
  hiddenElement(modalAdd);
  inputModal.value = '';
});

taskList.addEventListener('click', e => {
  const taskItem = e.target.closest('.task-container');

  if (!taskItem) return;
  const taskId = Number(taskItem.dataset.id);
  console.log(taskId);

  if (e.target.closest('.btn-edid')) {
    editTask(taskId);
  }

  if (e.target.closest('.btn-delete')) {
    deleteTask(taskId);
  }

  if (e.target.closest('.checkbox-container')) {
    const taskId = Number(taskItem.dataset.id);

    checkedToggle(taskId);
  }
});

selectBtn.addEventListener('change', e => {
  const selectedValue = e.target.value;
  localStorage.setItem('filter', selectedValue); // Зберігаємо фільтр у LS
  filterTasks(selectedValue);
});

searchInput.addEventListener('input', e => {
  let searchValue = e.target.value.toLowerCase();

  const filteredTask = tasksArray.filter(item => {
    console.log(searchValue);

    if (item.text.toLowerCase().includes(searchValue)) {
      return item;
    }
  });
  // console.log(filteredTask);
  if (searchValue.trim() === '') {
    createElement(tasksArray, taskList);
  } else {
    createElement(filteredTask, taskList);
  }
});

function filterTasks(filter) {
  let filteredTask;
  switch (filter) {
    case 'all':
      filteredTask = tasksArray;
      break;
    case 'complete':
      filteredTask = tasksArray.filter(task => task.completed);

      break;
    case 'incomplete':
      filteredTask = tasksArray.filter(task => !task.completed);

      break;
  }
  createElement(filteredTask, taskList);
}

function createElement(tasksArray, taskList) {
  taskList.innerHTML = '';
  tasksArray.forEach(item => {
    taskList.insertAdjacentHTML(
      'beforeend',
      `<li class="task-container " data-id=${item.id}>
            <div class="checkbox-container">
              <input
                type="checkbox"
                name="custom-checkbox"
                id="custom-checkbox"
                class="input-checkbox visually-hidden"
                ${item.completed ? 'checked' : ''}
              />
              <label for="custom-checkbox" class="checkbox-label">
                <span>
                  <svg class="svg-chacckbox">
                    <use href="./img/symbol-defs.svg#icon-Rectangle-18"></use>
                  </svg>
                </span>
                <p class="item-tittle">${item.text}</p>
              </label>
            </div>
            <div class="btn-container-add-delete">
          <button class="btn-list btn-edit">
            <svg class="svg-list" viewBox="0 0 32 32">
              <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.778" d="M15.418 10.651 3.555 22.513v5.931h5.931l11.863-11.862m-5.931-5.931 4.256-4.256c.585-.586.879-.879 1.217-.989.298-.097.619-.097.916 0 .338.11.631.403 1.215.987l2.58 2.58c.587.587.881.881.991 1.22.097.298.097.619 0 .916-.11.338-.403.632-.99 1.218l-4.255 4.255m-5.93-5.931 5.931 5.931"/>
            </svg>
          </button>
          <button class="btn-list btn-delete">
            <svg class="svg-list" viewBox="0 0 32 32">
              <path stroke-width="1.778" d="M6.888 13.538a2.666 2.666 0 0 1 2.659-2.871h12.907a2.666 2.666 0 0 1 2.659 2.871l-.923 12A2.667 2.667 0 0 1 21.531 28H10.47a2.667 2.667 0 0 1-2.659-2.462l-.923-12z"/>
              <path stroke-linecap="round" stroke-width="1.778" d="M26 6.667H6"/>
              <path stroke-width="1.778" d="M13.333 4c0-.736.597-1.333 1.333-1.333h2.667c.736 0 1.333.597 1.333 1.333v2.667h-5.333V4z"/>
              <path stroke-linecap="round" stroke-width="1.778" d="M18.667 16v6.667M13.333 16v6.667"/>
            </svg>
          </button>
        </div>
          </li>`
    );
  });
}

function editTask(taskId) {
  modalEdit.classList.remove('hidden');

  const arrayMap = tasksArray.find(item => item.id === taskId);
  console.log(inputModalEdit.value);
  // arrayMap.text = inputModalEdit.value;
  inputModalEdit.value = arrayMap.text;

  applyTaskEdit.addEventListener('click', e => {
    const arrayFindElement = tasksArray.find(item => item.id === taskId);
    arrayFindElement.text = inputModalEdit.value;

    localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
    createElement(tasksArray, taskList);
    modalEdit.classList.add('hidden');
  });

  cancelTaskEdit.addEventListener('click', () => {
    modalEdit.classList.add('hidden');
  });
}
function deleteTask(taskId) {
  modalDelete.classList.remove('hidden');

  applyTaskDelete.addEventListener('click', () => {
    const findDeleteElement = tasksArray.filter(item => item.id !== taskId);
    tasksArray = findDeleteElement;
    localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
    createElement(tasksArray, taskList);
    modalDelete.classList.add('hidden');
  });

  cancelTaskDelete.addEventListener('click', () => {
    modalDelete.classList.add('hidden');
  });
  emptyList();
}

const hiddenElement = e => {
  e.classList.add('hidden');
};

function checkedToggle(taskId) {
  const task = tasksArray.find(item => item.id === taskId);
  task.completed = !task.completed;

  localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
  filterTasks('all');
}

function darkTheme() {
  body.classList.add('body-night');
}

function lightTheme() {
  body.classList.remove('body-night');
}

function emptyList() {
  if (tasksArray.length > 0) {
    emptyImg.classList.add('hidden');
    createElement(tasksArray, taskList);
  }
}
