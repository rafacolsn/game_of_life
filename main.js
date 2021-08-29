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
// shapes
function generatePuffer() {
    let puffer = [
        [4, 3],
        [5, 2],
        [5, 3],
        [3, 12],
        [4, 12],
        [5, 12],
        [2, 13],
        [1, 14],
        [1, 15],
        [6, 13],
        [7, 14],
        [7, 15],
        [4, 25],
        [4, 26],
        [3, 26],
        [8, 25],
        [8, 26],
        [9, 26],
        [7, 28],
        [6, 28],
        [5, 28],
        [7, 29],
        [6, 29],
        [5, 29],
        [6, 30],
        [6, 37],
        [7, 37],
        [7, 36],
    ];
    generateShape(puffer);
}

function generateGlider() {
    let glider = [
        [0,1],
        [1,2],
        [2,0],
        [2,1],
        [2,2],
    ]
    generateShape(glider);
}
// console.log('resolution', resolution)

function generateShape(structure) {
    clicked = false
    started = false;
    reset()
    let value = floor(random(slider.value()));
    let x = floor(cols / 2) - value
    let y = floor(rows / 2) - value

    structure.map(coord => {
        grid[x + coord[1]][y + coord[0]] = 1;
    })

}

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
    gridBtn = createButton('grille aléatoire');
    randomBtn = createButton('départ aléatoire');
    pufferBtn = createButton('canon');
    gliderBtn = createButton('planneur');
    startBtn = createButton('start/pause');
    resetBtn = createButton('reset');
    let y = 0;
    let space = 30;
    slider.position(10, y)
    gridBtn.position(10, y + space)
    randomBtn.position(10, y + space*2)
    pufferBtn.position(10, y + space * 3)
    gliderBtn.position(10, y + space * 4)
    startBtn.position(10, y + space * 5)
    resetBtn.position(10, y + space * 6)

    cols = floor(width / resolution);
    rows = floor(height / resolution);
    // console.log(rows, 'lignes');
    // console.log(cols, 'colonnes');
    grid = make2DArray(cols, rows);

    reset();
    gridBtn.mousePressed(gridRandomize);
    randomBtn.mousePressed(randomize);
    pufferBtn.mousePressed(generatePuffer);
    gliderBtn.mousePressed(generateGlider);
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
function gridRandomize() {
    clicked = false
    started = false;
    reset()

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(slider.value()/10)) === 0 ? 1 : 0;
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

