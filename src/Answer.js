import React from "react";

export default function Answer(props) {
    let answerStyle = {}
  
    if (props.isChecked && props.isCorrect) {
        answerStyle = {
            backgroundColor : "#94D7A2",
            border : "none"
        }
    }else if (props.isHeldAndIncorrect) {
        answerStyle = {
            backgroundColor : "#F8BCBC",
            opacity: 0.5,
            border : "none"
        }
    }else if(props.isChecked){
        answerStyle = {
            opacity: 0.5
        }
    }
    else {
        answerStyle = {
            backgroundColor : props.isHeld ?  "#D6DBF5" : "white"
        }
    }

    return (
        <div className="answer" style={answerStyle} onClick={props.heldAnswer}>
            {props.answer}
        </div>
       
    )
}
