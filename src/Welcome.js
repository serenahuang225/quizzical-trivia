export default function Welcome(props) {
    return (
        <div className="welcome">
            <h1>Quizzable</h1>
            <h4>A trivia game for all ages</h4>
            <button onClick={props.newGame}>
                Start Game
            </button>
        </div>
    )
}