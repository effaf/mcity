import React,{useEffect, useState} from "react";
import AdminLayout from "../../HOC/Adminlayout";
import {matchesCollection } from '../../../firebase'
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


const AdminMatches = ()=>{

    const [matches,setMatches] = useState(null);
    const [lastVisible,setLastVisible] = useState(null);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        if(!matches){
            setLoading(true);
            matchesCollection
            .limit(2)
            .get()
            .then(snapshot=>{
                const lastVisible = snapshot.docs[snapshot.docs.length-1];
                const matches = snapshot.docs.map(doc=>({
                    id:doc.id,
                    ...doc.data()
                }));

                setLastVisible(lastVisible);
                setMatches(matches);

            })
            .catch(error =>{
                console.log(error);
            })
            .finally(()=>{
                setLoading(false)
            })

        }
    },[matches])

    const loadMoreMatches = ()=>{
        if(lastVisible){
            setLoading(true);
            matchesCollection
                .startAfter(lastVisible)
                .limit(2)
                .get()
                .then(snapshot=>{
                    const lastVisible = snapshot.docs[snapshot.docs.length-1];
                    const newMatches  = snapshot.docs.map(doc=>({
                        id:doc.id,
                        ...doc.data()
                    }));

                    setLastVisible(lastVisible);
                    setMatches([...matches,...newMatches]);
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
    <AdminLayout title="Matches">
        <div className="mb-5">
            <Button disableElevation 
                    variant="outlined" 
                    to={'/admin_matches/add_match'}
                    LinkComponent={Link}>
                Add Match
            </Button>

        </div>
        <Paper className="mb-5">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Match</TableCell>
                        <TableCell>Result</TableCell>
                        <TableCell>Final</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {matches?
                        matches.map((match) =>(
                            <TableRow key={match.id}>
                                <TableCell>
                                        {match.date}
                                </TableCell>
                                <TableCell>
                                    <Link to={`/admin_matches/edit_match/${match.id}`}>
                                    { match.away} <strong>-</strong> {match.local}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                  { match.resultAway} <strong>-</strong> {match.resultLocal}
                                </TableCell>
                                <TableCell>
                                {match.final === "Yes" ?
                                    <span className="matches_tag_red">Final</span>
                                    :
                                    <span className="matches_tag_green">Not played yet</span>
                                    }
                                </TableCell>
                            </TableRow>
                        )):null}
                </TableBody>
            </Table>

        </Paper>

        <Button variant="contained" 
                color="primary" 
                disabled={loading} 
                onClick={()=>loadMoreMatches()}>Load More</Button>

        <div className="admin_progess">
            {loading?
                <CircularProgress thickness={7} style={{color:'#98c5e9'}} />:
                null}
        </div>
    </AdminLayout>)
}

export default AdminMatches;