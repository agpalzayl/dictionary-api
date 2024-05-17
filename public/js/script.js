function search() {
    const term = document.getElementById('searchInput').value;
    if (term.trim() === '') {
        alert('Please enter a term in the field.');
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            const response = JSON.parse(this.responseText);
            displayDefinition(response);
        }
    });

    xhr.open('GET', `https://urban-dictionary7.p.rapidapi.com/v0/define?term=${term}`);
    xhr.setRequestHeader('X-RapidAPI-Key', 'a103d247c3msh62c3919a2e11d55p158b13jsn6aa1ea45f353');
    xhr.setRequestHeader('X-RapidAPI-Host', 'urban-dictionary7.p.rapidapi.com');

    xhr.send();
}

function displayDefinition(response) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results
    if (response.list && response.list.length > 0) {
        response.list.forEach(function (item) {
            const definition = document.createElement('div');
            definition.classList.add('definition');
            definition.innerHTML = `
                <h3>${item.word}</h3>
                <p>${item.definition}</p>
            `;
            resultDiv.appendChild(definition);
        });
    } else {
        resultDiv.textContent = 'No definitions found.';
    }
}