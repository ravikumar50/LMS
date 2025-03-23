import { act } from "react"
import { ADD_TODO,EDIT_TODO,FINISH_TODO,DELETE_TODO, editTodo } from "../actions/TodoActions";
function TodoReducer(state=[], action){
    if(action.type==ADD_TODO){
        
        let todoText = action.payload.todoText;
        return [
            ...state,
            {
                id : state.length==0 ? 1 : state[state.length-1].id+1,
                todoData : todoText,
                finished : false
            }
        ]
    }else if(action.type==EDIT_TODO){
        let todo = action.payload.todo;
        let todoText = action.payload.todoText;
        const updateList = state.map(t=>{
            if(t.id==todo.id){
                todo.todoData = todoText;
            }
            return t;
        })
        return updateList;
    }else if(action.type==DELETE_TODO){
        let todoId = action.payload.todoId;
        const updateList = state.filter(t=> t.id != todoId)
        return updateList;
    }else if(action.type==FINISH_TODO){
        const isFinished = action.payload.isFinished;
        const todo = action.payload.todo;
        const updateList = state.map(t=>{
            if(t.id==todo.id){
                todo.finished = isFinished;
            }
            return t
        })
        return updateList;
    }else{
        return state
    }
}

export default TodoReducer