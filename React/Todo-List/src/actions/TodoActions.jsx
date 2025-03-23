import { ADD_TODO,DELETE_TODO,EDIT_TODO,FINISH_TODO } from "../constants/action";
// Action creators
const addTodo = (todoText) => ({ type: ADD_TODO, payload: {todoText}});
const editTodo = (todo,todoText) => ({ type: EDIT_TODO, payload: { todoText, todo }});
const deleteTodo = (todoId) => ({ type: DELETE_TODO, payload: {todoId }});
const finishTodo = (todo, isFinished) => ({ type: FINISH_TODO, payload: { todo, isFinished }})

export { addTodo, editTodo, deleteTodo, finishTodo };
export { ADD_TODO, EDIT_TODO, DELETE_TODO, FINISH_TODO };  // Export action types for reducers
