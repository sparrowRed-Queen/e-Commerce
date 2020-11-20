import React, {Component } from 'react';
import NavBar from './NavBar';
import ProductList from './ProductList';


class Home extends Component    {

    render()    {
        return(
            <div>
                <NavBar />
                <ProductList />
            </div>
        )
    }
}

export default Home