import React, { Component } from 'react';
const API_KEY = 'AIzaSyDQ4vxE5cVle_0viBw2oWsvqXMkXD9zejY';
const SPREADSHEET_ID = '1ztaVwQefulRQY3WOodaoj5YlHXjnuUzbOUIA0ufK0T8';
const CLIENT_ID = '693468256530-1rop1ooc4p33ng2vv4efivd01gkjjc5a.apps.googleusercontent.com';

class GApi extends Component {
    constructor(props){
        super(props);
        this.state = {
            signed:false,
            
        };
        this.storedData = [];
        this.apiReady = false;
        
        this.updateStatusAndData = this.updateStatusAndData.bind(this);
        this.loadApi = this.loadApi.bind(this);
        this.saveData = this.saveData.bind(this);
    }

    setApiReady(val){
        this.apiReady = val;
    }

  loadApi() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    const updateStatusAndData = this.updateStatusAndData;
    const setApiReady = val => this.setApiReady(val);
    script.onload = () =>{
        window.gapi.load('client:auth2', ()=>{
        window.gapi.client.init({
            'apiKey':API_KEY,
            'clientId':CLIENT_ID,
            'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
            'scope':'https://www.googleapis.com/auth/spreadsheets'
        }).then(function() {
            // 3. Initialize and make the API request.
            //this.loadData();
            window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateStatusAndData);
            updateStatusAndData(window.gapi.auth2.getAuthInstance().isSignedIn.get());
            setApiReady(true);
        });
    });
    }
    document.body.appendChild(script);
  }
  saveData(data){
    console.log('Saving..');
    var params = {
        spreadsheetId: SPREADSHEET_ID,  // TODO: Update placeholder value.
        range: 'Data!A2',  // TODO: Update placeholder value.
        valueInputOption: 'RAW',  // TODO: Update placeholder value.
    };
    var valueRangeBody = {
        values:data    
    };
    var clearRequest = window.gapi.client.sheets.spreadsheets.values.clear({
        spreadsheetId: SPREADSHEET_ID,
        range:'Data!A2:E'
    }, {});
    clearRequest.then(function(response) {
      // TODO: Change code below to process the `response` object:
      console.log(response.result);
    }, function(reason) {
      console.error('error: ' + reason.result.error.message);
    });

    var updateRequest = window.gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
    updateRequest.then(function(response) {
        // TODO: Change code below to process the `response` object:
        console.log(response.result);
    }, function(reason) {
        console.error('error: ' + reason.result.error.message);
    });
    this.storedData = data;
   
  }
  
  updateStatusAndData(isSigned){
    //console.log(isSigned);
    this.setState({signed:isSigned});
    const onDataLoad = data => { 
        this.storedData = data;
        this.props.onDataLoad(data); 
    }
    if (isSigned){
        window.gapi.client.load("sheets","v4",()=>{  
            window.gapi.client.sheets.spreadsheets.values.get({
              spreadsheetId: SPREADSHEET_ID,
              range: 'Data!A2:E',
            }).then(function(response) {
              var range = response.result;
              
              if (range.values.length > 0) {
                const newData = [];
                for (let i = 0; i < range.values.length; i++) {
                  var row = range.values[i];
                  newData.push(row);
                }
                onDataLoad(newData);
              } else {
                
              }
            }, function(response) {
              console.log('Error: ' + response.result.error.message);
            });
        });
        //this.saveData([[0,'test'],[1,'AAA']]);
    }
  }

  signIn(){
    window.gapi.auth2.getAuthInstance().signIn();
  }
  signOut(){
    window.gapi.auth2.getAuthInstance().signOut();
  }

  componentDidMount() {
    this.loadApi();
    
  }
  componentDidUpdate(){
    if (this.storedData.length !== this.props.data.length && this.apiReady){
        console.log(this.storedData);
        console.log(this.props.data);
        this.saveData(this.props.data);
    }
  }

  render() {
    

    if (this.state.signed) {
     return (
     <div><button onClick={this.signOut}>Logout</button></div>
        )
    }
    else return(<button onClick={this.signIn}>Login</button>);
}
}
export default GApi;