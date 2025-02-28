const body = document.body;
const searchInput = document.querySelector('.search-input');

const selectBtn = document.querySelector('.select-btn');
const dropdown = document.querySelector('.select-dropdown');
const selectedText = document.querySelector('.selected');

const tittle = document.querySelectorAll('.item-tittle');
const addBtn = document.querySelector('.add-btn');
const deleteList = document.querySelector('.delete-list');
const emptyImg = document.querySelector('.empty-element');
const taskList = document.querySelector('.task-list');

const modeToggle = document.querySelector('.mode-toggle');
const iconSun = document.querySelector('.icon-sun');
const iconMoon = document.querySelector('.icon-moon');

const modalAdd = document.querySelector('.add-modal');
const inputModal = document.querySelector('.input-modal-add');
const modalEdit = document.querySelector('.edit-modal');
const inputModalEdit = document.querySelector('.input-modal-edit');
const modalDelete = document.querySelector('.delete-modal');
const modalListDelete = document.querySelector('.delete-list-modal');

document.addEventListener('DOMContentLoaded', e => {
  const savedFilter = localStorage.getItem('filter') || 'all';
  selectBtn.value = savedFilter;
  selectedText.textContent = savedFilter;
  filterTasks(savedFilter);

  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);
});

let tasksArray = JSON.parse(localStorage.getItem('tasksArray')) || [];
emptyList();

modeToggle.addEventListener('click', () => {
  const newTheme = body.classList.contains('body-night') ? 'light' : 'dark';
  setTheme(newTheme);
});

addBtn.addEventListener('click', () => {
  modalAdd.classList.remove('hidden');

  modalAdd.addEventListener('click', e => {
    const containerModal = document.querySelector('.add-window');
    const applyTaskAdd = document.querySelector('.apply');
    const cancelBtn = document.querySelector('.cancel');

    if (!containerModal.contains(e.target)) {
      hiddenElement(modalAdd);
    }

    applyTaskAdd.addEventListener('click', () => {
      applyNewTask();
    });

    inputModal.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        applyNewTask();
      }
    });

    cancelBtn.addEventListener('click', () => {
      cancelAddNewTask();
    });
  });
});

deleteList.addEventListener(
  'click',
  e => {
    const errorDelete = document.querySelector('.error-delete-list-modal');

    if (tasksArray.length > 0) {
      modalListDelete.classList.remove('hidden');

      const containerModal = document.querySelector('.delete-list-window');
      const deleteListBTN = document.querySelector('.delete-list-btn');
      const cancelDelete = document.querySelector('.cancel-delete-list-btn');

      modalListDelete.addEventListener(
        'click',
        e => {
          if (!containerModal.contains(e.target)) {
            hiddenElement(modalListDelete);
          }

          cancelDelete.addEventListener(
            'click',
            () => {
              hiddenElement(modalListDelete);
            },
            { once: true }
          );

          deleteListBTN.addEventListener(
            'click',
            () => {
              tasksArray = [];
              createElement(tasksArray, taskList);
              localStorage.setItem('tasksArray', JSON.stringify(tasksArray));

              hiddenElement(modalListDelete);
            },
            { once: true }
          );
        },
        { once: true }
      );
    } else {
      errorDelete.classList.remove('hidden');
      setTimeout(() => {
        errorDelete.classList.add('hidden');
      }, 1000);
    }
  },
  { once: true }
);

taskList.addEventListener('click', e => {
  const taskItem = e.target.closest('.task-container');

  if (!taskItem) return;
  const taskId = Number(taskItem.dataset.id);
  console.log(taskId);

  if (e.target.closest('.btn-edit')) {
    editTask(taskId);
  }

  if (e.target.closest('.btn-delete')) {
    deleteTask(taskId);
  }

  if (e.target.closest('.checkbox-container')) {
    checkedToggle(taskId);
  }
});

searchInput.addEventListener('input', e => {
  const selectedValue = localStorage.getItem('filter') || 'all';
  const filteredTasks = filterTasks(selectedValue);

  let searchValue = e.target.value.toLowerCase();

  const filteredTask = filteredTasks.filter(item => {
    if (item.text.toLowerCase().includes(searchValue)) {
      return item;
    }
  });

  if (searchValue.trim() === '') {
    createElement(tasksArray, taskList);
  } else {
    createElement(filteredTask, taskList);
  }
});

