import React, { Component } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import '../styles/profilePage.scss';


export class Profilepage extends Component {
  render() {
    return (
      <>
        <Header />
        <section className='profilePage'>
            
            <h2 className='welcomeTitleProfile'>Hej {localStorage.getItem("userName")}!</h2>
            <p>Här är din profilsida där du kan komma åt ditt träningsprogram och dina favoritövningar.</p>
            <Link className='trainingProgramLink' to="trainingprogram">Ditt träningsprogram</Link>
            <Link className='favoriteExerciseLink' to="favoriteexercises">Dina favoritövningar</Link>
            
        </section>
      </>
    )
  }
}

export default Profilepage;