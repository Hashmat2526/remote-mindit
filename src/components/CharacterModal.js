import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Grid,
  Button,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios"; // Import axios library
import EditModal from "./EditCardModel";

const CharacterModal = ({ character, open, onClose, onDelete }) => {
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  // Define state setter functions
  const [loading, setLoading] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      setLoading(true);
      // Use character.id instead of characterId
      await axios.delete(
        `http://localhost:4000/v1/characters/${character._id}`
      );
      // Close the modal after successful deletion
      setSelectedCharacter(null);
      setDeleteSuccess(true); // Set delete success state
    } catch (error) {
      setError("Error deleting character");
      setDeleteError(true); // Set delete error state
    } finally {
      setLoading(false);
    }
  };

  // State for managing edit modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState(null);

  const handleUpdate = (character) => {
    setEditingCharacter(character);
    setEditModalOpen(true);
  };

  const handleSnackbarClose = () => {
    setDeleteSuccess(false);
    setDeleteError(false);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        <Typography variant="h6">{character?.name}</Typography>
        <IconButton
          onClick={onClose}
          style={{ position: "absolute", right: 0, top: 0 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* Profile Section */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Profile
            </Typography>
            <Typography variant="body1">Height: {character?.height}</Typography>
            <Typography variant="body1">Mass: {character?.mass}</Typography>
            <Typography variant="body1">
              Birth Year: {character?.birth_year}
            </Typography>
            <Typography variant="body1">
              Films: {character?.films.length}
            </Typography>
          </Grid>
          {/* Homeland Info Section */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Homeland Info
            </Typography>
            <Typography variant="body1">
              Name: {character?.homeworld?.name}
            </Typography>
            <Typography variant="body1">
              Terrain: {character?.homeworld?.terrain}
            </Typography>
            <Typography variant="body1">
              Climate: {character?.homeworld?.climate}
            </Typography>
            <Typography variant="body1">
              Residents: {character?.homeworld?.residents?.length}
            </Typography>
          </Grid>
          {/* Buttons Section */}
          <Grid item xs={12} container justifyContent="space-between">
            <Button variant="outlined" color="primary" onClick={handleUpdate}>
              Update
            </Button>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <Snackbar
        open={deleteSuccess || deleteError}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={
          deleteSuccess
            ? "Character deleted successfully"
            : "Failed to delete character"
        }
      />
      <EditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        character={character}
        onUpdate={handleUpdate}
      />
    </Dialog>
  );
};

export default CharacterModal;
