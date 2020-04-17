import * as React from "react";
import "./todoitem.scss";
import { ITodoItem } from "../../interfaces/itodoitem";


interface ITodoItemProps{
    todo: ITodoItem;
    changeItem(todo: ITodoItem): void;
    removeItem(id: number): void;
}



class TodoItem extends React.Component<ITodoItemProps> {

    
    //Toggle mellan done och undone
    toggleDone(event: React.MouseEvent<HTMLSpanElement>){
        //console.log(this.props.todo.id);
        let toggledValue = !this.props.todo.done;
        //skapa en ny todo och byt värde på done
        const updatedTodo: ITodoItem = {
            name: this.props.todo.name,
            done: toggledValue,
            id: this.props.todo.id
        }
        this.props.changeItem(updatedTodo);
    }


    remove(event: React.MouseEvent<HTMLSpanElement>){
        //console.log(this.props.todo.id);
        this.props.removeItem(this.props.todo.id);
    }


    public render() {
        
        const iconDoneButton = (this.props.todo.done)? <span onClick={this.toggleDone.bind(this)}>&#8617;</span>:
        <span onClick={this.toggleDone.bind(this)}>&#10004;</span>;
        const iconRemoveButton = <span id={this.props.todo.id.toString()} onClick={this.remove.bind(this)}>&#128465;</span>;

        const todo = (this.props.todo.done)? <div><div className="done">{this.props.todo.name}</div><div className="icons">{iconDoneButton}{iconRemoveButton}</div></div>:
        <div><div className="undone">{this.props.todo.name}</div><div className="icons">{iconDoneButton}{iconRemoveButton}</div></div>;

        return (
            <div className="todo-item">{todo}</div>   
        );
    }


}
export default TodoItem;
