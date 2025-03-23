import axios from "axios";
import { useEffect, useState } from "react";


function usePokemonList(type){
    const [pokedexListState, setPokedexListState] = useState({
        pokedex_url : 'https://pokeapi.co/api/v2/pokemon',
        pokedexList : [],
        isLoading : true,
        nextUrl : '',
        prevUrl : ''
    })
    
    

    async function downloadPokemons() {
        setPokedexListState(prevState =>({
            ...prevState,
            isLoading : true
        }));

        const response = await axios.get(pokedexListState.pokedex_url);  // downloading list of 20 pokemons
        let pokemonResults = response.data.results;  // array of pokemons from the response

        if(type){
            pokemonResults = response.data.pokemon.map(p=> p.pokemon);
        }else{
            setPokedexListState(prevState =>({
                ...prevState,
                nextUrl : response.data.next,
                prevUrl : response.data.previous,
            }))     
        }


        // iterating over pokemons and using their url,creating an array of promises that will
        // download pokemons
        const pokedexRessultsPromise = pokemonResults.map((pokedex)=> axios.get(pokedex.url));

        // passing that promise array to axios.all()
        const pokedexData = await axios.all(pokedexRessultsPromise); // array of 20 pokemon detailed data
        
        
        // iterate on data of each pokemon to get the id, name and image and types
        const res = (pokedexData.map((pokedata)=> {
            const pokedex = pokedata.data;
            return {
                id : pokedex.id,
                name : pokedex.name,
                image : pokedex.sprites.other.dream_world.front_default,
                types : pokedex.types,
            }
        }));

        setPokedexListState(prevState =>({
            ...prevState,
            pokedexList : res,
            isLoading : false
        }))
    }


    useEffect(()=>{
        downloadPokemons();
    },[pokedexListState.pokedex_url])

    return{
        pokedexListState,
        setPokedexListState
    }
}

export default usePokemonList;
