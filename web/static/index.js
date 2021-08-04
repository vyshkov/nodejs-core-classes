fetch('/api/result')
    .then(resp => resp.json())
    .then(data => {
        document.getElementById('result').innerText = JSON.stringify(data);
    })