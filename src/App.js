import React, { useState } from 'react';
import { StyleSheet, TouchableHighlight, Text} from 'react-native';
import data from './questions.json';
import './App.css';

function App() {
  const [current, setCurrent] = useState(0);

  const back = () => {
    const last = current - 1;
		if (last >= 0) {
			setCurrent(last);
    }
  };

  const forward = () => {
    const next = current + 1;
		if (next < data.length) {
			setCurrent(next);
    }
  };

  const skip = (event) => {
    let questionNum = event.target.value;
    setCurrent(questionNum-1);
  };

  let options = [];

  const makeOptions = () => {
    let wlist = data[current].w;
    options.push({ "answer": data[current].c, "isCorrect": true });

    for (let j = 0; j < wlist.length; j++) {
      options.push({ "answer": wlist[j], "isCorrect": false });
    }

    return options; 
  };

  makeOptions();

  let qNums = []

  const makeQNums = () => {
    for (let i = 0; i < data.length; i++) {
      qNums.push(<option key={"qnum-"+(i+1)} value={i+1}>{i+1}</option>);
    }
  };

  makeQNums();

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  options = shuffle(options);

  const choose = (isCorrect) => {
    if (isCorrect && current + 1 < data.length) {
      alert("🤩 正確");
    }
    else if (isCorrect) {
      alert("恭喜你！你考完了！你是最聰明的阿媽！🎉💗"); 
    }
    else {
      alert("😭 错误");
    }
  };

  const styles = StyleSheet.create({
    button: {
      backgroundColor: "#e4e2e2",
      borderRadius: 15,
      margin: 5,
      padding: 10,
      borderColor: "black",
    },
    text: {
      fontSize: 35
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <div className="question-box">
          <div className="question-title">{Number(current)+1 + ". " + data[current].q}</div>
          {options.map((option, index) => (
							<TouchableHighlight 
                key={"option-"+index} 
                style={styles.button}
                onPress={() => choose(option.isCorrect)}
                activeOpacity={0.5}
                underlayColor={(option.isCorrect) ? "green" : "red"}
              >
                <Text
                style={styles.text}
                >{option.answer}</Text>
              </TouchableHighlight>
						))} 
        </div>
        <div className="buttons">
            <button onClick={() => back()}>⬅️</button>
            <button onClick={() => forward()}>➡️</button>
        </div>
      </header>
      <form>
          <label>
            <p>跳到问题: </p>
            <select value={current+1} onChange={skip}>
              { qNums }
            </select>
          </label>
        </form>
    </div>
  );
}

export default App;