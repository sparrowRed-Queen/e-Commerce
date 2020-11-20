import React, { Component } from 'react'
import PreviewProducts from './PreviewProducts';

class ProductDesignPane extends Component {

    constructor(props){
        super(props);

        this.state={
            productId:"",
            productName:"",
            image:"",
            price:"",
            description:"",
            discount:"",
            categories:""
        }
    }

    setProductId=evt=>{
        this.setState({productId:evt.target.value})
    }

    setProductName=evt=>{
        this.setState({productName:evt.target.value})
    }

    setPrice=evt=>{
        this.setState({price:evt.target.value})
    }

    setDescription=evt=>{
        this.setState({description:evt.target.value})
    }

    setDiscount=evt=>{
        this.setState({discount:evt.target.value})
    }

    setCategories=evt=>{
        console.log(evt.target.value)
        this.setState({categories:evt.target.value})
    }

    setImage=event=>{

        this.getBase64(event.target.files[0]).then(base64Image=>{
            this.setState({image:base64Image})
        });
    }

    getBase64 = file => {
        return new Promise((resolve,reject) => {
           const reader = new FileReader();
           reader.onload = () => resolve(reader.result);
           reader.onerror = error => reject(error);
           reader.readAsDataURL(file);
        });
      }

    setNull=()=>{
        this.setState({
            productId:"",
            productName:"",
            image:"",
            price:"",
            description:"",
            discount:"",
            categories:""
        })
    }


    editProducts=product=>{
        this.setState({
            productId: product["productId"],
            productName: product["productName"],
            image: product["image"],
            price: product["price"],
            description: product["description"],
            discount: product["discount"],
            categories:product["categories"]
        })
        this.props.changeAddProduct()
    }


    render() {
        return (
            <div className="productDesign">
                <h2 className="questionDesignHead">Design Product</h2>
                {
                    this.props.productPreview && !this.props.addProduct
                    ?(
                        <PreviewProducts
                            productPreview={this.props.productPreview}
                            deleteProducts={()=>this.props.deleteProducts(this.props.productId)}
                            editProducts={()=>this.editProducts(this.props.productPreview)}
                        />
                    )
                    :(
                        this.props.addProduct
                        ?(
                            <div className="addProduct">
                                <label className="titleLabel" htmlFor="productId">Product Id</label>
                                {this.props.productId!==-1
                                    ?<input type="text" name="productId" id="productId" value={this.state.productId} onChange={this.setProductId} readonly="readonly"/>

                                    :<input type="text" name="productId" id="productId" value={this.state.productId} onChange={this.setProductId} />
                                }
                                <br/>

                                <label className="titleLabel" htmlFor="productName">Product Name</label>
                                <input type="text" name="productName" id="productName" value={this.state.productName} onChange={this.setProductName}/>
                                <br/>

                                <label className="titleLabel" htmlFor="addImage">Add Image</label>
                                <input type="file" id="addImage" name="addImage" accept=".png,.jpg,jpeg" onChange={this.setImage}/>
                                <br/>

                                <label className="titleLabel" htmlFor="price">Price in rupees</label>
                                <input type="text" name="price" id="price" value={this.state.price} onChange={this.setPrice}/>
                                <br/>

                                <label className="titleLabel" htmlFor="discount">Discount</label>
                                <input type="text" name="discount" id="discount" value={this.state.discount} onChange={this.setDiscount}/>
                                <br/>
                                <label className="titleLabel" htmlFor="addImage">Categories</label>
                                <select onChange={this.setCategories}>
                                    <option value="none" selected disabled hidden> Select an Option </option>
                                    <option value="electronics">Electronics</option>
                                    <option value="furniture">Furniture</option>
                                    <option value="home appliances">Home Appliances</option>
                                    <option value="clothing">Clothings</option>

                                </select>
                                {/* <br/> */}
                                <label className="titleLabel" htmlFor="description">Description</label>
                                <input type="text" name="description" id="description" value={this.state.description} onChange={this.setDescription}/>
                                <br/>

                                <button className="saveButton"
                                onClick={()=>{
                                    this.props.productId!==-1
                                    ?(this.props.editToSave(this.props.productId,this.state))
                                    :(this.props.saveToLocal(this.state))
                                    this.setNull()
                                    }
                                }>save</button>
                            </div>
                        )
                        :(
                            <p className="productDesignIntro">Select a product to view or edit</p>
                        )
                    )
                }

            </div>
        )
    }
}

export default ProductDesignPane;
