import React, {Component } from 'react';
import NavBar from './NavBar';
import Title from './Title';
import Purchase from './Purchase';

class Cart extends Component    {
    constructor(props)  {
        super(props);
        this.cart=localStorage.getItem('cart') ?JSON.parse(localStorage.getItem('cart')) : {};
        this.products=localStorage.getItem('products') ?JSON.parse(localStorage.getItem('products')) : [];
        this.currentUser= sessionStorage.getItem('currentUser');
        this.state = {
            cart:this.cart,
            myCart: this.cart[this.currentUser],
        }
    }

    deleteFromCart=(productId,currentUser)=>{
        var myCart=this.state.myCart;
        delete myCart[productId]
        var cart=this.cart;
        cart[currentUser]=myCart
        this.setState({cart:cart})
        localStorage.setItem('cart',JSON.stringify(this.cart))
    }

    addCount=(productId)=>{
        var myCart=this.state.myCart
        myCart[productId]=myCart[productId]+1
        this.setState({
            myCart:myCart
        })
    }

    reduceCount=(productId)=>{
        var myCart=this.state.myCart
        if(myCart[productId]>1){
            myCart[productId]=myCart[productId]-1
            this.setState({
            myCart:myCart
            })
        }
    }

    checkOutCart=()=>{
        console.log(this.state.cart,this.currentUser);
        var cart=this.state.cart
        console.log("cart",cart);
        delete cart[this.currentUser]
        console.log("cart",cart);
        this.setState({
            cart:cart,
            myCart:{}
        })
        localStorage.setItem('cart',JSON.stringify(cart));
    }

    render()    {
        return (
            <React.Fragment>
            <div className="cartList">
                <NavBar />
                <div className="cartProductListTitle">
                    <Title name="Your" title="Cart" />
                </div>
                <div className="cartView">
                    {
                        this.state.myCart
                        ?(Object.keys(this.state.myCart).map((cartProductId,index)=>{
                            let count=this.state.myCart[cartProductId];
                            return this.products.map((product)=>{
                                if(cartProductId===product["productId"]){
                                    const {image, productName, price, productId } = product;
                                    return(
                                        <div className="displayProduct" style={{display: 'inline-block', width:220, height:400, margin:40 }} >
                                            <div className="">
                                                <img src={image} alt="" />
                                                <br />
                                                {productName}
                                                <br />
                                                Rs.{price}
                                            </div>
                                            <div className="cartProductCount">
                                                <button onClick={this.reduceCount.bind(this,cartProductId)}>-</button>
                                                <input type="text" value={count} readOnly/>
                                                <button onClick={this.addCount.bind(this,cartProductId)}>+</button>
                                            </div>
                                            <div>
                                                <button className="addtoCart" onClick={this.deleteFromCart.bind(this,productId,this.currentUser)} >remove from cart</button>
                                            </div>
                                        </div>
                                        )
                                }
                            })
                        }))
                        :(null)
                    }
                </div>
            </div>
            <Purchase
                        cartDetails={this.state.myCart}
                        products = {this.products}
                        cart = {this.state.cart}
                        currentUser = {this.currentUser}
                        checkOutCart = {this.checkOutCart}
                    />
            </React.Fragment>
        )
    }
}

export default Cart;