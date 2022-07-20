import React from 'react';
import TestLetter from '../TestLetter/TestLetter';
import './TypingChallenge.css'

const TypingChallenge = ({

    timeRemaining,
    timerStarted,
    testInfo,
    onInputChange
}) => {
    console.log("inside typing challenge ",testInfo);
    return ( 
        <div className="typing-challenge">
            {/* timer */}
            <div className="timer-container">
                {/* if time remaining is smaller than 10 then show '0' before the time example 00:03 */}
                <p className="timer">00:
                {timeRemaining < 10 ? `0${timeRemaining}`:timeRemaining}</p>

                {/* if timerstarted is false then it will show the text */}
                <p className="timer-info">{!timerStarted && 'Start typing to start the test'}</p>
            </div>

            {/* that paragraph and writing input area */}
            <div className="textarea-container">
                {/* this is for test paragraph  */}
                <div className="textarea-left">
                    <div className="textarea test-paragraph">
                        {/* {selectedParagraph} */}
                        
                        {/* {testInfo.map((individualLetterInfo,index)=>{
                            return <div key={index}>{individualLetterInfo.testLetter}</div>
                        })} */}

                        {testInfo.map((individualLetterInfo,index)=>{
                            return <TestLetter key={index} individualLetterInfo={individualLetterInfo}/>
                        })}
                        
                    </div>
                </div>

                {/* this is for input box */}
                <div className="textarea-right">
                    <textarea 
                    onChange={(e)=>onInputChange(e.target.value)}
                    className="textarea" 
                    placeholder='Start typing here...'
                    ></textarea>
                </div>
            </div>
        </div>
     );
}
 
export default TypingChallenge;