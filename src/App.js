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

function App() {
  const [lists, setlists] = useState([]);
  const [listName, setListName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [start, setStart] = React.useState(false);



  useEffect(() => {
    getListsData();
  }, []);

  function getListsData() {
    db.collection("todoList").onSnapshot(function (querySnapshot) {
      setlists(querySnapshot.docs.map((doc) => ({
        id: doc.id,
        listName: doc.data().listName,
      })));
    })
  }

  function createlist(e) {
    e.preventDefault();
    db.collection("todoList").add({
      listName:listName,
    });
    setListName("");
    setOpen(false);
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
        <h1>Our ToDot List</h1>
        <Stack direction="row" spacing={1}>
          <Button 
          endIcon={<PlaylistAddIcon />} 
          onClick={handleClickOpen} 
          variant="contained" 
          color="primary" 
          >Add List</Button>
          <Button 
          endIcon={<ShareIcon />}
          onClick={handleShareDialog}  
          variant="contained" 
          color="primary" 
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
        <div >
        <Grid container className='container'>
        {lists.map((list) => (
          <Grid item>
          <div className='Lists'>
            <DoList name={list.listName} listId={list.id}/>
          </div>
          </Grid>
            ))}
        </Grid>
        </div>
    </div>
  );
}

export default App;
