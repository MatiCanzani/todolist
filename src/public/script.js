const display = document.getElementById('display-tasks');
const form = document.getElementById('form');
const todoTasks = document.getElementById('title');
const url = 'https://todolist-maticanzani.herokuapp.com' 
const clearValue = () => {
    todoTasks.value = "";
}
const getTasks = async () => {
    const url = `${url}`;
    const res = await fetch(url);
    const data = await res.json();
    displayTasks(data);
    return data;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    axios({
        method: 'POST',
        url: `${url}/add`,
        data: {
            title: todoTasks.value
        }
    })
        .then((data) => {
            const task = data.data;
            const ids = elementsIds(task);
            template(task, ids)
            clearValue();
        })
        .catch(function (error) {
            console.log(error);
        })
});

const template =  (task, ids) => {
    ids = elementsIds(task);
    const divCntr = document.createElement('div');
    divCntr.className = 'col-md-3 cntr neumorphism';
    divCntr.id = ids.cntrId;
    const divChek = document.createElement('div');
    divChek.className = "div-bkd ";
    const check = document.createElement('input');
    check.type = "checkbox"
    check.id = ids.checkId;
    const spanCntr = document.createElement('div');
    spanCntr.className = "span-cntr col-8"
    const item = document.createElement('span');
    item.role = "textbox"
    item.contentEditable = false;
    item.innerHTML = task.title;
    item.className = "card__text";
    item.id = ids.itemId;
    const tasks = document.getElementById('display-tasks');// aca 
    const divBtn = document.createElement('div')
    divBtn.className =  " text-right";
    const editBtn = document.createElement('button');
    editBtn.id = ids.editId;
    editBtn.className = 'btn btn-neuf ';
    editBtn.innerHTML = '<i class="far fa-edit"></i>'
    const confBtn = document.createElement('button');
    confBtn.id = ids.confEdit;
    confBtn.hidden = true;
    confBtn.className = 'btn btn-neuf ';
    confBtn.innerHTML = '<i class="fas fa-check"></i>';
    const trashBtn = document.createElement('button');
    trashBtn.id = ids.trashId;
    trashBtn.className = 'btn btn-neuf';
    trashBtn.innerHTML = '<i class="fas fa-times"></i>';
    trashBtn.hidden = true;
    const delBtn = document.createElement('button');
    delBtn.id = ids.deleteId;
    delBtn.className = 'btn btn-neuf';
    delBtn.innerHTML = '<i class="far fa-trash-alt"></i>'
    divCntr.appendChild(divChek);
    divCntr.appendChild(spanCntr);
    spanCntr.appendChild(item);
    divChek.appendChild(check);
    divCntr.appendChild(divBtn);
    divBtn.appendChild(editBtn);
    divBtn.appendChild(confBtn);
    divBtn.appendChild(trashBtn);
    divBtn.appendChild(delBtn);
    tasks.appendChild(divCntr);
    editTask(task, ids.itemId, ids.editId, ids.deleteId, ids.confEdit, ids.trashId);
    deleteTasks(task, ids.cntrId, ids.deleteId);
    lineThorough(ids.taskId, ids.checkId);
}

const elementsIds = (task) => {
    return {
        editId: "edit_" + task._id,
        confEdit: "conf_" + task._id,
        deleteId: "del_" + task._id,
        trashId: "trash_" + task._id,
        itemId: task._id,
        taskId: task._id,
        cntrId: "cntr_" + task._id,
        checkId: "check_" + task._id
    }
}

const deleteTasks = (task, cntrId, deleteId) => {
    const deleteBtn = document.getElementById(`${deleteId}`);
    deleteBtn.addEventListener('click', () => {
        axios({
            method: 'DELETE',
            url: `${url}/${task._id}`,
        }
        ).then(() => {
            document.getElementById(`${cntrId}`).remove();
        })
    })
}

const editTask = (task, itemId, editId, deleteId, confEdit, trashId) => {
    const taskInfoId = document.getElementById(`${itemId}`);
    const editBtn = document.getElementById(`${editId}`);
    const sendBtn = document.getElementById(`${confEdit}`);
    const delBtn = document.getElementById(`${deleteId}`);
    const trashBtn = document.getElementById(`${trashId}`);
    const item = document.getElementById(`${task._id}`);
    const btnsNewState = () => {
        sendBtn.hidden = false
        editBtn.hidden = true
        trashBtn.hidden = false
        delBtn.hidden = true
        item.contentEditable = true;
    };
    const btnFstState = () => {
        sendBtn.hidden = true;
        editBtn.hidden = false;
        trashBtn.hidden = true;
        delBtn.hidden = false;
        item.contentEditable = false;
        delBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
    }
    editBtn.addEventListener('click', () => {
        btnsNewState();
        sendBtn.addEventListener('click', () => {
                axios({
                    method: 'PUT',
                    url: `${url}/${task._id}`,
                    data: {
                        title: taskInfoId.value
                    }
                })
                    .then(
                        btnFstState()
                    )
        });
        trashBtn.addEventListener('click', () => {
            btnFstState()
        })
    })
}

const lineThorough = (taskId, checkId) => {
    const check = document.getElementById(`${checkId}`);
    const taskInfo = document.getElementById(`${taskId}`);
    check.addEventListener('click', () => {
        const lineThorough = () => {
            if (check.checked) {
                taskInfo.style.textDecoration = "line-through";
                taskInfo.style.fontStyle = "italic"
            }else{
                taskInfo.style.textDecoration = "none";
                taskInfo.style.fontStyle = "normal"
            }
        }
        check.onchange = lineThorough();
    })
}


const displayTasks = (tasks) => {
    tasks.forEach(task => {
        let ids = template(task);
    })
}

window.onload = () => {
    getTasks();

}