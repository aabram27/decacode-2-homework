import React, { Component } from 'react';
import Search from './search';
import Favorites from './favorites';
import GApi from './gapi';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      favorites:[],
      activeTab:0
    }
    this.onAddFavorite = this.onAddFavorite.bind(this);
    this.onDelFavorite = this.onDelFavorite.bind(this);
  }
  onAddFavorite(item){
    const arr = (this.state.favorites.slice() || []).filter(x=>x.title !== item.title);
    arr.push([item.title, item.href]);
    this.setState({favorites:arr});
  }
  onDelFavorite(index){
    const arr = Array.from(this.state.favorites);
    arr.splice(index,1);
    this.setState({favorites:arr});
  }

  render() {
    const activeTab = this.state.activeTab;
    const switchTabs = index => this.setState({activeTab:index});
    const onDataLoad = (data)=> this.setState({favorites:data});
    return (
      <div>
        <div className="login">
          <GApi onDataLoad={onDataLoad} data={this.state.favorites}/>
        </div>
        <div className="tabs">
          <div className={activeTab==0?"tab active":"tab"} onClick={()=>switchTabs(0)}>Search</div>
          <div className={activeTab==1?"tab active":"tab"} onClick={()=>switchTabs(1)}>Favorites</div>
        </div>
        <div className="blocks">
          <div className={activeTab==0?"block active":"block"}>
            <Search onAddFavorite={this.onAddFavorite}/>
          </div>
          <div className={activeTab==1?"block active":"block"}>
            <Favorites items={this.state.favorites} onDelFavorite={this.onDelFavorite}/>
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;
