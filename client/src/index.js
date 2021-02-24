import React from 'react';
import ReactDOM from  'react-dom';
import './index.css'
import * as math from 'mathjs';

const ALL_OP = ["+","-","/","*"];
const INITIAL_EXPR = ["0"];
const numberToString = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

function valueToID(value) {
  if (typeof value === "number") {
    return numberToString[value]
  } else {
    switch (value) {
      case "AC":
        return "AC";
      case "+":
        return "plus";
      case "-":
        return "minus";
      case "*":
        return "times";
      case "/":
        return "divide";
      case ".":
        return "decimal";
      case "=":
        return "equals";
    }
  }
}

function Button(props) {
  return (
    <button className = "button" onClick={props.onClick} id={valueToID(props.value)}>
      {props.value}
    </button>
  )
}

function Window(props) {
  return (
    <div className="window" id="display">
      {props.value}
    </div>
  )
}

class Board extends React.Component {

  renderButton(i) {
    return (
      <Button 
        value ={i}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  
  render() {
    return (
      <div>
        <div className="calc-row">
          {this.renderButton(7)}
          {this.renderButton(8)}
          {this.renderButton(9)}
          {this.renderButton("+")}
        </div>
        <div className="calc-row">
          {this.renderButton(4)}
          {this.renderButton(5)}
          {this.renderButton(6)}
          {this.renderButton("-")}
        </div>
        <div className="calc-row">
          {this.renderButton(1)}
          {this.renderButton(2)}
          {this.renderButton(3)}
          {this.renderButton("*")}
        </div>
        <div className="calc-row">
          {this.renderButton(0)}
          {this.renderButton(".")}
          {this.renderButton("=")}
          {this.renderButton("/")}
        </div>
        <div className="calc-row">
          {this.renderButton("AC")}
        </div>
      </div>
    );
  }
}
  
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      expr : INITIAL_EXPR
    };
  }

  handleClick(i) {
    if (i === "=") {
      this.handleEqualsClick();
    } else if (i === "AC") {
      this.handleACClick();
    } else if (i === ".") { 
      this.handleDotClick();
    } else if (typeof i === "number") {
      this.handleNumClick(i);
    } else {
      this.handleOpClick(i);
    }
  }

  handleACClick() {
    this.setState({expr: INITIAL_EXPR});
  }

  handleNumClick(num) {
    this.setState((prev, props) => {
      let new_expr = ALL_OP.includes(prev.expr[prev.expr.length-1]) ? prev.expr.concat(["0"]) : prev.expr;
      new_expr = new_expr[new_expr.length-1] === "0" || new_expr[new_expr.length-1] === "-0" ? new_expr.slice(0,new_expr.length-1).concat(new_expr[new_expr.length-1].slice(0, new_expr[new_expr.length-1].length-1) + num) : new_expr.slice(0,new_expr.length-1).concat([new_expr[new_expr.length-1] + num]);
      if (new_expr.length === 1 && (new_expr[0].includes("Infinity") || new_expr[0].includes("NaN"))) {
        new_expr = [String(num)];
      }
      console.log(new_expr);
      return { expr: new_expr };
    });
  }

  handleOpClick(op) {
    this.setState((prev,prop) => {
      let new_expr;
      if (op === "-") {
        if (ALL_OP.includes(prev.expr[prev.expr.length-1])) {
          new_expr = prev.expr.concat([op + "0"]);
        } else if (prev.expr[prev.expr.length-1] ==="-0") {
          new_expr = prev.expr;
        } else {
          new_expr = prev.expr.concat([op]);
        }
      } else {
        if (ALL_OP.includes(prev.expr[prev.expr.length-1])) {
          new_expr = prev.expr.slice(0,prev.expr.length-1).concat([op]);
        } else {
          new_expr = prev.expr.concat([op]);
        }
      }
      console.log(new_expr);
      return { expr: new_expr };
    });
  }

  handleEqualsClick() {
    this.setState((prev, props) => {
      const new_expr = ALL_OP.includes(prev.expr[prev.expr.length-1]) ? prev.expr.slice(0, prev.expr.length-1) : prev.expr;
      return { expr: [String(math.evaluate(new_expr.join("")))] }
    });
  }

  handleDotClick() {
    this.setState((prev, props) => {
      const new_expr = ALL_OP.includes(prev.expr[prev.expr.length-1]) ? prev.expr.concat("0.") : 
        prev.expr[prev.expr.length-1].includes(".") ? prev.expr : prev.expr.slice(0,prev.expr.length-1).concat([prev.expr[prev.expr.length-1] + "."]);
      return { expr: new_expr };
    });
  }

  render() {
    return (
      <div className="calculator">
        <div className="calculator-board">
          <Window value= {this.state.expr.join("")} />
          <Board 
            onClick = {(i) => this.handleClick(i)}
          />
        </div>
      </div>
    );
  }
}
  
  // ========================================
  
ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);
