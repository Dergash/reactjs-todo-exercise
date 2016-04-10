export class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: 'Задание #' + props.taskId,  taskId: props.taskId, isClosed: props.isClosed };
    }
    check(e) {
        this.props.onCheck(this, e);
    }
    delete(e) {     
        this.props.onDelete(this, e);
    }
    render() {
       
        return (
                <li><input className='taskCheckbox' type='checkbox' onClick={(e) => this.check(e)}/>
                    <input className='taskName' type='text' value={this.state.name}/> 
                    <a href='#' className='taskDeleteButton' onClick={(e) => this.delete(e)}>Удалить</a>
                </li>
        );
    }
}

Task.defaultProps = { isClosed: false };

/*
Task.propTypes = { 
    name: React.PropTypes.string, 
    taskId: React.PropTypes.number,
    isClosed: React.PropTypes.boolean
  };
  */
   // 