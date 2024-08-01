import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/TrackForm.css';

const TrackForm = () => {
  const { albumId } = useParams(); 
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !duration) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    const trackData = {
      title,
      album_id: albumId, 
      duration
    };

    axios.post('http://localhost:8000/api/tracks', trackData)
      .then(response => {
        console.log(response.data);
        setSuccessMessage('Faixa adicionada com sucesso!');
        setTitle('');
        setDuration('');
        setErrorMessage('');
      })
      .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message);
        setErrorMessage('Ocorreu um erro ao adicionar a faixa.');
        setSuccessMessage('');
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Adicionar Faixa</h1>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Título da Faixa" 
          required
        />
        <input 
          type="text" 
          value={duration} 
          onChange={(e) => setDuration(e.target.value)} 
          placeholder="Duração (Em segundos)" 
          required
        />
        <button type="submit">Adicionar</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default TrackForm;
