from pathlib import Path

INPUT_FILE = Path("cipher1.txt")
OUTPUT_FILE = Path("hasil_dekripsi.txt")
ALPHABET = "abcdefghijklmnopqrstuvwxyz"

# Kunci hasil kriptanalisis Kelompok 1.
# Setiap huruf pada cipherteks diganti menjadi huruf plaintext yang sesuai.
KEY_CIPHER_TO_PLAIN = dict(zip(
    ALPHABET,
    "rmfnyjeqduozspvklwhgtxcabi"
))


def main() -> None:
    if not INPUT_FILE.exists():
        raise FileNotFoundError(
            f"{INPUT_FILE} tidak ditemukan. Letakkan file cipher1.txt di folder yang sama."
        )

    cipher_text = INPUT_FILE.read_text(encoding="utf-8")
    plain_text = "".join(
        KEY_CIPHER_TO_PLAIN.get(char.lower(), char)
        for char in cipher_text
    )

    OUTPUT_FILE.write_text(plain_text, encoding="utf-8")

    print("=== DEKRIPSI SELESAI ===")
    print(f"Input  : {INPUT_FILE}")
    print(f"Output : {OUTPUT_FILE}")
    print("\nCuplikan hasil:")
    print(plain_text[:500])


if __name__ == "__main__":
    main()
