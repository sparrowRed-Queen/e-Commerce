import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import AdminHomeHeader from './AdminHomeHeader';
import ProductDesignPane from './ProductDesignPane';
import ProductListPane from './ProductListPane';

class AdminHome extends Component {

    constructor(props){
        super(props);
        this.state={
            addProduct:false,
            productPreview:null,
            products:[],
            displaySubMenu:false,
            productId:-1,
            subMenuId:-1,
            delConfirm:false,
            query:"",
            searchProductResult:[],
            currentUser: sessionStorage.getItem('currentUser')
        }
    }


    componentDidMount=()=>{
        var getProducts=JSON.parse(localStorage.getItem('products'));
        this.setState({
            products:getProducts,
            searchProductResult:getProducts
        })
    }

    changeAddProductId=()=>{
        this.setState({
            addProduct:!this.state.addProduct,
            productId:-1,
        })
    }

    changeAddProduct=()=>{
        this.setState({
            addProduct:!this.state.addProduct,
        })
        console.log(this.state.productId)
    }


    showSubMenu=id=>{
        this.setState({
            displaySubMenu:!this.state.displaySubMenu,
            subMenuId:id
        });
    }

    setDisplaySubMenu=()=>{
        this.setState({displaySubMenu:false})
    }

    viewProduct=(product,id)=>{
        this.setState({
            addProduct:false,
            productPreview:product,
            productId:id,
            query:""
        })
    }

    deleteProducts=id=>{
        console.log(id);
        if(window.confirm("Are you sure you want to delete the product")){
            this.deleteProductConfirm(id);
        }
    }


    deleteProductConfirm=id=>{

        console.log(id);
        var deleteIndex=[];

        if(typeof(id)==="object"){
            deleteIndex=id;
        }
        else{
            this.state.products.forEach((pro,index)=>{
                console.log(pro["productId"]);
                if(id===pro["productId"]){
                deleteIndex.push(index)
                console.log(deleteIndex,index)
                }
            })
        }
        console.log(deleteIndex)
        var changedProduct=this.state.products.filter((product,pid)=>!deleteIndex.includes(pid))
        this.setState({
            products:changedProduct,
            searchProductResult:changedProduct,
            productId:-1,
            productPreview:null,
            delConfirm:false
        },)
        localStorage.setItem("products",JSON.stringify(changedProduct));
    }


    searchInProductList=evt=>{
        console.log(evt.target.value)
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



    saveToLocal=productSet=>{
        console.log("saveTolocal",productSet)
        if(productSet["productId"]){
            var storedQuestion=localStorage.getItem('products')
                ?JSON.parse(localStorage.getItem('products'))
                :[]

            storedQuestion.push(productSet);
            console.log(storedQuestion);

            localStorage.setItem('products',JSON.stringify(storedQuestion));
            this.setState({
                products: storedQuestion,
                searchProductResult:storedQuestion,
                productPreview:productSet,
                productId:productSet["productId"],
                addProduct:false

            });
        }
    }


    editToSave=(id,productSet)=>{
        console.log("editosave",id,productSet,this.state.products)

        var editIndex;
        this.state.products.forEach((pro,index)=>{
            if(pro["productId"]===id)
            editIndex=index
        })
        console.log(editIndex,typeof(id))

        var editProduct=this.state.products;
        editProduct[editIndex]=productSet
        this.setState({
            products:editProduct,
            productId:editIndex,
            productPreview:productSet,
            addProduct:false
        })
        localStorage.setItem('products',JSON.stringify(editProduct));
    }


    render() {
        return (
            <div className="adminHomePage">
            {
                this.state.currentUser==="admin" ? (
                    <div>
                        <AdminHomeHeader/>
                        <ProductListPane
                            changeAddProductId={this.changeAddProductId}
                            viewProduct={this.viewProduct}
                            deleteProducts={this.deleteProducts}
                            showSubMenu={this.showSubMenu}
                            setDisplaySubMenu={this.setDisplaySubMenu}
                            searchInProductList={this.searchInProductList}
                            products={this.state.products}
                            productId={this.state.productId}
                            displaySubMenu={this.state.displaySubMenu}
                            subMenuId={this.state.subMenuId}
                            searchProductResult={this.state.searchProductResult}
                        />

                        <ProductDesignPane
                            saveToLocal={this.saveToLocal}
                            editToSave={this.editToSave}
                            deleteProducts={this.deleteProducts}
                            changeAddProduct={this.changeAddProduct}
                            addProduct={this.state.addProduct}
                            productPreview={this.state.productPreview}
                            productId={this.state.productId}
                        />
                    </div>
                ) : (
                    <div>
                <form className="login">
                    <Link to="/adminlogin"><button>Login as Admin</button></Link>
                </form>
            </div>
                )
            }
            </div>
        )
    }
}

export default AdminHome
