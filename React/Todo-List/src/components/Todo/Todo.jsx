import { useState } from "react"
import "./Todo.css"

function Todo({todoData, isFinished, id, changeFinished, onDelete, onEdit}){
    const [finished, setFinished] = useState(isFinished);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todoData)
    return(
        <div>
        <input type="checkbox"
               checked={finished} 
               onChange={(e)=>{
                    setFinished(e.target.checked)
                    changeFinished(e.target.checked)
                    }
                }
        />
        {isEditing ? <input type="text" value={editText} onChange={(e)=>setEditText(e.target.value)}/> :<span>{todoData}</span>}
        <button onClick={()=>{
            setIsEditing(!isEditing)
            onEdit(editText)
        }}>{isEditing ? 'Save' : 'Edit'}</button>
        <button onClick={onDelete}>Delete</button>
        </div>
    )
}

export default Todo