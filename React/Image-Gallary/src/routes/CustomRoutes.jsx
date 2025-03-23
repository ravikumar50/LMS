import {Routes, Route} from 'react-router-dom';
import MainPage from '../components/MainPage/MainPage';
import ImageDetails from '../components/ImageDetails/ImageDetails';


function CustomRoutes(){
    return(
        <Routes>
           <Route path="/" element={<MainPage/>}></Route>
           <Route path="/:id" element={<ImageDetails/>}></Route>
        </Routes>
    )

}

export default CustomRoutes;