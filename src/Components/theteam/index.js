import React,{useEffect, useState} from "react";

import CardLayout from "../Utils/cardLayout";
import { Slide } from "react-awesome-reveal";
import {firebase, playersCollection} from '../../firebase';
import { toastError } from "../Utils/tools";
import { Card, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";


const TheTeam = () => {

    const [loading,setLoading] = useState(true);
    const [players,setPlayers] = useState(null);

    async function getPlayerURL(players){
        const updatedPlayers = [];
        for (const player of players){
            try{
                const url = await firebase.storage().ref('players').child(player.image).getDownloadURL()
                updatedPlayers.push({...player,url});

            }
            catch(error){
                updatedPlayers.push(player);
            }

        }
        return updatedPlayers;
    }

    async function getAndUpdatePlayerURL (players){
        try{
            const updatedPlayers = await getPlayerURL(players);
            return updatedPlayers;
        }catch(error){
            toastError("Some error while fetching the URLs");
        }
        
    }

    useEffect(()=>{
        if(!players){
            playersCollection
            .get()
            .then(snapshot => {
                const players = snapshot.docs.map((doc)=>{
                    return {id:doc.id,...doc.data()}
                })
                const updatedPlayers  = getAndUpdatePlayerURL(players)
                updatedPlayers.then(resultArray =>{
                    setPlayers(resultArray)
                }).catch(error=>{
                    toastError(error);
                })
            })
            .catch(error=>{
                toastError("Sorry try again later");
            })
            .finally(()=>{
                setLoading(false);
            })
        }

    },[])

    const showPlayerByCategory = (category) => (
        players ?
            players.map((player,i)=>{
                return player.position === category ?
                    <Slide left key={player.id} triggerOnce>
                        <div className="item">
                            <CardLayout
                                 jerseyNumber={player.number}
                                 firstName={player.name}
                                 lastname={player.lastname}
                                 playerImg={player.url ? player.url : 'none'}
                            />
                        </div>
                    </Slide>
                :null
            })
        :null
    )

    return(
        <div className="the_team_container">
            {loading ?
                <div className="progress">
                    <CircularProgress/>
                </div>

            :
            <div>
                <div className="team_category_wrapper">
                    <div className="title">Keepers</div>
                    <div className="team_cards">
                        {/* {showPlayerByCategory('Keeper')} */}
                    </div>
                </div>

            </div>
            }

        </div>
    )
}

export default TheTeam;