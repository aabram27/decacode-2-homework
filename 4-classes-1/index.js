const path = require('path');
const fs = require('fs');

const pathToCSV = path.resolve(__dirname, 'products.csv');
const content = fs.readFileSync(pathToCSV, 'utf8');
const items = content.split(', ');
  
const Product = function(str) {
    const values = str.split(' ');
    this.title = values[1];
    this.price = {
        rubles:Number(values[0]),
        dollars:values[0]/60
    };
};
const products = items.map(x=>new Product(x));
const pathToJSON = path.resolve(__dirname, 'result.json');
fs.writeFileSync(pathToJSON,JSON.stringify(products),'utf8');
