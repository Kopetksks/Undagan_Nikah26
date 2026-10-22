import type { ReactNode } from "react";
import {
  ACARA,
  KELOMPOK,
  tampilPenerima,
  tampilTempat,
  tampilWaktu,
  type DetailUndangan,
} from "@/lib/acara";

function Khatam() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <rect x="6.2" y="6.2" width="11.6" height="11.6" />
      <rect x="6.2" y="6.2" width="11.6" height="11.6" transform="rotate(45 12 12)" />
    </svg>
  );
}

function Garis() {
  return (
    <div className="flex items-center gap-3 text-gold">
      <span className="h-px flex-1 bg-gold/60" />
      <Khatam />
      <span className="h-px flex-1 bg-gold/60" />
    </div>
  );
}

function Bingkai({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <article id={id} className="sheet mx-auto w-full max-w-2xl text-ink">
      <div className="m-2.5 border border-gold/70 sm:m-3.5">
        <div className="mx-1.5 my-1.5 px-5 py-8 sm:px-12 sm:py-12">{children}</div>
      </div>
    </article>
  );
}

export function Surat({ detail }: { detail: DetailUndangan }) {
  const instansi = detail.instansi.trim();
  const penerimaKosong = detail.penerima.trim() === "";
  const waktuKosong = detail.waktu.trim() === "";
  const tempatKosong = detail.tempat.trim() === "";

  return (
    <Bingkai>
      {instansi ? (
        <p className="text-center text-sm tracking-crest uppercase">{instansi}</p>
      ) : null}

      <p dir="rtl" className="mt-2 text-center font-arabic text-3xl leading-relaxed text-balance sm:text-4xl">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </p>

      <div className="mt-6">
        <Garis />
      </div>

      <p className="mt-6 text-center text-sm tracking-crest uppercase">Surat Undangan</p>
      <p className="mt-2 text-center text-sm text-ink/60">Nomor {ACARA.nomor}</p>

      <h1 className="mt-4 text-center text-5xl leading-none text-balance italic sm:text-6xl">Praktik Nikah</h1>

      <div className="mx-auto mt-8 max-w-md text-center text-xl leading-relaxed text-pretty">
        <p>Kepada Yth.</p>
        <p className={penerimaKosong ? "text-2xl italic text-ink/65" : "text-2xl"}>{tampilPenerima(detail)}</p>
        <p className="text-ink/70">di tempat</p>
      </div>

      <p className="mx-auto mt-8 max-w-md text-center text-lg leading-relaxed text-pretty">
        Assalamu'alaikum warahmatullahi wabarakatuh.
      </p>
      <p className="mx-auto mt-3 max-w-md text-center text-lg leading-relaxed text-pretty">
        Dengan hormat, kami panitia mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara Praktik Nikah yang insya
        Allah dilaksanakan pada:
      </p>

      <div className="mt-10 text-center">
        <p className="text-sm tracking-crest uppercase text-ink/60">{ACARA.hari}</p>
        <p className="mt-1 text-8xl leading-none">5</p>
        <p className="mt-2 text-2xl italic sm:text-3xl">November 2026</p>
      </div>

      <dl className="mx-auto mt-10 grid max-w-md gap-6 sm:grid-cols-2">
        <div className="text-center">
          <dt className="text-sm tracking-crest uppercase text-ink/60">Pukul</dt>
          <dd className={waktuKosong ? "mt-1 text-2xl italic text-ink/65" : "mt-1 text-2xl"}>{tampilWaktu(detail)}</dd>
        </div>
        <div className="text-center">
          <dt className="text-sm tracking-crest uppercase text-ink/60">Tempat</dt>
          <dd className={tempatKosong ? "mt-1 text-2xl italic text-ink/65 text-balance" : "mt-1 text-2xl text-balance"}>
            {tampilTempat(detail)}
          </dd>
        </div>
      </dl>

      <p className="mx-auto mt-10 max-w-md text-center text-lg leading-relaxed text-pretty">
        Kehadiran Bapak/Ibu/Saudara/i sangat kami nantikan. Atas perhatian dan kehadirannya, kami ucapkan terima kasih.
      </p>
      <p className="mt-4 text-center text-lg">Wassalamu'alaikum warahmatullahi wabarakatuh.</p>

      <div className="mt-12 grid grid-cols-2 gap-6 text-center">
        <div>
          <p className="text-sm tracking-wide text-ink/60">Ketua</p>
          <span className="mx-auto mt-10 block h-px w-24 bg-ink/30" />
          <p className="mt-2 text-xl">Johana Saputra</p>
          <p className="text-ink/60">XII TKR 2</p>
        </div>
        <div>
          <p className="text-sm tracking-wide text-ink/60">Sekretaris</p>
          <span className="mx-auto mt-10 block h-px w-24 bg-ink/30" />
          <p className="mt-2 text-xl text-balance">Ezra dan Aril</p>
        </div>
      </div>

      <p className="mt-10 text-center text-sm tracking-wide text-ink/50">
        {instansi || "Panitia Praktik Nikah"} · Oktober 2026
      </p>
    </Bingkai>
  );
}

export function Lampiran() {
  return (
    <Bingkai id="susunan">
      <p className="text-center text-sm tracking-crest uppercase">Lampiran</p>
      <h2 className="mt-3 text-center text-4xl leading-tight text-balance italic sm:text-5xl">Susunan Petugas</h2>
      <p className="mt-3 text-center text-lg text-ink/70">
        {ACARA.judul} · {ACARA.hari}, {ACARA.tanggal}
      </p>

      <div className="mt-8">
        <Garis />
      </div>

      <div className="mt-8 space-y-10">
        {KELOMPOK.map((kelompok) => (
          <section key={kelompok.judul}>
            <h3 className="text-center text-sm tracking-crest uppercase text-ink/60">{kelompok.judul}</h3>
            <ul className="mt-3">
              {kelompok.baris.map((baris) => (
                <li
                  key={`${kelompok.judul}-${baris.peran}-${baris.nama}`}
                  className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm tracking-wide uppercase text-ink/55">{baris.peran}</p>
                    {baris.kosong ? (
                      <p className="text-xl italic text-ink/65">Belum diisi</p>
                    ) : (
                      <p className="text-xl">{baris.nama}</p>
                    )}
                  </div>
                  {baris.kelas ? (
                    <p className="shrink-0 text-right text-base text-ink/70" title={baris.jurusan}>
                      {baris.kelas}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-10 text-center text-base leading-relaxed text-ink/60 text-pretty">
        Nama dan kelas mengikuti catatan panitia. Bagian sungkem belum tertulis, jadi tidak dikarang.
      </p>
    </Bingkai>
  );
}
