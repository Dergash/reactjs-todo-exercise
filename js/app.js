
import React from 'react';
import ReactDOM from 'react-dom';

var Tasks = ["Задача 1", "Задача 2"];

class ToDoApp extends React.Component {
    constructor() {
        super();
        this.state = {items: Tasks};
    }
    addTask() {
        var nextItems = this.state.items.concat('Задача');
        this.setState({items: nextItems});
    }
    render() {
         return (<TaskList items={this.state.items} addTask={this.addTask}/>);
    }
}

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: this.props.items};
    }
    handleSubmit(e) {
        e.preventDefault();
        var nextItems = this.state.items.concat('Задача');
        this.setState({items: nextItems});
    }
    render() {
        return (
            // Привязать this-контекст к методу
            <form onSubmit={(e) => this.handleSubmit(e)}>
            <button className="appendButton">Добавить задачу</button>
            <ul className="taskList">         
            {this.state.items.map(function(items) {
                return <Task/>;
            })}
            </ul>
            </form>
        )
    }
}

class Task extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (<li>Task</li>);
    }
}

ReactDOM.render(<ToDoApp />, document.getElementById('container'));
            