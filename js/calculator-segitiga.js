let calculationType = 'luas';

function switchCalculation() {
    const container = document.getElementById('container');
    const switchBtn = document.getElementById('switchBtn');
    const calculateBtn = document.getElementById('calculateBtn');
    const h2 = document.querySelector('h2');
    const labelLebar = document.getElementById('labelLebar');
    const inputLebar = document.getElementById('lebar');
    
    // Reset input dan hasil perhitungan
    reset();

    // Ubah jenis perhitungan
    calculationType = calculationType === 'luas' ? 'keliling' : 'luas';

    // Menyembunyikan atau menampilkan input lebar berdasarkan jenis perhitungan
    if (calculationType === 'luas') {
        labelLebar.style.display = 'none';
        inputLebar.style.display = 'none';
    } else {
        labelLebar.style.display = 'block';
        inputLebar.style.display = 'block';
    }

    // Update tampilan dan jenis perhitungan
    switchBtn.textContent = calculationType === 'luas' ? 'Switch ke Hitung Keliling' : 'Switch ke Hitung Luas';
    calculateBtn.textContent = calculationType === 'luas' ? 'Hitung' : 'Keliling';
    h2.textContent = `Perhitungan ${calculationType === 'luas' ? 'Luas' : 'Keliling'} Segitiga`;

    // Bersihkan hasil perhitungan sebelumnya
    document.getElementById('result').innerHTML = '';
}

function calculate() {
    const alas = parseFloat(document.getElementById('alas').value);
    const lebar = parseFloat(document.getElementById('lebar').value);
    const tinggi = parseFloat(document.getElementById('tinggi').value);

    // Validasi input
    if (isValidInput(alas, lebar, tinggi)) {
        const resultContainer = document.getElementById('result');

        if (calculationType === 'luas') {
            const luas = calculateluas(alas, tinggi);
            if (!isNaN(luas)) {
                // resultContainer.innerHTML = `<p>Luas Segitiga: ${luas.toFixed(2)}</p>`;
                printSteps('L = 0.5 * alas * tinggi');
                printSteps(`L = 0.5 * ${alas} * ${tinggi}`);
                printSteps(`L = ${luas.toFixed(2)}`);
            }
        } else {
            const keliling = calculatekeliling(alas, lebar, tinggi);
            if (!isNaN(keliling)) {
                // resultContainer.innerHTML = `<p>Keliling Segitiga: ${keliling.toFixed(2)}</p>`;
                printSteps('K = alas + lebar + tinggi');
                printSteps(`K = ${alas} + ${lebar} + ${tinggi}`);
                printSteps(`K = ${keliling.toFixed(2)}`);
            }
        }
    } else {
        const inputKosong = inputanKosong(alas, lebar, tinggi);
        if (calculationType === 'luas') {
            document.getElementById('result').innerHTML = `<p>Masukkan panjang ${inputKosong.join(' dan ')} yang valid.</p>`;
        } else {
            document.getElementById('result').innerHTML = `<p>Masukkan panjang ${inputKosong.join(', ')} yang valid.</p>`;
        }
    }
}

function printSteps(step) {
    const stepsContainer = document.getElementById('result');
    stepsContainer.innerHTML += `<p>${step}</p>`;
}


function calculateluas(alas, tinggi) {
    if (!isNaN(alas) && !isNaN(tinggi) && alas > 0 && tinggi > 0) {
        return 0.5 * alas * tinggi;
    } else {
        return NaN;
    }
}

function calculatekeliling(alas, lebar, tinggi) {
    if (!isNaN(alas) && !isNaN(lebar) && !isNaN(tinggi) && alas > 0 && lebar > 0 && tinggi > 0) {
        return alas + lebar + tinggi;
    } else {
        return NaN;
    }
}

function isValidInput(alas, lebar, tinggi) {
    if (calculationType === 'luas') {
        return !isNaN(alas) && !isNaN(tinggi) && alas > 0 && tinggi > 0;
    } else {
        return !isNaN(alas) && !isNaN(lebar) && !isNaN(tinggi) && alas > 0 && lebar > 0 && tinggi > 0;
    }
}

function reset() {
    document.getElementById('alas').value = '';
    document.getElementById('lebar').value = '';
    document.getElementById('tinggi').value = '';
    document.getElementById('result').innerHTML = '';
}

function inputanKosong(alas, lebar, tinggi) {
    const inputKosong = [];

    if (calculationType === 'luas' && (isNaN(alas) || isNaN(tinggi) || alas <= 0 || tinggi <= 0)) {
        if (isNaN(alas) || alas <= 0) {
            inputKosong.push('alas');
        }

        if (isNaN(tinggi) || tinggi <= 0) {
            inputKosong.push('tinggi');
        }
    } else if (calculationType === 'keliling' && (isNaN(alas) || isNaN(lebar) || isNaN(tinggi) || alas <= 0 || lebar <= 0 || tinggi <= 0)) {
        if (isNaN(alas) || alas <= 0) {
            inputKosong.push('alas');
        }

        if (isNaN(lebar) || lebar <= 0) {
            inputKosong.push('lebar');
        }

        if (isNaN(tinggi) || tinggi <= 0) {
            inputKosong.push('tinggi');
        }
    }

    return inputKosong;
}
