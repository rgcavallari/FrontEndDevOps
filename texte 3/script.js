// Seleção de elementos
const addTaskButton = document.getElementById('add-task');
const taskInput = document.getElementById('task-input');
const priorityInput = document.getElementById('priority-input');

// Função para adicionar uma tarefa
function addTask() {
    const taskText = taskInput.value.trim();
    const priority = priorityInput.value;
    
    if (taskText === "") {
        alert("Por favor, insira uma tarefa.");
        return;
    }

    const taskElement = document.createElement('li');
    taskElement.textContent = taskText;

    // Selecione a lista correta com base na prioridade
    const listId = `${priority}-list`;
    const list = document.getElementById(listId);
    list.appendChild(taskElement);

    // Limpar o campo de entrada
    taskInput.value = '';
}

// Adicionando evento ao botão
addTaskButton.addEventListener('click', addTask);

// Adicionar tarefa com o Enter
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});
