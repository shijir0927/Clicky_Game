import React from "react";
import "./style.css";

let Title = ({highscore, score, message}) => (
    
    <nav className='Title'>
        <h1>CLICKY GAME</h1>
        <h1>Click an icon to begin!</h1>
        <div className='score-wrapper'>
            <h1 className='score'>SCORE: {score}</h1>
            <h1 className='high-score'>TOP SCORE: {highscore}</h1>
            <h1>{message}</h1>
        </div>
    </nav>
)
export default Title;