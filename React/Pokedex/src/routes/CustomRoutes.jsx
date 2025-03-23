import {Routes, Route} from 'react-router-dom';
import Pokedex from '../components/Pokedex/Pokedex';
import PokemonDetail from '../components/PokemonDetail/PokemonDetail';
import ErrorPage from '../components/ErrorPage/ErrorPage';
function CustomRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Pokedex/>}/>
            <Route path="/pokemon/:id" element={<PokemonDetail/>}/>
            <Route path="/invalidName" element={<ErrorPage/>}/>
        </Routes>
    )
}

export default CustomRoutes;