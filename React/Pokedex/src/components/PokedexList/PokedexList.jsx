import "./PokedexList.css";
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";
function PokemonList(){

    const {pokedexListState,setPokedexListState} = usePokemonList(false);
    
    return(
        <div className="pokedex-list-wrapper">
            <div className="pokedex-wrapper">
                {(pokedexListState.isLoading) ? 'Loading.....' :
                    pokedexListState.pokedexList.map((pokedex)=> <Pokemon id={pokedex.id} name={pokedex.name} image={pokedex.image} key={pokedex.id}/>)
                }
            </div>
            <div className="controls">
                <button
                    disabled = {pokedexListState.prevUrl === null} 
                    onClick={() => setPokedexListState(prevState => ({...prevState,pokedex_url : pokedexListState.prevUrl}))} // Go to the previous page if the prev URL exists
                    
                >Prev</button>

                <button
                    disabled = {pokedexListState.nextUrl === null} 
                    onClick={() => setPokedexListState(prevState => ({...prevState,pokedex_url : pokedexListState.nextUrl}))} // Go to the next page if the next URL exists
                    
                >Next</button>
            </div>
        </div>
        
    )
}
export default PokemonList;