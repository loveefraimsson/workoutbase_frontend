import React, { Component } from 'react';
import '../styles/header.scss';
import logo from "./images/logo.png";
import hamburgerIcon from "./images/hamburgerIcon.png";
import crossIcon from "./images/crossIcon.png";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";


export class Header extends Component {

  state = {
    showMenu: false,
    animationCloseMenu: '',
    animationShowMenu: '',
    numberInCart: ''
  }

  
  //Shows and hides menu
  handleMenu = () => {
    if(this.state.showMenu === false) {
      this.setState({ showMenu: true, animationShowMenu: "animationShowMenu", animationCloseMenu: "" })
    }
    else {    
        this.setState({ animationCloseMenu: "animationCloseMenu", animationShowMenu: ""})
      
        setTimeout(() => {
          this.setState({showMenu: false })
        }, 300)
    }
  }

  logout = () => {
    this.setState({showMenu: false });
  }

  closeMenu = () => {
    this.setState({showMenu: false });
  }

  render() {

    let buttons;
    //HEADER IF LOGGED IN
    if(localStorage.getItem("loggedIn") === "true") {
      buttons = (
        <section className='nav'>
          
          <section className='toggleContainer'>

            {this.state.showMenu ? (
              <button className='menuBtn' tabIndex="0" onClick={this.handleMenu}><img className='menuToggleIcon' src={crossIcon} onClick={this.handleMenu} alt="Hamburger-menu" /></button> 
            ) : <button className='menuBtn' tabIndex="0" onClick={this.handleMenu}><img className='menuToggleIcon' src={hamburgerIcon} onClick={this.handleMenu} alt="Close hamburger menu" /></button>

            }

            {this.state.showMenu ? (
              <ul className={`navbar-nav ` + this.state.animationCloseMenu + this.state.animationShowMenu}>
                <li className='navItem'>
                  <Link className="navLink" to="/profilepage" onClick={this.closeMenu}>Profilsida</Link>           
                </li>

                <li className='navItem'>
                  <Link className="navLink" to="/workoutbank" onClick={this.closeMenu} >Övningar</Link>
                </li>

                <li className='navItem'>
                  <Link className="navLink" to="/webshop" onClick={this.closeMenu}>Webshop</Link>
                </li>

                <li className='navItem'>
                  <Link className="navLink" to="/" onClick={() => localStorage.clear() + this.logout()}>Logga ut</Link>
                </li>
              </ul>
              ) : null

            }
                       
          </section>
        </section>
        
      )
    }

    //HEADER IF LOGGED OUT
    else {
      buttons = null;
    }
    
    return (
      <header className='header'>
          <Link to={"/"}><img className='logo' src={logo} alt="WorkoutBase-logo" /></Link>
         
          <nav className='navbarContainer'>
              {buttons}
          </nav>
       
      </header>
    )
  }
}

export default Header;