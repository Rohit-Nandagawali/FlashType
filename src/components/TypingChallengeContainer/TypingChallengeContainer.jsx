import React from 'react';
import './TypingChallengeContainer.css'
import ChallengeDetailsCard from '../ChallengeDetailsCard/ChallengeDetailsCard';
import TypingChallenge from '../TypingChallenge/TypingChallenge';

const TypingChallengeContainer = ({
    selectedParagraph,
    words,
    characters,
    wpm,
    timeRemaining,
    timerStarted,
    testInfo,
    onInputChange
}) => {
    return ( 
        <div className="typing-challenge-container">
            {/* Details section (cards) */}
            <div className="details-container">
                {/* words typed */}
                <ChallengeDetailsCard cardName="Words" cardValue={words} />
                {/* characters typed  */}
                <ChallengeDetailsCard cardName="Characters" cardValue={characters} />
                {/* speed  */}
                <ChallengeDetailsCard cardName="speed" cardValue={wpm} />
            </div>

            {/* REAL challenge */}
            <div className="typewriter-container">
                <TypingChallenge 

                    testInfo={testInfo}
                    timerStarted={timerStarted} 
                    timeRemaining={timeRemaining}
                    selectedParagraph={selectedParagraph}
                    onInputChange={onInputChange}
                    />
            </div>
        </div>
     );
}
 
export default TypingChallengeContainer;