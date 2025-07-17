document.getElementById('imdb-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const urlInput = document.getElementById('imdb-url');
    const url = urlInput.value;
    const urlError = document.getElementById('url-error');

    if (!urlInput.checkValidity()) {
        urlError.style.display = 'block';
        return;
    }
    urlError.style.display = 'none';

    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.contents, 'text/html');
            const credits = doc.querySelectorAll('.filmo-category-section');
            const results = document.getElementById('results');
            credits.forEach(credit => {
                results.appendChild(credit);
            });
            filterCredits();
        });
});

function filterCredits() {
    const appearances = parseInt(document.getElementById('appearances').value, 10);
    const credits = document.querySelectorAll('.filmo-row');

    credits.forEach(credit => {
        const episodeCountText = credit.innerText.match(/\((\d+)\s+episode/);
        const episodeCount = episodeCountText ? parseInt(episodeCountText[1], 10) : 1;

        if (episodeCount >= appearances) {
            credit.style.display = 'block';
        } else {
            credit.style.display = 'none';
        }
    });
}

document.getElementById('appearances').addEventListener('input', function(event) {
    document.getElementById('appearances-value').textContent = event.target.value;
    filterCredits();
});
