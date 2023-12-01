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
        if (calculationType === 'luas') {
            calculateluas(alas, tinggi);
        } else {
            calculatekeliling(alas, lebar, tinggi);
        }
    } else {
        const missingFields = findMissingFields(alas, lebar, tinggi);
        document.getElementById('result').innerHTML = `<p>Isian ${missingFields.join(', ')} kosong. Harap lengkapi semua isian.</p>`;
    }
}

function calculateluas(alas, tinggi) {
    const luas = 0.5 * alas * tinggi;
    document.getElementById('result').innerHTML = `<p>Luas Segitiga: ${luas.toFixed(2)}</p>`;
}

function calculatekeliling(alas, lebar, tinggi) {
    const keliling = alas + lebar + tinggi;
    document.getElementById('result').innerHTML = `<p>Keliling Segitiga: ${keliling.toFixed(2)}</p>`;
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

function findMissingFields(alas, lebar, tinggi) {
    const missingFields = [];

    if (calculationType === 'luas' && (isNaN(alas) || isNaN(tinggi) || alas <= 0 || tinggi <= 0)) {
        if (isNaN(alas) || alas <= 0) {
            missingFields.push('Alas');
        }

        if (isNaN(tinggi) || tinggi <= 0) {
            missingFields.push('Tinggi');
        }
    } else if (calculationType === 'keliling' && (isNaN(alas) || isNaN(lebar) || isNaN(tinggi) || alas <= 0 || lebar <= 0 || tinggi <= 0)) {
        if (isNaN(alas) || alas <= 0) {
            missingFields.push('Alas');
        }

        if (isNaN(lebar) || lebar <= 0) {
            missingFields.push('Lebar');
        }

        if (isNaN(tinggi) || tinggi <= 0) {
            missingFields.push('Tinggi');
        }
    }

    return missingFields;
}
