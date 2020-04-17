import React from 'react';
import './todolist.scss';
import { ITodoItem } from '../../interfaces/itodoitem';
import TodoItem from '../todo/todoitem';



export interface ITodoListProps {
    todos: ITodoItem[];
    changeItem(todo: ITodoItem): void;
    removeItem(id: number): void;
}



export default class TodoList extends React.Component<ITodoListProps>{

    
    render() {

        const todolist = this.props.todos.map((item)=>    
            <TodoItem key={item.id} todo={item} changeItem={this.props.changeItem} removeItem={this.props.removeItem}/>       
        );

        return (
        <div>{todolist}</div>
        ); 
        
    }
}