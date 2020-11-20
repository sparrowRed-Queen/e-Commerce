import React, { Component } from 'react'

class PreviewProducts extends Component {
    render() {
        var {productId,productName,image,price,description,discount,categories}=this.props.productPreview
        var viewProducts;

        viewProducts=(
            <div className="viewProduct">
                <div className="labelBlock">
                    <p>Id</p>
                    <p>Name</p>
                    <p className="image">Image</p>
                    <p>Price</p>
                    <p>Description</p>
                    <p>Discount</p>
                    <p>Categories</p>
                </div>

                <div className="ansBlock">
                    <p>{productId}</p>
                    <p>{productName}</p>
                    <img className="image" src={image} alt="image"/>
                    <p>{price}</p>
                    <p>{description}</p>
                    <p>{discount}</p>
                    <p>{categories}</p>
                </div>

            </div>
        )
        return (
            <div className="previewProductBlock">
                {
                    viewProducts  
                }
                <div className="previewProductButton">
                    <button onClick={this.props.editProducts.bind(this)}>Edit</button>
                    <button onClick={this.props.deleteProducts.bind(this)}>Delete</button>
                </div>
            </div>
        )
    }
}

export default PreviewProducts;
