import { Link } from 'react-router-dom';
import './App.css'
import CustomRoutes from './routes/CustomRoutes';
import PokemonList from './components/PokedexList/PokedexList';
import Pokedex from './components/Pokedex/Pokedex';
function App() {

  
  
  return (
    <div className="outer-pokedex">   
      <h1 id="pokedex-heading">
         <Link to={"/"}>Pokedex</Link>
      </h1>
      <CustomRoutes/>
    </div>
  )
}

export default App
