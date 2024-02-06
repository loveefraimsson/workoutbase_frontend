import React, { Component } from 'react';
import Header from './Header';
import heroImgWorkoutbank from "./images/heroImgWorkoutbankNew.jpg";
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import cart from './images/cart.png';
import '../styles/webshop.scss';

export class Webshop extends Component {

  state = {
    loadedData: false,
    products: [],
    url: this.props.url,
    numberInCart: '',
    changeInCart: "",
    sum: 0,
  }

  //Fetches all products from database
  componentDidMount = () => {
    fetch(this.state.url + 'webshop')
    .then((res) => res.json())
    .then((data) => {        
        this.setState({ loadedData: true, products: data}); 
    }) 

    let products = JSON.parse(localStorage.getItem("cart"));

    let sum = 0;
    for(let i = 0; i < products.length; i++) {
      sum = sum + products[i].price;
    }

    this.setState({ numberInCart: products.length, sum: sum });
  }


  //Updates number of products in cart
  updateCartNumber = (productsInCart) => {
    let sum = 0;
    for(let i = 0; i < productsInCart.length; i++) {
      sum = sum + productsInCart[i].price;
    }

    this.animateCartNumber();

    setTimeout(() => {
      this.setState({ numberInCart: productsInCart.length, changeInCart: "animateCartNumber", sum: sum })
    }, 500)
   
  }

  //Animates the numebr when a product is added in cart
  animateCartNumber = () => {
    setTimeout(() => {
        this.setState({changeInCart: "" })
    }, 300)
  }


  render() {
    if(!this.state.loadedData) return <></>

    return (
      <>
        <Header />
        <img className='heroWebshop' src={heroImgWorkoutbank} alt="Hero-image of a man who works out" />
        <section className='webshopContainer'>
 
          <h2>Webshop</h2>

          <div className='cartSection'>
              <Link className='cartLink' to={{pathname: "/cart" , state: {from: "webshop"}}}>
                <div className='iconAndNumber'>
                  <img className='cartIcon' src={cart} alt="Cart-icon" width="30px" />
                  <span id="numberInCart" className={this.state.changeInCart}>{this.state.numberInCart}</span>
                </div>
                  
                  <p className='sum'>Summa: {this.state.sum}kr</p>

              </Link>                       
          </div>

          <section className='productContainer'>
            <h3>Proteinpulver</h3>

            <section className='products'>
              {
                this.state.products.map((product) => {
                  
                  if(product.category === "Proteinpulver") {
                    return <ProductCard key={product.name} product={product} updateCartNumber={this.updateCartNumber} />
                  }        
                }) 
              }
            </section>           
          </section>

          <hr className='hr' />

          <section className='productContainer'>
            <h3>Aminosyror</h3>

            <section className='products'>
              {
                this.state.products.map((product) => {
                  
                  if(product.category === "Aminosyror") {
                    return <ProductCard key={product.name} product={product} updateCartNumber={this.updateCartNumber} />
                  }        
                }) 
              }
            </section>           
          </section>

          <hr className='hr' />

          <section className='productContainer'>
            <h3>PWO</h3>

            <section className='products'>
              {
                this.state.products.map((product) => {
                  
                  if(product.category === "PWO") {
                    return <ProductCard key={product.name} product={product} updateCartNumber={this.updateCartNumber} />
                  }        
                }) 
              }
            </section>           
          </section>

          <hr className='hr' />

          <section className='productContainer'>
            <h3>Kläder</h3>
            <section className='products'>
              {
                this.state.products.map((product) => {
                  
                  if(product.category === "Kläder") {
                    return <ProductCard key={product.name} product={product} updateCartNumber={this.updateCartNumber} />
                  }        
                }) 
              }
            </section>
              
          </section>
                    
        </section>
      </>
    )
  }
}

export default Webshop;