import React from "react";
import { Grid } from "@mui/material";
import CharacterCard from "./CharacterCard";

const CharacterList = ({ characters, onCharacterClick }) => {
  return (
    <Grid container spacing={2}>
      {characters.map((character) => (
        <Grid item key={character._id} xs={12} sm={6} md={4} lg={3}>
          <CharacterCard
            character={character}
            onClick={() => onCharacterClick(character)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CharacterList;
