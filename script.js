let n;
let MatrixA = []
let EM = [];
let U = [];

function makeIdentity() {
    let mat = [];
    for (let i = 0; i < n; i++) {
        mat[i] = [];
        for (let j = 0; j < n; j++) {
            if (i == j) {
                mat[i][j] = 1
            }
            else {
                mat[i][j] = 0
            }
        }
    }
    return mat;
}

function makeEM(row, col, value, pivot) {
    let mat = makeIdentity();
    mat[row][col] = -value / pivot;
    // A_dash = MultiplyTwoMtrices(mat,mat1)
    return mat;
}



function takeorder(id) {
    n = parseInt(prompt("Enter the order of matrix "));
    for (let i = 0; i < n; i++) {
        let r = [];
        for (let j = 0; j < n; j++) {
            let m = parseInt(prompt(`Enter value for a[${i + 1}][${j + 1}]`));
            r.push(m);
        }
        MatrixA.push(r);
    }
    document.getElementById(id).textContent = JSON.stringify(MatrixA);
}


function MultiplyTwoMtrices(mat1, mat2) {
    result = []
    for (let i = 0; i < mat1.length; i++) {
        result.push([]);
    }
    for (let i = 0; i < mat1.length; i++) {
        for (let l = 0; l < mat1.length; l++) {
            let sum_ = 0;

            for (let j = 0; j < mat1[0].length; j++) {
                sum_ = sum_ + mat1[i][j] * mat2[j][l];
            }
            result[i].push(sum_);
        }
    }
    return result
}



function row_swap(mat, pivot_row, row1) {
    temp = mat[pivot_row]
    mat[pivot_row] = mat[row1]
    mat[row1] = mat[pivot_row]
    return mat
}




function createUMatrix() {
    A_dash = MatrixA
    for (let i = 0; i < MatrixA.length; i++) {
        for (let j = 0; j < MatrixA.length; j++) {
            pivot = A_dash[j][j]
            if (i > j) {
                if (pivot === 0) {
                    alert('pivot element is zero')
                    // row_swap(A_dash, i, i + 1)
                    // pivot = A_dash[i][i]
                }
                else{
                    console.log(pivot,makeEM(i, j, A_dash[i][j], pivot), A_dash)
                    A_dash = MultiplyTwoMtrices(makeEM(i, j, A_dash[i][j], pivot), A_dash)}
                    displayMatrix(makeEM(i, j, A_dash[i][j], pivot))
                
            }
        }
    }
    displayMatrix(A_dash)
    return A_dash
}


function displayMatrix(mat){
    matrix = document.getElementById('matrixDisplay')
    row_of_mat = document.createElement('div')
    matrix.appendChild(row_of_mat)
    for (let i=0; i< mat.length; i++){
        row_of_mat.textContent = '['
        for (let j=0; j< mat[i].length; j++) {
            row_of_mat.textContent+= `${mat[i][j]}`
        }
        row_of_mat.textContent += ']'
    }
    matrix.textContent = JSON.stringify(mat)
   
}
console.log(createUMatrix())
