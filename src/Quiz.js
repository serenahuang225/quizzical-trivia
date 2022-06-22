import { useState, useEffect } from "react"

export default function Quiz() {
    const [quizData, setQuizData] = useState([])
    const [formData, setFormData] = useState({
        "question1": "",
        "question2": "",
        "question3": "",
        "question4": "",
        "question5": "",
    })
    const [submited, setSubmited] = useState(false)
    const [newGame, setNewGame] = useState(false)
    const [score, setScore] = useState("")

    useEffect(() => {
        setNewGame(false)
        setSubmited(false)
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => {
                const questions = data.results
                const output = questions.map((question) => {
                    const random = Math.floor(Math.random() * (question.incorrect_answers.length))
                    const answers = question.incorrect_answers
                    answers.splice(random, 0, question.correct_answer)
                    return {...question, all_answers: answers}
                })
                setQuizData(output)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [newGame])

    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log(formData)
        setSubmited(true)
        var correct = 0
        quizData.forEach((question, index) => {
            const value = "question" + (index + 1)
            correct = question.correct_answer === formData[value] ? correct + 1 : correct
        })
        setScore(`${correct}/5`)
        if (submited === true) {
            setNewGame(true)
        }
    }

    const quizArray = quizData.map((question, index) => {
        const name = "question" + (index + 1)
        const answersArray = question.all_answers.map(answer => {
            const submitClass = answer === question.correct_answer ? "correct-submited" : "wrong-submited"
            return (
                <div className="answer-bubble" key={answer}>
                    <input 
                        type="radio"
                        name={name}
                        id={answer}
                        value={answer}
                        checked={formData[name] === answer}
                        onChange={handleChange}
                        disabled={submited}
                    />
                    <label 
                        htmlFor={answer} 
                        dangerouslySetInnerHTML={{__html: answer}}
                        className={submited ? submitClass : ""}
                    />
                </div>
            )
        })
        return (
            <fieldset className="question" key={index}>
                <legend dangerouslySetInnerHTML={{__html: question.question}} />
                <div>
                    {answersArray}
                </div>
            </fieldset>
        )
    })

    return (
        <div className="quiz">
            <form onSubmit={handleSubmit}>
                {quizArray}
                <div>
                    {submited && <h2>You scored {score} correct answers</h2>}
                    <button>{submited ? "Play again" :"Check answers"}</button>
                </div>
            </form>
        </div>
    )
}