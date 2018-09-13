const path = require('path');
const fs = require('fs');

const pathToJSON = path.resolve(__dirname, 'index.json');
const data = fs.readFileSync(pathToJSON, 'utf8');
const arr = JSON.parse(data);
const painters =arr.filter(x=>x.skills.find(y=>y === 'Paint')!== undefined);

console.log("Количестов пользователей: ", arr.length)
console.log("Средний возраст пользователей: "+ arr.reduce((acc,x)=>acc+x.age/arr.length,0));
console.log(arr.map(x=>x.age +" " + x.name).join(", "));
console.log(painters.map(x=>x.name));
