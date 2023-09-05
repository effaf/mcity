import React,{useState,useEffect,useReducer} from "react";
import { toastError, toastSuccess } from "../Utils/tools";
import { CircularProgress } from "@mui/material";
import { matchesCollection } from "../../firebase";
import MatchesList from "./matchesList";
import LeagueTable from "./matchesTable";


const TheMatches = ()=>{
    const [matches,setMatches] = useState(null);
    const [state, dispatch] = useReducer((prevState,newState)=>{
        return {...prevState,...newState}
    },{
        filterMatches:null,
        playedFilter:'All',
        resultFilter:'All'

    })

    useEffect(()=>{
        if(!matches){
            matchesCollection
                    .get()
                    .then((snapshot)=>{
                        const matches =  snapshot.docs.map((doc)=>({
                                id: doc.id,
                                ...doc.data()
                        }));
                        setMatches(matches);
                        dispatch({
                            ...state,
                            filterMatches:matches,
                            playedFilter:'All',
                            resultFilter:'All'

                        })
                    })
                    .catch(error=>{toastError(error)})
        
        }
    },[matches])

    const showPlayed = (played) =>{
        const list = matches.filter((match)=>{
            return match.final === played;
        });

        dispatch({
            ...state,
            filterMatches:played === 'All'? matches : list,
            playedFilter:played,
            resultFilter:'All'
        })

    }

    const showResult = (result) => {
        const list = matches.filter((match)=>{
            return match.result === result
        });

        dispatch({
            ...state,
            filterMatches: result === 'All' ? matches : list,
            playedFilter: 'All',
            resultFilter: result
        });
    }

    console.log(state.filterMatches);

    return(
        <div>
            {matches ? 
            <div className="the_matches_container">
                <div className="the_matches_wrapper">
                    <div className="left">
                        <div className="match_filters">
                            <div className="match_filters_box">
                                <div className="tag">Show Match</div>
                                <div className="cont">
                                    <div className={`option ${state.playedFilter === 'All' ? 'active' : ''}`} onClick={()=>showPlayed('All')}>All</div>
                                    <div className={`option ${state.playedFilter === 'Yes' ? 'active' : ''}`} onClick={()=>showPlayed('Yes')}>Played</div>
                                    <div className={`option ${state.playedFilter === 'No' ? 'active' : ''}`} onClick={()=>showPlayed('No')}>Not Played</div>
                                </div>
                            </div>
                            <div className="match_filters_box">
                            <div className="tag">Result</div>
                                <div className="cont">
                                    <div className={`option ${state.resultFilter === 'All' ? 'active' : ''}`} onClick={()=>showResult('All')}>All</div>
                                    <div className={`option ${state.resultFilter === 'W' ? 'active' : ''}`} onClick={()=>showResult('W')}>W</div>
                                    <div className={`option ${state.resultFilter === 'L' ? 'active' : ''}`} onClick={()=>showResult('L')}>L</div>
                                    <div className={`option ${state.resultFilter === 'D' ? 'active' : ''}`} onClick={()=>showResult('D')}>D</div>
                                </div>
                            </div>
                        </div>
                        <MatchesList matches={state.filterMatches}/>
                    </div>
                    <div className="right">
                        <LeagueTable/>
                    </div>
                </div>
            </div>
            :
            <div className="progress">
                <CircularProgress/>
            </div>
                }
        </div>
    )
}

export default TheMatches;