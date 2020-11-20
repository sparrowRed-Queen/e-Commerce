import React, {Component } from 'react';
import {Link } from 'react-router-dom';
import {FaSearch } from 'react-icons/all';
import Title from './Title';


class ProductButton extends Component {

    addToCart=(productId)=>  {
        var currentUser = sessionStorage.getItem('currentUser');
        var cart=localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart'))
            : {}
        var myCart=cart[currentUser]
            ? cart[currentUser] : {}
        if(!myCart[productId] && currentUser){
            myCart[productId]=1
            cart[currentUser]=myCart;
            localStorage.setItem('cart',JSON.stringify(cart));
        }
    }

    addToWishList=(productId)=> {
        var currentUser = sessionStorage.getItem('currentUser');
        var wishlist =localStorage.getItem('wishlist')
            ? JSON.parse(localStorage.getItem('wishlist'))
            : {}
        var myWishList = wishlist[currentUser]
            ? wishlist[currentUser]
            : []
        if(!myWishList.includes(productId) && currentUser) {
            myWishList.push(productId);
            wishlist[currentUser] = myWishList;
            localStorage.setItem('wishlist',JSON.stringify(wishlist));
             console.log(wishlist);
        }
    }

    setProduct=(product)=>{
        sessionStorage.setItem('productDescription',JSON.stringify(product));
    }

    nextPage=(path)=>   {
        this.props.history.push(path)
    }

    render()    {
        const {productName, image, price } = this.props.product;
        return(
            <div className="displayProduct"
                style={{display: 'inline-block', width:200, height:400, margin: 30 }} >
                <div>
                    <Link to='/product' onClick={this.setProduct.bind(this, this.props.product)}>
                        <img src={image} alt="" />
                    </Link>
                    <br />
                    {productName}
                    <br />
                    Rs.{price}
                </div>
                <div>
                    <button className="addtoCart" onClick={this.addToCart.bind(this,this.props.product.productId)} >add to cart</button>
                    <button className="addtoCart" onClick={this.addToWishList.bind(this,this.props.product.productId)} >add to wishList</button>
                </div>
            </div>
        )
    }
}


class ProductList extends Component {

    constructor(props){
        super(props);
        this.state={
            query:"",
            products:[],
            searchProductResult:[]
        }
    }

    componentDidMount=()=>{
        var getProducts=JSON.parse(localStorage.getItem('products'));
        this.setState({
            products:getProducts,
            searchProductResult:getProducts,
            categories:"allCategories"
        })
    }

    searchInProducts=evt=>{
        this.setState({
            query:evt.target.value
        },
            ()=>{
                this.state.query && this.state.products
                ?(
                    this.setState({
                        searchProductResult:this.state.products.filter((pro,id)=>
                            pro.productName.toLowerCase().includes(this.state.query.toLowerCase())
                        )
                    })
                )
                :(
                    this.setState({
                        searchProductResult:this.state.products
                    })
                )
            }
        )
    }

    setCategories=evt=>{
        console.log(evt.target.value)
        this.setState({
            categories:evt.target.value
        },()=>{
            this.state.categories==="allCategories"
            ?(
                this.setState({
                        searchProductResult:this.state.products
                    })
            )
            :(
                this.setState({
                        searchProductResult:this.state.products.filter((pro,id)=>
                            pro.categories.toLowerCase().includes(this.state.categories.toLowerCase())
                        )
                    })
            )
        })
    }

    render()    {
        return(
            <React.Fragment>
                <div className="productListHome">
                    <div className="productListTitle">
                        <Title name="Our" title="Products" />
                        <FaSearch className="searchIcon"/>
                        <input type="text" className="searchInput" placeholder="Search" name="productSearch" onChange={this.searchInProducts}/>
                        <select className="searchBar" onChange={this.setCategories}>
                            <option value="allCategories"> All Categories </option>
                            <option value="electronics">Electronics</option>
                            <option value="furniture">Furniture</option>
                            <option value="home appliances">Home Appliances</option>
                            <option value="clothing">Clothings</option>

                        </select>
                    </div>
                    <div>
                        { 
                            this.state.searchProductResult ? (
                            this.state.searchProductResult.map(getProduct=>{
                                return (
                                    <ProductButton
                                        key={getProduct.productId}
                                        product={getProduct}
                                    />
                                );
                            }
                            )): (null)
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ProductList;