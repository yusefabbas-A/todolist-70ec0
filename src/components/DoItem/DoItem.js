import { Card, Checkbox, IconButton, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import moment from 'moment';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import React from 'react';
import { db } from '../../firebaseDB';

function DoItem ({todo, ischecked, time, id, listId}){
    // const date = time?  moment(time.toDate()).format('DD MMM YYYY / hh:mm ') : null;
    
    function handleCheckChange(){
        db.collection("todoList").doc(listId).collection("todos").doc(id).update({
            ischecked: !ischecked
        })
    }

    function deletTodo(){
        db.collection("todoList").doc(listId).collection("todos").doc(id).delete();
    }
    return(
        <div>
            <Paper elevation={16} style={{maxWidth:"20rem", width:"90vw",marginTop:"10px"}} >
            <ListItem style={{padding:"3px"}}>
                <ListItemIcon>{ischecked ? <CheckCircleOutlineIcon /> : <PendingIcon />}</ListItemIcon>
                <ListItemText primary={todo} secondary={ischecked ? "Finished" : "UnFinished"}/>

                <Checkbox
                    checked={ischecked}
                    onClick={handleCheckChange}
                    />
                    <IconButton aria-label="delete" onClick={deletTodo}>
                        <DeleteForeverIcon />
                    </IconButton>
            </ListItem>
            </Paper>
        </div>
    )
}

export default DoItem;