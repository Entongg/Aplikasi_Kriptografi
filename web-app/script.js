// --- LOGIKA UI (Tahap 1) ---
function toggleInputType() {
    const inputType = document.querySelector('input[name="inputType"]:checked').value;
    const textInputArea = document.getElementById('textInputArea');
    const fileInputArea = document.getElementById('fileInputArea');
    if (inputType === 'text') {
        textInputArea.classList.remove('hidden');
        fileInputArea.classList.add('hidden');
    } else {
        textInputArea.classList.add('hidden');
        fileInputArea.classList.remove('hidden');
    }
}

function toggleOTPKey() {
    const algorithm = document.getElementById('cipherAlgorithm').value;
    const keyInputArea = document.getElementById('keyInputArea');
    const otpKeyArea = document.getElementById('otpKeyArea');
    if (algorithm === 'otp') {
        keyInputArea.classList.add('hidden');
        otpKeyArea.classList.remove('hidden');
    } else {
        keyInputArea.classList.remove('hidden');
        otpKeyArea.classList.add('hidden');
    }
}

let currentRawOutput = ""; 

function formatOutput() {
    const format = document.querySelector('input[name="outputFormat"]:checked').value;
    const outputBox = document.getElementById('outputContent');
    if (!currentRawOutput) return;
    let processedText = currentRawOutput.replace(/\s+/g, '');
    if (format === 'nospace') {
        outputBox.value = processedText;
    } else if (format === 'group') {
        outputBox.value = processedText.match(/.{1,5}/g)?.join(' ') || '';
    }
}

// --- FUNGSI HELPER MATEMATIKA ---
function mod(n, m) { return ((n % m) + m) % m; }
function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
function modInverse(a, m) {
    a = mod(a, m);
    for (let x = 1; x < m; x++) {
        if (mod(a * x, m) === 1) return x;
    }
    return -1;
}

// --- TAHAP 2A & 2B: LOGIKA KRIPTOGRAFI TEKS (MOD 26) ---

function shiftCipher(text, key, mode) {
    let shift = parseInt(key);
    if (isNaN(shift)) return "Error: Kunci Shift Cipher harus berupa angka!";
    if (mode === 'decrypt') shift = -shift;

    let result = "";
    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            result += String.fromCharCode(mod(charCode - 65 + shift, 26) + 65);
        } else if (charCode >= 97 && charCode <= 122) {
            result += String.fromCharCode(mod(charCode - 97 + shift, 26) + 97);
        } else {
            result += text.charAt(i); 
        }
    }
    return result;
}

function substitutionCipher(text, key, mode) {
    if (key.length !== 26) return "Error: Kunci Substitution harus 26 huruf alfabet unik!";
    key = key.toLowerCase();
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let result = "";

    for (let i = 0; i < text.length; i++) {
        let char = text.charAt(i);
        let isUpper = char >= 'A' && char <= 'Z';
        let lowerChar = char.toLowerCase();
        let index = mode === 'encrypt' ? alphabet.indexOf(lowerChar) : key.indexOf(lowerChar);

        if (index !== -1) {
            let newChar = mode === 'encrypt' ? key.charAt(index) : alphabet.charAt(index);
            result += isUpper ? newChar.toUpperCase() : newChar;
        } else {
            result += char;
        }
    }
    return result;
}

function vigenereCipher(text, key, mode) {
    if (!key.match(/^[a-zA-Z]+$/)) return "Error: Kunci Vigenere harus berupa huruf!";
    text = text.replace(/[^a-zA-Z]/g, ''); 
    key = key.toUpperCase();
    
    let result = "";
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);
        let isUpper = charCode >= 65 && charCode <= 90;
        let base = isUpper ? 65 : 97;
        let shift = key.charCodeAt(keyIndex % key.length) - 65;
        
        if (mode === 'decrypt') shift = -shift;
        
        result += String.fromCharCode(mod(charCode - base + shift, 26) + base);
        keyIndex++;
    }
    return result;
}

function otpCipher(text, key, mode) {
    text = text.replace(/[^a-zA-Z]/g, ''); 
    if (key.length < text.length) return "Error: Kunci OTP kurang panjang!";
    return vigenereCipher(text, key, mode); 
}

