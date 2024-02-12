import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Button } from "@mui/material";
import CharacterList from "./components/CharacterList";
import LoadingIndicator from "./components/LoadingIndicator";
import ErrorComponent from "./components/ErrorComponent";
import CharacterModal from "./components/CharacterModal";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:4000/v1/characters?page=${page}&pageSize=8`
        );
        setCharacters(response.data.characters);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        setError("Error fetching characters");
        setLoading(false);
      }
    };
    fetchCharacters();
  }, [page]);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <Container>
      <Typography variant="h1" align="center" gutterBottom>
        Star Wars Characters
      </Typography>
      {loading && <LoadingIndicator />}
      {error && <ErrorComponent errorMessage={error} />}
      {characters.length === 0 && !loading && (
        <Typography variant="h5" align="center">
          No data available
        </Typography>
      )}
      {characters.length > 0 && (
        <CharacterList
          characters={characters}
          onCharacterClick={handleCharacterClick}
        />
      )}
      <CharacterModal
        character={selectedCharacter}
        open={!!selectedCharacter}
        onClose={closeModal}
      />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button disabled={page === 1} onClick={handlePrevPage}>
          Previous Page
        </Button>
        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>
        <Button disabled={page === totalPages} onClick={handleNextPage}>
          Next Page
        </Button>
      </div>
    </Container>
  );
};

export default App;
