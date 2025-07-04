import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Stack,
    Typography,
  } from "@mui/material";

const DeleteDialog = ({ isOpen, onClose, handleConfirm, deleteType, submitting }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        {`Delete ${deleteType}`}
      </DialogTitle>
      <DialogContent>
        <Typography variant='body1'>
            {`Are you sure you want to delete this ${deleteType}?`}
        </Typography>
      </DialogContent>
      <Stack
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
        direction={"row"}
        spacing={2}
        sx={{ padding: "1em" }}
      >
        <Button onClick={onClose} disabled={submitting}>Cancel</Button>
        <Button onClick={handleConfirm} variant="contained" color="error" disabled={submitting}>
          Delete
        </Button>
      </Stack>
    </Dialog>
  )
}

export default DeleteDialog