import { Card, Checkbox, IconButton, ListItem, ListItemText } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import moment from 'moment';
import React from 'react';
import { db } from '../../firebaseDB';

function DoItem ({todo, ischecked, time, id, listId}){
    // const date = moment(time.toDate()).format('DD MMM YYYY / hh:mm ');
    
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
            <Card style={{maxWidth:"20rem", width:"90vw",marginTop:"10px"}} >
            <ListItem>
                <ListItemText primary={todo} secondary={ischecked ? "Finished" : "UnFinished"}/>
                <Checkbox
                    checked={ischecked}
                    onClick={handleCheckChange}
                    />
                    <IconButton aria-label="delete" onClick={deletTodo}>
                        <DeleteForeverIcon />
                    </IconButton>
            </ListItem>
            </Card>
        </div>
    )
}

export default DoItem;