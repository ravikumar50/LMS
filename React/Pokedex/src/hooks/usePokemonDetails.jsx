import { useState, useEffect } from "react";
import axios from "axios";
import usePokemonList from "./usePokemonList";

function usePokemonDetails(id,pokemonName){
    const [pokemon, setPokemon] = useState({ types: [] }); 
    const [error, setError] = useState(false);

    async function downloadPokemon() {

        try{
            let response;
            if(pokemonName){
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            }else{
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            }
            setPokemon({
                name : response.data.name,
                image : response.data.sprites.other.dream_world.front_default,
                weight : response.data.weight,
                height : response.data.height,
                types : response.data.types.map((t)=> t.type.name)
            })  
            
            setPokedexListState(prevState =>({
                ...prevState,
                pokedex_url : `https://pokeapi.co/api/v2/type/${response.data.types[0].type.name}`
            }))         
        }catch(err){
            setError(true);
        }
        
        
    }

    const {pokedexListState,setPokedexListState}  = usePokemonList(true);

    useEffect(() => {
        downloadPokemon();
    },[id]);

    return [pokemon,pokedexListState,error];
}


export default usePokemonDetails;