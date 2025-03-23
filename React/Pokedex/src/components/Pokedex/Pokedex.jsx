import Search from "../Search/Search";
import "./Pokedex.css";
import PokedexList from "../PokedexList/PokedexList";
import {useState} from "react";
import PokemonDetail from "../PokemonDetail/PokemonDetail"
function Pokedex(){

    const [searchTerm, setSearchTerm] = useState('');    

    return(

        <div className="main-pokedex-wrapper">
            <div className="search-wrapper">
                <Search updateSearchTerm={setSearchTerm}/>
            </div>
            {(!searchTerm) ? <PokedexList/> : <PokemonDetail key={searchTerm} pokemonName={searchTerm}/>}
        </div>
    )
}

export default Pokedex