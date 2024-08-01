import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AlbumForm.css';

const AlbumForm = () => {
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [artist, setArtist] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

     const year = parseInt(releaseYear, 10);

    
    if (releaseYear.length !== 4 || isNaN(year) || year < 1960 || year > 2024) {
        setErrorMessage('O ano de lançamento deve ter exatamente 4 dígitos e estar entre 1960 e 2024.');
        return;
    }
   
    const albumData = {
      title,
      release_year: parseInt(releaseYear, 10), 
    };

    console.log('Enviando dados para a API:', albumData);

    // Send the request
    axios.post('http://localhost:8000/api/albums', albumData)
      .then(response => {
        console.log(response.data);
        setSuccessMessage('Álbum adicionado com sucesso!');
        setTitle('');
        setReleaseYear('');
        setArtist('');
        setErrorMessage(''); // Clear error message
      })
      .catch(error => {
        console.error(error.response ? error.response.data : error.message);
        setErrorMessage('Ocorreu um erro ao adicionar o álbum.');
        setSuccessMessage(''); // Clear success message
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Adicionar Álbum</h1>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Título do Álbum" 
          required
        />
        <input 
          type="text" 
          value={releaseYear} 
          onChange={(e) => setReleaseYear(e.target.value)} 
          placeholder="Ano de Lançamento" 
          required
        />
        <input 
          type="text" 
          value={artist} 
          onChange={(e) => setArtist(e.target.value)} 
          placeholder="Artista" 
          required
        />
        <button type="submit">Adicionar</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AlbumForm;
