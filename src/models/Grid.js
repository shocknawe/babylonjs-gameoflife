import Cell from "./Cell";

class Grid {
  constructor(width, height, initCellStates) {
    this.width = width;
    this.height = height;
    this.cells = [];
    this.cellStates = [];
    this.cellStatesNext = [];

    for (var yy = 0; yy < this.height; yy++) {
      this.cells[yy] = [];
      this.cellStates[yy] = [];
      this.cellStatesNext[yy] = [];

      for (var xx = 0; xx < this.width; xx++) {


        this.cells[yy][xx] = new Cell(initCellStates[yy][xx]);
        this.cellStates[yy][xx] = initCellStates[yy][xx];
        this.cellStatesNext[yy][xx] = initCellStates[yy][xx];
      }
    }
  }

  step() {
    var totalCells;
    for (var yy = 0; yy < this.height; yy++) {
      for (var xx = 0; xx < this.width; xx++) {
        totalCells = 0;

        if (yy >= 1 && xx >= 1) {
          totalCells += this.cellStates[yy - 1][xx - 1]; //top left
        }
        if (yy >= 1) {
          totalCells += this.cellStates[yy - 1][xx]; //top center
        }
        if (yy >= 1 && xx < this.width - 1) {
          totalCells += this.cellStates[yy - 1][xx + 1]; //top right
        }

        if (xx >= 1) {
          totalCells += this.cellStates[yy][xx - 1]; //middle left
        }
        if (xx < this.width - 1) {
          totalCells += this.cellStates[yy][xx + 1]; //middle right
        }

        if (yy < this.height - 1 && xx >= 1) {
          totalCells += this.cellStates[yy + 1][xx - 1]; //bottom left
        }
        if (yy < this.height - 1) {
          totalCells += this.cellStates[yy + 1][xx]; //bottom center
        }
        if (yy < this.height - 1 && xx < this.width - 1) {
          totalCells += this.cellStates[yy + 1][xx + 1]; //bottom right
        }

        //apply the rules to each cell
        if (this.cellStates[yy][xx] === 0) {
          switch (totalCells) {
            case 3:
              this.cellStatesNext[yy][xx] = 1; //if cell is dead and has 3 neighbours, switch it on
              break;
            default:
              this.cellStatesNext[yy][xx] = 0; //otherwise leave it dead
          }
        } else if (this.cellStates[yy][xx] === 1) { //apply rules to living cell
          switch (totalCells) {
            case 0:
            case 1:
              this.cellStatesNext[yy][xx] = 0; //die of lonelines
              break;
            case 2:
            case 3:
              this.cellStatesNext[yy][xx] = 1; //carry on living
              break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
              this.cellStatesNext[yy][xx] = 0; //die of overcrowding
              break;
            default:
              this.cellStatesNext[yy][xx] = 0; //
          }
        }

      } // xx for loop
    } // yy for loop

    var nextState;
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        nextState = this.cellStatesNext[y][x];
        this.cellStates[y][x] = nextState;
        this.cells[y][x].setCellState(nextState);
      }
    }
  }
}

export default Grid;
