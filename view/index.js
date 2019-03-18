'use strict'

const { ipcRenderer } = require('electron')

// delete todo by its text value ( used below in event listener)
const deleteTodo = (e) => {
  ipcRenderer.send('delete-todo', e.target.textContent)
}

// create add todo window button
document.getElementById('plusToDoBtn').addEventListener('click', () => {
  ipcRenderer.send('add-todo-window')
})

// on receive todos
ipcRenderer.on('todos', (event, todos) => {
  // get the todoList ul
  const todoList = document.getElementById('todoList')
  // create html string
  const todoItems = todos.reduce((html, todo) => {
    html += `<li class="todo-item">${todo}</li>`
    return html
  }, '')
  // set list html to the todo items
  todoList.innerHTML = todoItems
  // add click handlers to delete the clicked todo
  todoList.querySelectorAll('.todo-item').forEach(item => {
    item.addEventListener('click', deleteTodo)
  })
})

document.getElementById('todoForm').addEventListener('submit', (evt) => {
  // prevent default refresh functionality of forms
  evt.preventDefault()
  // input on the form
  const input = evt.target[0]
  // send todo to main process
  ipcRenderer.send('add-todo', input.value)
  // reset input
  input.value = ''
})
