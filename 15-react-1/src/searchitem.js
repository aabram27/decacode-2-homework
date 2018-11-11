import React from 'react';

class SearchItem extends React.Component {
    
    
    render() {
        const item = this.props.item;
        const onFavClick = this.props.onFavClick;
        return(
            <div className="searchItem">
                <a href={item.href}>{item.title}</a>
                <button style={{position:"absolute", right:0}} onClick={onFavClick}>Fav</button>
            </div>
        )

    }
}
export default SearchItem;