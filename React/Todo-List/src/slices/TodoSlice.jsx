import {createSlice} from '@reduxjs/toolkit';



const initialState = {
    todoList : []
}


const TodoSlice = createSlice({
    name : 'todo',
    initialState,
    reducers : {
        addTodo : (todo, action)=>{
            const todoText = action.payload.todoText;
            todo.todoList.push({
                id : todo.todoList.length==0 ? 1 : todo.todoList[todo.todoList.length-1].id+1,
                todoData : todoText,
                finished : false
            })
        },
        editTodo : (todo, action)=>{
            let payloadTodoId = action.payload.todoId;
            let todoText = action.payload.todoText;
            todo.todoList = todo.todoList.map(t=>{
                if(t.id==payloadTodoId){
                    t.todoData = todoText;
                }
                return t;
            })
        },

        finishTodo : (todo, action)=>{
            const isFinished = action.payload.isFinished;
            const payloadTodo = action.payload.todo;
            todo.todoList = todo.todoList.map(t=>{
                if(t.id==todo.id){
                    payloadTodo.finished = isFinished;
                }
                return t
            })
        },

        deleteTodo : (todo, action)=>{
            let todoId = action.payload.todoId;
            todo.todoList = todo.todoList.filter(t=> t.id != todoId)
        }
    }

})

export const {deleteTodo,editTodo,finishTodo,addTodo} = TodoSlice.actions
export default TodoSlice.reducer;