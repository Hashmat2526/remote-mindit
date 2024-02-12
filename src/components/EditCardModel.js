import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Grid,
  Button,
  TextField,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios"; // Import axios library

const EditModal = ({ open, onClose, character, onUpdate }) => {
  const [editedCharacter, setEditedCharacter] = useState(character);
  const [successToastOpen, setSuccessToastOpen] = useState(false);

  // Add useEffect to update editedCharacter when character prop changes
  useEffect(() => {
    setEditedCharacter(character);
  }, [character]);

  // Add a check to ensure character is not null or undefined before accessing its properties
  if (!editedCharacter) {
    return null; // or return a loading indicator or error message
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the name contains a dot, it means it's a nested property
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setEditedCharacter((prevCharacter) => ({
        ...prevCharacter,
        [parent]: {
          ...prevCharacter[parent],
          [child]: value,
        },
      }));
    } else {
      setEditedCharacter((prevCharacter) => ({
        ...prevCharacter,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async () => {
    try {
      // Call the update API with the edited character data
      await axios.patch(
        `http://localhost:4000/v1/characters/${editedCharacter._id}`,
        editedCharacter
      );

      // Call the onUpdate callback to update the character in the parent component
      onUpdate(editedCharacter);

      // Set success toast open
      setSuccessToastOpen(true);
    } catch (error) {
      console.error("Error updating character:", error);
      // Handle error if needed
    }
  };

  const handleSuccessToastClose = () => {
    setSuccessToastOpen(false);
    onClose(); // Close the modal after the toast is closed
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        <Typography variant="h6">Edit Character</Typography>
        <IconButton
          onClick={onClose}
          style={{ position: "absolute", right: 0, top: 0 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* Input fields for each property */}
          <Grid item xs={12}>
            <Typography variant="body1">Profile</Typography>
            <TextField
              label="Name"
              name="name"
              value={editedCharacter.name || ""}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Height"
              name="height"
              value={editedCharacter.height || ""}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Mass"
              name="mass"
              value={editedCharacter.mass || ""}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Birth Year"
              name="birth_year"
              value={editedCharacter.birth_year || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Homeland Info</Typography>
            <TextField
              label="Name"
              name="homeworld.name"
              value={
                editedCharacter.homeworld ? editedCharacter.homeworld.name : ""
              }
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Terrain"
              name="homeworld.terrain"
              value={
                editedCharacter.homeworld
                  ? editedCharacter.homeworld.terrain
                  : ""
              }
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Climate"
              name="homeworld.climate"
              value={
                editedCharacter.homeworld
                  ? editedCharacter.homeworld.climate
                  : ""
              }
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update
      </Button>
      <Snackbar
        open={successToastOpen}
        autoHideDuration={6000}
        onClose={handleSuccessToastClose}
        message="Character updated successfully"
      />
    </Dialog>
  );
};

export default EditModal;
