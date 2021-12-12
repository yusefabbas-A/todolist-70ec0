import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField } from '@mui/material';

export default function MyDialog() {
    return (
        <div>
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
        </div>
    )
}
