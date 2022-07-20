import React, { useState } from 'react';
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

  const choose = (isCorrect) => {
    if (isCorrect && current + 1 < data.length) {
      alert("你選對了，很棒！加油！💗👏🏻");
      
    }
    else if (isCorrect) {
      alert("恭喜你！你考完了！你是最聰明的阿媽！🎉🤩");
    }
    else {
      alert("你選了不太对，請你在選一次！加油！😭");

    }
  };

  let options = [];

  const randomize = () => {
    let wlist = data[current].w;
    let randVal = Math.floor(Math.random() * wlist.length+1);

    for (let j = 0; j < wlist.length; j++) {
      if (j === randVal) {
        options.push({ "answer": data[current].c, "isCorrect": true });
      }

      options.push({ "answer": wlist[j], "isCorrect": false });
        
      if (j === wlist.length - 1 && wlist.length === randVal) {
        options.push({ "answer": data[current].c, "isCorrect": true });
      }
    }

    return options; 
  };

  randomize();

  return (
    <div className="App">
      <header className="App-header">
        <div className="question-box">
          <div className="question-title">{data[current].q}</div>
          <div className="question-options">
            {options.map((option, index) => (
							<button className="button" key={index} 
                // style={{
                //   backgroundColor: option.isCorrect ? "green" : "red",
                // }}
                onClick={() => choose(option.isCorrect)}>{option.answer}
              </button>
						))}
          </div>
        </div>
        <div className="buttons">
            <button onClick={() => back()}>⬅️</button>
            <button onClick={() => forward()}>➡️</button>
        </div>
      </header>
    </div>
  );
}

export default App;
