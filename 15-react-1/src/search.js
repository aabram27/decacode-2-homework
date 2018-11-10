import React from 'react';
import SearchBar from './searchbar';
import SearchItem from './searchitem';

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items:[],
            loading:false,
        }
        this.onSearch = this.onSearch.bind(this);
        this.addFavoriteClicked = this.addFavoriteClicked.bind(this);   
    }
    onSearch(value){
        this.setState({items:value, loading:false});
        console.log(value);
    }
    
    addFavoriteClicked(index){
        this.props.onAddFavorite(this.state.items[index]);
    }

    render() {
        const items = this.state.items;
        return(
            <div>
                <SearchBar onSearch={this.onSearch} onLoading={()=>this.setState({loading:true})}/>
                {this.state.loading ? <div>loading..</div> : ''}
                <div className="searchResult">
                    {items.map((x,i)=><SearchItem key={i} item={x} onFavClick={()=>this.addFavoriteClicked(i)}/>)}
                </div>
            </div>
        )

    }
}
export default Search;