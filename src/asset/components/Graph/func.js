let can = null;

const contextSize = {
  width: 300,
  height: 150
};

const correction = {
  y: -15,
  x: 15
}

// Preparation
export const canvasPreparation = (items, canObj) => {
  can = canObj;
  
  const incomesList = items.map(item => ( +item.incomes ));
  const costsList = items.map(item => ( +item.costs ));
  
  const incomesMax = max(incomesList);
  const costsMax = max(costsList);
  const yMax = incomesMax > costsMax ? incomesMax : costsMax;
  
  const k = contextSize.height / yMax;
  
  // Coordinates draws
  line(correction.x, contextSize.height - 15, contextSize.width, contextSize.height - 15);
  line(correction.x, 0, correction.x, contextSize.height - 15);
  const OXcoordinates = OXlines();
  printYMax(yMax + ' грн.');
  
  
  let incomesPaint = [];
  let costsPaint = [];
  for (let i = 0; i < 12; i++) {
    incomesPaint.push({
      x1: OXcoordinates[i] + 1,
      y1: contextSize.height + correction.y - 1,
      x2: OXcoordinates[i] + 5,
      y2: contextSize.height + correction.y - k * incomesList[i]
    });
  }
  for (let i = 0; i < 12; i++) {
    costsPaint.push({
      x1: OXcoordinates[i] + 7,
      y1: contextSize.height + correction.y - 1,
      x2: OXcoordinates[i] + 11,
      y2: contextSize.height + correction.y - k * costsList[i]
    });
  }
  
  makeGraph(incomesPaint, "red");  
  makeGraph(costsPaint, "blue");
};

function OXlines() {
  let dx = contextSize.width / 10;
  let x = correction.x;
  let res = [];
  
  for (let i = 1; i <= 10; i++) {
    line(x, contextSize.height - 20, x, contextSize.height - 10);
    print(i, x, contextSize.height);
    res.push(x);
    x += dx;
  }
  
  return res;
}

function makeGraph(incomesList, color) {
  incomesList.forEach(({x1, y1, x2, y2}) => {    
    rectangle(x1, y1, x2, y2, color);
  });
}

// Max
function max(arg) {
  let maxIndex = 0;
  arg.forEach((item, index) => {
    if (item > arg[maxIndex]) {
      maxIndex = index
    }
  });
  return arg[maxIndex];
}

// Canvas text prints
function printYMax(msg) {  
  let ctx = can.getContext("2d");
  ctx.save();
  ctx.font = "10px Arial";
  ctx.fillStyle = "black";
  ctx.translate(100, 100);
  ctx.rotate(-90 * Math.PI / 180);
  ctx.fillText("Max = " + msg, 0, -90);
  ctx.restore();
}

// Canvas text prints
function print(msg, x, y) {
  let ctx = can.getContext("2d");
  ctx.font = "10px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(msg, x, y);
}

// Canvas line droves
function line(x1, y1, x2, y2) {
  let ctx = can.getContext("2d");
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

// Canvas rectangle droves
function rectangle(x1, y1, x2, y2, color) {
  let width = x2- x1;
  let height = y2 - y1;  
  let ctx = can.getContext("2d");
  ctx.beginPath();
  ctx.fillStyle = color;  
  ctx.rect(x1, y1, width, height);
  ctx.fill();
}