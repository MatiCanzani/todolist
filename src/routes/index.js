const express = require('express');
const router = express.Router();
const Task = require('../model/taskModel');
// const collection = "task";2


router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'index.hml'));
});

router.get('/tasks', async (req, res) => {
	try {
		const tasks = await Task.find()
		res.json(tasks)
	} catch (error) {
		console.log(error)
	}
});

router.post('/add', async (req, res) => {
	try {
		const task = new Task(req.body);
		const saveTask = await task.save();
		res.send(saveTask);
	} catch (error) {
		res.send('Taks was not saved :( ')
	}
});

router.put('/:id', async(req,res)=>{
	try {
		const taskId = req.params.id;
		console.log(taskId)
		const userInput = req.body;
		console.log(userInput)
		const options = {new : true}
		const editTask = await Task.findByIdAndUpdate(taskId, userInput, options, err => {
			if (err) return res.send(500, 'we could not delete this task');
		});
		res.json(editTask);
		
	} catch (error) {
		console.log(error)
	}
	});


router.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		console.log(id);
		const taskDeleted = await Task.findByIdAndDelete(id, err => {
			if (err) {
				return res.send(500, 'we could not delete this task');
			}
			else(res.send('Task deleted :) '))
		});
	} catch (error) {
		console.log(error)
	}
});

module.exports = router;
