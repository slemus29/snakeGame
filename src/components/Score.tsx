import React from 'react';
import './Score.css'
export interface ScoreProps {
    score: number
    isBestScore: boolean
}
function Score({score = 0, isBestScore} : ScoreProps) {
    const classes = isBestScore ? 'best-score': 'scores'
  return (
    <div className={classes}>
      {score}
    </div>
  );
}

export default Score;
