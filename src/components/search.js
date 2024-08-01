
const albums = [
    {
        id: 1,
        title: "Álbum 1",
        tracks: ["Faixa 1", "Faixa 2", "Faixa 3"]
    },
    {
        id: 2,
        title: "Álbum 2",
        tracks: ["Faixa 4", "Faixa 5", "Faixa 6"]
    },
    
];


function search(term) {
    const searchTerm = term.toLowerCase();
    const results = {
        albums: [],
        tracks: []
    };

    albums.forEach(album => {
        if (album.title.toLowerCase().includes(searchTerm)) {
            results.albums.push(album);
        }
        album.tracks.forEach(track => {
            if (track.toLowerCase().includes(searchTerm)) {
                results.tracks.push({ albumId: album.id, track });
            }
        });
    });

    return results;
}


function displayResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    if (results.albums.length === 0 && results.tracks.length === 0) {
        resultsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        return;
    }

    if (results.albums.length > 0) {
        const albumsList = document.createElement('ul');
        results.albums.forEach(album => {
            const listItem = document.createElement('li');
            listItem.textContent = `Álbum: ${album.title}`;
            albumsList.appendChild(listItem);
        });
        resultsContainer.appendChild(albumsList);
    }

    if (results.tracks.length > 0) {
        const tracksList = document.createElement('ul');
        results.tracks.forEach(track => {
            const listItem = document.createElement('li');
            const album = albums.find(a => a.id === track.albumId);
            listItem.textContent = `Faixa: ${track.track} (Álbum: ${album.title})`;
            tracksList.appendChild(listItem);
        });
        resultsContainer.appendChild(tracksList);
    }
}


document.getElementById('searchButton').addEventListener('click', () => {
    const searchTerm = document.getElementById('searchInput').value;
    const results = search(searchTerm);
    displayResults(results);
});
