const React = require('react');
const ReactDOM = require('react-dom');
require('./index.css');
const text = "aaaa";
function refresh(){
    fetch("https://api.chucknorris.io/jokes/random").then(response => response.json()).then(data =>{
        const element = (
            <div>
              <h2>{data.value}</h2>
              <button onClick={refresh}>Refresh</button>
            </div>
          );
          ReactDOM.render(element, document.getElementById('root'));
    });
}
refresh();