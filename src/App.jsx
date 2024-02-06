import React, { Component } from 'react';
import Profilepage from './components/Profilepage';
import Startpage from './components/Startpage';
import Login from './components/Login';
import WorkoutBank from './components/WorkoutBank';
import TrainingProgram from './components/TrainingProgram';
import Footer from './components/Footer';
import Webshop from './components/Webshop';
import ExerciseCard from './components/ExerciseCard';
import Exercise from './components/Exercise';
import FavoriteExercises from './components/FavoriteExercises';
import Product from './components/Product';
import Cart from './components/Cart';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './styles/App.scss';

import image from "./assets/barbell-curl.webp"

import images from "./assets/images/webshop/BCAA-hardcore.webp"



class App extends Component {

  state = {
    loadedData: false,
    exerciseArray: [],
    url: "https://workoutbase-backend.onrender.com"
  }

  componentDidMount = () => {
    fetch("https://workoutbase-backend.onrender.com/exercises")
    .then((res) => res.json())
    .then((data) => {        
        //console.log(data);
        this.setState({ loadedData: true, exerciseArray: data})
    })  
  }

  render() {
    if(!this.state.loadedData) return <></>

    //let url = "http://localhost:3001/";
    let url = "https://workoutbase-backend.onrender.com/";

    return (
      <>
        <section className="App">
          

            <Router>
              <Switch>
                <Route exact path="/" component={Startpage} />

                <Route exact path="/login" component={Login} />
                
                <Route exact path="/workoutbank">
                  <WorkoutBank exerciseArray={this.state.exerciseArray} />
                </Route>

                <Route exact path="/profilepage">
                  <Profilepage exerciseArray={this.state.exerciseArray} />
                </Route>

                <Route exact path="/trainingprogram">
                  <TrainingProgram url={url} />
                </Route>

                <Route exact path="/webshop">
                  <Webshop url={url} />
                </Route>

                <Route exact path="/webshop/:params" component={Product} />

                <Route exact path="/cart" component={Cart} />

                <Route exact path="/workoutbank/:params" render={(props) => <ExerciseCard {...props} url={url} />} />
                <Route exact path="/workoutbank/:params/:params" render={(props) => <Exercise {...props} url={url} />} />
                
                <Route exact path="/favoriteexercises">
                  <FavoriteExercises url={url} exerciseArray={this.state.exerciseArray} />
                </Route>

              </Switch>

            </Router>

          <Footer />
        </section>     
      </>
    )
  }
}


export default App;
