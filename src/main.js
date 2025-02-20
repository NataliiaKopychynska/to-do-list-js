const addBtn = document.querySelector('.add-btn');
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

const emptyImg = document.querySelector('.empty-element');
const taskList = document.querySelector('.task-list');

const searchInput = document.querySelector('.search-input');
const selectBtn = document.querySelector('.btn-all');
const body = document.body;
const label = document.querySelector('.checkbox-label');
const svgCheckbox = document.querySelector('.svg-chacckbox');
const modalWindows = document.querySelectorAll('.window-modal');
const tittleWindow = document.querySelectorAll('.title');

document.addEventListener('DOMContentLoaded', () => {
  const savedFilter = localStorage.getItem('filter') || 'all';
  selectBtn.value = savedFilter;
  filterTasks(savedFilter);

  if (localStorage.getItem('theme') === 'dark') {
    svgUse.setAttribute('href', './img/symbol-defs.svg#icon-sun');
    darkTheme();
  } else {
    svgUse.setAttribute('href', './img/symbol-defs.svg#icon-moon');
    lightTheme();
  }
});

let tasksArray = JSON.parse(localStorage.getItem('tasksArray')) || [];

if (tasksArray.length > 0) {
  emptyImg.classList.add('hidden');
  createElement(tasksArray, taskList);
}

addBtn.addEventListener('click', () => {
  modalAdd.classList.remove('hidden');
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
  const checked = false;
  tasksArray.push({ text: inputValue, id: idItem, completed: checked });
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

// checkboxItem.addEventListener('click', e => {});

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

const hiddenElement = e => {
  e.classList.add('hidden');
};

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
              <label for="custom-checkbox" class="checkbox-label checkbox-label-night">
                <span>
                  <svg class="svg-chacckbox svg-night">
                    <use href="./img/symbol-defs.svg#icon-Rectangle-18"></use>
                  </svg>
                </span>
                <p class="item-tittle">${item.text}</p>
              </label>
            </div>
            <div class="btn-container-add-delete">
              <button class="btn-list btn-edid">
                <svg class="svg-list">
                  <use href="./img/symbol-defs.svg#icon-edit"></use>
                </svg></button
              ><button class="btn-list btn-delete">
                <svg class="svg-list">
                  <use href="./img/symbol-defs.svg#icon-delete"></use>
                </svg>
              </button>
            </div>
          </li>`
    );
  });
}

function editTask(taskId) {
  const tittle = document.querySelector('.item-tittle');
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
}

function checkedToggle(taskId) {
  const task = tasksArray.find(item => item.id === taskId);

  task.completed = !task.completed;
  // checkboxElement.checked;

  localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
  filterTasks('all');
}

function darkTheme() {
  label?.classList.add('checkbox-label-night');
  svgCheckbox?.classList.add('svg-night');
  searchInput?.classList.add('input-night');
  inputModal?.classList.add('input-night');
  inputModalEdit?.classList.add('input-night');
  modalWindows.forEach(modal => modal.classList.add('window-modal-night'));
  tittleWindow.forEach(title => title.classList.add('title-night'));
  body?.classList.add('body-night');
}

function lightTheme() {
  label?.classList.remove('checkbox-label-night');
  svgCheckbox?.classList.remove('svg-night');
  searchInput?.classList.remove('input-night');
  inputModal?.classList.remove('input-night');
  inputModalEdit?.classList.remove('input-night');
  modalWindows.forEach(modal => modal.classList.remove('window-modal-night'));
  tittleWindow.forEach(title => title.classList.remove('title-night'));
  body?.classList.remove('body-night');
}
