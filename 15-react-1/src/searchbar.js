import React from 'react';

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        
        this.state={
            searchValue:''
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.onLoading();
        fetch('https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api?q='+this.state.searchValue, {
          method:"GET",
           headers: {
            'Content-Type': 'application/json',
                       
          }
        }).then(res => res.json())
          .then(data => this.props.onSearch(data.results));
    }
    
    render() {
        const handleChange = value =>  this.setState({searchValue:value});
          
        return(
            <div>
                <input type="text" 
                    onKeyPress={(e)=>e.key ==='Enter' ? this.handleClick() : null}
                    onChange={(e)=>handleChange(e.target.value)} 
                    placeholder="Receipt.."/>
                <button onClick={this.handleClick}>Search</button>

            </div>
        )

    }
}
export default SearchBar;