
require('./lib/es5-shim.js');
require('./lib/es5-sham.js');

export class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: props.name,  taskId: props.taskId, isClosed: props.isClosed };
        if(props.name == null) {
            this.state = {name: 'Зие #' + props.taskId};
        }
        if(props.isClosed == false) {
            this.deleteButton = <a href='#' className='taskButton deleteButton' onClick={(e) => this.delete(e)}>Удалить</a>;
            this.checkButton = <input className='taskCheckbox' type='checkbox' checked={props.isClosed}  
                        onClick={(e) => this.check(e)}/>;
        } 
        else {
            this.checkButton = <input className='taskCheckbox' disabled='true' type='checkbox' checked={props.isClosed} />; 
            this.restoreButton = <a href='#' className='taskButton restoreButton' onClick={(e) => this.check(e)}>Восстановить</a>;
        }
    }
    check(e) {
        this.props.onCheck(this, e);
    }
    delete(e) {     
        this.props.onDelete(this, e);
    }
    edit(e) {
        this.backupTaskState = this.state;
        if(this.props.isClosed == false) {
            this.setState({isEdit: true});
        }
    }
    acceptChanges(e) {
        if (!e)  e = window.event;
        //IE9 & Other Browsers
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        //IE8 and Lower
        else {
            e.cancelBubble = true;
        }
        this.setState({isEdit: false});
        this.props.onChange(this, e);
    }
    cancelChanges(e) {
        this.setState(this.backupTaskState, () => this.setState({isEdit: false}));
    }
    onChange(e) {
        this.setState({name: e.target.value});
    }
    render() {
        if(this.state.isEdit) {
            this.cancelButton = <a href='#' className='taskButton editButton' id='cancelButton' 
                                        onMouseDown={(e) => this.cancelChanges(e)}>Отменить</a>;
        }
        else {
            this.cancelButton = null;
        }
        return (
                <li>
                    {this.checkButton}     
                    <input className='taskName' type='text' onChange={(e) => this.onChange(e)} disabled={this.state.isClosed}
                    value={this.state.name} readOnly={!this.state.isEdit} onBlur={(e) => this.acceptChanges(e)} 
                    onClick={(e) => this.edit(e)} />                   
                    {this.deleteButton}
                    {this.cancelButton}
                    {this.restoreButton}
                </li>
        );
    }
}

Task.defaultProps = {isClosed: false, isEdit: false };