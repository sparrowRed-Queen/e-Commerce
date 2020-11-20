import React, {Component } from 'react';

class Purchase extends Component{

    checkOutCart=(cart,currentUser)=>{
        console.log(cart,currentUser);
        delete cart[currentUser];
        console.log(cart);
        localStorage.setItem('cart',cart);

    }

    render()    {
        var totalAmount=0;
        return(
            <div className="totalAmount">
            <h3>Bill</h3>
                {
                    this.props.cartDetails
                    ? (Object.keys(this.props.cartDetails).map(cartProductId=>{
                        console.log(cartProductId);
                        return this.props.products.map(product=>{
                            console.log(typeof(parseInt(product["price"])*this.props.cartDetails[cartProductId]),parseInt(product["price"])*this.props.cartDetails[cartProductId])
                            if(product["productId"]===cartProductId){
                                console.log(product,this.props.cartDetails[cartProductId])
                                let costOfProduct=parseInt(product["price"])*this.props.cartDetails[cartProductId]
                                totalAmount+=costOfProduct
                                return (
                                    <div className="cartBilling">
                                        <div>Name: {product["productName"]}</div>
                                        <div>Price: {product["price"]}</div>
                                        <div>Count: {this.props.cartDetails[cartProductId]}</div>
                                        <div>Total Cost: {costOfProduct}</div>
                                        <hr />
                                    </div>
                                )
                            }
                        })
                    }) ) : (null)
                }
                <div><strong className="textStrong">Total Amount: Rs.{totalAmount}</strong></div>
                <button className="addtoCart" onClick={this.props.checkOutCart}>Check Out</button>
            </div>
        )
    }
}

export default Purchase;