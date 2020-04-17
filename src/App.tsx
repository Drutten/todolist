import React from 'react';
import './App.scss';
import TodoList from './components/todolist/todolist';
import { AddTodo } from './components/addtodo/addtodo';
import { ITodoItem } from './interfaces/itodoitem';



interface IAppState {
  todos: ITodoItem[];
}

class App extends React.Component<{}, IAppState> {
  
  constructor(props: any){
    super(props);
    //initial state
    this.state = {
      todos: this.retrieveList("todos"),
    }
  }



  storeList(arr: ITodoItem[], storageName: string): void{
    //Kolla om webbläsaren har webStorage
    if(typeof(Storage) !== "undefined"){           
        localStorage.setItem(storageName, JSON.stringify(arr));           
    }
  }


  retrieveList(storageName: string): ITodoItem[]{
    const arr: ITodoItem[] = [];
    //Kolla om webbläsaren har webStorage
    if(typeof(Storage) !== "undefined"){

        //Kolla om listan är definierad i localStorage
        if(localStorage.getItem(storageName)){

            //Hämta från localStorage
            let tempList: any[];
            let temp: string | null = localStorage.getItem(storageName); 
            tempList = (temp)? JSON.parse(temp) : [];
            
            if(tempList.length > 0){
                arr.length = 0;
                tempList.forEach((item: any) => {
                    arr.push(item);
                });
            }
        }    
    }
    return arr;    
}
  


  addItem =(todo: ITodoItem) =>{
    const updatedTodos = [...this.state.todos, todo];
    this.storeList(updatedTodos, "todos"); 
    this.setState({
      todos: updatedTodos 
    });
  }


  generateId =(): number =>{
    let id = 0;
    this.state.todos.forEach((item)=>{
      id = (item.id > id)? item.id : id;
    });
    return ++id;
  }


  changeItem =(updatedTodo: ITodoItem) =>{
    const updatedTodos = [...this.state.todos];
    this.state.todos.forEach((item, idx)=>{
      if(updatedTodo.id === item.id){
        updatedTodos.splice(idx, 1, updatedTodo);
      }
    });
    this.storeList(updatedTodos, "todos");
    this.setState({
      todos: updatedTodos
    });     
  }

  
  removeItem = (id: number) =>{
    const updatedTodos = this.state.todos.filter(item => item.id !== id);
    this.storeList(updatedTodos, "todos");
    this.setState({
      todos: updatedTodos
    });  
  }
  

  render(){ 
    
    return (
      
      <div className="App">
        <h1>Todo List</h1>
        <div className="list-section">
          <AddTodo  addItem={this.addItem} generateId={this.generateId}/>   
          <TodoList todos={this.state.todos} changeItem={this.changeItem} removeItem={this.removeItem}/>
        </div>  
      </div>
    );
  }
  
}

export default App;
