import { useEffect, useState } from "react";
import axios from "axios";
import Image from "../Image/Image";
import "./ImageList.css";
function ImageList(){

    const IMAGE_URL = "https://api.slingacademy.com/v1/sample-data/photos?offset=5&limit=20";
    const [imageList, setImageList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    async function downloadImages(){
        setIsLoading(true);
        const response = await axios.get(IMAGE_URL);
       
        const photosData = response.data.photos;
        

        const images = photosData.map((photos)=>{
            return{
                id : photos.id,
                description : photos.description,
                title : photos.title,
                url : photos.url
            }
        })
        
        
        setImageList(images);
        setIsLoading(false);
    }

    useEffect(()=>{
        downloadImages();
    },[]);




    
    return(
        <div className="image-list-wrapper">
           {
            (isLoading) ? "Loading...." :
            imageList.map((image, idx) => <Image key={idx} url={image.url} id={image.id} />)
           }
        </div>
    )
}

export default ImageList;