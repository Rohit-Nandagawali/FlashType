import React from "react";
import ChallengeSection from "../ChallengeSection/ChallengeSection";
import Footer from "../Footer/Footer";
import Landing from "../Landing/Landing";
import Nav from "../Nav/Nav";
import "./App.css"
// accessed using curly bracket because it is not export with default
import {SAMPLE_PARAGRAPHS} from "./../../data/sampleParagraphs"

const TotalTime=60

// storing the link where we are fetching the data
const ServiceUrl = "http://metaphorpsum.com/paragraphs/1/9"

// creating constant for storing the default
const DefaultState ={
    // this will contain the paragraph that will be displayed
    selectedParagraph:"",
    // this will tell whether timer is stated or not
    timerStarted:false,
    // this will tell how much time is remaining
    timeRemaining:TotalTime,
    // contain how mamy words are typed
    words:0,
    characters:0,
    wpm:0,
    testInfo:[]

}

class App extends React.Component{

    // creating states for the App
    state= DefaultState 

    // fetching new paragraph from data not from api
    fetchNewParagraphFallback=()=>{

        // calling random paragraph
        const data = SAMPLE_PARAGRAPHS[
            Math.floor(Math.random() * SAMPLE_PARAGRAPHS.length)
        ]

        const selectedParagraphArray = data.split("")

            const testInfo = selectedParagraphArray.map(selectedLetter => {
                return{
                    testLetter : selectedLetter,
                    status : "notAttempted",
                }
            })

            // this.setState({testInfo:testInfo}) following is shorthand for this
            this.setState({
                // this will first extract everything from the default state and pass
                ...DefaultState,
                // and override following values
                testInfo,
                selectedParagraph:data})

    }

    // function to start timer
    startTimer = ()=>{
        this.setState({timerStarted : true})
        const timer = setInterval(()=>{
            // if timer is running

            if (this.state.timeRemaining > 0){

                 // change the wpm
                const timeSpent= TotalTime - this.state.timeRemaining

                const wpm = timeSpent > 0 ? (this.state.words / timeSpent) * TotalTime : 0

                this.setState({
                    timeRemaining:this.state.timeRemaining-1,
                    wpm: parseInt(wpm)
                })
            }
            else{
                // close the timer if it is below zero
                clearInterval(timer)
            }
        },1000)
    }

    // function for startAgain/try again
    startAgain=() =>  this.fetchNewParagraphFallback()

    // fetch new paragraph
    fetchNewParagraph =() =>{
        fetch(ServiceUrl)
        .then(responce => responce.text())
        .then(data => {
           
            
            const selectedParagraphArray = data.split("")

            const testInfo = selectedParagraphArray.map(selectedLetter => {
                return{
                    testLetter : selectedLetter,
                    status : "notAttempted",
                }
            })

            // this.setState({testInfo:testInfo}) following is shorthand for this
            this.setState({
                // this will first extract everything from the default state and pass
                ...DefaultState,
                // and override following values
                testInfo,
                selectedParagraph:data})

        })
    }


    // creating function to handle input 
    handleUserInput =(inputValue)=>{
        // if timer not started then start it
        if(!this.state.timerStarted){
            this.startTimer()
        }

        /**
         * 1.Handle the underflow case - case when typing is not started : all the characted should be shown as not attempted 
         * 
         * 2.Handle the overflow case - if user completed the test before the 60 seconds : early exit(stop compairing)
         * 
         * 3.Handle the backspace - if user press backspace : 
         *       •mark the (index+1) element as not attempted
         *       •but dont forget to check the overflow case here (index+1 -> can go out of bound, when the index is ===lenght-1)
         * 
         *4.Update the status in the test info in the card:
                •find out the last character in the inputValue and It's index
                •check if the character at same index in testInfo(state) matches
                •if yes -> correct else no -> incorrect

                •irrespected of the case, characters, word. and speed(wpm) can ve updated

         *       
         */

        const characters = inputValue.length
        const words = inputValue.split(" ").length
        const index = characters -1

        // handling the underflow case
        if(index < 0){
            this.setState({
                testInfo :[
                    {
                        testLetter : this.state.testInfo[0].testLetter,
                        status:"notAttempted"
                    },
                    ...this.state.testInfo.slice(1)
                ],
                characters,
                words,
            })

            return
        }

        // handling the overflow case
        if(index >= this.state.selectedParagraph.length){
            this.setState({characters,words})
            return
        }

        // handling the backspace
        // make a copy of testInfo
        const testInfo = this.state.testInfo
        // if the user press backspace just making the index + 1 element is notAttempted
        if(!(index === this.state.selectedParagraph.length -1 )){
            testInfo[index + 1].status = "notAttempted"
        }

        // check for the correct typed letter
        const isCorrect = inputValue[index] === testInfo[index].testLetter

        // update the test info
        testInfo[index].status = isCorrect ? "correct" : "incorrect"

        // updating the states
        this.setState({
            testInfo,
            words,
            characters,

        })
        
        
    }

    componentDidMount(){
    
        this.fetchNewParagraphFallback()

    }

    render(){

        return(

            <div className="app">

            {/* nav section */}
            <Nav />
            {/* landing page */}
            <Landing/>
            {/* challenge section */}
            <ChallengeSection 
                selectedParagraph={this.state.selectedParagraph}
                words={this.state.words}
                characters={this.state.characters}
                wpm={this.state.wpm}
                timeRemaining={this.state.timeRemaining}
                timerStarted={this.state.timerStarted}
                testInfo={this.state.testInfo}

                // passwing function to handle input
                onInputChange={this.handleUserInput}

                // passing the startAgain function
                startAgain = {this.startAgain}
            />

            {/* footer */}
            <Footer/>


            </div>
        )
    }
}
export default App