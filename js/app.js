
require('./lib/es5-shim.js');
require('./lib/es5-sham.js');

import React from 'react';
import ReactDOM from 'react-dom';

import {Task} from './task.js';
import {TaskList} from './taskList.js';

/* Компонент приложения, задает начальное состояние данных в списке */
class ToDoApp extends React.Component {
    constructor() {
        super();
       // var localState =  JSON.parse(localStorage.getItem('state') || '{}');
       
        this.state = { items: [], counter: 0 }; 
    }
    //  componentDidMount(prevProps, prevState) {
    //      localStorage.state = JSON.stringify(this.state);
    //  }
    getActiveTasks() {
        return this.state.items.filter(task => task.props.isClosed == false);
    }
    getClosedTasks() {
        return this.state.items.filter(task => task.props.isClosed == true);
    }
    appendTask(updateCallback, closeHandler, deleteHandler, checkHandler, changeHandler) {
        var newCounter = this.state.counter + 1;
        var newTask = <Task taskId={newCounter} key={newCounter} onDelete={deleteHandler} 
                        onCheck={checkHandler} name={'Задача #' + newCounter} onChange={changeHandler} />;
        var newItems = this.state.items.concat(newTask);
        this.setState({ items: newItems, counter: newCounter }, () => {
                updateCallback();
        });  
    }
    deleteTask(task, updateCallback) {
        var taskToDelete = this.state.items.filter(x => x.props.taskId == task.props.taskId);
        var taskToDeleteIndex = this.state.items.indexOf(taskToDelete[0]);
        this.state.items.splice(taskToDeleteIndex, 1);
        this.setState({ items: this.state.items }, () => updateCallback());
    }
    changeTask(task, updateCallback) {
        this.updateTask(task);
        this.setState({ items: this.state.items }, () => {
             updateCallback();      
        });
    }
    closeTask(task, updateCallback) {
        this.updateTask(task, true);
        this.setState({ items: this.state.items }, () => {
             this.closedList.update();
             this.activeList.update();    
        });
    }
    openTask(task, updateCallback) {    
        this.updateTask(task, false);
        this.setState({ items: this.state.items }, () => {
             this.closedList.update();
             this.activeList.update();   
        });
    }
    updateTask(task, close) {
        var isClosed = (close == null) ? task.props.isClosed : close;
        
        var taskToUpdate = this.state.items.filter(x => x.props.taskId == task.props.taskId)[0];
        var taskToUpdateIndex = this.state.items.indexOf(taskToUpdate);
        var updatedTask = <Task taskId={task.props.taskId} key={task.props.taskId} isClosed={isClosed}
        onCheck={task.props.onCheck}  onDelete={task.props.onDelete} name={task.state.name} onChange={task.props.onChange} />
        this.state.items[taskToUpdateIndex] = updatedTask;
    }
    setActiveList(list) {
        this.activeList = list;
    }
    setClosedList(list) {
        this.closedList = list;
    }
    render() {
        return (<div>
            <h1>Активные задачи</h1>
            <div ><TaskList manager={this} listType={'active'} taskProvider={() => this.getActiveTasks()} /></div>
            <h1>Завершенные задачи</h1>
            <div className='closedTaskList'><TaskList manager={this} listType={'closed'} taskProvider={() => this.getClosedTasks()} /></div>
        </div>);
    }
}

ReactDOM.render(<ToDoApp />, document.getElementById('appContainer'))