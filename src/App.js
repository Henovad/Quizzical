import React from "react"
import "./styles.css"
import Question from "./Question"
import { nanoid } from "nanoid"


export default function App(){
    const [menu, setMenu] = React.useState(true)
    const [newGame, setNewGame] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    const [checked, setChecked] = React.useState(false)
    const [score, setScore] = React.useState(0)

    function toggleMenu(){
        setMenu(prevState => !prevState)
    }

    function startNewGame(){
        setNewGame(prevState => !prevState)
        setChecked(false)
        setScore(0)
    }

    function shuffleQuestions(questionList) {
        for (let i = questionList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questionList[i], questionList[j]] = [questionList[j], questionList[i]];
        }
        return questionList
    }

    function getAnswers(answerList, correctAnswer){
        return answerList.map(answer => {
            return ({
                isHeld : false,
                isCorrect: answer === correctAnswer ? true : false,
                answer: answer,
                id : nanoid(),
                isHeldAndCorrect: false,
                isHeldAndIncorrect : false,
                isChecked: false
            })
        })
    }

    function getAllNewQuestion(questionList){
        let newQuestions = questionList.map(quest => {
            return ({
                id : nanoid(),
                question : quest.question,
                correctAnswer : quest.correct_answer,
                answers : getAnswers(shuffleQuestions([...quest.incorrect_answers, quest.correct_answer]), 
                quest.correct_answer)
            })
        })
        return newQuestions
    }

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=7")
        .then(respone => respone.json())
        .then(data => {
            setQuestions(getAllNewQuestion(data.results))
        })
        .catch(error => console.log(error))

    }, [newGame])

    const questionsElement = questions.map(quest => {
        return (
            <Question 
            id={quest.id}
            key={quest.id}
            question={quest.question}
            correctAnswer={quest.correctAnswer}
            answers={quest.answers}
            answerHeld = {answerHeld}
            />
        )
    })

    function answerHeld(answerId, questionId){
        setQuestions(prevQuestions => prevQuestions.map(question => {
            if(question.id === questionId){
                let newAnswerList =question.answers.map(answer =>{
                    if(answer.id === answerId || answer.isHeld){
                        return ({
                            ...answer,
                            isHeld: !answer.isHeld,
                        })
                    }else{
                        return answer
                    }
                })
                return ({
                    ...question,
                    answers: newAnswerList
                })
            }else{
                return question
            }
            
        }))
    }


    function checkQuestions(){
        setQuestions(prevQuestions => prevQuestions.map(question => {
            const checkedAnswers = question.answers.map(answer => {
                if(answer.isHeld && !answer.isCorrect){
                    return ({
                        ...answer,
                        isHeldAndIncorrect : true,
                        isChecked: true
                    })
                } else if(answer.isHeld && answer.isCorrect){
                    setScore(prevScore => prevScore + 1)
                    return ({
                        ...answer,
                        isHeldAndCorrect : true,
                        isChecked: true
                    })
                }else {
                    return ({
                        ...answer,
                        isChecked: true
                    })
                }
            })
            return ({
                ...question,
                answers:checkedAnswers
            })
        }))
        setChecked(true)
    }

    return (
        <>
            {
                menu ?
                <menu>
                    <h1 className="menu--title">Quizzical</h1>
                    <h3 className="menu--description">Cool game of Trivia! feature by 'Open Trivia DB'</h3>
                    <button className="menu--btn btn" onClick={toggleMenu}>Start quiz</button>
                </menu>
                :
                <main>
                    {questionsElement}
                    <div className="btn--container">
                        {
                            checked ? 
                            <div>
                                <span className="score">Your scored {score} correct answers</span>
                                <button className="btn check--btn" onClick={startNewGame}>Play again</button>
                            </div>
                            :
                            <button className="btn check--btn" onClick={checkQuestions}>Check answers</button>
                        }
                    </div>
                </main>
            }
        </>
    )
}