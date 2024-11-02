
import { getRandomColor } from './rainbow.js'; 

document.addEventListener("DOMContentLoaded", function() {
    const root = document.querySelector('#grid-wrapper');
    const clearButton = document.querySelector('#clear-button');
    const selectSize = document.querySelector('#size-options');
    const sizeOptions = Array.from({ length: 12 }, (_, i) => i > 5 ? (i*i) : false).filter(Boolean);
    const selectCrazy  = document.querySelector('#crazy-options');
    const crazyOptions = [10, 20, 40, 75, 100]

    let cells;
    let gridSize = sizeOptions[0];
    let crazy = crazyOptions[1];

    function setOptions(){
        sizeOptions.forEach(size => {
            const option = document.createElement("option");
            option.value = size;
            option.text = size;
            selectSize.appendChild(option)
        })

        crazyOptions.forEach(size => {
            const option = document.createElement("option");
            option.value = size;
            option.text = size;
            selectCrazy.appendChild(option)
        })
    }

    function setGridColumns(){
        const columns = Math.ceil(Math.sqrt(gridSize)); // Calculate columns to get a square-like grid
        root.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    }

    function createGrid(){
        root.innerHTML = ""
        setGridColumns();
        const fragment = document.createDocumentFragment();
        for (let i = 1; i <= gridSize; i++) {
            const newDiv = document.createElement("div");
            newDiv.className = 'cell'
            fragment.appendChild(newDiv); 
        }
        root.appendChild(fragment); 
        cells = Array.from(root.children);
        cells.forEach(cell => {
            cell.addEventListener('mouseenter', colorCell)
        })
    }

    function colorCell(e){
        const cell = e.target;

        const attributes = {
            background: getRandomColor(crazy),
        }

        Object.keys(attributes).forEach(key => {
            cell.style[key] = attributes[key];
        });

    }

    function clearGrid(){
        root.innerHTML = ""
    }

    selectSize.addEventListener('change', function(){
        gridSize = selectSize.value;
        createGrid();
    })

    selectCrazy.addEventListener('change', function(){
        crazy = selectCrazy.value;
    })

    clearButton.addEventListener('click', function(){
        createGrid();
    })

    if( ! root ) return;
    setOptions();
    createGrid();
  });
  
