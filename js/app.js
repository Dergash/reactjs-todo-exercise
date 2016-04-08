
import React from 'react';
import ReactDOM from 'react-dom';


/* Компонент приложения, задает начальное состояние данных в списке */
class ToDoApp extends React.Component {
    constructor() {
        super();
        this.state = {items: []};
    }
    render() {
         return (<div className="taskList"><TaskList items={this.state.items} /></div>);
    }
}

class TaskList extends React.Component {
    constructor(props) {    // props неизменяемые свойства объекта, state изменяемые
        super(props);       
        this.state = {items: this.props.items, length: this.props.items.length};
    }
    deleteTask(taskId) { 
         var taskToDelete = this.state.items.filter(e => e.props.taskId == taskId);
         var taskToDeleteIndex = this.state.items.indexOf(taskToDelete[0]);
         this.state.items.splice(taskToDeleteIndex,1);
         this.setState({items: this.state.items});
    }
    appendTask(e) {   
        e.preventDefault();
        var newLength = Counter + 1;
        var nextItems = this.state.items.concat(<Task  onDelete={(e) => this.deleteTask(e)} taskId={Counter}  />);
        this.setState({items: nextItems, length: newLength});
        Counter++;
    }
    
    render() {      // перебор по коллекции из состояниия класса, на каждый элемент создается задача;
                    // по итогу тасков два набора, но возможно имеет смысл хранить в this.state.items 
                    // не компоненты, а модели
        return (
            <form onSubmit={(e) => this.appendTask(e)}>
            <button type='submit' className="appendButton">Добавить задачу</button>
            <ul className="taskList">       
            {
                this.state.items.map((item) => {
                    return  <Task onDelete={(e) => this.deleteTask(e)} taskId={item.props.taskId} key={item.props.taskId} />; 
                })
            }
            </ul>
            </form>
        )
    }
}

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: 'Задание #' + props.taskId,  taskId: props.taskId };
    }
    delete(e) {     // Callback, вызываем родительский метод для удаления задачи        
       this.props.onDelete(this.state.taskId);
    }
    render() {
       
        return (
                <li><input className='taskCheckbox' type='checkbox'/>
                    <input className='taskName' type='text' value={this.state.name}/> 
                    <a href='#' className='taskDeleteButton' onClick={(e) => this.delete(e)}>Удалить</a>
                </li>
        );
    }
}

// Счетчик активных задач 
// TODO : перенести в TaskList
var Counter = 1;

ReactDOM.render(<ToDoApp />, document.getElementById('container'));