import { Link } from 'react-router-dom'
import './Pokemon.css'

function Pokemon({name,image,id}){

    return(
        <div className="pokemon-wrapper">
            <Link to={`/pokemon/${id}`}>
                <div>
                    <img className='pokemon-image' src={image} alt={name} />
                </div>
                <div className='pokemon-name'>{name}</div>
            </Link>
        </div>
    )
}

export default Pokemon