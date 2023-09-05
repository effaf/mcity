import React from "react";

const MatchesList = (props) =>{


    const displayMatches = ()=>{
        return (
            props.matches.map((match)=>(
                <div className="match_box_big">
                    <div className="block_wraper" key={match.id}>
                            <div className="block">
                                <div className="icon"
                                    style={{ background:`url(/images/team_icons/${match.localThmb}.png)`}}
                                ></div>
                                <div className="team">{match.local}</div>
                                <div className="result">{match.resultLocal}</div>
                            </div>
                            <div className="block">
                                <div className="icon"
                                    style={{ background:`url(/images/team_icons/${match.awayThmb}.png)`}}
                                ></div>
                                <div className="team">{match.away}</div>
                                <div className="result">{match.resultAway}</div>
                            </div>
                    </div>
                    <div className="block_wraper nfo">
                            <div><strong>Date:</strong>{match.date}</div>
                            <div><strong>Stadium:</strong>{match.stadium}</div>
                            <div><strong>Referee:</strong>{match.referee}</div>
                    </div>
                </div>
            ))
        )
    }

       return props.matches ? displayMatches():null;
}

export default MatchesList;