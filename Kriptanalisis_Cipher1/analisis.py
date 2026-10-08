from collections import Counter
import re
from pathlib import Path

INPUT_FILE = Path("cipher1.txt")
OUTPUT_FILE = Path("analisis.txt")
ALPHABET = "abcdefghijklmnopqrstuvwxyz"

# Kunci hasil kriptanalisis untuk cipher1.txt.
# Format: huruf CIPHERTEXT -> huruf PLAINTEXT
KEY_CIPHER_TO_PLAIN = dict(zip(
    ALPHABET,
    "rmfnyjeqduozspvklwhgtxcabi"
))


def read_text(path: Path) -> str:
    if not path.exists():
        raise FileNotFoundError(f"File tidak ditemukan: {path}")
    return path.read_text(encoding="utf-8")


def decrypt_with_key(text: str) -> str:
    return "".join(KEY_CIPHER_TO_PLAIN.get(ch, ch) for ch in text.lower())


def main() -> None:
    try:
        text = read_text(INPUT_FILE)

        letters = [ch for ch in text.lower() if ch in ALPHABET]
        letter_count = Counter(letters)
        total_letters = len(letters)

        words = re.findall(r"[a-z]+", text.lower())
        word_count = Counter(words)

        lines = []
        lines.append("HASIL ANALISIS KRIPTANALISIS - KELOMPOK 1")
        lines.append("File : cipher1.txt")
        lines.append("Metode : Substitusi sederhana / Monoalphabetic Substitution Cipher")
        lines.append("")
        lines.append("1. FREKUENSI KEMUNCULAN HURUF")
        lines.append(f"Total huruf : {total_letters}")
        lines.append("")
        lines.append("Huruf | Jumlah | Persentase")
        lines.append("-" * 30)
        for letter, count in sorted(letter_count.items(), key=lambda item: (-item[1], item[0])):
            percentage = (count / total_letters * 100) if total_letters else 0
            lines.append(f"  {letter}   | {count:6d} | {percentage:6.2f}%")

        lines.append("")
        lines.append("2. KATA YANG PALING SERING MUNCUL")
        lines.append("")
        lines.append("Kata Cipher | Jumlah")
        lines.append("-" * 24)
        for word, count in word_count.most_common(20):
            lines.append(f"{word:12s} | {count}")

        lines.append("")
        lines.append("3. POLA KATA PENTING")
        lines.append("- 'qguuga' berulang dan setelah pengujian pola menjadi 'letter'.")
        lines.append("- 'usg' merupakan kata 3 huruf yang sangat sering muncul dan cocok menjadi 'the'.")
        lines.append("- 'mjymuzujuzkd' cocok menjadi 'substitution'.")
        lines.append("- 'wznsgam' cocok menjadi 'ciphers'.")
        lines.append("- 'mzbnqg' cocok menjadi 'simple'.")

        lines.append("")
        lines.append("4. KUNCI SUBSTITUSI YANG DIPEROLEH")
        lines.append("Cipher alphabet : " + ALPHABET)
        lines.append("Plain alphabet  : " + "rmfnyjeqduozspvklwhgtxcabi")
        lines.append("")
        lines.append("Mapping huruf (cipher -> plain):")
        lines.append("  a->r  b->m  c->f  d->n  e->y  f->j  g->e")
        lines.append("  h->q  i->d  j->u  k->o  l->z  m->s  n->p")
        lines.append("  o->v  p->k  q->l  r->w  s->h  t->g  u->t")
        lines.append("  v->x  w->c  x->a  y->b  z->i")

        lines.append("")
        lines.append("5. CONTOH VERIFIKASI")
        examples = [
            "mjymuzujuzkd wznsgam",
            "zd mzbnqg mjymuzujuzkd wznsgam",
            "usg qguuga",
            "x nxauzwjqxa qguuga"
        ]
        for example in examples:
            lines.append(f"  {example} -> {decrypt_with_key(example)}")

        lines.append("")
        lines.append("6. KESIMPULAN")
        lines.append("Analisis frekuensi digunakan untuk menemukan kandidat huruf, kemudian")
        lines.append("pola kata dan konteks kalimat digunakan untuk menguji dan melengkapi")
        lines.append("mapping substitusi. Kunci yang diperoleh dapat digunakan pada program")
        lines.append("deskripsi.py untuk menghasilkan plaintext.")

        OUTPUT_FILE.write_text("\n".join(lines) + "\n", encoding="utf-8")
        print(f"Berhasil membuat: {OUTPUT_FILE.resolve()}")

    except Exception as exc:
        print(f"ERROR: {exc}")
        raise SystemExit(1)


if __name__ == "__main__":
    main()
