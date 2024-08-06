// Assign the display element
const display = document.getElementById('display');
// Select all buttons
const buttons = document.querySelectorAll('button');
let lastOperator = false;

// Iterate over each button
buttons.forEach(btn => {
    // Add event listener to each button
    btn.addEventListener('click', () => {
        const text = btn.textContent;
        // Limit the display to 10 characters
        if (display.textContent.length < 10 || text === 'C' || text === 'DEL' || text === '=') {
            // Clear the display if it's '0' or 'Error'
            if (display.textContent === '0' || display.textContent === 'Error') {
                display.textContent = '';
            }

            // Insert numbers
            if (text >= '0' && text <= '9') {
                display.textContent += text;
                lastOperator = false;
            }
            // Insert operators
            else if (text === '+' || text === '-' || text === '*' || text === '/' || text === '%') {
                if (display.textContent.length > 0 && lastOperator === false) {
                    display.textContent += text;
                    lastOperator = true;
                } else if (lastOperator === true) {
                    display.textContent = display.textContent.slice(0, -1) + text;
                }
            }
            // Insert decimal point
            else if (text === '.') {
                if (!display.textContent.includes('.')) {
                    display.textContent += text;
                    lastOperator = false;
                }
            }
            // Delete last character
            else if (text === 'C') {
                if (display.textContent.length > 1) {
                    display.textContent = display.textContent.slice(0, -1);
                } else {
                    display.textContent = '0';
                }
                lastOperator = false;
            }
            // Clear display
            else if (text === 'DEL') {
                display.textContent = '0';
                lastOperator = false;
            }
            // Calculate the result
            else if (text === '=') {
                if (lastOperator === false) {
                    try {
                        let result = eval(display.textContent);
                        // Round the result to 2 decimal places if necessary
                        if (result % 1 !== 0) {
                            result = result.toFixed(2);
                        }
                        display.textContent = result.toString().substring(0, 10);
                    } catch (e) {
                        display.textContent = 'Error';
                    }
                }
            }
        } else {
            display.textContent = display.textContent.substring(0, 10);
        }

        console.log(display.textContent);
    });
});