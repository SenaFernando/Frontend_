import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/AlbumList.css';
import TrackList from './TrackList'; 

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [expandedAlbumId, setExpandedAlbumId] = useState(null); 

  useEffect(() => {
    axios.get('http://localhost:8000/api/albums')
      .then(response => setAlbums(response.data))
      .catch(error => console.error('Error fetching albums:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/albums/${id}`)
      .then(() => {
        setAlbums(albums.filter(album => album.id !== id));
        setSuccessMessage('Álbum excluído com sucesso!');
        setTimeout(() => setSuccessMessage(''), 3000); 
      })
      .catch(error => console.error('Error deleting album:', error));
  };

  const toggleTracks = (albumId) => {
    setExpandedAlbumId(expandedAlbumId === albumId ? null : albumId);
  };

  return (
    <div className="album-list-container">
      <h1>Álbuns</h1>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <ul>
        {albums.map(album => (
          <li key={album.id} className="album-item">
            <img 
              src={album.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsCQ9ICdqb6mgnsxwqLK357GOsmWeROAhgaw&s'} 
              alt={album.title} 
              className="album-image" 
            />
            <div className="album-info">
              <strong>Título:</strong> {album.title}<br />
              <strong>Ano de Lançamento:</strong> {album.release_year}<br />
              <strong>Artista:</strong> {album.artist}
            </div>
            <div className="album-actions">
              <Link to={`/add-track/${album.id}`} className="add-track-link">Adicionar Faixa</Link>
              <button className="toggle-tracks-button" onClick={() => toggleTracks(album.id)}>
                {expandedAlbumId === album.id ? 'Ocultar Faixas' : 'Exibir Faixas'}
              </button>
              <button className="delete-button" onClick={() => handleDelete(album.id)}>Excluir</button>
              {expandedAlbumId === album.id && <TrackList albumId={album.id} />}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumList;
