import {Task} from './task.js';

export class TaskList extends React.Component {
    constructor(props) {    // props неизменяемые свойства объекта, state изменяемые
        super(props);
        

        if(this.props.listType == 'active') {
            this.appendTaskButton = <button type='submit' className="appendButton">Добавить задачу</button>;
            this.props.manager.setActiveList(this);
        }
        else if(this.props.listType == 'closed') {
            this.props.manager.setClosedList(this);
        }
        
        this.state = {
            items: this.props.taskProvider(),
            length: this.props.items.length
        };
    }
    deleteTask(task) {
        this.props.manager.deleteTask(task, () => this.update()); 
    }
    checkTask(task) {
        
            //   alert(this.props.isClosed);  
        if(task.props.isClosed) {
           
            this.props.manager.openTask(task, () => this.update());
        }
        else {
            this.props.manager.closeTask(task, () => this.update());
        } 
    }
    appendTask(e) {
        e.preventDefault();
        this.props.manager.appendTask(() => this.update(), (e) => this.closeTask(e), (e) => this.deleteTask(e), 
                                   (e) => this.checkTask(e));
    }
    update() {
        this.setState({ items: this.props.taskProvider() });
    }
    render() {      // перебор по коллекции из состояниия класса, на каждый элемент создается задача;
        return (
            <form onSubmit={(e) => this.appendTask(e) }>
                {() => { return <button type='submit' className="appendButton">Добавить задачу</button> } }
                {this.appendTaskButton}
                <ul className="taskList">
                    {
                        this.state.items.map((item) => {
                            return item ;
                        })
                    }
                </ul>
            </form>
        )
    }
}

TaskList.defaultProps = {
    hasAppendButton: false,
    items: []
}