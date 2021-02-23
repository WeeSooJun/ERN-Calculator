import React from 'react';
import ReactDOM from  'react-dom';
import './index.css'

const ALL_OP = ["+","-","/","*"];
const INITIAL_EXPR = "0";

function Button(props) {
  return (
    <button className = "button" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

function Window(props) {
  return (
    <div className="window">
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
      const new_expr = prev.expr.charAt(0) === "0" && prev.expr.length === 1 ? String(num) : prev.expr + num;
      return { expr: new_expr };
    });
  }

  handleOpClick(op) {
    if (op === "-") {

    } else {
      this.setState((prev,prop) => {
        let new_expr;
        if (ALL_OP.includes(prev.expr.charAt(prev.expr.length-1))) {
          new_expr = prev.expr.slice(0,prev.length-1) + op;
        } else {
          new_expr = prev.expr + op;
        }
        return { expr: new_expr };
      })
    }
  }

  handleEqualsClick() {
    this.setState((prev, props) => ({
      expr: String(eval(prev.expr))
    }));
  }

  handleDotClick() {
    this.setState((prev, props) => {
      const new_expr = ALL_OP.includes(prev.expr.charAt(prev.expr.length-1)) ? prev.expr + 0 + "." : prev.expr + ".";
      return { expr: new_expr };
    });
  }

  render() {
    return (
      <div className="calculator">
        <div className="calculator-board">
          <Window value= {this.state.expr} />
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
