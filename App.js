import React, {useState} from 'react';
import './App.css';
import * as math from "mathjs";

function App() {
  const [expression, setExpression] = useState("");
  const [val, setVal] = useState("");
  const [customVar, setCustomVar] = useState({});
  const [mode, setMode] = useState("Degree");
  // const [result, setResult] = useState("");

  const toggle = () => {
    setMode(mode === "Degree" ? "Radians" : "Degree");
  }

  function handleChange(e) {
    setExpression(e.target.value);
  }

  function handleClick(input) {
    setExpression((prevExpression) => prevExpression + input);
  }

  function calculate() {
    try {
      const allVar = {
        ...customVar,
        pi: Math.PI,
        e: Math.E,
        fact: math.factorial,
        sin: mode === "Degree" ? math.sin : Math.sin,
        cos: mode === "Degree" ? math.cos : Math.cos,
        tan: mode === "Degree" ? math.tan : Math.tan,
        arcsin: mode === "Degree" ? math.asin : Math.asin,
        arccos: mode === "Degree" ? math.acos : Math.acos,
        arctan: mode === "Degree" ? math.atan : Math.atan,
      };

      const res = math.evaluate(expression, allVar);
      if(typeof res === "number" && !isNaN(res)) {
        setVal(Number(res).toFixed(4));
      } else {
        setVal("Error: Invalid expression");
      }
    } catch (error) {
        setVal("Error: Invalid expression");
    }
  }
  // const ops = ['/', '*', '+', '-', '.'];

  // const updateCalc = value => {
  //   if(
  //     (ops.includes(value) && calc === '') ||
  //     (ops.includes(value) && ops.includes(calc.slice(-1)))) {
  //       return;
  //   }

  //   setCalc(calc + value);
  //   if(!ops.includes(value)) {
  //     // setResult(eval(calc + value).toString());
  //     const expression = new Function('return ' + calc + value);
  //     setResult(expression().toString());
  //   }
  // }

  // const calculate = () => {
  //   setCalc(eval(calc).toString());
  // }

  function clearScreen() {
    setExpression("");
    setVal("");
  }

  const deleteLast = () => {
    const newExpression = expression.slice(0, -1);
    setExpression(newExpression);
  }

  return (
    <div className='App'>
      <div className='calculator'>
        <div className='display'>
        <input
          className="screen"
          type="text"
          value={expression}
          onChange={handleChange}
        />
        </div>
        <div className="output">
          Output: {val}
        </div>
        <div className='operators'>
          {[
            "+",
            "-",
            "*",
            "/",
            "^",
            "√",
            "π",
            "sin",
            "cos", 
            "tan",
            "arcsin",
            "arccos",
            "arctan",
            "(",
            ")",
          ].map((input) => (
            <button key = {input} onClick={() => handleClick(input)}>{input}</button>
          ))}
          <button onClick={() => handleClick("pi")}>π</button>
          <button onClick={() => handleClick("e")}>e</button>
          <button onClick={() => handleClick("fact")}>!</button>
          <button onClick={toggle}>{mode === "Radian" ? "RAD" : "DEG"}</button>
          <button>log</button>
          <button>ln</button>
        </div>
        <div className='digits'>
          <button onClick={() => handleClick('0')}>0</button>
          <button onClick={() => handleClick('.')}>.</button>
          <button onClick={clearScreen}>
            AC
          </button>
          <button onClick={calculate}>
            =
          </button>
          <button onClick={deleteLast}>
            DEL
          </button>
        </div>
      </div>
    </div>
  )
}

export default App;