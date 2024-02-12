import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const CharacterCard = ({ character, onClick }) => {
  console.log("called ---", character);
  return (
    <Card onClick={onClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={character.imageUrl}
          alt={character?.name}
        />
        <CardContent>
          <Typography variant="h6" component="h2">
            {character?.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Skin Color: {character?.skin_color}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CharacterCard;
