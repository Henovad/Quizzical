import React from "react";
import "./styles.css"
import Answer from "./Answer";

export default function Question(props) {
    const question = props.question.replace(/&quot;/g,'"').replace(/&#039;/g, "'")

    function heldAnswer(id){
        props.answerHeld(id, props.id)
    }

    let answersElements = props.answers.map( answer => {
        return (
            <Answer 
            answer={answer.answer.replace(/&#039;/g, "'")}
            isHeld = {answer.isHeld} 
            heldAnswer = {() => heldAnswer(answer.id)}
            questionId = {props.id}
            key = {answer.id}
            id = {answer.id}
            isCorrect = {answer.isCorrect}
            isHeldAndCorrect = {answer.isHeldAndCorrect}
            isHeldAndIncorrect = {answer.isHeldAndIncorrect}
            isChecked = {answer.isChecked}
            />
        )
    })

    return (
        <div className="question--container">
            <h2>{question}</h2>
            <div className="answers-contianer">
               {answersElements}
            </div>
            <hr/>
        </div>
    )
}