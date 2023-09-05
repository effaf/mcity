import React,{useEffect, useState} from "react";
import AdminLayout from "../../HOC/Adminlayout";
import {playersCollection } from '../../../firebase'
import { Button,
            Table, 
            TableBody,
            Paper,
            TableRow,
            TableCell,
            CircularProgress, 
            TableHead} from "@mui/material";

import { toastError, toastSuccess } from "../../Utils/tools";
import { Link } from "react-router-dom";


const AdminPlayers = ()=>{

    const [players,setPlayers] = useState(null);
    const [lastVisible,setLastVisible] = useState(null);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        if(!players){
            setLoading(true);
            playersCollection
            .limit(2)
            .get()
            .then(snapshot=>{
                const lastVisible = snapshot.docs[snapshot.docs.length-1];
                const players = snapshot.docs.map(doc=>({
                    id:doc.id,
                    ...doc.data()
                }));

                setLastVisible(lastVisible);
                setPlayers(players);

            })
            .catch(error =>{
                console.log(error);
            })
            .finally(()=>{
                setLoading(false)
            })

        }
    },[players])

    const loadMorePlayers = ()=>{
        if(lastVisible){
            setLoading(true);
            playersCollection
                .startAfter(lastVisible)
                .limit(2)
                .get()
                .then(snapshot=>{
                    const lastVisible = snapshot.docs[snapshot.docs.length-1];
                    const newPlayers  = snapshot.docs.map(doc=>({
                        id:doc.id,
                        ...doc.data()
                    }));

                    setLastVisible(lastVisible);
                    setPlayers([...players,...newPlayers]);
                })
                .catch(error=>{
                    toastError(error)
                })
                .finally(()=>setLoading(false))

        }else{
            console.log("Nothing to load");
        }
    }
    return(
    <AdminLayout title="The Players">
        <div className="mb-5">
            <Button disableElevation 
                    variant="outlined" 
                    to={'/admin_players/add_player'}
                    LinkComponent={Link}>
                Add player
            </Button>

        </div>
        <Paper className="mb-5">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>First name</TableCell>
                        <TableCell>Last name</TableCell>
                        <TableCell>Number</TableCell>
                        <TableCell>Position</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {players?
                        players.map((player) =>(
                            <TableRow key={player.id}>
                                <TableCell>
                                    <Link to={`/admin_players/edit_player/${player.id}`}>
                                        {player.name}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/admin_player/edit_player/${player.id}`}>
                                        {player.lastname}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {player.number}
                                </TableCell>
                                <TableCell>
                                    {player.position}
                                </TableCell>
                            </TableRow>
                        )):null}
                </TableBody>
            </Table>

        </Paper>

        <Button variant="contained" 
                color="primary" 
                disabled={loading} 
                onClick={()=>loadMorePlayers()}>Load More</Button>

        <div className="admin_progess">
            {loading?
                <CircularProgress thickness={7} style={{color:'#98c5e9'}} />:
                null}
        </div>
    </AdminLayout>)
}

export default AdminPlayers;