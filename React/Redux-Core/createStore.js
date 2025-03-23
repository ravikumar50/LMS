import { createStore, bindActionCreators, combineReducers } from "redux";

function TodoReducer(state=[], action){
    if(action.type=='add_todo'){
        let todoText = action.payload.todoText;

        return [
            ...state,
            {
                id : state.length==0 ? 1 : state[state.length-1].id+1,
                todoData : todoText,
                finished : false}
        ]
    }else if(action.type=='edit_todo'){
        let todo = action.payload.todo;
        let todoText = action.payload.todoText;
        const updateList = state.map(t=>{
            if(t.id==todo.id){
                todo.todoData = todoText;
            }
            return t;
        })
        return updateList;
    }else if(action.type=='delete_todo'){
        let todoId = action.payload.todoId;
        const updateList = state.filter(t=> t.id != todoId)
        return updateList;
    }else if(action.type=='finish_todo'){
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


function UserReducer(state=[], action){
    if(action.type=='add_user'){
        const name = action.payload.name;
        return [
            ...state,
            {
                id : state.length==0 ? 1 : state[state.length-1].id+1,
                name : name,
            }
        ]

    }else return state
}

// action objects -> Action Methods (action creators)
const addTodo = (todoText) => ({type : 'add_todo', payload : {todoText}});
const deleteTodo = (todoId) => ({type : 'delete_todo', payload : {todoId}});
const addUser = (name) => ({type : 'add_user', payload : {name}});


const reducer = combineReducers({todo : TodoReducer, user : UserReducer})
const {dispatch, subscribe, getState, replaceReducer} = createStore(reducer)
subscribe(()=> console.log(getState()));


const actions = bindActionCreators({addTodo,deleteTodo,addUser},dispatch)

// dispatch(addTodo('todo1'));
// dispatch(addTodo('todo2'));
// dispatch(deleteTodo(1))

actions.addTodo('todo1');
actions.addTodo('todo1');
actions.addUser('Ravi');
