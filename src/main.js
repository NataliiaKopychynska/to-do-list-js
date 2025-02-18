const addBtn = document.querySelector('.add-btn');

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
// const checkboxItem = document.querySelector('.input-checkbox ');

const selectBtn = document.querySelector('.btn-all');

document.addEventListener('DOMContentLoaded', () => {
  const savedFilter = localStorage.getItem('filter') || 'all';
  selectBtn.value = savedFilter;
  filterTasks(savedFilter);
});

let tasksArray = JSON.parse(localStorage.getItem('tasksArray')) || [];

if (tasksArray.length > 0) {
  emptyImg.classList.add('hidden');
  createElement(tasksArray, taskList);
}

addBtn.addEventListener('click', () => {
  modalAdd.classList.remove('hidden');
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

  if (e.target.classList.contains('input-checkbox')) {
    const taskItem = e.target.closest('.task-container'); // Знаходимо батьківський елемент
    const taskId = Number(taskItem.dataset.id); // Отримуємо ID завдання

    checkedToggle(taskId, e.target);
  }
});

// checkboxItem.addEventListener('click', e => {});

selectBtn.addEventListener('change', e => {
  const selectedValue = e.target.value;
  localStorage.setItem('filter', selectedValue); // Зберігаємо фільтр у LS
  filterTasks(selectedValue);
});

// Функція фільтрації
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
      `<li class="task-container" data-id=${item.id}>
            <div class="checkbox-container">
              <input
                type="checkbox"
                name="custom-checkbox"
                id=${item.id}
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

function checkedToggle(taskId, checkboxElement) {
  const task = tasksArray.find(item => item.id === taskId);

  task.completed = checkboxElement.checked;

  localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
}
