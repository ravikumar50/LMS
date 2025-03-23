import ImageList from "../ImageList/ImageList";
import "./MainPage.css";
function MainPage(){
    return(
        <div className="main-page-wrapper">
            <h2 className="heading-wrapper">Images</h2> 
            <ImageList/>
        </div>
    )
}

export default MainPage;