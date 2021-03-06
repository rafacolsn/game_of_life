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
const shapes = {
    u: [
        [1, 1],
        [1, 2],
        [1, 3],
        [2, 1],
        [3, 1],
        [3, 1],
        [3, 2],
        [3, 3],
    ],
    r: [
        [1, 2],
        [2, 2],
        [2, 3],
        [3, 1],
        [3, 2],
    ],
    spaceship: [
        [0, 0],
        [0, 3],
        [1, 4],
        [2, 0],
        [2, 4],
        [3, 1],
        [3, 2],
        [3, 3],
        [3, 4],
    ],
    puffer: [
        [1, 2],
        [1, 3],
        [1, 4],
        [1, 5],
        [2, 1],
        [2, 5],
        [3, 5],
        [4, 1],
        [4, 4],
        [7, 2],
        [8, 3],
        [9, 3],
        [10, 3],
        [10, 2],
        [11, 1],
        [15, 2],
        [15, 3],
        [15, 4],
        [15, 5],
        [16, 1],
        [16, 5],
        [17, 5],
        [18, 1],
        [18, 4],
    ],
    HWSS: [
        [1, 3],
        [1, 4],
        [2, 1],
        [2, 6],
        [3, 7],
        [4, 1],
        [4, 7],
        [5, 2],
        [5, 3],
        [5, 4],
        [5, 5],
        [5, 6],
        [5, 7],
    ],
    canon: [
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
    ],
    glider: [
        [2, 0],
        [2, 1],
        [2, 2],
        [0, 1],
        [1, 2],
    ],
    tagalon: [
        [1, 1],
        [1, 2],
        [1, 2],
        [1, 3],
        [1, 4],
        [2, 1],
        [2, 5],
        [2, 5],
        [2, 15],
        [3, 1],
        [3, 13],
        [3, 14],
        [4, 2],
        [4, 5],
        [4, 8],
        [4, 9],
        [4, 15],
        [4, 16],
        [4, 17],
        [5, 7],
        [5, 8],
        [5, 9],
        [5, 16],
        [5, 17],
        [5, 18],
        [9, 1],
        [9, 2],
        [9, 2],
        [9, 3],
        [9, 4],
        [8, 1],
        [8, 5],
        [8, 5],
        [8, 15],
        [7, 1],
        [7, 13],
        [7, 14],
        [6, 2],
        [6, 5],
        [6, 8],
        [6, 9],
        [6, 15],
        [6, 16],
        [6, 17],
    ],
    machine: [
        [1,1],
        [1,2],
        [1,3],
        [1,5],
        [2,1],
        [3,4],
        [3,5],
        [4,2],
        [4,3],
        [4,5],
        [5,1],
        [5,3],
        [5,5],
    ],
    line:[
        [1,1],
        [1,2],
        [1,3],
        [1,4],
        [1,5],
        [1,6],
        [1,7],
        [1,8],
        [1,10],
        [1,11],
        [1,12],
        [1,13],
        [1,14],
        [1,18],
        [1,19],
        [1,20],
        [1,27],
        [1,28],
        [1,29],
        [1,30],
        [1,31],
        [1,32],
        [1,33],
        [1,35],
        [1,36],
        [1,37],
        [1,38],
        [1,39],
    ]
}


// console.log('resolution', resolution)

function generateShape(structure) {
    clicked = false
    started = false;
    // reset()
    let x = floor(random(0, cols));
    let y = floor(random(0, rows));

    let a = floor(random(2));
    let b = a === 1 ? 0 : 1;
    let negative = floor(random(2)) * 2 - 1;
    structure.map(coord => {
        grid[x + (coord[a] * negative)][y + (coord[b])] = 1;
    });

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

function selectShape() {

    switch (sel.value()) {
        case 'le U':
            generateShape(shapes.u);
            break;
        case 'le pentomino R':
            generateShape(shapes.r);
            break;
        case 'la ligne':
            generateShape(shapes.line);
            break;
        case 'planneur':
            generateShape(shapes.glider);
            break;
        case 'vaisseau':
            generateShape(shapes.spaceship);
            break;
        case 'gros vaisseau':
            generateShape(shapes.HWSS);
            break;
        case 'machine tournante':
            generateShape(shapes.machine);
            break;
        case 'canon':
            generateShape(shapes.canon);
            break;
        case 'puffeur':
            generateShape(shapes.puffer);
            break;
        case 'tagalon':
            generateShape(shapes.tagalon);
            break;
    }
}

function setup() {

    cnv = createCanvas(window.innerWidth, window.innerHeight);
    cnv.position(0, 0)
    // slider = createSlider(20, 100, 1)
    gridBtn = createButton('grille al??atoire');
    randomBtn = createButton('d??part al??atoire');

    sel = createSelect();

    sel.option('choisir une forme');
    sel.option('le U');
    sel.option('le pentomino R');
    sel.option('planneur');
    sel.option('vaisseau');
    sel.option('gros vaisseau');
    sel.option('tagalon');
    sel.option('machine tournante');
    sel.option('la ligne');
    sel.option('canon');
    sel.option('puffeur');
    sel.changed(selectShape);

    startBtn = createButton('start/pause');
    resetBtn = createButton('reset');
    let y = 0;
    let space = 30;
    // slider.position(10, y)
    gridBtn.position(10, y)
    randomBtn.position(10, y + space)
    sel.position(10, y + space * 2);
    startBtn.position(10, y + space * 3)
    resetBtn.position(10, y + space * 4)

    cols = floor(width / resolution);
    rows = floor(height / resolution);
    // console.log(rows, 'lignes');
    // console.log(cols, 'colonnes');
    grid = make2DArray(cols, rows);

    reset();
    gridBtn.mousePressed(gridRandomize);
    randomBtn.mousePressed(randomize);
    startBtn.mousePressed(switchStart);
    resetBtn.mousePressed(reset);
}


function randomize() {
    clicked = false
    started = false;
    reset()
    let value = floor(random(20, 50));
    let x = floor(cols / 2) - value
    let y = floor(rows / 2) - value

    for (let i = x; i < x + floor(random(1, 5)); i++) {
        for (let j = y; j < y + floor(random(1, 5)); j++) {
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
            grid[i][j] = floor(random(5)) === 0 ? 1 : 0;
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

