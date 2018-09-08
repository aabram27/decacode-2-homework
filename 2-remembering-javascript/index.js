let arr = [];
let sum = 0;
let avr;
for (let i=2; i<process.argv.length;i++){
    arr.push(process.argv[i]);
    sum = sum + Number(process.argv[i]);
}
avr = sum / (process.argv.length-2);
console.log(arr);
console.log("Сумма: "+sum);
console.log("Среднее: "+ avr);
