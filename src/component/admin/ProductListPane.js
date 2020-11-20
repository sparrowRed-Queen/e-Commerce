import React, { Component } from 'react';
import {FaSearch } from 'react-icons/all';

class ProductListPane extends Component {
    constructor(props){
        super(props);
        this.state={
            addProduct:true,
            selctedcount:0,
            checkBoxList:[],
        }

    }


    componentWillReceiveProps=(nextProps)=>{
        if(nextProps.products){
            if(nextProps.products!==this.props.products){
                var checkBoxList=[];
                Array.from({length:nextProps.products.length},(x,i)=>{
                    checkBoxList.push({checked:false});
                })
            this.setState({
                checkBoxList:checkBoxList
            })
            }
        }
    }


    unSelect=()=>{
        var checkBoxList=this.state.checkBoxList
        checkBoxList.forEach(check=>{
            check["checked"]=false
        })
        this.setState({
            addProduct:true,
            checkBoxList:checkBoxList,
            selctedcount:0
        })
    }


    changeAddOperation=()=>{
        console.log("add")
        this.setState({
            addProduct :!this.state.addProduct,
            selctedcount:0
        })
    }

    deleteMultiple=()=>{

        var idList=[]
        this.state.checkBoxList.filter((res,id)=>{
            if(res.checked){
                console.log(id,res)
                idList.push(id);
            } 
        })

        this.props.deleteProducts(idList);
    }


    hangeCheckBox=id=>{
        var checkboxLi=this.state.checkBoxList;
        checkboxLi[id].checked= !checkboxLi[id].checked
        this.setState({
            checkBoxList:checkboxLi,
            selctedcount:this.state.checkBoxList.filter(res=>res.checked).length
        })

    }

    render() {

        var productDetails=this.props.searchProductResult;
        var productList=[];

        if(productDetails){
            productDetails.forEach((product,id)=>{

                productList.push(
                    <div className={this.props.productId===product["productId"]?"productElement selectedProduct":"productElement"}
                        key={product["productId"]}
                        onClick={(this.state.addProduct)?this.props.viewProduct.bind(this,product,product["productId"]):(null)}
                    >
                    {
                        !this.state.addProduct
                            ?(
                                <div>
                                    <input type="checkbox" name="chkBox" id={product["productId"]} checked={this.state.checkBoxList[id].checked} onChange={this.hangeCheckBox.bind(this,id)}/>
                                    <label htmlFor={product["productId"]}>{product["productName"]}</label>
                                </div>
                            )
                            :(
                                product["productName"]
                            )
                    }
                    </div>
                )
            })
        }


        return (
            <div className="productList">

                <h2 className="productListHead">Product List</h2>

                <div className="search">
                    <FaSearch className="searchIcon"/>
                    <input type="text" className="searchInput" placeholder="search" name="productSearch" onChange={this.props.searchInProductList}/>
                </div>
                {
                    !this.state.addProduct
                    ?(
                        <p className="selectCount">{this.state.selctedcount} Product selected</p>
                    )
                    :(
                        null
                    )
                }
                {
                    this.props.products
                    ?(
                        <div className="productBlock">
                            {
                                productList
                            }
                        </div>
                    )
                    :(
                        <p className="productListIntro">Add Items</p>
                    )
                }

                {
                    this.state.addProduct
                    ?(
                        <div className="intialOperation">
                            <button onClick={this.props.changeAddProductId.bind(this)}>Add Product</button>
                            <button onClick={this.changeAddOperation.bind(this)}>Select Product</button>
                        </div>
                    )
                    :(
                        <div className="changeOperation">
                            <button onClick={()=>{this.deleteMultiple(); this.changeAddOperation();}}>Delete Product</button>
                            <button onClick={this.unSelect}>Cancel</button>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default ProductListPane;
