import React, {Component } from 'react';

class ShowProduct extends Component {
    constructor(props)   {
        super(props);
        this.state = {
            addProduct : true,
            selectedCount : 0
        }
    }

    render()    {
        return(
            <div className="showProduct">
                {/* <h1>Product list</h1> */}

                {
                    <div className="search">
                        <input type="text" className="searchbar" placeholder="search" />
                        <button type="submit" className="searchbutton" ></button>
                    </div>
                }

                {/* {
                    this.state.addProduct ? (
                        <div className="initial">
                            <button >addProduct</button>
                            <button >deleteProduct</button>
                        </div>
                    ) : (
                        <div>

                        </div>
                    )
                } */}
            </div>
        )
    }
}

export default ShowProduct;