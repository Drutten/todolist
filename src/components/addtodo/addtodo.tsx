import React from "react";
import { ITodoItem } from "../../interfaces/itodoitem";
import "./addtodo.scss";


export interface IAddTodoProps {
    addItem(todo: ITodoItem): void;
    generateId(): number;
}

export interface IAddTodoState {
    newTodo: ITodoItem;
}


export class AddTodo extends React.Component<IAddTodoProps, IAddTodoState> {

    constructor(props: IAddTodoProps){
        super(props);

        this.state = {
            newTodo: { name: '', done: false, id: 0 }
        }
            
    }


    //event handler som fångar upp ändringar i input
    handleChange(event: React.ChangeEvent<HTMLInputElement>){
        
        this.setState({
            newTodo: {name: event.target.value, done: false, id: 0}
        });  
    }

    
    //event handler för submit
    handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        if(this.state.newTodo.name){

            const newTodo = {
                name: this.state.newTodo.name,
                done: this.state.newTodo.done,
                id: this.props.generateId()
            }

            this.props.addItem(newTodo);
            //återställ
            this.setState({
                newTodo: {name: '', done: false, id: 0}
            });
        }    
    }

    


    render(){

        return(
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" className="add-input" name="textinput" value={this.state.newTodo.name} placeholder="Add Todo"  onChange={this.handleChange.bind(this)}/>
                    <input type="submit" className="add-button" value="Add"/>
                </form>
                
            </div>
        );
    }
}