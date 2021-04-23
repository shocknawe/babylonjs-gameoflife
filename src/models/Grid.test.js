import Grid from './Grid';

describe('Grid constructor', () => {
  let grid;
  beforeEach(() => {
    const initCellStates = [
      [0,0],
      [0,0],
      [0,0],
      [0,0],
    ];
    grid = new Grid(2, 4, initCellStates);
  });
  test('instance width is 2', () => {
    expect(grid.width).toBe(2);
  });
  test('instance height is 4', () => {
    expect(grid.height).toBe(4);
  });
  test('instance cells width is 2', () => {
    expect(grid.cells[0].length).toBe(2);
  });
  test('instance cells height is 4', () => {
    expect(grid.cells.length).toBe(4);
  });
  test('instance cellStates width is 2', () => {
    expect(grid.cellStates[0].length).toBe(2);
  });
  test('instance cellStates height is 4', () => {
    expect(grid.cellStates.length).toBe(4);
  });
  test('instance cellStatesNext width is 2', () => {
    expect(grid.cellStatesNext[0].length).toBe(2);
  });
  test('instance cellStatesNext height is 4', () => {
    expect(grid.cellStatesNext.length).toBe(4);
  });
});

describe('Grid step (still life)', () => {
  test('empty field should not change', () => {
    const initCellStates = [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
    ];
    const expectedCellStates = [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
    ];
    const grid = new Grid(4, 4, initCellStates);
    grid.step();
    expect(grid.cellStates).toEqual(expectedCellStates);
  });
  test('still life "Block" should not change', () => {
    const initCellStates = [
      [0,0,0,0],
      [0,1,1,0],
      [0,1,1,0],
      [0,0,0,0],
    ];
    const expectedCellStates = [
      [0,0,0,0],
      [0,1,1,0],
      [0,1,1,0],
      [0,0,0,0],
    ];
    const grid = new Grid(4, 4, initCellStates);
    grid.step();
    expect(grid.cellStates).toEqual(expectedCellStates);
  });
  test('still life "Beehive" should not change', () => {
    const initCellStates = [
      [0,1,1,0],
      [1,0,0,1],
      [0,1,1,0],
      [0,0,0,0],
    ];
    const expectedCellStates = [
      [0,1,1,0],
      [1,0,0,1],
      [0,1,1,0],
      [0,0,0,0],
    ];
    const grid = new Grid(4, 4, initCellStates);
    grid.step();
    expect(grid.cellStates).toEqual(expectedCellStates);
  });
  test('still life "Loaf" should not change', () => {
    const initCellStates = [
      [0,1,1,0],
      [1,0,0,1],
      [0,1,0,1],
      [0,0,1,0],
    ];
    const expectedCellStates = [
      [0,1,1,0],
      [1,0,0,1],
      [0,1,0,1],
      [0,0,1,0],
    ];
    const grid = new Grid(4, 4, initCellStates);
    grid.step();
    expect(grid.cellStates).toEqual(expectedCellStates);
  });
});

describe('Grid step (oscillators)', () => {
  test('oscillators "Blinker" should just oscillate', () => {
    const initCellStates = [
      [0,0,0,0],
      [0,1,1,1],
      [0,0,0,0],
      [0,0,0,0],
    ];
    const expectedCellStates = [
      [0,0,1,0],
      [0,0,1,0],
      [0,0,1,0],
      [0,0,0,0],
    ];
    const grid = new Grid(4, 4, initCellStates);
    grid.step();
    expect(grid.cellStates).toEqual(expectedCellStates);
    grid.step();
    expect(grid.cellStates).toEqual(initCellStates);
  });
  test('oscillators "Toad" should just oscillate', () => {
    const initCellStates = [
      [0,0,1,0],
      [1,0,0,1],
      [1,0,0,1],
      [0,1,0,0],
    ];
    const expectedCellStates = [
      [0,0,0,0],
      [0,1,1,1],
      [1,1,1,0],
      [0,0,0,0],
    ];
    const grid = new Grid(4, 4, initCellStates);
    grid.step();
    expect(grid.cellStates).toEqual(expectedCellStates);
    grid.step();
    expect(grid.cellStates).toEqual(initCellStates);
  });
  test('oscillators "Beacon" should just oscillate', () => {
    const initCellStates = [
      [1,1,0,0],
      [1,0,0,0],
      [0,0,0,1],
      [0,0,1,1],
    ];
    const expectedCellStates = [
      [1,1,0,0],
      [1,1,0,0],
      [0,0,1,1],
      [0,0,1,1],
    ];
    const grid = new Grid(4, 4, initCellStates);
    grid.step();
    expect(grid.cellStates).toEqual(expectedCellStates);
    grid.step();
    expect(grid.cellStates).toEqual(initCellStates);
  });
});
