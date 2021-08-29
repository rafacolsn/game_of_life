// Game of life
/*
    Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    Any live cell with two or three live neighbours lives on to the next generation.
    Any live cell with more than three live neighbours dies, as if by overpopulation.
    Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 */
let cnv;
let grid;
let cols;
let rows;
let resolution = 5;
let started = false;
let clicked = false;
let abscissa;
let ordinate;
let next;
let state;

// console.log('resolution', resolution)

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr
}

function reset() {
    clicked = false;
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }
    started = false;
}

function setup() {
    cnv = createCanvas(window.innerWidth, window.innerHeight);
    cnv.position(0, 0)
    slider = createSlider(20, 100, 5)
    // console.log(slider.value)
    randomBtn = createButton('random');
    startBtn = createButton('start');
    resetBtn = createButton('reset');
    let y = 0;
    slider.position(10, y)
    randomBtn.position(10, y + 30)
    startBtn.position(10, y + 60)
    resetBtn.position(10, y + 90)

    cols = floor(width / resolution);
    rows = floor(height / resolution);
    // console.log(rows, 'lignes');
    // console.log(cols, 'colonnes');
    grid = make2DArray(cols, rows);

    reset();
    randomBtn.mousePressed(randomize);
    startBtn.mousePressed(switchStart);
    resetBtn.mousePressed(reset);
}


function randomize() {
    clicked = false
    started = false;
    reset()
    let value = floor(random(slider.value()));
    let x = floor(cols / 2) - value
    let y = floor(rows / 2) - value

    for (let i = x; i < x + floor(random(slider.value())); i++) {
        for (let j = y; j < y + floor(random(slider.value())); j++) {
            randomNeighbors(grid, i, j);
        }
    }
}

function switchStart() {
    started = ! started
}

function mouseReleased() {
    clicked = false;
}

function mousePressed() {
    clicked = ! clicked;
}

function switchState() {
    abscissa = floor(mouseX / resolution)
    ordinate = floor(mouseY / resolution)
    grid[abscissa][ordinate] = grid[abscissa][ordinate] === 0 ? 1 : 1;
}

function draw() {
    background(0)

    if (clicked) {
        switchState()
    }
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] === 1) {
                rect(x, y, resolution, resolution)
                fill(255);
            }
        }
    }
    if (started) {
        start();
    }
}


function start() {
    clicked = false;
    next = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {

            state = grid[i][j];
            let neighbors = countNeighbors(grid, i, j);

            // rule one : dead cell becomes alive
            if (state === 0 && neighbors === 3) {
                next[i][j] = 1;
            } // rule two : alive cell dies
            else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = state
            }
        }
    }
    // console.log(grid === next)

    grid = next;
}


/*
in order to have edges countable in neighbors we have the next formula :
assume that we have 20 cols
x is abscissa of the cell
i is the checked neighbor's position
(x + i + cols) % cols

if x = 0, i = -1
(0 -1 + 20) % 20 = 19
19 is the last column
so x's neighbor is at column 19

if x = 19, i = +1
(19 + 1 + 20) % 20 = 0

 */
function countNeighbors(grid, x, y) {
    let sum = 0;

    //cols
    for (let i = -1; i < 2; i++) {
        //rows
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols
            let row = (y + j + rows) % rows
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}

function randomNeighbors(table, x, y) {

    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols
            let row = (y + j + rows) % rows
            table[col][row] = floor(random(2)) === 0 ? 1 : 0;
        }
    }
    grid = table;
}

