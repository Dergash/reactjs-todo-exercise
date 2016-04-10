
import React from 'react';
import ReactDOM from 'react-dom';

import {Task} from './task.js';
import {TaskList} from './taskList.js';

/* Компонент приложения, задает начальное состояние данных в списке */
class ToDoApp extends React.Component {
    constructor() {
        super();
        this.state = { items: [], counter: 0 };
    }
    getActiveTasks() {
        
        var result = this.state.items.filter(task => task.props.isClosed == false)
        return result;
    }
    getClosedTasks() {
        
        return this.state.items.filter(task => task.state.isClosed == true);
    }
    appendTask(updateCallback, closeHandler, deleteHandler) {
        var newCounter = this.state.counter + 1;
        var newTask = <Task taskId={newCounter} key={newCounter} onClose={closeHandler} onDelete={deleteHandler} />;
        var newItems = this.state.items.concat(newTask);
        this.setState({ items: newItems, counter: newCounter }, () => updateCallback());  
    }
    deleteTask(task, updateCallback) {
        var taskToDelete = this.state.items.filter(x => x.props.taskId == task.props.taskId);
        var taskToDeleteIndex = this.state.items.indexOf(taskToDelete[0]);
        this.state.items.splice(taskToDeleteIndex, 1);
        this.setState({ items: this.state.items }, () => updateCallback());
    }
    closeTask(task, updateCallback) {
        var taskToClose = this.state.items.filter(x => x.props.taskId == task.props.taskId)[0];
        var taskToCloseIndex = this.state.items.indexOf(taskToClose);
        var closedTask = <Task taskId={taskToClose.props.taskId} key={taskToClose.props.taskId} 
                    onClose={taskToClose.props.onClose} onDelete={taskToClose.props.onDelete} isClosed={true} />
        this.state.items[taskToCloseIndex] = closedTask;
        this.setState({ items: this.state.items }, () => { updateCallback(); });
    }
    render() {
        return (<div>
            <h1>Активные задачи</h1>
            <div className="taskList"><TaskList hasAppendButton={true} manager={this} taskProvider={(e) => this.getActiveTasks(e)} /></div>
            <h1>Завершенные задачи</h1>
            <div className="taskList"><TaskList manager={this} taskProvider={(e) => this.getClosedTasks(e)} /></div>
        </div>);
    }
}

ReactDOM.render(<ToDoApp />, document.getElementById('appContainer'))