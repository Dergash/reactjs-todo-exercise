
require('./lib/es5-shim.js');
require('./lib/es5-sham.js');

import {Task} from './task.js';

export class TaskList extends React.Component {
    constructor(props) {    // props неизменяемые свойства объекта, state изменяемые
        super(props);
        if(props.listType == 'active') {
            this.appendTaskButton =  <button onClick={(e) => this.appendTask(e) } className="appendButton">Добавить задачу</button>;
            props.manager.setActiveList(this);
        }
        else if(props.listType == 'closed') {
            props.manager.setClosedList(this);
        }
        
        this.state = {
            items: props.taskProvider(),
            length: props.items.length
        };
    }
    deleteTask(task) {
        this.props.manager.deleteTask(task, () => this.update()); 
    }
    checkTask(task) {
        if(task.props.isClosed) {
            this.props.manager.openTask(task);
        }
        else {
            this.props.manager.closeTask(task);
        } 
    }
    changeTask(task) {
        this.props.manager.changeTask(task, () => this.update());
    }
    appendTask(e) {
        e.preventDefault();
        this.props.manager.appendTask(() => this.update(), (e) => this.closeTask(e), (e) => this.deleteTask(e), 
                                   (e) => this.checkTask(e), (e) => this.changeTask(e));
    }
    update() {
        this.setState({ items: this.props.taskProvider() });
    }
    render() {
        return (
            <div>
                {this.appendTaskButton}
                <ul className='taskList'>
                    {
                        this.state.items.map((item) => {
                            return item;
                        })
                    }
                </ul>
            </div>
        )
    }
}

TaskList.defaultProps = { hasAppendButton: false, items: [] }