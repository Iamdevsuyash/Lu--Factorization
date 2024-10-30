row = document.getElementById('row')
col = document.getElementById('col')
matrix = document.getElementById('matrix')
document.getElementById('btn').onclick = function(){
matrix.innerHTML ="";

row_value = row.value
col_value = col.value

for (let i = 1; i <= row_value; i++) {

    cur_row = document.createElement('div');
    cur_row.classList.add('row');

    for (let j = 1; j <= col_value; j++) {
        const  cell = document.createElement('li');
        cell.textContent = `a${i}${j}`;
        
        const cell_input = document.createElement('input');
        cell_input.id = `a${i}${j}`;
        cell_input.type = 'number';
        
        cell.appendChild(cell_input);
        cur_row.appendChild(cell);
        
    }
    
    matrix.appendChild(cur_row);
}
}