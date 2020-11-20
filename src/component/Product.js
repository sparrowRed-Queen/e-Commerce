import React, {Component } from 'react';
import NavBar from './NavBar';




class Product extends Component{

    addToCart=(productId)=> {
        var currentUser = sessionStorage.getItem('currentUser');
        var cart=localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart'))
            : {}
        var myCart=cart[currentUser]
            ? cart[currentUser] : {}
        if(!myCart[productId]){
            myCart[productId]=1
            cart[currentUser]=myCart;
            localStorage.setItem('cart',JSON.stringify(cart));
        }
    }

    addToWishlist=(productId)=> {
        var currentUser = sessionStorage.getItem('currentUser');
        var wishlist =localStorage.getItem('wishlist')
            ? JSON.parse(localStorage.getItem('wishlist'))
            : {}
        var myWishList = wishlist[currentUser]
            ? wishlist[currentUser]
            : []
        if(!myWishList.includes(productId)) {
            myWishList.push(productId);
            wishlist[currentUser] = myWishList;
            localStorage.setItem('wishlist',JSON.stringify(wishlist));
             console.log(wishlist);
        }
    }

    render()    {
        const product = sessionStorage.getItem('productDescription')
            ? (JSON.parse(sessionStorage.getItem('productDescription')))
            : {};
        return(
            <div>
                <NavBar />
                <div className="displayImage" >
                    <img src={product.image} />
                </div>
                <div className="prodDescription" >
                    <br />
                    <h4>{product.productName} </h4>
                    <br />
                    <h4> {product.categories} </h4>
                    <br />
                    <h4>Rs. {product.price} </h4>
                    <br />
                    <h4>Description: {product.description} </h4>
                    <br />
                    <div className='productViewbutton'>
                        <button onClick={this.addToCart.bind(this, product.productId)} >add to cart</button>
                        <button onClick={this.addToWishlist.bind(this, product.productId)} >add to wishlist</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Product;