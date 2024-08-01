import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AlbumList from './components/AlbumList';
import AlbumForm from './components/AlbumForm';
import TrackForm from './components/TrackForm';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AlbumList />} />
        <Route path="/add-album" element={<AlbumForm />} />
        <Route path="/add-track/:albumId" element={<TrackForm />} />
      </Routes>
    </Router>
  );
}

export default App;
