document.getElementById('imdb-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const html = document.getElementById('imdb-html').value;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const credits = doc.querySelectorAll('.filmo-category-section');
    const results = document.getElementById('results');
    results.innerHTML = '';
    credits.forEach(credit => {
        results.appendChild(credit);
    });
    filterCredits();
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
