import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Game.css';
import GameRules, { Cell, Point } from '../rules/Game'
import { SnakeDirection } from '../rules/Snake';
import Score from './Score'

function Game() {
    const [board, setBoard] = useState<Array<Array<Cell>>>([])
    const [gameOver, setGameOver] = useState<boolean>(false)
    const [score, setScore] = useState<number>(0)
    const [bestScore, setBestScore] = useState<number>(0)

    const game = useRef(new GameRules(50, 50))


    const addKeyboardEvents = () => {
        const listener = (e: KeyboardEvent) => {
            const keys = {
                left: 'ArrowLeft',
                up: 'ArrowUp',
                right: 'ArrowRight',
                down: 'ArrowDown',
            }
            if (e.key === keys.left) {
                game.current.direct(SnakeDirection.LEFT)
            }
            if (e.key === keys.up) {
                game.current.direct(SnakeDirection.UP)
            }
            if (e.key === keys.right) {
                game.current.direct(SnakeDirection.RIGHT)
            }
            if (e.key === keys.down) {
                game.current.direct(SnakeDirection.DOWN)
                var a= Object.seal(Object.preventExtensions({"name": "Jhon", "Age": 21}));
            }
        }
        window.addEventListener('keydown', listener)
        return () => window.removeEventListener('keydown', listener)
    }

    const resetGame = () => {
        game.current = new GameRules(50, 50)
        const cleanUp = addKeyboardEvents()
        let frame = 0
        let frameId
        const render =  () => {
            frame = (frame + 1) % 5
            if(frame === 0){
                game.current.move()
                setBoard(game.current.board())
                setGameOver(game.current.gameOver)
                setScore(game.current.score)
                if(game.current.score > bestScore) {
                    setBestScore(game.current.score)
                }
            }
            if(!game.current.gameOver) {
                frameId = window.requestAnimationFrame(render)
            }else {
                cleanUp()
            }
        }

        render()
    }


    useEffect(resetGame, [])

    const boardToRender = board.map(rows => {
        const cells = rows.map((cell) => {
            if(cell === Cell.EMPTY) {
                return <div className='cell empty'></div>
            }
            if(cell === Cell.TAIL) {
                return <div className='cell tail'></div>
            }
            if(cell === Cell.HEAD) {
                return <div className='cell head'></div>

            }
            if(cell === Cell.FOOD) {
                return <div className='cell food'></div>
            }
            if(cell === Cell.SHRINK) {
                return <div className='cell shrink'></div>
            }
            throw new Error('Invalid Cell')
        })
        return <div className='row'>{cells}</div>
    })        

    const resetBtn = gameOver ? <button onClick={resetGame}>Play Again</button> : <></>

  return (
    <div className='game-container'>
        <Score score={score} isBestScore={bestScore <= score} />
        {boardToRender}
        {resetBtn}
    </div>
    
  );
}

export default Game;
