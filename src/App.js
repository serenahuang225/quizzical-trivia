import { useState } from "react"
import Quiz from "./Quiz";
import Welcome from "./Welcome";

function App() {
  const [playing, setPlaying] = useState(false)

  function newGame() {
    setPlaying(true)
  }

  return (
    <div className="App">
      {!playing && <Welcome newGame={newGame}/>}
      {playing && <Quiz />}
    </div>
  );
}

export default App;
