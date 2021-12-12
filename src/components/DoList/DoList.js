import React, { useEffect, useState } from 'react'
import { Button, Stack, TextField } from '@mui/material';
import { db } from '../../firebaseDB';
import firebase from 'firebase';
import DoItem from '../DoItem/DoItem';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LoadingButton from '@mui/lab/LoadingButton';

//TODO: validate if text is empty
export default function DoList({name,listId}) {

  const [loading, setLoading] = useState(false);
  const [todoList, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");

    useEffect(() => {
      getData();
    }, []);
    


    function getData() {
      db.collection("todoList").doc(listId).collection("todos").onSnapshot(function (querySnapshot) {
        setTodos(querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          ischecked: doc.data().ischecked, 
          timestamp: doc.data().timestamp,
        })));
      })
    }


  
    function addTodo(e) {
      e.preventDefault();
      setLoading(true)
      db.collection("todoList").doc(listId).collection("todos").add({
        ischecked : false,
        timestamp : firebase.firestore.FieldValue.serverTimestamp(),
        todo : todoText,
      });
      setTimeout(function() {
        setLoading(false)
      }, 100);
      
      setTodoText("");
    }


    function deletList(e){
      e.preventDefault();
      db.collection("todoList").doc(listId).delete();
    }

    return (
        <div>
            <form className='centered'>        
            <label style={{color:"white",fontSize:"1.3rem",padding:"0",marginBottom:"10px"}}>{name}</label>   
              <TextField 
                id="filled-basic" 
                value={todoText} 
                onChange={(e) => setTodoText(e.target.value)} 
                label="Note" 
                color='primary'
                size="small"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.836)",
                  borderRadius:"5px",
                  maxWidth:"20rem", width:"90vw"
                }}
                fullWidth 
              />
              <Stack direction="row" spacing={2}>
              <LoadingButton 
              type="submit" 
              onClick={addTodo} 
              variant="contained"
              loading={loading}
              loadingIndicator="Loading..."
              startIcon={<NoteAddIcon />} 
              style={{maxWidth:"10rem", width:"90vw",marginTop:"10px"}} 
              color="success" 
              fullWidth>New Todo</LoadingButton>
              <Button 
              type="submit" 
              onClick={deletList} 
              variant="contained"
              endIcon={<DeleteForeverIcon />}  
              style={{maxWidth:"9rem", width:"90vw",marginTop:"10px"}} 
              color="primary" 
              fullWidth>Delet List</Button>
              </Stack>
            </form>
            {todoList.map((todo) => (
              <DoItem todo={todo.todo} ischecked={todo.ischecked} time={todo.timestamp} id={todo.id} listId={listId}/>
            ))}

      </div>
    )
}
