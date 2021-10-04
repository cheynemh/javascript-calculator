// limit value input
// decimal repeat
// https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
//
const value = document.querySelector(".value"); // display value
const clr = document.querySelector(".clr"); // clear button
const plusminus = document.querySelector(".pm"); // plus or minus
const percent = document.querySelector(".percent"); // percentage
const addition = document.querySelector(".addition"); // addition
const subtraction = document.querySelector(".subtraction"); // subtraction
const multiplication = document.querySelector(".multiplication"); // multiplication
const division = document.querySelector(".division"); // division
const equal = document.querySelector(".equal"); // equals

// button number init
const decimal = document.querySelector(".decimal");
const zero = document.querySelector(".number-0");
const one = document.querySelector(".number-1");
const two = document.querySelector(".number-2");
const three = document.querySelector(".number-3");
const four = document.querySelector(".number-4");
const five = document.querySelector(".number-5");
const six = document.querySelector(".number-6");
const seven = document.querySelector(".number-7");
const eight = document.querySelector(".number-8");
const nine = document.querySelector(".number-9");
const numberArray = [
    zero,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
];

let number = null; // number pressed before op
let operator = null; // operator used

// define valueString
const valueString = () => value.textContent.split(",").join("");
const getValue = () => {
    return parseFloat(valueString());
};

// stop repeating decimals
const strValue = (valueStr) => {
    if (valueStr[valueStr.length - 1] === ".") {
        value.textContent += ".";
        return;
    }

    const [numStr, decimalStr] = valueStr.split(".");
    if (decimalStr) {
        value.textContent =
            parseFloat(numStr).toLocaleString() + "." + decimalStr;
    } else {
        value.textContent = parseFloat(numStr).toLocaleString();
    }
};

const numberClick = (numStr) => {
    const currentValue = valueString();
    if (currentValue === "0") {
        strValue(numStr);
    } else {
        strValue(currentValue + numStr);
    }
};

// get result of equation
const opResult = () => {
    const num1 = parseFloat(number);
    const num2 = getValue();
    // console.log(!number);
    let num3;
    if (operator === "addition") {
        num3 = num1 + num2;
    } else if (operator === "subtraction") {
        num3 = num1 - num2;
    } else if (operator === "multiplication") {
        num3 = num1 * num2;
    } else if (operator === "division") {
        num3 = num1 / num2;
    }

    return num3.toString();
};

const operatorType = (operation) => {
    const currentValue = valueString();

    if (!number) {
        number = currentValue;
        operator = operation;
        strValue("0");
        // console.log(!number);
        return;
    }
    number = opResult();
    operator = operation;
    strValue("0");
};

// event listeners
// on click, value will display "0"
clr.addEventListener("click", () => {
    strValue("0");
    number = null;
    operator = null;
});

plusminus.addEventListener("click", () => {
    const num2 = getValue();
    const currentValue = valueString();
    if (currentValue === "-0") {
        strValue("0");
        return;
    }
    if (num2 >= 0) {
        strValue("-" + currentValue);
    } else {
        strValue(currentValue.substring(1));
    }
});

percent.addEventListener("click", () => {
    const num2 = getValue();
    const num3 = num2 / 100;
    strValue(num3.toString());
    number = null;
    operator = null;
});

// add event listeners to operators
addition.addEventListener("click", () => {
    operatorType("addition");
});
subtraction.addEventListener("click", () => {
    operatorType("subtraction");
});
multiplication.addEventListener("click", () => {
    operatorType("multiplication");
});
division.addEventListener("click", () => {
    operatorType("division");
});
equal.addEventListener("click", () => {
    if (number) {
        strValue(opResult());
        number = null;
        operator = null;
    }
});

// add event listeners to numb n decimals
for (let i = 0; i < numberArray.length; i++) {
    const number = numberArray[i];
    number.addEventListener("click", () => {
        numberClick(i.toString());
    });
}

decimal.addEventListener("click", () => {
    const currentValue = valueString();
    if (!currentValue.includes(".")) {
        strValue(currentValue + ".");
    }
});
