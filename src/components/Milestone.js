import React, { Component } from 'react';
import './Milestone.css';
import CardList from './CardList';
import { pokemon } from './pokemon';

class Milestone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: [],
        }
    }

    componentDidMount() {
        this.setState({ pokemon: pokemon })
        console.log('count inside milstone', this.props.count);
    }

    render() {
        const { onRouteChange, } = this.props;
        return (
            <div>
            <h2 className="tc mt5 white shadow-4 pt3 pb3">Mystery Rewards</h2>
         
                 <nav>                
                <button
                    onClick={() => onRouteChange('home')}
                    className="btn btn-secondary home-button black grow shadow-4 ma0 ml5"
                    type="button">
                    Home &#x1f3e0;
                 </button>
                 </nav>
                 
                 <p className="text1 tc white">Click on the cards find out how many items it takes to unlock rewards!</p>  
                 <p className="text2 tc white">Item(s) consumed before expiry: {this.props.count ? this.props.count : `0`} </p>
                <div>
                    <CardList count={this.props.count} pokemon={pokemon} />
                </div>

            </div>
        );
    }
}

export default Milestone;