import { Link } from "react-router-dom";
import "./Image.css";

function Image({url,id}){
    
    return(
        <div className="image-wrapper">
            <Link to={`/${id}`}>
            <img className="image" src={url} alt="Image"/>
            </Link>
            
        </div>
    )

}
export default Image;