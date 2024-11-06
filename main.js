// Getting the elements from the DOM
const row = document.getElementById('row');
const col = document.getElementById('col');
const matrix = document.getElementById('matrix');
let matrixData = [];

// Function to generate input fields for the matrix
document.getElementById('btn').onclick = function() {
    matrix.innerHTML = "";
    matrixData = []; // Reset matrix data

    const row_value = row.value;
    const col_value = col.value;

    for (let i = 1; i <= row_value; i++) {
        let rowData = []; // Initialize an array for the current row
        
        const cur_row = document.createElement('div');
        cur_row.classList.add('row');
        
        for (let j = 1; j <= col_value; j++) {
            const cell = document.createElement('li');
            cell.textContent = `a${i}${j}`;
            
            const cell_input = document.createElement('input');
            cell_input.id = `a${i}${j}`;
            cell_input.type = 'number';
            
            cell.appendChild(cell_input);
            cur_row.appendChild(cell);
            
            rowData.push(cell_input); // Store input element reference in row array
        }

        matrix.appendChild(cur_row);
        matrixData.push(rowData); // Add the row to the matrix
    }

    // console.log(matrixData); // Log the matrix data (this will be an array of input elements)
};

// Function to extract the numeric values from matrixData into a 2D array
function getMatrixValues() {
    const row_value = parseInt(row.value);
    const col_value = parseInt(col.value);
    const matrixValues = [];

    for (let i = 0; i < row_value; i++) {
        let rowValues = [];
        for (let j = 0; j < col_value; j++) {
            let value = parseFloat(matrixData[i][j].value) || 0; // Default to 0 if input is empty
            rowValues.push(value);
        }
        matrixValues.push(rowValues);
    }

    return matrixValues;
}

// Function to multiply two matrices (matrixA * matrixB)
function multiplyMatrices(matrixA, matrixB) {
    const result = [];
    for (let i = 0; i < matrixA.length; i++) {
        const rowResult = [];
        for (let j = 0; j < matrixB[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < matrixA[0].length; k++) {
                sum += matrixA[i][k] * matrixB[k][j];
            }
            rowResult.push(sum);
        }
        result.push(rowResult);
    }
    return result;
}

// Function to generate elementary matrix for Gaussian elimination with pivot checks
function createElementaryMatrix(rowIndex, colIndex, currentMatrix) {
    const row_value = parseInt(row.value);
    const col_value = parseInt(col.value);

    let elementaryMatrix = [];

    // Get the pivot element to ensure no division by zero
    const pivotElement = currentMatrix[colIndex - 1][colIndex - 1];

    if (pivotElement === 0) {
        alert(`Pivot element at position (${colIndex}, ${colIndex}) is zero. Cannot proceed with Gaussian elimination.`);
        return null; // Stop further execution if the pivot is zero
    }

    for (let i = 1; i <= row_value; i++) {
        let rowMatrix = [];
        
        for (let j = 1; j <= col_value; j++) {
            if (i === rowIndex && j === colIndex) {
                const originalValue = currentMatrix[i - 1][j - 1];
                rowMatrix.push(-originalValue / pivotElement); // Divide by the pivot element
            } else if (i === j) {
                rowMatrix.push(1); // Identity matrix diagonal
            } else {
                rowMatrix.push(0); // Zeros everywhere else
            }
        }

        elementaryMatrix.push(rowMatrix); // Add the row to the elementary matrix
    }

    return elementaryMatrix;
}

// Function to generate U matrix step by step and display intermediate results
function createUMatrixStepwise() {
    const row_value = parseInt(row.value); // Number of rows in original matrix
    const col_value = parseInt(col.value); // Number of columns in original matrix

    // Get the original matrix values
    let currentMatrix = getMatrixValues();

    // Clear the display container for new matrices
    const matrixDisplayContainer = document.getElementById('matrixDisplay');
    matrixDisplayContainer.innerHTML = ""; // Clear existing matrices

    // Display the original matrix first
    displayMatrix(currentMatrix, "Original Matrix");

    // Loop through the rows and columns to create elementary matrices
    for (let i = 2; i <= row_value; i++) {
        for (let j = 1; j < i; j++) {
            // Create elementary matrix Eij
            const elementaryMatrix = createElementaryMatrix(i, j, currentMatrix);

            if (elementaryMatrix === null) {
                return; // Stop the process if we encountered a division by zero
            }

            // Multiply the elementary matrix with the current matrix
            currentMatrix = multiplyMatrices(elementaryMatrix, currentMatrix);

            // Display the intermediate matrix after multiplying by Eij
            displayMatrix(currentMatrix, `After multiplying by E${i}${j}`);
        }
    }

    // The resulting currentMatrix is the U matrix
    displayMatrix(currentMatrix, "Upper Triangular Matrix (U)");
}

// Function to display a matrix with a title in the DOM
function displayMatrix(matrix, title) {
    const matrixDisplayContainer = document.getElementById('matrixDisplay');

    // Create a title element
    const matrixTitle = document.createElement('h3');
    matrixTitle.textContent = title;
    matrixDisplayContainer.appendChild(matrixTitle);

    // Display the matrix
    for (let i = 0; i < matrix.length; i++) {
        const cur_row = document.createElement('div');
        cur_row.classList.add('row');
        
        for (let j = 0; j < matrix[i].length; j++) {
            const cell = document.createElement('li');
            cell.textContent = matrix[i][j].toFixed(2); // Set cell text to matrix value, rounded to 2 decimal places
            
            cur_row.appendChild(cell);
        }

        matrixDisplayContainer.appendChild(cur_row); // Append the row to the matrix container
    }
}

window.onload = function () {
    document.getElementById('createMatrices').onclick = function () {
        createUMatrixStepwise(); // Generate and display U matrix step by step
    };
};
