import React, { Component } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import '../styles/cart.scss';

export class Cart extends Component {

    state = {
        products: [],
        loadedData: false,
        from:  this.props.location.state.from,
        fromCurrentProduct: this.props.location.state.currentProduct,
        sumInCart: 0,
    }

    //Gets all products in cart from localStorage
    componentDidMount = () => {
        let products = JSON.parse(localStorage.getItem("cart"));

        let sum = 0;
        for(let i = 0; i < products.length; i++) {
            sum = sum + products[i].price;
        }
        this.setState({ loadedData: true, products: products, sumInCart: sum })
    }

    //Returns the right back-link depending on where the user came from
    backLink = () => {
        if(this.state.from === "product") {
          return "/webshop/" + this.state.fromCurrentProduct.name;
        }
        else if (this.state.from === "webshop") {
          return "/webshop";
        }
    }

    //Removes product from cart
    removeFromCart = (product) => {
        let productsInLocalStorage = JSON.parse(localStorage.getItem("cart"));

        let findProduct = productsInLocalStorage.find((productsInLocalStorage) => productsInLocalStorage.id === product.id);

        let newCartArray = productsInLocalStorage.filter(product => product.id !== findProduct.id)

        localStorage.setItem("cart",  JSON.stringify(newCartArray))

        let currentSum = this.state.sumInCart;
        let newSum = currentSum - product.price;

        this.setState({ products: newCartArray, sumInCart: newSum })
    }

    render() {

        if(!this.state.loadedData) return <></>

        return (
            <>
                <Header />
                <section className='cartContainer'>
                    
                    <h2>Kundvagn</h2>

                    <Link className='backButton' to={{pathname: this.backLink(), state: {product: this.state.fromCurrentProduct}}} >Tillbaka</Link>

                    <table className='table'>
                        <tbody>
                        {
                            this.state.products.map((product, i) => {
                            return (<tr key={i} >

                                <td className='nameAndImg' key={product.name}>{product.name} <img className='productImage' src={`./assets/images/webshop/` + product.image + '.webp'} alt="The product in cart"></img> </td>
                                
                                
                                <td key={product.price}>{product.price}kr</td>
                                <td><button className='deleteBtn' onClick={() => this.removeFromCart(product)}>Ta bort</button></td>
                            </tr>
                            )
                            })
                        }
                        </tbody>
                    </table>

                    <p className='sum'>Summa: {this.state.sumInCart} kr</p>
                </section>
            </>
            
        )
    }
}

export default Cart;