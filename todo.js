var taskCount = 0;
var newTask;

addTask = function(newTask) {
	
	var newListItem;
	taskCount++;
	
	due = document.querySelector('#duedate');
	
	myList = document.getElementById('busy');
	
	newListItem = document.createElement('li');
	
	newcb = document.createElement('input');
	newcb.type = 'checkbox';
	newListItem.appendChild(newcb);
	newListItem.className = "undone";
	
	if (newTask == null) {
		task = document.querySelector('#taskname');
		newItemText = document.createTextNode(task.value);
	}
	else {
		task = newTask;
		
		dueIdx = task.indexOf("Due:")
		priIdx = task.indexOf("Priority:")
		projIdx = task.indexOf("Project:")
		
		taskName = task.substring(0,dueIdx)
		dueDate = task.substring(dueIdx,priIdx)
		priVal = task.substring(priIdx,projIdx)
		projName = task.substring(projIdx)
		
		newItemText = document.createTextNode(taskName);
	}
	
	newListItem.appendChild(newItemText);
		
	if (newTask == null) {
	
		newListList = document.createElement('ul')
		newListList.className = "child";
		
		newDue = document.createTextNode(" Due: ");
		newDueText = document.createTextNode(due.value);
		newListDueItem = document.createElement('li')
		newListDueItem.appendChild(newDue)
		newListDueItem.appendChild(newDueText);
		newListList.appendChild(newListDueItem)
		
		priority = document.querySelector('#pSelect');
		newPriority = document.createTextNode(" Priority: ");
		newPriorityText = document.createTextNode(priority.value);
		newListPriItem = document.createElement('li')
		newListPriItem.appendChild(newPriority)
		newListPriItem.appendChild(newPriorityText);
		newListList.appendChild(newListPriItem)
		
		project = document.querySelector('#proj');
		newProject = document.createTextNode(" Project: ");
		newProjectText = document.createTextNode(project.value);
		newListProjItem = document.createElement('li')
		newListProjItem.appendChild(newProject)
		newListProjItem.appendChild(newProjectText);
		newListList.appendChild(newListProjItem);

		newListItem.appendChild(newListList);
		
		projectName = project.value;
	}

	else {
	
		newListList = document.createElement('ul');
		newListList.className = "child";
		
		newDueText = document.createTextNode(dueDate);
		newListDueItem = document.createElement('li');
		newListDueItem.appendChild(newDueText);
		newListList.appendChild(newListDueItem);
		
		newPriorityText = document.createTextNode(priVal);
		newListPriItem = document.createElement('li');
		newListPriItem.appendChild(newPriorityText);
		newListList.appendChild(newListPriItem);
		
		newProjectText = document.createTextNode(projName);
		newListProjItem = document.createElement('li');
		newListProjItem.appendChild(newProjectText);
		newListList.appendChild(newListProjItem);

		newListItem.appendChild(newListList);
		
		projectName = projName.substring(9);
	}

	var taskNum = taskCount.toString();
	newcb.id = taskNum;
	
	if(projectName.indexOf("Academics") >= 0) {
		subList = document.getElementById('a');
		subList.appendChild(newListItem);
	}
	else if(projectName.indexOf("Extra Curriculars") >= 0) {
		subList = document.getElementById('e');
		subList.appendChild(newListItem);
	}
	else {
		subList = document.getElementById('f');
		subList.appendChild(newListItem);
	}
	
	//myList.appendChild(newListItem);
	task.value = "";
	
	newcb.onclick = function() {
		
		if(newListItem.className == "undone") {
			newListItem.className = "done";
		}
		else {
			newListItem.className = "undone";
		}
		localSave();
	}
	localSave();
}

onLoad = function() {
	var i;
	myTasks = localStorage.getItem("todoDatabase");
	myTasks = JSON.parse(myTasks);
	
	//retrieve tasks from local Storage
	//recreate our task list
	for(i=0; i< myTasks.length; i++) {
		addTask(myTasks[i]);
	}
	//loop over list of tasks and recreate task list using addTask()
	
}

localSave = function() {
	res = [];
	var i;
	allEntries = document.querySelectorAll('li');
	for(i=0; i< allEntries.length; i++) {
		
		if (allEntries[i].className == "undone") {
			res.push(allEntries[i].innerText);
		}
	}
	console.log(res);
	// store array res in localStorage
	//alert(JSON.stringify(res));
	localStorage.setItem("todoDatabase",JSON.stringify(res));
}

task = function() {
	this.name = document.querySelector('#taskname');
	this.due = document.querySelector('#duedate');
	this.priority = "1"
	this.project = document.querySelector('#project');
	
	return this
}