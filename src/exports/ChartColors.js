let AvailableColors = [
    '#185ADB','#7C83FD','#CC0E74','#FC427B','#00B894','#32E0C4','#FFA900','#FEBF63','#FF005C','#FF6D24','#810034','#252525'
];

let UsedColors = [];

function getStockColor()
{
    let indx = Math.round(Math.random() * (AvailableColors.length - 1));
    console.log(indx);
    let color = AvailableColors[indx];
    AvailableColors.splice(indx,1)
    UsedColors.push(color);
    console.log(UsedColors);
    return color;
}

function setStockColor(color)
{
    let indx = UsedColors.findIndex((u)=> u===color);
    UsedColors.splice(indx,1);
    AvailableColors.push(color);
    // console.log(indx);
}

module.exports = {getStockColor,setStockColor}

