import React, { Component } from 'react';
import './Card.css';
import { bake_cookie, read_cookie } from 'sfcookies';

let unlockedList = read_cookie('unlockedList');

// destructuring
class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    removeClass = (id, name, count, countReq) => {
        let parent = document.getElementById(id);
        //preventing the null from calling functions
        console.log(count);
        if (parent) {
            if (count >= countReq && !unlockedList.includes(id)) { //count req met and not unlocked
                alert(`Congrats! You've unlocked a ${name}!`);
                //remove div cover
                parent.classList.remove('parent');
                parent.children[0].classList.add('z-1');
                //add unlocked card id into list
                unlockedList.push(id);
                bake_cookie('unlockedList', unlockedList);
                console.log(unlockedList);
            } else {
                if (unlockedList.includes(id)) { //unlocked cards
                    //do nothing
                } else { // locked cards
                    alert(`Reward locked. Consume ${countReq - count} more items to unlock your reward! :)`);
                }
            }
        }
    }

    renderParentClass = (id) => {
        //check against the unlockedList and only render div covers for the locked ones
        if (unlockedList.includes(id)) {
            return 'br3 pa10 ma3 bw2';
        } else {
            return 'br3 pa10 ma3 bw2 parent';
        }
    }

    renderChildClass = (id) => {
        if (unlockedList.includes(id)) {
            return 'tc bg-washed-blue br3 pa10 ma2 bw3 ba grow child z-1 shadow';
        } else {
            return 'tc bg-washed-blue br3 pa10 ma2 bw3 ba grow child';
        }
    }


    render() {
        const { count, countReq, id, name, height, weight, type } = this.props;
        return (
            <div className="cardWrapper">
                <div id={id} onClick={() => this.removeClass(id, name, count, countReq)} className={this.renderParentClass(id)}>
                    <div id={id} className={this.renderChildClass(id)}>
                        <h4 className="tl ma1 b bb">&nbsp; {name}</h4>
                        <img className="pa1" alt="pokemon" src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`} width="200" height="200" />
                        <div className="pa3">
                            <div className="bw2 ba pa1 bg-washed-green">
                                <p className="ma0 pa1 bt">No. <strong>{id}</strong></p>
                                <p className="b pa1">
                                Height: {height} <br />
                                Weight: {weight} <br />
                                Type: {type}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;