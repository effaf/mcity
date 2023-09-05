import React from "react";

const CardLayout = ({card})=>{
    return(
        <div className="player_card_wrapper">
            <div className="player_card_thmb"
                  style={{
                    background:`#f2f9ff url(${card.playerImg})`
                  }}>

            </div>
            <div className="player_card_info">
                <div className="player_card_number">
                    {card.jerseyNumber}
                </div>
                <div className="player_card_name">
                    <span>{card.firstName}</span>
                    <span>{card.lastName}</span>
                </div>

            </div>

        </div>
    )
}

export default CardLayout;