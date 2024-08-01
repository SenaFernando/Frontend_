document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const searchQuery = document.getElementById('searchQuery');
    const searchResults = document.getElementById('searchResults');

    searchButton.addEventListener('click', function() {
        const query = searchQuery.value.trim();
        console.log('Botão de pesquisa clicado. Consulta:', query); // Log para depuração

        if (query.length > 0) {
            fetch(`http://localhost:8000/api/albums/search?query=${query}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Dados recebidos:', data); // Log para depuração
                    displayResults(data);
                })
                .catch(error => {
                    console.error('Erro na operação fetch:', error);
                    searchResults.innerHTML = `<p>Erro ao realizar a busca. Tente novamente mais tarde.</p>`;
                });
        } else {
            searchResults.innerHTML = `<p>Por favor, digite uma consulta de busca.</p>`;
        }
    });

    function displayResults(data) {
        searchResults.innerHTML = '';
        if (data.length > 0) {
            data.forEach(item => {
                const albumDiv = document.createElement('div');
                albumDiv.classList.add('album');
                albumDiv.innerHTML = `
                    <h3>${item.title}</h3>
                    <p>Artista: ${item.artist}</p>
                    <p>Ano de Lançamento: ${item.release_year}</p>
                    <button onclick="viewTracks(${item.id})">Ver Faixas</button>
                `;
                searchResults.appendChild(albumDiv);
            });
        } else {
            searchResults.innerHTML = `<p>Nenhum álbum ou faixa encontrada para a consulta "${query}".</p>`;
        }
    }
});

function viewTracks(albumId) {
    console.log('Exibindo faixas para o álbum ID:', albumId); // Log para depuração
    fetch(`http://localhost:8000/api/albums/${albumId}/tracks`)
        .then(response => response.json())
        .then(tracks => {
            const trackList = document.createElement('ul');
            tracks.forEach(track => {
                const trackItem = document.createElement('li');
                trackItem.textContent = `${track.title} - ${track.duration} segundos`;
                trackList.appendChild(trackItem);
            });
            const trackContainer = document.createElement('div');
            trackContainer.appendChild(trackList);
            document.getElementById('searchResults').appendChild(trackContainer);
        })
        .catch(error => {
            console.error('Erro ao carregar faixas:', error);
        });
}
