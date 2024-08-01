import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TrackList.css'; 

const TrackList = ({ albumId }) => {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/api/albums/${albumId}/tracks`)
      .then(response => {
        setTracks(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError('Erro ao buscar as faixas');
        setIsLoading(false);
      });
  }, [albumId]);

  const handleDelete = (trackId) => {
    axios.delete(`http://localhost:8000/api/albums/${albumId}/tracks/${trackId}`)
      .then(() => {
        
        setTracks(tracks.filter(track => track.id !== trackId));
          setSuccessMessage('Faixa excluída com sucesso');
          setTimeout(() => setSuccessMessage(''), 3000); 
      })
      .catch(error => {
          setDeleteError('Erro ao excluir a faixa');
          setTimeout(() => setDeleteError(''), 3000);
      });
  };

  if (isLoading) {
    return <p>Carregando faixas...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {deleteError && <p className="error-message">{deleteError}</p>}
      <ul className="track-list">
        {tracks.map(track => (
          <li key={track.id} className="track-item">
            <strong>{track.title}</strong> - {track.duration} segundos
            <button onClick={() => handleDelete(track.id)} className="delete-button">Excluir Faixa</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackList;
