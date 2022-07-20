import React from 'react';
import TryAgain from '../TryAgain/TryAgain';
import TypingChallengeContainer from '../TypingChallengeContainer/TypingChallengeContainer';
import './TestContainer.css'

const TestContainer = ({
    selectedParagraph,
    words,
    characters,
    wpm,
    timeRemaining,
    timerStarted,
    testInfo,
    onInputChange,
    startAgain
}) => {

   

    return ( 
        <div className="test-container">
            {
                // this remaining time is greater that 0 then diplay typing challenge container , else display try again section
                timeRemaining > 0 ?( <div data-aos="fade-up" className="typign-challenge-count">

                <TypingChallengeContainer
                    selectedParagraph={selectedParagraph}
                    timerStarted={timerStarted}
                    timeRemaining={timeRemaining}
                    words={words} 
                    characters={characters} 
                    wpm={wpm}
                    testInfo={testInfo}
                    onInputChange={onInputChange}
                    />
                
            </div>) : (<div className="try-again-container ">
                <TryAgain 
                words={words} 
                characters={characters} 
                wpm={wpm}
                startAgain={startAgain}
                />
            </div>)
            }
           

            

        </div>
     );
}
 
export default TestContainer;