
let parentDiv = document.querySelector(".container");
let btn = document.querySelector(".sizeBtn");

const createGrid = (rows, columns) => {
    let newRow;
    let newItem;
    let items = rows * columns;


    for (let i = 1; i <= rows; i++) {
        
        //create rows
        newRow = document.createElement("div");
        newRow.classList.add(`row-${i}`);

        //create div blocks and add them to rows
        for (let j = 1; j <= items; j++) {
            if ((j > (i - 1) * columns) && (j <= i * columns)) {
                newItem = document.createElement("div");
                newItem.classList.add(`item-${j}`);
                newRow.appendChild(newItem);
            }
        }
        //add created rows to container
        parentDiv.appendChild(newRow)
    }

    //set height of blocks to be equal to width
    let containerCS = window.getComputedStyle(parentDiv);
    let widthCS = containerCS.getPropertyValue("width");
    parentDiv.setAttribute("style", `height: ${widthCS}`);
}

//function that changes color of blocks 'mouse is down' and hovered on
const clickAndHover = () => {
    let itemDivs = document.querySelectorAll(".container > * > div");
let mouseIsDown = false;

parentDiv.addEventListener("mousedown", () => {
    mouseIsDown = true;
    
})

parentDiv.addEventListener("mouseup", () => {
    mouseIsDown = false;
})


itemDivs.forEach((i) => {

        i.addEventListener("mouseover", (e) => {
            if (mouseIsDown === true) {
                e.target.style.backgroundColor = "blue";
            }
        })
})
}

//function remove appended comtent of .container
const removeAppendedChildren = () => {
    while (parentDiv.firstChild) {
        parentDiv.removeChild(parentDiv.firstChild);
    }
}

//function that gets number of rows from user
const getRows = () => {
    let rowsFromPrompt = +prompt(`Rows:`)
    return rowsFromPrompt;
}

//function that gets number of columns from user
const getColumns = () => {
    let columnsFromPrompt = +prompt(`Columns:`)
    return columnsFromPrompt;
}

//function that changes the size of the drawing area
const resizeDrawingArea = () => {
    let userRows = getRows();
    let userColumns = getColumns ();

    while (!userRows || !userColumns) {
        if (userRows && !userColumns) {
            userColumns = userRows;
            break;
        } else if (!userRows && userColumns) {
            userRows = userColumns;
            break;
        } else {
            userRows = getRows ();
            userColumns = getColumns ();
        }
    }

    removeAppendedChildren ();
    createGrid (userRows, userColumns);
    clickAndHover ();
}


//CODE TO RUN ON PAGELOAD
createGrid(72, 108);


clickAndHover ();

//call resize function on button click 
btn.addEventListener("click", resizeDrawingArea);
