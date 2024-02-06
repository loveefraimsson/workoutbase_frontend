import React, { Component } from 'react';
import '../styles/footer.scss';

export class Footer extends Component {

    state = {
        quote: [],
        loadedData: false
    }

    componentDidMount = () => {
        fetch('https://type.fit/api/quotes')
        .then((res) => res.json())
        .then((data) => {
            let randomNumber = Math.floor(Math.random() * (data.length - 1) + 1);

            let quote = {
                quote: data[randomNumber].text
            } 
            this.setState({ quote: quote, loadedData: true })
        })  
      }

    render() {
        if(!this.state.loadedData) return <></>
        return (
            <footer className='footer'>
                <section className='quoteSection'>
                    <p className='quote'>{this.state.quote.quote} </p>                   
                </section>               
            </footer>
        )
    }
}

export default Footer;