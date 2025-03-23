import { useState } from "react";
import Card from "../Card/Card";
import './Grid.css';
import isWinner from "../../helpers/checkWinner";
function Grid({numberOfCards}){
    const [board,setBoard] = useState(Array(numberOfCards).fill(''));
    const [count,setCount] = useState(0);

    const [turn,setTurn] = useState(true); // true => O , false => X

    const [winner,setWinner] = useState(null);

    function play(index){
        
        if(turn) board[index] = 'O';
        else board[index] = 'X';
        const win = isWinner(board,turn?'O':'X');
        if (win) {
            setWinner(win);
        } else if (count + 1 === numberOfCards) {
            setWinner("Draw");
        }
        setCount(count + 1);
        setBoard([...board]);
        setTurn(!turn);
        
        
        
    }

    function reset(){
        setTurn(true);
        setWinner(null);
        setCount(0);
        setBoard(Array(numberOfCards).fill(''));
    }

    return(

        <div className="grid-wrapper">
            {
                winner ? (
                    <>
                        <h1 className="turn-highlight">{winner === "Draw" ? "Match is Drawn" : `Winner is ${winner}`}</h1>
                        <button className="reset" onClick={reset}>Reset Game</button>
                    </>
                ) : (
                        <h1 className="turn-highlight">Current turn {(turn) ? 'O' : 'X'}</h1>     
                )
            }
            
            <div className="grid">
                {board.map((ele,idx)=> <Card gameEnd={winner ? true : false} key={idx} player={ele} onPlay={play} index={idx} count={count}/>)}
            </div>
        </div>
        
    )
}

export default Grid;