selectBtn.addEventListener('click', () => {
  dropdown.classList.toggle('hidden');
  selectBtn.classList.toggle('open');
});

dropdown.addEventListener('click', e => {
  const selectedValue = e.target.dataset.value;
  filterTasks(selectedValue);

  selectedText.textContent = selectedValue;
  localStorage.setItem('filter', selectedValue);
  dropdown.classList.toggle('hidden');
  selectBtn.classList.toggle('open');
});

function filterTasks(selectedValue) {
  let filteredTask;
  switch (selectedValue) {
    case 'all':
      filteredTask = tasksArray;

      break;
    case 'complete':
      filteredTask = tasksArray.filter(task => task.completed);
      break;
    case 'incomplete':
      filteredTask = tasksArray.filter(task => !task.completed);
      break;
    default:
      return [];
  }

  localStorage.setItem('filter', selectedValue);
  createElement(filteredTask, taskList);
  return filteredTask;
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
                  <svg class="svg-chacckbox" viewBox="0 0 32 32">
                    <path  d="M10.667 31.25l-2.987 3.046 3.046 2.987 2.987-3.046-3.046-2.988zM13.654 28.204l-10.662-10.456-5.975 6.092 10.662 10.456 5.975-6.093zM28.013 7.468l-20.393 20.795 6.093 5.975 20.393-20.795-6.093-5.975z"></path>
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

function applyNewTask() {
  const inputError = document.querySelector('.error-message');
  const inputValue = inputModal.value;
  const idItem = Date.now();

  if (inputValue.trim() === '') {
    inputError.classList.remove('hidden');
    return;
  }
  inputError.classList.add('hidden');

  tasksArray.push({ text: inputValue, id: idItem, completed: false });
  localStorage.setItem('tasksArray', JSON.stringify(tasksArray));

  hiddenElement(modalAdd);

  if (tasksArray.length > 0) {
    emptyImg.classList.add('hidden');
  }

  createElement(tasksArray, taskList);

  inputModal.value = '';
  console.log(inputValue);
}

function cancelAddNewTask() {
  hiddenElement(modalAdd);
  inputModal.value = '';
}

function editTask(taskId) {
  modalEdit.classList.remove('hidden');
  const containerModal = document.querySelector('.edit-window');
  const applyTaskEdit = document.querySelector('.apply-changes');
  const cancelTaskEdit = document.querySelector('.cancel-edit');

  const arrayMap = tasksArray.find(item => item.id === taskId);
  inputModalEdit.value = arrayMap.text;

  modalEdit.addEventListener(
    'click',
    e => {
      if (!containerModal.contains(e.target)) {
        hiddenElement(modalEdit);
      }

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
    },
    { once: true }
  );
}
function deleteTask(taskId) {
  modalDelete.classList.remove('hidden');
  const containerModal = document.querySelector('.delete-window');
  const applyTaskDelete = document.querySelector('.delete-yes');
  const cancelTaskDelete = document.querySelector('.delete-no');

  modalDelete.addEventListener(
    'click',
    e => {
      if (!containerModal.contains(e.target)) {
        hiddenElement(modalDelete);
      }

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
    },
    { once: true }
  );

  emptyList();
}

const hiddenElement = e => {
  e.classList.add('hidden');
};

function checkedToggle(taskId) {
  const task = tasksArray.find(item => item.id === taskId);
  task.completed = !task.completed;

  createElement(tasksArray, taskList);
  localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
  filterTasks();
}

function setTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('body-night');
    iconMoon.classList.add('hidden');
    iconSun.classList.remove('hidden');
  } else if (theme === 'light') {
    body.classList.remove('body-night');
    iconMoon.classList.remove('hidden');
    iconSun.classList.add('hidden');
  }
  localStorage.setItem('theme', theme);
}

function emptyList() {
  if (tasksArray.length > 0) {
    emptyImg.classList.add('hidden');
    createElement(tasksArray, taskList);
  }
}
