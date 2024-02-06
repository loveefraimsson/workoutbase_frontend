import React, { Component } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import '../styles/favoriteExercises.scss';

export class FavoriteExercises extends Component {

  state = {
    loadedData: false,
    userName: localStorage.getItem("userName"),
    favoriteExercises: [],
    exerciseArray: this.props.exerciseArray,
    url: this.props.url
  }

  //Fetches all favorites from database and sets to state
  componentDidMount = () => {

    fetch(this.state.url + "favoriteexercises", {
      method: "post",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({userName: this.state.userName})
    })
    .then(res => res.json())
    .then(data => {
        this.setState({ loadedData: true, favoriteExercises: data[0].favoriteExercises })
    });
  }

  //Removes exercise from favorite
  removeFavorite = (exercise) => {
    let objectToRemove = {
      title: exercise.title,
      category: exercise.category,
      description1: exercise.description1,
      description2: exercise.description2,
      image: exercise.image,
      video: exercise.video,
      userName: this.state.userName
    }

    fetch(this.state.url + "removeexercise", {
      method: "post",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(objectToRemove)
      })
    .then(res => res.json())
    .then(data => {
        this.setState({ favoriteExercises: data })
    });
  }


  render() {

    if(!this.state.loadedData) return <></>

    return (
      <>
        <Header />

        <section className='favoriteExercisesContainer'>
          <Link className='backButton' to="/profilepage">Tillbaka</Link>

          <h1 className='title'>Här är dina favoritmarkerade övningar:</h1>
          <table className='favoriteExercises'>

              <thead>
                <tr>
                  <th>Övning</th>
                  <th>Kategori</th>
                  <th>Ta bort</th>
                </tr>               
              </thead>

            <tbody>
            {
              this.state.favoriteExercises.map((exercise, i) => {
                return (<tr key={i} >

                  <td key={exercise.title}><Link className='exerciseTitle' to={{pathname:`/workoutbank/` + exercise.category + "/" + exercise.title, state: {exercise: exercise, category: exercise.category, favoriteMarked: true, exerciseArray: this.state.exerciseArray, from: "favorite"}}} >{exercise.title}</Link></td>
                  
                  
                  <td key={exercise.category}>{exercise.category}</td>
                  <td><button onClick={() => this.removeFavorite(exercise)}>Ta bort</button></td>
                </tr>
                )
              })
            }
            </tbody>
          </table>

        </section>
      </>
    )
  }
}

export default FavoriteExercises;