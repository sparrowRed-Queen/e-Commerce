import React, {Component } from 'react';
import NavBar from './NavBar';
import Title from './Title';

class WishList extends Component {
    constructor(props)  {
        super(props);
        this.wishlist = localStorage.getItem('wishlist') ?JSON.parse(localStorage.getItem('wishlist')) : {};
        this.products=localStorage.getItem('products') ?JSON.parse(localStorage.getItem('products')) : [];
        this.currentUser= sessionStorage.getItem('currentUser');
        this.state = {
            wishlist:this.wishlist,
            myWishlist: this.wishlist[this.currentUser]
        }
    }

    addToCart=(productId)=>  {
        var cart=localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart'))
            : {}
        var myCart=cart[this.currentUser]
            ? cart[this.currentUser] : {}
        if(!myCart[productId]){
            myCart[productId]=1
            cart[this.currentUser]=myCart;
            localStorage.setItem('cart',JSON.stringify(cart));
        }
    }

    removeFromWishlist=(productId)=>    {
        console.log(productId,this.state.myWishlist,);
        var myWishlist = this.state.myWishlist;
        console.log(myWishlist,this.state.myWishlist)
        myWishlist.splice(myWishlist.indexOf(productId),1)
        console.log(myWishlist,this.state.myWishlist)
        var wishlist = this.state.wishlist;
        wishlist[this.currentUser] = myWishlist;
        localStorage.setItem('wishlist',JSON.stringify(wishlist));
        this.setState({
            wishlist: wishlist
        })
    }

    render()    {
        return(
            <div className="displayWishlist" >
                <NavBar />
                <div className="productListTitle" >
                    <Title name="Your" title="Wishlist" />
                </div>
                <div>
                    {
                        this.state.myWishlist
                        ? (this.products.map(product=>{
                            if(this.state.myWishlist.includes(product["productId"]))    {
                                const {image, productName, price, productId } = product;
                                    return(
                                        <div className="displayProduct" style={{display: 'inline-block', width:200, height:380, margin:35 }} >
                                            <div className="">
                                                <img src={image} alt="" />
                                                <br />
                                                {productName}
                                                <br />
                                                Rs.{price}
                                            </div>
                                            <div>
                                                <button className="addtoCart" onClick={this.addToCart.bind(this,productId)} >add to cart</button>
                                                <button className="addtoCart" onClick={this.removeFromWishlist.bind(this,productId)} >remove</button>
                                            </div>
                                        </div>
                                        )
                            }
                        }) ) : (null)
                    }
                </div>
            </div>
        )
    }
}

export default WishList;