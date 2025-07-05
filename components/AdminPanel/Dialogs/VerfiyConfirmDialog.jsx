import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Stack,
    Typography,
  } from "@mui/material";

const VerifyConfirmDialog = ({ isOpen, onClose, handleConfirm, confirmType, submitting }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        {`${confirmType} Alumni`}
      </DialogTitle>
      <DialogContent>
        <Typography variant='body1'>
            {`Are you sure you want to ${confirmType} this Alumni?`}
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
        <Button onClick={handleConfirm} variant="contained" color={confirmType === "Approve" ? "success" : "error"} disabled={submitting}>
          {confirmType}
        </Button>
      </Stack>
    </Dialog>
  )
}

export default VerifyConfirmDialog