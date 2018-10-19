// db.js
const fs = require('fs');
const path = require('path');

const pathToJSON = path.resolve(__dirname, 'index.json');

// db.js
const db = {
    get: function(callback){
      this.readFile(callback);
    },
    save: function(newData, callback) {
       this.readFile((data)=>{
            data.push(newData);
            this.writeFile(data, (result)=>{
                if (result) callback(newData);
            });
       });
    },
    update: function(id, newData,callback){
        this.readFile((data)=>{
            var elPos = data.findIndex(x=>x.id == id);
            if (elPos>=0){
                data[elPos] = newData;
                this.writeFile(data, (result)=>{
                    if (result) callback(newData)
                    else callback(false);
                });
            }
            else callback(false);
       });
    },
    remove: function(id,callback){
        this.readFile((data)=>{
            newData = data.filter(x=>x.id != id);
            if (newData.length < data.length){
                this.writeFile(newData, (result)=>{
                    callback(result);
                });
            }
            else callback(false);
       });
    },
    readFile: (callback)=>{
        fs.readFile(pathToJSON, 'utf8', (error, contents) => {
            callback(JSON.parse(contents));
          });        
    },
    writeFile: function(data, callback){
        fs.writeFile(pathToJSON, JSON.stringify(data, '', 2), 'utf8', (error, contents) => {
            error == null ? callback(true) : callback(false);
            
        });          
    },
  };

module.exports = db;