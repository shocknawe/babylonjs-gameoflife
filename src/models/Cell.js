export const cellColors = {
  BLACK: 'BLACK',
  WHITE: 'WHITE',
  WHITETOBLACK: 'WHITETOBLACK',
  BLACKTOWHITE: 'BLACKTOWHITE',
};

class Cell {
  constructor(num = 0) {
    this.isAlivePrev = this.isAlive = num === 0 ? false : true;
    this.color = this.isAlive ? cellColors.WHITE : cellColors.BLACK;
  }
  setCellState(num) {
    this.isAlivePrev = this.isAlive;
    this.isAlive = num === 0 ? false : true;

    if (this.isAlive && this.isAlivePrev) {
      this.color = cellColors.WHITE;
    } else if (this.isAlive && !this.isAlivePrev) {
      this.color = cellColors.BLACKTOWHITE;
    } else if (!this.isAlive && !this.isAlivePrev) {
      this.color = cellColors.BLACK;
    } else if (!this.isAlive && this.isAlivePrev) {
      this.color = cellColors.WHITETOBLACK;
    }
  }
}

export default Cell;
