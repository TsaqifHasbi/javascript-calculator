import React, { useState } from 'react';

const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [formula, setFormula] = useState('');
    const [evaluated, setEvaluated] = useState(false);

    const handleClear = () => {
        setDisplay('0');
        setFormula('');
        setEvaluated(false);
    };

    const handleNumber = (num) => {
        if (evaluated) {
            setDisplay(num);
            setFormula(num);
            setEvaluated(false);
        } else {
            if (display === '0' || /[\+\-\*\/]$/.test(display)) {
                setDisplay(num);
            } else {
                setDisplay(display + num);
            }
            setFormula(formula + num);
        }
    };

    const handleOperator = (operator) => {
        if (evaluated) {
            setFormula(display + operator);
            setEvaluated(false);
        } else {
            let updatedFormula = formula;
            if (/[\+\-\*\/]$/.test(updatedFormula)) {
                if (operator === '-') {
                    updatedFormula += operator;
                } else {
                    updatedFormula = updatedFormula.replace(/[\+\-\*\/]+$/, '') + operator;
                }
            } else {
                updatedFormula += operator;
            }
            setFormula(updatedFormula);
        }
        setDisplay(operator);
    };

    const handleDecimal = () => {
        if (evaluated) {
            setDisplay('0.');
            setFormula('0.');
            setEvaluated(false);
        } else if (!display.includes('.')) {
            setDisplay(display + '.');
            setFormula(formula + '.');
        }
    };

    const handleEvaluate = () => {
        try {
            const result = eval(formula);
            setDisplay(result.toString());
            setFormula(result.toString());
            setEvaluated(true);
        } catch (error) {
            setDisplay('Error');
            setFormula('');
            setEvaluated(false);
        }
    };

    return (
        <div id="drum-machine">
            <div id="display">{display}</div>
            <div className="pad-container">
                <button id="clear" onClick={handleClear}>AC</button>
                <button id="divide" onClick={() => handleOperator('/')}>/</button>
                <button id="multiply" onClick={() => handleOperator('*')}>*</button>
                <button id="subtract" onClick={() => handleOperator('-')}>-</button>
                <button id="add" onClick={() => handleOperator('+')}>+</button>
                <button id="equals" onClick={handleEvaluate}>=</button>
                <button id="decimal" onClick={handleDecimal}>.</button>
                <button id="zero" onClick={() => handleNumber('0')}>0</button>
                <button id="one" onClick={() => handleNumber('1')}>1</button>
                <button id="two" onClick={() => handleNumber('2')}>2</button>
                <button id="three" onClick={() => handleNumber('3')}>3</button>
                <button id="four" onClick={() => handleNumber('4')}>4</button>
                <button id="five" onClick={() => handleNumber('5')}>5</button>
                <button id="six" onClick={() => handleNumber('6')}>6</button>
                <button id="seven" onClick={() => handleNumber('7')}>7</button>
                <button id="eight" onClick={() => handleNumber('8')}>8</button>
                <button id="nine" onClick={() => handleNumber('9')}>9</button>
            </div>
        </div>
    );
};

export default Calculator;