
import { getRandomColor } from './rainbow.js'; 

document.addEventListener("DOMContentLoaded", function() {
    const root = document.querySelector('#grid-wrapper');
    const clearButton = document.querySelector('#clear-button');
    const select = document.querySelector('#size-options');
    let cells;
    const sizeOptions = Array.from({ length: 12 }, (_, i) => i > 5 ? (i*i) : false).filter(Boolean);
    let gridSize = sizeOptions[0];

    function setSizeOptions(){
        sizeOptions.forEach(size => {
            const option = document.createElement("option");
            option.value = size;
            option.text = size;
            select.appendChild(option)
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
            background: getRandomColor(),
            borderColor: getRandomColor()
        }

        Object.keys(attributes).forEach(key => {
            cell.style[key] = attributes[key];
        });

        console.log(attributes)
    }

    function clearGrid(){
        root.innerHTML = ""
    }

    select.addEventListener('change', function(){
        gridSize = select.value;
        createGrid();
    })

    clearButton.addEventListener('change', function(){
        createGrid();
    })

    if( ! root ) return;
    setSizeOptions();
    createGrid();
  });
  
