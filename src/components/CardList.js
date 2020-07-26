import React from 'react';
import Card from './Card';

const CardList = ({ count, pokemon }) => {
    return (    
        <div className="flex flex-wrap pt3 justify-center" style={{flex: '1 1 auto'}}>
            {console.log('count inside Cardlist', count)}
            {
                pokemon.map((pokemon, i) => {
                    return (
                        <Card   
                            count={count}   
                            key={i}                 
                            id={pokemon.id}
                            name={pokemon.name}
                            height={pokemon.height}
                            weight={pokemon.weight}
                            type={pokemon.type}
                            countReq={pokemon.countReq}
                        />
                    );
                })
            }
        </div>
    );
}

export default CardList;