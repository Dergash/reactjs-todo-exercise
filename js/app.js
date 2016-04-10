
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
        return this.state.items.filter(task => task.props.isClosed == false);
    }
    getClosedTasks() {
        return this.state.items.filter(task => task.props.isClosed == true);
    }
    appendTask(updateCallback, closeHandler, deleteHandler, checkHandler) {
        var newCounter = this.state.counter + 1;
        var newTask = <Task taskId={newCounter} key={newCounter} onDelete={deleteHandler} 
                        onCheck={checkHandler} />;
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
        var closedTask = <Task taskId={taskToClose.props.taskId} key={taskToClose.props.taskId} isClosed={true}
        onCheck={taskToClose.props.onCheck} onDelete={taskToClose.props.onDelete}  />
        this.state.items[taskToCloseIndex] = closedTask;
        this.setState({ items: this.state.items }, () => {
             this.state.closedList.update();
             this.state.activeList.update();        
        });
    }
    openTask(task, updateCallback) {
        
        var taskToOpen = this.state.items.filter(x => x.props.taskId == task.props.taskId)[0];
        var taskToOpenIndex = this.state.items.indexOf(taskToOpen);
        var openedTask = <Task taskId={taskToOpen.props.taskId} key={taskToOpen.props.taskId} isClosed={false}
        onCheck={taskToOpen.props.onCheck}  onDelete={taskToOpen.props.onDelete}  />
        this.state.items[taskToOpenIndex] = openedTask;     
        this.setState({ items: this.state.items }, () => {
             this.state.closedList.update();
             this.state.activeList.update();    
        });
    }
    setActiveList(list) {
        this.setState({activeList: list});
    }
    setClosedList(list) {
        this.setState({closedList: list});
    }
    render() {
        return (<div>
            <h1>Активные задачи</h1>
            <div className="taskList"><TaskList manager={this} listType='active' taskProvider={() => this.getActiveTasks()} /></div>
            <h1>Завершенные задачи</h1>
            <div className="taskList"><TaskList manager={this} listType='closed' taskProvider={() => this.getClosedTasks()} /></div>
        </div>);
    }
}

ReactDOM.render(<ToDoApp />, document.getElementById('appContainer'))