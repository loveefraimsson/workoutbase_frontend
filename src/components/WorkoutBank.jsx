import React, { Component } from 'react';
import Header from './Header';
import Categories from './Categories';
import '../styles/workoutbank.scss';

export class WorkoutBank extends Component {

    state = {
        loadedData: false,
        exerciseArray: this.props.exerciseArray,
    }

    render() {
       
        let allCategories = [];
        let exerciseArray = this.state.exerciseArray;
        let findCategory;

        //Loops through the exercises to push each category in an array, checks so the category not being pushed twice
        for(let i = 0; i < this.state.exerciseArray.length; i++) {         
            findCategory = allCategories.find((allCategories) => allCategories === exerciseArray[i].category);

            if(!findCategory) {
                allCategories.push(this.state.exerciseArray[i].category);
            }
            
        }


        return (
            <>
                <Header />
                <section className='workoutbankContainer'>
                    
                    <h1>Övningsbank</h1>

                    <section className='categories'>

                        {/* Prints all categories */}
                        {
                            allCategories.map((category) => {
                                return(                          
                                    <Categories key={category} category={category} exerciseArray={this.state.exerciseArray} />
                                )
                            })
                        }
                    </section>

                </section>
            </>
        )
    }
}

export default WorkoutBank;