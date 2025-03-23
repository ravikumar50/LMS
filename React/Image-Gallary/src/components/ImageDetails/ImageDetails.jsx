import { useParams } from "react-router-dom";
import "./ImageDetails.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function ImageDetails(){

    const {id} = useParams();
    const IMAGE_URL = `https://api.slingacademy.com/v1/sample-data/photos/${id}`;
    const [isLoading,setIsLoading] = useState(true);
    const [image, setImage] = useState({});

    async function downloadImage(){
        const response = await axios.get(IMAGE_URL);
        const imageData = response.data.photo;

        const res = {
            id : imageData.id,
            title : imageData.title,
            url : imageData.url,
            description : imageData.description
        }

        setImage(res);
        console.log(res.title);
    }


    useEffect(()=>{
        downloadImage();
    },[])
    

    return(
        <div className="image-details-wrapper">
            <img className="image-details-image" src={image.url} alt="Image"/>
            <div className="image-details">
                <div className="image-details-title">{image.title}</div>
                <div className="image-details-description">{image.description}</div>
            </div>
        </div>
    )
}

export default ImageDetails;