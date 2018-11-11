import React from 'react';

class Favorites extends React.Component {
    

    render() {
        const items = this.props.items;
        const onDelClick = index => this.props.onDelFavorite(index);
        return(
            <div>
                <div className="favorites">
                    {items.map((x,i)=>
                        <div key={i} className="favorite">
                            <a href={x[1]}>{x[0]}</a>
                            <button style={{position:"absolute", right:0}} onClick={()=>onDelClick(i)}>Del</button>
                        </div>
                        )}  
                </div>
            </div>
        )

    }
}
export default Favorites;