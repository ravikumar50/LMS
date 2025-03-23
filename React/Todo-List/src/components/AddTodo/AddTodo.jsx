import { useContext, useState } from "react"
import "./AddTodo.css"
import {useDispatch} from 'react-redux'
function AddTodo({addTodo}){
    const [todoText, setTodoText] = useState('');
    
    return(
        <div>
           <input
              type="text"
              value={todoText}
              placeholder="Add your next todo..."
              onChange={(e)=> setTodoText(e.target.value)}
           />

           <button onClick={()=>{
                {todoText.length!=0 ? addTodo({todoText}): ""}
                setTodoText('')
                }
            }>Add</button>
        </div>
    )
}

export default AddTodo