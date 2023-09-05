import React,{useEffect, useState} from "react";
import { positionsCollection } from "../../firebase";
import { Button,
    Table, 
    TableBody,
    Paper, 
    TableRow, 
    TableCell, 
    CircularProgress, 
    TableHead} from "@mui/material";
import { toastError } from "../Utils/tools";


const LeagueTable = () =>{

    const [positionTable, setPositionTable] = useState(null);

    const showTeamPositions = ()=>{
        return(
        positionTable ? 
            positionTable.map((position,index)=>{
                return(
                <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{position.team}</TableCell>
                    <TableCell>{position.w}</TableCell>
                    <TableCell>{position.l}</TableCell>
                    <TableCell>{position.d}</TableCell>
                    <TableCell>{position.pts}</TableCell>
                </TableRow>
            )})
        :null
    )}

    useEffect(()=>{
        if(!positionTable){
        positionsCollection
                        .get()
                        .then((snapshot)=>{
                            const positionTable = snapshot.docs.map((doc)=>({
                               id:doc.id,
                               ...doc.data()
                            }));
                            setPositionTable(positionTable);
                        }).catch(error=>{toastError(error)})
        
        }

    },[positionTable])

    

    return (
        <div className="league_table_wrapper">
            <div className="title">
                League Table
            </div>
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Pos</TableCell>
                            <TableCell>Team</TableCell>
                            <TableCell>W</TableCell>
                            <TableCell>L</TableCell>
                            <TableCell>D</TableCell>
                            <TableCell>Points</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {showTeamPositions()}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}


export default LeagueTable;