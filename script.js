<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Multiplication Quiz</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
        }
        #quiz-container {
            text-align: center;
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            max-width: 800px;
            width: 100%;
        }
        #question {
            font-size: 75px;
            margin-bottom: 20px;
        }
        #results {
            text-align: left;	
        }
        #startButton {
            font-size: 75px;
            padding: 15px 30px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        #startButton:hover {
            background-color: #45a049;
        }
        #resultsList {
            text-align: left;
            font-size: 50px;
            padding-left: 20px;
        }
        .result-item {
            margin-bottom: 10px;
        }
        .result-item::before {
            content: attr(data-number);
            display: inline-block;
            width: 30px;
            margin-right: 20px;
        }
    </style>
</head>
<body>
    <div id="quiz-container">
        <h1>1 Minute Basic Facts Quiz</h1>
        <button id="startButton">Start Quiz</button>
        <h2 id="question"></h2>
        <div id="results"></div>
    </div>

    <script>
        let problems = [];
        let currentProblemIndex = 0;

        // Helper function to get a random integer from an array
        function getRandomIntFromArray(array) {
            return array[Math.floor(Math.random() * array.length)];
        }

        // Function to generate a random math problem
        function generateRandomProblem() {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const numbers2 = [3, 4, 6, 7, 8, 9];

    const num1 = getRandomIntFromArray(numbers);
    const num2 = getRandomIntFromArray(numbers2);

    const operations = ['+', '-', '*', '/'];
    const operation = operations[getRandomIntFromArray([0, 1, 2, 3])];

    let answer;

    switch (operation) {
        case '+':
            answer = num1 + num2;
            break;
        case '-':
            // Ensure the result is not negative
            if (num1 < num2) {
                return generateRandomProblem(); // Regenerate the problem
            }
            answer = num1 - num2;
            break;
        case '*':
            answer = num1 * num2;
            break;
        case '/':
            // Ensure no division by zero and result is an integer
            if (num2 === 0 || num1 % num2 !== 0) {
                return generateRandomProblem(); // Regenerate the problem
            }
            answer = num1 / num2;
            break;
        default:
            throw new Error('Invalid operation');
    }

    // Ensure the answer is not below 0 (general safeguard)
    if (answer < 0) {
        return generateRandomProblem(); // Regenerate the problem
    }

    return { num1, num2, operation, answer };
}


        // Function to generate a list of problems
        function generateProblems() {
            problems = [];
            for (let i = 0; i < 10; i++) {
                problems.push(generateRandomProblem());
            }
        }

// Function to display the current question
function showQuestion() {
    if (currentProblemIndex < problems.length) {
        const problem = problems[currentProblemIndex];

        // Replace '*' with '×' and '/' with '÷'
        const displayOperation = problem.operation === '*' ? '×' :
                                 problem.operation === '/' ? '÷' :
                                 problem.operation;

        document.getElementById('question').textContent = 
            `${currentProblemIndex + 1}. What is ${problem.num1} ${displayOperation} ${problem.num2}?`;
        
        document.getElementById('question').style.fontSize = '75px';
        
        currentProblemIndex++;
        setTimeout(showQuestion, 4000);
    } else {
        showSwapMessage();
    }
}
        // Function to show the swap message
        function showSwapMessage() {
            document.getElementById('question').textContent = 'Swap books with the person next to you!';
            document.getElementById('question').style.fontSize = '75px';
            setTimeout(showResults, 30000);
        }

        // Function to display results
        function showResults() {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = '<h2>Quiz Results:</h2><div id="resultsList">';
            
            problems.forEach((problem, index) => {
                resultsContainer.innerHTML += `<div class="result-item">${index + 1}. ${problem.num1} ${problem.operation} ${problem.num2} = ${problem.answer}</div>`;
            });
            
            resultsContainer.innerHTML += '</div>';
            
            document.getElementById('question').textContent = 'Quiz completed!';
            
			document.getElementById('startButton').style.display = 'block';
				}

				function startQuiz() {
            generateProblems();
            currentProblemIndex = 0;
            document.getElementById('startButton').style.display = 'none';
            document.getElementById('results').innerHTML = '';
            showQuestion();
        }

        // Add event listener to start the quiz when the page is loaded
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('startButton').addEventListener('click', startQuiz);
        });
    </script>
</body>
</html>
