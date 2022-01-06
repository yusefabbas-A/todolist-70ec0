import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack, TextField } from '@mui/material';
import './App.css';
import { db } from './firebaseDB';
import DoList from './components/DoList/DoList';
import {FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon} from "react-share";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ShareIcon from '@mui/icons-material/Share';
import ListAltIcon from '@mui/icons-material/ListAlt';

function App() {
  const [lists, setlists] = useState([]);
  const [listName, setListName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [start, setStart] = React.useState(false);
  const [hex, setHex] = useState("");


  useEffect(() => {
    getListsData();
    randomHex();
  }, []);

  const getListsData = () => {
    db.collection("todoList").onSnapshot(function (querySnapshot) {
      setlists(querySnapshot.docs.map((doc) => ({
        id: doc.id,
        listName: doc.data().listName,
      })));
    })
  }

  const createlist=(e) =>{
    e.preventDefault();
    db.collection("todoList").add({
      listName:listName,
    });
    setListName("");
    setOpen(false);
  }

  const randomHex=()=>{
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    setHex(randomColor);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  
  const handleShareDialog = () => {
    setStart(true);

  };

  const handleDialogClose = () => {
    setStart(false);
  };

  const shareUrl = "https://todolist-70ec0.web.app"
  const MSGtitle = "Sharable ToDo List"

  return (
    <div className="App">
        <h1> <img src="../../images/ListIcon2.svg" alt="" /> TODLIT</h1>
        <Stack direction="row" spacing={1}>
          <Button 
          style={{backgroundColor:"#333399"}}
          endIcon={<PlaylistAddIcon />} 
          onClick={handleClickOpen} 
          variant="contained" 
          >Add List</Button>
          <Button 
          style={{backgroundColor:"#333399"}}
          endIcon={<ShareIcon />}
          onClick={handleShareDialog}  
          variant="contained"  
          >Share List</Button>
        </Stack>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add List</DialogTitle>
          <DialogContent>
            <DialogContentText>
              TodoList Name:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              value={listName} 
              onChange={(e) => setListName(e.target.value)} 
              type="text"
              fullWidth
              variant="standard"
            />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={createlist}>Create</Button>
            </DialogActions>
        </Dialog>

        <Dialog maxWidth="xs" open={start} onClose={handleDialogClose}>
          <DialogTitle>Share</DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <FacebookShareButton url={shareUrl} quote={MSGtitle} hashtag="Our Todo List">
                  <FacebookIcon size={32} round={true}/>
                </FacebookShareButton>    
              </Grid>
              <Grid item xs={6}> 
                <EmailShareButton url={shareUrl} subject={MSGtitle} body="Checkout this Todo list ">
                  <EmailIcon size={32} round={true}/>
                </EmailShareButton>
              </Grid>
              <Grid item xs={6}> 
                <WhatsappShareButton url={shareUrl} title={MSGtitle}>
                  <WhatsappIcon size={32} round={true}/>
                </WhatsappShareButton>
              </Grid>
              <Grid item xs={6}> 
                <LinkedinShareButton url={shareUrl} title={MSGtitle} source="ourtodolist">
                  <LinkedinIcon size={32} round={true}/>
                </LinkedinShareButton>
              </Grid>
            </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Close</Button>
            </DialogActions>
        </Dialog>

          <Grid container className='container'>
            {lists.map((list) => (
              <Grid item >
              <div className='Lists'  style={{backgroundColor:"#cccccc"}}>
                <DoList name={list.listName} listId={list.id}/>
              </div>
              </Grid>
                ))}
          </Grid>
    </div>
  );
}

export default App;
