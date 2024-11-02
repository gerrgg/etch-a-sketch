import { getRandomColor } from './rainbow.js'; 
import { LocalStorageCRUD as storage } from './storage.js'; 

document.addEventListener("DOMContentLoaded", function() {
  const root = document.querySelector('#grid-wrapper');
  const clearButton = document.querySelector('#clear-button');

  const selectSize = document.querySelector('#size-options');
  const sizeOptions = Array.from({ length: 12 }, (_, i) => i > 5 ? (i * i) : false).filter(Boolean);

  const selectCrazy = document.querySelector('#crazy-options');
  const crazyOptions = [10, 20, 40, 75, 100];

  const selectSquare = document.querySelector('#square-options');
  const squareOptions = [25, 40, 50, 60, 100];

  let cells;
  let gridSize = sizeOptions[0];
  let crazy = crazyOptions[1];
  let square = squareOptions[1];

  // Load options and cell states from localStorage
  const savedOptions = storage.getAllOptions();
  if (savedOptions.size) {
    gridSize = savedOptions.size;
  }
  if (savedOptions.crazy) {
    crazy = savedOptions.crazy;
  }
  if (savedOptions.crazy) {
    square = savedOptions.square;
  }

  // Load cell states from localStorage
  let savedCells = JSON.parse(localStorage.getItem('cellStates')) || {};

  function setCellSquare(){
    cells.forEach(c => {
        c.style.height = `${square}px`;
        c.style.width = `${square}px`;
    })
  }

  function setOptions() {
    sizeOptions.forEach(size => {
      const option = document.createElement("option");
      option.value = size;
      option.text = size;
      selectSize.appendChild(option);
    });

    crazyOptions.forEach(option => {
      const opt = document.createElement("option");
      opt.value = option;
      opt.text = option;
      selectCrazy.appendChild(opt);
    });

    squareOptions.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.text = option;
        selectSquare.appendChild(opt);
    });

    // Set the selected options based on localStorage values
    selectSize.value = gridSize;
    selectCrazy.value = crazy;
    selectSquare.value = square;
  }

  function setGridColumns() {
    const columns = Math.ceil(Math.sqrt(gridSize)); // Calculate columns to get a square-like grid
    root.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  }

  function createGrid() {
    root.innerHTML = "";
    setGridColumns();
    const fragment = document.createDocumentFragment();
    for (let i = 1; i <= gridSize; i++) {
      const newDiv = document.createElement("div");
      newDiv.className = 'cell';
      // Check if cell state exists in savedCells
      if (savedCells[i]) {
        newDiv.style.background = savedCells[i];
      }
      fragment.appendChild(newDiv); 
    }
    root.appendChild(fragment); 
    cells = Array.from(root.children);
    cells.forEach((cell, index) => {
      cell.addEventListener('mouseenter', (e) => colorCell(e, index + 1));
      cell.style.height = `${square}px`;
      cell.style.width = `${square}px`;
    });
  }

  function colorCell(e, cellIndex) {
    const cell = e.target;

    const attributes = {
      background: getRandomColor(crazy),
    };

    Object.keys(attributes).forEach(key => {
      cell.style[key] = attributes[key];
    });

    // Save the cell state in localStorage
    saveCellState(cellIndex, attributes.background);
  }

  function saveCellState(index, color) {
    const cellStates = JSON.parse(localStorage.getItem('cellStates')) || {};
    cellStates[index] = color; // Update the cell state
    localStorage.setItem('cellStates', JSON.stringify(cellStates)); // Save to localStorage
  }

  function clearGrid() {
      // Clear cell states in localStorage
      localStorage.removeItem('cellStates');
      root.innerHTML = "";
  }

  selectSize.addEventListener('change', function() {
    gridSize = selectSize.value;
    createGrid();
    updateStorage();
  });

  selectCrazy.addEventListener('change', function() {
    crazy = selectCrazy.value;
    updateStorage(); // Save changes to localStorage
  });

  selectSquare.addEventListener('change', function() {
    square = selectSquare.value;
    updateStorage(); // Save changes to localStorage
    createGrid();
  });

  clearButton.addEventListener('click', function() {
    savedCells = {}
    clearGrid();
    createGrid();
  });

  function updateStorage() {
    storage.saveOptions({ size: gridSize, crazy: crazy, square: square });
  }

  if (!root) return;
  setOptions();
  createGrid();
});
