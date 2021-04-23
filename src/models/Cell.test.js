import Cell, {cellColors} from './Cell';

describe('Cell constructor', () => {
  test('instance isAlive is false, when instantiated with no params', () => {
    const cell = new Cell();
    expect(cell.isAlive).toBe(false);
  });
  test('instance isAlivePrev is false, when instantiated with no params', () => {
    const cell = new Cell();
    expect(cell.isAlivePrev).toBe(false);
  });
  test('instance isAlive is true, when instantiated with 1', () => {
    const cell = new Cell(1);
    expect(cell.isAlive).toBe(true);
  });
  test('instance isAlive is false, when instantiated with 0', () => {
    const cell = new Cell(0);
    expect(cell.isAlive).toBe(false);
  });
  test('instance color is black, when instantiated with 0', () => {
    const cell = new Cell(0);
    expect(cell.color).toBe(cellColors.BLACK);
  });
  test('instance color is white, when instantiated with 1', () => {
    const cell = new Cell(1);
    expect(cell.color).toBe(cellColors.WHITE);
  });
});

describe('Cell setCellState', () => {
  test('instance isAlive is true after calling setCellState(1)', () => {
    const cell = new Cell();
    cell.setCellState(1);
    expect(cell.isAlive).toBe(true);
  });
  test('instance isAlivePrev is false after calling setCellState(1)', () => {
    const cell = new Cell();
    cell.setCellState(1);
    expect(cell.isAlivePrev).toBe(false);
  });
  test('instance isAlivePrev is false after calling setCellState(1) twice', () => {
    const cell = new Cell();
    cell.setCellState(1);
    cell.setCellState(1);
    expect(cell.isAlivePrev).toBe(true);
  });
});

describe('Cell setCellState (instance color)', () => {
  test('instance color is black, when instanciated with 0, then calling setCellState 0', () => {
    const cell = new Cell(0);
    cell.setCellState(0);
    expect(cell.color).toBe(cellColors.BLACK);
  });
  test('instance color is blacktowhite, when instanciated with 0, then calling setCellState 1', () => {
    const cell = new Cell(0);
    cell.setCellState(1);
    expect(cell.color).toBe(cellColors.BLACKTOWHITE);
  });
  test('instance color is white, when instanciated with 1, then calling setCellState 1', () => {
    const cell = new Cell(1);
    cell.setCellState(1);
    expect(cell.color).toBe(cellColors.WHITE);
  });
  test('instance color is whitetoblack, when instanciated with 1, then calling setCellState 0', () => {
    const cell = new Cell(1);
    cell.setCellState(0);
    expect(cell.color).toBe(cellColors.WHITETOBLACK);
  });
});
