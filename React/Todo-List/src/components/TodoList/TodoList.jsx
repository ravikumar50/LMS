import { useContext, useState } from "react"
import Todo from "../Todo/Todo"
import "./TodoList.css"
import { useSelector } from "react-redux"
function TodoList({deleteTodo,editTodo,finishTodo}){

    
    const list = useSelector((state)=> state.todo.todoList)
    

    function onfinished(todo,isFinished){
        finishTodo({todo,isFinished})
    }

    function onDelete(todoId){
        deleteTodo({todoId})
    }

    function onEdit(todoId,todoText){
        editTodo({todoId,todoText})
    }
    
    return(
        <div className="todolist-wrapper">
            {list.map((todo)=> <Todo
                    key={todo.id}
                    id={todo.id} 
                    todoData={todo.todoData} 
                    isFinished={todo.finished}
                    changeFinished={(isFinished)=>onfinished(todo,isFinished)}
                    onDelete={()=> onDelete(todo.id)}
                    onEdit={(todoText)=> onEdit(todo.id,todoText)}
                    />)}
        </div>
        
    )

}

export default TodoList