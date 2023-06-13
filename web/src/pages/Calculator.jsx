import React, { useState } from 'react'
import Button from "./Button";
import commafy from "../utils/commafy"

function Calculator() {
    const [value, setValue] = useState("0");
    const [memory, setMemory] = useState(null);
    const [operator, setOperator] = useState(null);

    const handleButtonPress = content => () => {
        const num = parseFloat(value);

        console.log(content)
        if (content === "AC") {
            setValue("0");
            setMemory(null);
            setOperator(null);
            return;
        }

        if (content === "±") {
            setValue((num * -1).toString());
            return;
        }

        if (content === "%") {
            setValue((num / 100).toString());
            setMemory(null);
            setOperator(null);
            return;
        }

        if (content === ".") {
            if (value.includes(".")) return;

            setValue(value + ".");
            return;
        }

        if (content === "+") {
            if (operator !== null) {
                if (operator === "+") {
                    setMemory(memory + parseFloat(value));
                } else if (operator === "−") {
                    setMemory(memory - parseFloat(value));
                } else if (operator === "×") {
                    setMemory(memory * parseFloat(value));
                } else if (operator === "÷") {
                    setMemory(memory / parseFloat(value));
                }
            } else {
                setMemory(parseFloat(value));
            }
            setValue("0");
            setOperator("+");
            return;
        }
        if (content === "−") {
            if (operator !== null) {
                if (operator === "+") {
                    setMemory(memory + parseFloat(value));
                } else if (operator === "−") {
                    setMemory(memory - parseFloat(value));
                } else if (operator === "×") {
                    setMemory(memory * parseFloat(value));
                } else if (operator === "÷") {
                    setMemory(memory / parseFloat(value));
                }
            } else {
                setMemory(parseFloat(value));
            }
            setValue("0");
            setOperator("−");
            return;
        }
        if (content === "×") {
            if (operator !== null) {
                if (operator === "+") {
                    setMemory(memory + parseFloat(value));
                } else if (operator === "−") {
                    setMemory(memory - parseFloat(value));
                } else if (operator === "×") {
                    setMemory(memory * parseFloat(value));
                } else if (operator === "÷") {
                    setMemory(memory / parseFloat(value));
                }
            } else {
                setMemory(parseFloat(value));
            }
            setValue("0");
            setOperator("×");
            return;
        }
        if (content === "÷") {
            if (operator !== null) {
                if (operator === "+") {
                    setMemory(memory + parseFloat(value));
                } else if (operator === "−") {
                    setMemory(memory - parseFloat(value));
                } else if (operator === "×") {
                    setMemory(memory * parseFloat(value));
                } else if (operator === "÷") {
                    setMemory(memory / parseFloat(value));
                }
            } else {
                setMemory(parseFloat(value));
            }
            setValue("0");
            setOperator("÷");
            return;
        }

        if (content === "=") {
            if (!operator) return;

            if (operator === "+") {
                setValue((memory + parseFloat(value)).toString());
            } else if (operator === "−") {
                setValue((memory - parseFloat(value)).toString());
            } else if (operator === "×") {
                setValue((memory * parseFloat(value)).toString());
            } else if (operator === "÷") {
                setValue((memory / parseFloat(value)).toString());
            }
            setMemory(null);
            setOperator(null);
            return;
        }

        if (value[value.length - 1] === ".") {
            setValue(value + content);
        } else {
            setValue(parseFloat(num + content).toString());
        }
    };

    return (
        <div className='page bg-[#222]'>
            <div className='flex justify-center items-center'>
                <div className='my-14 w-full h-24'>
                    <div className='flex justify-end items-center px-2 h-full'>
                        <p className='text-4xl text-white'>{commafy(value)}</p>
                    </div>
                </div>
                <div className='absolute top-[35%]'>
                    <div className='grid grid-cols-4 gap-2'>
                        <Button
                            onButtonClick={handleButtonPress}
                            content="AC"
                            type="function"
                        />
                        <Button onButtonClick={handleButtonPress} content="±" type="function" />
                        <Button onButtonClick={handleButtonPress} content="%" type="function" />
                        <Button onButtonClick={handleButtonPress} content="÷" type="operator" />
                        <Button onButtonClick={handleButtonPress} content="7" />
                        <Button onButtonClick={handleButtonPress} content="8" />
                        <Button onButtonClick={handleButtonPress} content="9" />
                        <Button onButtonClick={handleButtonPress} content="×" type="operator" />
                        <Button onButtonClick={handleButtonPress} content="4" />
                        <Button onButtonClick={handleButtonPress} content="5" />
                        <Button onButtonClick={handleButtonPress} content="6" />
                        <Button onButtonClick={handleButtonPress} content="−" type="operator" />
                        <Button onButtonClick={handleButtonPress} content="1" />
                        <Button onButtonClick={handleButtonPress} content="2" />
                        <Button onButtonClick={handleButtonPress} content="3" />
                        <Button onButtonClick={handleButtonPress} content="+" type="operator" />
                        <Button onButtonClick={handleButtonPress} content="0" />
                        <Button onButtonClick={handleButtonPress} content="." />
                        <Button onButtonClick={handleButtonPress} content="=" type="operator" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calculator