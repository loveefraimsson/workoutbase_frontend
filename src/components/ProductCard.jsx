import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from './helperFunctions/addToCart';
import cart from './images/cart.png';
import '../styles/productCard.scss';

export class ProductCard extends Component {

    state = {
        product: this.props.product,
        numberInCart: ''
    }

    //Adds to cart
    addInCart = (product) => {
        addToCart(product);
        let productsInCart = JSON.parse(localStorage.getItem("cart"));
        this.props.updateCartNumber(productsInCart);        
    }

    scroll = () => {
        window.scrollTo({ top:0, behavior:'smooth' });
    }

    render() {

        const {name, image, price} = this.state.product;

        return (
            <section className='productCard'>
            {/* <Link onClick={this.scroll} className='productCardLink' key={name} to={{pathname:`/webshop/` + name , state: {product: this.state.product}}}><img className='productCardImage' src={`/assets/images/webshop/` + image + '.webp'} alt="A product in the webshop"></img> <br />{name}</Link> */}
            
                <img className='productCardImage' src={`/assets/images/webshop/` + image + '.webp'} alt="A product in the webshop"></img> <br />
                <p>{name}</p>

                <section className='buySection'>
                    <p>{price}kr</p>
                    <button className='buyBtn' onClick={() => this.addInCart(this.state.product)}>
                        <p>Köp</p>
                        <img className='cartIcon' src={cart} alt="Shoppingcart-icon" />
                    </button>
                </section>
            
            </section>
        )
    }
}

export default ProductCard;