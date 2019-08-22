import React, { Component } from 'react'
import TodoRow from './TodoRow';
import TodoBanner from './TodoBanner';
import TodoCreator from './TodoCreator';
import VisibilityControl from './VisibilityControl';

export default class App extends Component {

    constructor(props){
        super(props)
        this.state={
            name : "Somnath", 
            todoItems : [
                {action: "Buy Flowers", done: false},
                {action: "Get Shoes", done: false},
                {action: "Collect Tickets", done: true},
                {action: "Call Joe", done: false}
            ],
            //newItemText: ""
            showCompleted : true
        }
    }

    updateNewTextValue = (event) => {
        this.setState({newItemText : event.target.value})
    }

    createNewTodo = (task) => {
        if(!this.state.todoItems.find(item => item.action === task)){
            this.setState({
                todoItems : [...this.state.todoItems, {action: task, done: false}]
            }, () => localStorage.setItem("todos", JSON.stringify(this.state)))
        }
        console.log(localStorage.getItem("todos"))
    }
    changeStateData = () => {
        this.setState({
            name : this.state.name === "John" ? "Somnath" : "John"
        })
    }

    toggleTodo = (todo) => this.setState({
        todoItems : this.state.todoItems.map(item => item.action === todo.action ? {...item, done: !item.done} : item)
    })

    todoTableRows = (doneValue) => 
            this.state.todoItems.filter(item => item.done === doneValue).map(item => 
            <TodoRow key={item.action} item={item} callback={this.toggleTodo} />
        )

    componentDidMount = () => {
        let data = localStorage.getItem("todos")
        console.log(`Storing data ${data}`)
        this.setState( data != null ? JSON.parse(data) : {
            name : "Somnath",
            todoItems : [
                {action: "Buy Flowers", done: false},
                {action: "Get Shoes", done: false},
                {action: "Collect Tickets", done: true},
                {action: "Call Joe", done: false}
            ],
            //newItemText: ""
            showCompleted : true
        })
    }
    render() {
        return (
            <div>
                <TodoBanner name={this.state.name} tasks={this.state.todoItems} />
                <div className="container-fluid">
                    <TodoCreator callback={this.createNewTodo} />
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr><th>Description</th><th>Done</th></tr>
                        </thead>
                        <tbody>{this.todoTableRows(false)}</tbody>
                    </table> 
                    <div className="bg-secondary text-white text-center p-2">
                        <VisibilityControl 
                            description="Completed Tasks" 
                            isChecked={this.state.showCompleted}
                            callback={(checked) => this.setState({showCompleted : checked})} 
                        />
                    </div>

                    {this.state.showCompleted && 
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr><th>Description</th><th>Done</th></tr>
                            </thead>
                            <tbody>
                                {this.todoTableRows(true)}
                            </tbody>
                        </table>

                    }   
                </div> 
            </div>
        )
    }
}
