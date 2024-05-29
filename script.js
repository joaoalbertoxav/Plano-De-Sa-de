document.getElementById('calcForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const age = parseInt(document.getElementById('age').value);
    const weight = parseInt(document.getElementById('weight').value);
    const height = parseInt(document.getElementById('height').value);
    const imc = weight / ((height / 100) ** 2);

    const fatorComorbidade = getFatorComorbidade(imc);

    const planos = {
        A: {
            basico: 100 + (age * 10 * (imc / 10)),
            standard: (150 + (age * 15)) * (imc / 10),
            premium: (200 - (imc * 10) + (age * 20)) * (imc / 10)
        },
        B: {
            basico: 100 + (fatorComorbidade * 10 * (imc / 10)),
            standard: (150 + (fatorComorbidade * 15)) * (imc / 10),
            premium: (200 - (imc * 10) + (fatorComorbidade * 20)) * (imc / 10)
        }
    };

    displayResults(planos);
});

function getFatorComorbidade(imc) {
    if (imc < 18.5) return 10;
    if (imc < 24.9) return 1;
    if (imc < 29.9) return 6;
    if (imc < 34.9) return 10;
    if (imc < 39.9) return 20;
    return 30;
}

function displayResults(planos) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h2>Resultados</h2>
        <table class="table table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th>Planos: </th>
                    <th>Operadora A</th>
                    <th>Operadora B</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Básico</td>
                    <td>R$ ${planos.A.basico.toFixed(2)}</td>
                    <td>R$ ${planos.B.basico.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Pleno</td>
                    <td>R$ ${planos.A.standard.toFixed(2)}</td>
                    <td>R$ ${planos.B.standard.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Premium</td>
                    <td>R$ ${planos.A.premium.toFixed(2)}</td>
                    <td>R$ ${planos.B.premium.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
    `;
    resultsDiv.style.display = 'block';
}