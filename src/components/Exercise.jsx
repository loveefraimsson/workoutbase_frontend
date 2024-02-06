import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import '../styles/exercise.scss';
import parse from 'html-react-parser';


export class Exercise extends Component {

  state = {
      exercise: this.props.location.state.exercise,
      title: this.props.location.state.exercise.title,
      category: this.props.location.state.category,
      exerciseArray: this.props.location.state.exerciseArray,
      favoriteMarked: false,
      sets: null,
      reps: null,
      comments: null,
      userName: localStorage.getItem("userName"),
      favoriteExercises: [],
      loadedData: false,
      isFilled: '',
      savedInProgram: false,
      from: this.props.location.state.from,
      url: this.props.url
  }
  

  //Gets all favorite exercises
  componentDidMount = () => {
    /* fetch("https://workoutbankback.herokuapp.com/favoriteexercises", { */
    fetch(this.state.url + "favoriteexercises", {
    method: "post",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({userName: this.state.userName})
    })
    .then(res => res.json())
    .then(data => {
        this.setState({ loadedData: true })

        let favoriteExercises = data[0].favoriteExercises;
        let title = this.state.exercise.title;

        //Checks if current exercise is marked as favorite, if it is in favorite exercises then sets state to true, otherwise not. Doing this to render the right button
        favoriteExercises.map((exercise, i) => {
          if(exercise.title === title) {
            this.setState({ favoriteMarked: true })
          }
        })
    });
  }


  //Toggles between favoritemark an exercise and remove as favorite
  favoriteMarkToggle = () => {
    let exerciseTitle = this.state.exercise.title;
    let exerciseCategory = this.state.category;

    //Sets the exercise to save in databse to object
    let favoriteExercise = {
      title: exerciseTitle,
      category: exerciseCategory,
      description1: this.state.exercise.description1,
      description2: this.state.exercise.description2,
      image: this.state.exercise.image,
      video: this.state.exercise.video,
      userName: localStorage.getItem("userName")
    }
    
    //Saves exercise as favorite in database
    if(this.state.favoriteMarked === false) {
      this.setState({ favoriteMarked: true })

      /* fetch("https://workoutbankback.herokuapp.com/savefavorite", { */
      fetch(this.state.url + "savefavorite", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(favoriteExercise)
      })
      .then(res => res.json())
      .then(data => {
      });
    }

    //Removes exercise from favorite in database
    else {
      this.setState({ favoriteMarked: false });

      /* fetch("https://workoutbankback.herokuapp.com/removeexercise", { */
      fetch(this.state.url + "removeexercise", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(favoriteExercise)
      })
      .then(res => res.json())
      .then(data => {

      });

    }
  }

  //Handles change in input fields to save in trainingprogram
  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  //Saves exercise in trainingprogram
  saveInProgram = (evt) => {
    evt.preventDefault();
 
    if(this.state.sets && this.state.reps) {
      let addThisExercise = {
        title: this.state.title,
        category: this.state.category,
        sets: this.state.sets,
        reps: this.state.reps,
        comments: this.state.comments,
        userName: this.state.userName,
      }
      this.setState({ isFilled: true });

      /* fetch("https://workoutbankback.herokuapp.com/addinprogram", { */
        fetch(this.state.url + "addinprogram", {
          method: "post",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(addThisExercise)
        })
        .then(res => res.json())
        .then(data => {
            this.setState({ savedInProgram: true, sets: null, reps: null, comments: null });
            document.getElementById("inputSets").value = "";
            document.getElementById("inputReps").value = "";
            document.getElementById("inputComments").value = "";
        });
      
    }
    else {
      this.setState({ isFilled: false })
    }   
  }

  //Prints error message if the input details is wrong
  printErrorMessage = () => {
   
      if(this.state.isFilled === false) {
          return <p className='errorMessage'>Båda fälten måste vara ifyllda!</p>;
      }
      else if(this.state.isFilled === true) {
          return <p className='successMessage'>Övningen har lagts till i ditt träningsprogram!</p>;
      }
      else {
        return <p></p>
      }
  }

  //Returns the right link for back-button depending on where the user came from
  backLink = () => {
    if(this.state.from === "exercisecard") {
      return "/workoutbank/" + this.state.exercise.category;
    }
    else if (this.state.from === "favorite") {
      return "/favoriteexercises";
    }
  }

  

  render() {
    if(!this.state.loadedData) return <></>

    return (
      <>
       
        <Header />
        <section className='exerciseContainer'>
          <Link className='backButton' to={{pathname: this.backLink(), state: {oneExercise: this.state.exercise, category: this.state.category, exerciseArray: this.state.exerciseArray}}} >Tillbaka</Link>
          
          <h2 className='title'>{this.state.exercise.title}</h2>
          
          <form className='trainingProgramForm' onSubmit={this.saveInProgram}>
            <p>Vill du spara denna övningen i ditt träningsprogram? Fyll i uppgifter nedan:</p>
            <input id="inputSets" name='sets' type="number" placeholder='Sets; ex. 1' onChange={this.handleChange} /> <br />
            <input id="inputReps" name='reps' type="number" placeholder='Reps; ex. 4' onChange={this.handleChange} /><br />
            <textarea id="inputComments" name="comments" placeholder='Kommentarer...' cols="20" rows="5" onChange={this.handleChange}></textarea> <br />
            <button type='submit'>Spara</button>
            {this.printErrorMessage()}  
          </form>

          {this.state.favoriteMarked ? (
            <button className='favoriteButton' onClick={this.favoriteMarkToggle}>Ta bort favoritmarkering</button>
          ): <button className='favoriteButton' onClick={this.favoriteMarkToggle}>Favoritmarkera</button>

          }

          <h3>Beskrivning</h3>
          <p className='exerciseDescription'>{this.state.exercise.description1}</p>
          <p className='exerciseDescription'>{this.state.exercise.description2}</p>
          
          <img className='exerciseImage' src={`/assets/images/exercises/` + this.state.exercise.image + '.webp'} alt="Muscles used in the exercise"></img>

          {parse(this.state.exercise.video)}
          
        </section>
        
      </>
    )
  }
}

export default Exercise;