function affineCipher(text, key, mode) {
    let parts = key.split(',');
    if (parts.length !== 2) return "Error: Kunci Affine berformat 'a,b' (contoh: 5,8).";
    let a = parseInt(parts[0].trim());
    let b = parseInt(parts[1].trim());
    if (isNaN(a) || isNaN(b)) return "Error: Kunci 'a' dan 'b' harus angka!";
    if (gcd(a, 26) !== 1) return "Error: Nilai 'a' tidak relatif prima dengan 26!";

    text = text.replace(/[^a-zA-Z]/g, '').toUpperCase();
    let a_inv = modInverse(a, 26);
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i) - 65;
        let newCode = mode === 'encrypt' ? mod((a * charCode) + b, 26) : mod(a_inv * (charCode - b), 26);
        result += String.fromCharCode(newCode + 65);
    }
    return result;
}

function hillCipher(text, key, mode) {
    text = text.replace(/[^a-zA-Z]/g, '').toUpperCase();
    key = key.replace(/[^a-zA-Z]/g, '').toUpperCase();
    let size = Math.sqrt(key.length);
    if (size % 1 !== 0) return "Error: Panjang kunci karakter harus kuadrat sempurna!";
    
    let K = []; let k_idx = 0;
    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            row.push(key.charCodeAt(k_idx) - 65);
            k_idx++;
        }
        K.push(row);
    }
    
    let det = Math.round(math.det(K));
    let detInv = modInverse(mod(det, 26), 26);
    if (detInv === -1) return "Error: Matriks kunci tidak memiliki invers mod 26.";
    
    let matrixToUse = K;
    if (mode === 'decrypt') {
        let invMatrix = math.inv(K);
        let adjugate = math.multiply(invMatrix, det);
        matrixToUse = adjugate.map(row => row.map(val => mod(Math.round(val) * detInv, 26)));
    }
    
    while (text.length % size !== 0) text += 'X';
    let result = "";
    for (let i = 0; i < text.length; i += size) {
        let block = [];
        for (let j = 0; j < size; j++) { block.push(text.charCodeAt(i + j) - 65); }
        let resBlock = math.multiply(matrixToUse, block);
        for (let j = 0; j < size; j++) {
            result += String.fromCharCode(mod(Math.round(resBlock[j]), 26) + 65);
        }
    }
    return result;
}

function permutationCipher(text, key, mode) {
    text = text.replace(/[^a-zA-Z]/g, '').toUpperCase();
    let kArray = key.split('').map(Number);
    if (kArray.some(isNaN)) return "Error: Kunci Permutation harus urutan angka!";
    let n = kArray.length;
    while (text.length % n !== 0) text += 'X'; 
    let result = "";
    for (let i = 0; i < text.length; i += n) {
        let block = text.slice(i, i + n);
        let newBlock = new Array(n);
        for (let j = 0; j < n; j++) {
            let pos = kArray[j] - 1; 
            if (pos >= 0 && pos < n) {
                if (mode === 'encrypt') newBlock[j] = block[pos];
                else newBlock[pos] = block[j];
            }
        }
        result += newBlock.join('');
    }
    return result;
}

// --- TAHAP 3: FUNGSI FILE & BYTE CIPHER ---

function executeByteAlgorithm(algo, bytes, key, mode) {
    // Memproses setiap byte (0-255) agar file biner/header tidak rusak
    let out = new Uint8Array(bytes.length);
    let keyBytes = new TextEncoder().encode(key); // Konversi kunci ke byte
    
    if (algo === 'shift') {
        let shift = parseInt(key) || 3;
        if (mode === 'decrypt') shift = -shift;
        for (let i = 0; i < bytes.length; i++) {
            out[i] = mod(bytes[i] + shift, 256);
        }
    } else {
        // Algoritma Vigenere/Generic Mod 256 untuk memproses file sembarang
        for (let i = 0; i < bytes.length; i++) {
            let shift = keyBytes[i % keyBytes.length];
            if (mode === 'decrypt') shift = -shift;
            out[i] = mod(bytes[i] + shift, 256);
        }
    }
    return out;
}

