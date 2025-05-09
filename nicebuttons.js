const gridContainer = document.querySelector(".grid");
for (let i = 0; i < 400; i++){
  const btnContainer = document.createElement("div");
  btnContainer.classList.add("button-container");
  const btn = document.createElement("button");
  btnContainer.appendChild(btn);
  gridContainer.appendChild(btnContainer);
}

function getRandomRgbColor() {
  const value1 = Math.floor(Math.random() * 256);
  const value2 = Math.floor(Math.random() * 256);
  const value3 = Math.floor(Math.random() * 256);
  return [value1, value2, value3];
}
function createRgbString(colorArray){
  return `rgb(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]})`;
}

const buttons = document.querySelectorAll("button");
const grid = document.querySelector(".grid");
const h1letters = document.querySelectorAll("span");
const discoGrid = document.querySelector("input");
let disco_grid_enabled = false;

discoGrid.addEventListener('click', () => {
  disco_grid_enabled = !disco_grid_enabled;
  if(disco_grid_enabled){
    discoGrid.value = "Disable Disco Grid";
    discoGrid.style.border = "1px solid white";
  }
  else {
    discoGrid.value = "Enable Disco Grid";
    discoGrid.style.border = "1px solid rgba(0, 0, 0, 0)";
  }
})

setInterval(() => {
  for (let letter of h1letters){
    letter.style.color = createRgbString(getRandomRgbColor());
  }
}, 200);

for (let button of buttons){
  button.addEventListener('mouseenter', changeColorLimited);
}

function changeColorLimited() {
  let randomColorArray = getRandomRgbColor()
  this.style.backgroundColor = createRgbString(randomColorArray);
  this.style.boxShadow = `0 0 10px ${createRgbString(randomColorArray)}`;
  if (disco_grid_enabled){
    grid.style.boxShadow = `0 0 10px ${createRgbString(randomColorArray)}`;
  };
  

  let toBlack = setInterval(() => {
    randomColorArray = randomColorArray.map((colorCode) => {
      colorCode -= 10;
      if (colorCode < 15){
        colorCode = 15;
      }
      return colorCode;
    });
    this.style.backgroundColor = createRgbString(randomColorArray);
    this.style.boxShadow = `0 0 10px ${createRgbString(randomColorArray)}`;
    
    if (randomColorArray[0] === 15 && randomColorArray[1] === 15 && randomColorArray[2] === 15){
      this.style.boxShadow = `none`;
      grid.style.boxShadow = "none";
      clearInterval(toBlack);
    }
  }, 30);
}
