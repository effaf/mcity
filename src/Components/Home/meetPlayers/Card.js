import React from "react";
import { Animate } from "react-move";
import { easePolyOut } from "d3-ease";

import Otamendi from '../../../Resources/images/players/Otamendi.png';
import Sterling from '../../../Resources/images/players/Raheem_Sterling.png';
import Kompany from '../../../Resources/images/players/Vincent_Kompany.png';
import Stones from '../../../Resources/images/players/player_to_upload/DEF/john_stones.png';
import CardLayout from '../../Utils/cardLayout';


let cards  =[
    {
        bottom:90,
        left:300,
        firstName:'Vincent',
        lastName:'Kompany',
        playerImg:Kompany,
        jerseyNumber: 30
    },
    {
        bottom:60,
        left:200,
        firstName:'Raheem',
        lastName:'Sterling',
        playerImg:Sterling,
        jerseyNumber: 12
    },
    {
        bottom:30,
        left:100,
        firstName:'Nicholas',
        lastName:'Otamendi',
        playerImg:Otamendi,
        jerseyNumber: 19
    },
    {
        bottom:0,
        left:0,
        firstName:'John',
        lastName:'Stones',
        playerImg:Stones,
        jerseyNumber: 20
    }
]

const HomeCards = (props)=>{

    const showAnimateCards = ()=>{
        return(
            cards.map((card,i)=>(
                <Animate key={i} show={props.show} start={{
                    bottom:0,
                    left:0
                }} enter={{
                    bottom:[card.bottom],
                    left:[card.left],
                    timing:{
                        delay:500,
                        duration:500,
                        ease:easePolyOut
                    }
                }}>

                {({bottom,left})=>(
                    <div style={{
                        bottom,left,
                        position:'absolute'
                    }}>
                        <CardLayout card = {card}/>
                    </div>
                )}
                </Animate>
            ))
        )
    }

    return(<div>
        {showAnimateCards()}
    </div>)
}

export default HomeCards;