function downloadFile(bytes, filename, type) {
    const blob = new Blob([bytes], { type: type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function processFileCipher(bytes, originalName, algo, key, mode) {
    if (mode === 'encrypt') {
        // Simpan ekstensi asli ke dalam file terenkripsi dengan format "EXT:.xxx|"
        let originalExtension = originalName.includes('.') ? originalName.substring(originalName.lastIndexOf('.')) : '.txt';
        let metadata = originalExtension + "|"; 
        
        let metaBytes = new TextEncoder().encode(metadata);
        let combinedBytes = new Uint8Array(metaBytes.length + bytes.length);
        combinedBytes.set(metaBytes);
        combinedBytes.set(bytes, metaBytes.length);
        
        // Enkripsi byte yang sudah digabung
        let resultBytes = executeByteAlgorithm(algo, combinedBytes, key, mode);
        downloadFile(resultBytes, "cipherteks.dat", "application/octet-stream"); // Format file cipherteks bebas (.dat)
        
    } else {
        // Dekripsi keseluruhan byte
        let decryptedCombined = executeByteAlgorithm(algo, bytes, key, mode);
        
        // Memisahkan metadata ekstensi asli ("EXT:.xxx|") dari isi byte file
        let decString = new TextDecoder().decode(decryptedCombined.slice(0, 50)); 
        let metaEndIndex = decString.indexOf("|");
        
        if (metaEndIndex === -1) {
            alert("Error: File ini tidak cocok atau salah kunci dekripsi!");
            return;
        }
        
        let ext = decString.substring(0, metaEndIndex);
        let actualFileBytes = decryptedCombined.slice(metaEndIndex + 1);
        
        // Kembalikan file ke ekstensi semula
        downloadFile(actualFileBytes, "plainteks_hasil" + ext, "application/octet-stream");
    }
}


// --- FUNGSI UTAMA PEMROSESAN (DIGABUNG TEKS & FILE) ---
function processCipher(action) {
    const inputType = document.querySelector('input[name="inputType"]:checked').value;
    const algorithm = document.getElementById('cipherAlgorithm').value;
    const key = document.getElementById('cipherKey').value;
    
    if (inputType === 'text') {
        const text = document.getElementById('plaintextContent').value;
        if (text.trim() === '') return alert('Pesan teks tidak boleh kosong!');
        if (algorithm === 'otp') {
            const otpFile = document.getElementById('otpFileUpload').files[0];
            if (!otpFile) return alert("Unggah file kunci (.txt) untuk OTP!");
            const reader = new FileReader();
            reader.onload = function(e) {
                const otpKeyText = e.target.result.replace(/[^a-zA-Z]/g, '');
                executeTextAlgorithm(algorithm, text, otpKeyText, action);
            };
            reader.readAsText(otpFile);
            return;
        }
        if (key.trim() === '') return alert('Kunci tidak boleh kosong!');
        executeTextAlgorithm(algorithm, text, key, action);

    } else {
        // PEMROSESAN FILE SEMBARANG
        const file = document.getElementById('fileUpload').files[0];
        if (!file) return alert("Pilih file yang ingin diproses terlebih dahulu!");
        if (key.trim() === '') return alert('Kunci file tidak boleh kosong!');
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const arrayBuffer = e.target.result;
            const bytes = new Uint8Array(arrayBuffer);
            processFileCipher(bytes, file.name, algorithm, key, action);
        };
        reader.readAsArrayBuffer(file); // Membaca file sebagai byte biner murni
    }
}

function executeTextAlgorithm(algo, text, key, mode) {
    let result = "";
    switch (algo) {
        case 'shift': result = shiftCipher(text, key, mode); break;
        case 'substitution': result = substitutionCipher(text, key, mode); break;
        case 'vigenere': result = vigenereCipher(text, key, mode); break;
        case 'otp': result = otpCipher(text, key, mode); break;
        case 'affine': result = affineCipher(text, key, mode); break;
        case 'hill': result = hillCipher(text, key, mode); break;
        case 'permutation': result = permutationCipher(text, key, mode); break;
    }

    if (result.startsWith("Error")) return alert(result);

    currentRawOutput = result;
    formatOutput(); 
}

// Fitur Menyimpan Output Teks ke File
function saveOutputToFile() {
    const outputText = document.getElementById('outputContent').value;
    if (outputText.trim() === "") {
        return alert("Tidak ada hasil yang bisa disimpan!");
    }
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "hasil_cipher.txt";
    a.click();
    URL.revokeObjectURL(url);
}