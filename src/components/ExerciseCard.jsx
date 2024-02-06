import React, { Component } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

import '../styles/exerciseCard.scss';



class ExerciseCard extends Component {

  state = {
    category: this.props.location.state.category,
    exerciseArray: this.props.location.state.exerciseArray,
    oneExercise: this.props.location.state.oneExercise,
  }


  render() {

    //Pushes exercises to array if it's the clicked category
    let exerciseArray = this.state.exerciseArray;
    let specificExercises = [];

    exerciseArray.map((exercise) => {
      if (exercise.category === this.state.category) {
        specificExercises.push(exercise);
      }
    })

    return (
      <>
        <Header />
        <section className='exerciseCardContainer'>
          <Link className='backButton' to={"/workoutbank"} >Tillbaka till övningsbanken</Link>
          <section className='exerciseContainerContent'>
            {specificExercises.map((exercise) => {
              return (
                  <Link className='card' key={exercise.title} to={{pathname:`/workoutbank/` + this.state.category + "/" + exercise.title, state: {exercise: exercise, category: this.state.category, exerciseArray: this.state.exerciseArray, from: "exercisecard"}}} >{exercise.title}</Link>
              )
            })

            }
          </section>
        </section>
        
      </>
    )
  }
  
  
  
}

export default ExerciseCard;
