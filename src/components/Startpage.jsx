import React, { Component } from 'react';
import Login from './Login';
import Header from './Header';
import { Link } from 'react-router-dom';
import '../styles/startpage.scss';

export class Startpage extends Component {

  render() {
    
    let isLoggedIn = localStorage.getItem('loggedIn');

    //If user is logged in:
    if(isLoggedIn === 'true') {
      return (
        <>
        <Header />
          <section className='startPageContainer'>          
            <section className='startPageContent'>
              <h2 className='welcomeTitle'>Hej {localStorage.getItem("userName")}!</h2>
                <p>Snabbåtkomst:</p>
                <Link className='quickAccessLink' to="trainingprogram">Ditt träningsprogram</Link>
                <Link className='quickAccessLink' to="favoriteexercises">Dina favoritövningar</Link>
            </section>                       
          </section>
        </>
      )
    }
    else {  
      return (
        //If user is logged out:
        <section className='startPageContainer'>
          <Header />
          <section className='startPageContent'>
            <h1 className='welcomeTitle'>Välkommen, vänligen logga in!</h1>
          <Login />
          </section>         
        </section>
      )
    }
  }
}

export default Startpage;