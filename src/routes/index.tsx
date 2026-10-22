import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, PenLine, Printer, Share2 } from "lucide-react";
import { Lampiran, Surat } from "@/components/surat-undangan";
import {
  ACARA,
  DETAIL_AWAL,
  buatTeks,
  hariMenuju,
  muatDetail,
  simpanDetail,
  type DetailUndangan,
} from "@/lib/acara";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [detail, setDetail] = useState<DetailUndangan>(DETAIL_AWAL);
  const [siap, setSiap] = useState(false);
  const [buka, setBuka] = useState(false);
  const [tersalin, setTersalin] = useState(false);
  const [teksGagal, setTeksGagal] = useState(false);
  const [sisaHari, setSisaHari] = useState<number | null>(null);

  useEffect(() => {
    setDetail(muatDetail());
    setSisaHari(hariMenuju(ACARA.iso));
    setSiap(true);
  }, []);

  useEffect(() => {
    if (!siap) return;
    simpanDetail(detail);
  }, [detail, siap]);

  function ubah(kunci: keyof DetailUndangan, nilai: string) {
    setDetail((sekarang) => ({ ...sekarang, [kunci]: nilai }));
  }

  async function bagikan() {
    const teks = buatTeks(detail);
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: "Undangan Praktik Nikah", text: teks });
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(teks);
      setTersalin(true);
      setTeksGagal(false);
      window.setTimeout(() => setTersalin(false), 2200);
    } catch {
      setTeksGagal(true);
    }
  }

  const belumLengkap = detail.waktu.trim() === "" || detail.tempat.trim() === "";
  const hitung =
    sisaHari === null ? null : sisaHari > 0 ? `${sisaHari} hari lagi` : sisaHari === 0 ? "Hari ini" : "Telah berlalu";

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-3 py-6 sm:px-6 sm:py-10">
      <header className="no-print mb-6 text-center">
        <p className="text-sm tracking-crest uppercase text-paper/80">Panitia</p>
        <p className="mt-1 text-3xl leading-tight italic text-balance">Undangan Praktik Nikah</p>
        <p className="mt-2 text-lg text-paper/80">
          {ACARA.hari}, {ACARA.tanggal}
          {hitung ? ` · ${hitung}` : ""}
        </p>

        {belumLengkap ? (
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-paper/75 text-pretty">
            Waktu dan tempat belum ada di catatan. Lengkapi dulu supaya undangannya siap dibagikan.
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 border border-gold/50 bg-gold px-4 text-lg text-ink"
            aria-expanded={buka}
            onClick={() => setBuka((nilai) => !nilai)}
          >
            <PenLine className="size-4" aria-hidden="true" />
            Lengkapi
          </button>
          <a
            href="#susunan"
            className="inline-flex min-h-11 items-center gap-2 border border-gold/40 px-4 text-lg text-paper"
          >
            Susunan
          </a>
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 border border-gold/40 px-4 text-lg text-paper"
            onClick={() => void bagikan()}
          >
            {tersalin ? <Check className="size-4" aria-hidden="true" /> : <Share2 className="size-4" aria-hidden="true" />}
            {tersalin ? "Tersalin" : "Bagikan"}
          </button>
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 border border-gold/40 px-4 text-lg text-paper"
            onClick={() => window.print()}
          >
            <Printer className="size-4" aria-hidden="true" />
            Cetak
          </button>
        </div>
      </header>

      {buka ? (
        <form
          className="no-print sheet mx-auto mb-6 w-full max-w-2xl px-5 py-6 text-ink sm:px-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <p className="text-sm tracking-crest uppercase text-ink/60">Detail undangan</p>
          <div className="mt-4 grid gap-5">
            <Bidang
              label="Ditujukan kepada"
              value={detail.penerima}
              placeholder="Bapak/Ibu/Saudara/i"
              onChange={(nilai) => ubah("penerima", nilai)}
            />
            <Bidang
              label="Waktu"
              value={detail.waktu}
              placeholder="contoh: 08.00 WIB"
              onChange={(nilai) => ubah("waktu", nilai)}
            />
            <Bidang
              label="Tempat"
              value={detail.tempat}
              placeholder="contoh: Aula sekolah"
              onChange={(nilai) => ubah("tempat", nilai)}
            />
            <Bidang
              label="Sekolah atau instansi"
              value={detail.instansi}
              placeholder="opsional, contoh: SMK …"
              onChange={(nilai) => ubah("instansi", nilai)}
            />
          </div>
          <p className="mt-5 text-base leading-relaxed text-ink/60">
            Perubahan tersimpan di perangkat ini. Nama petugas diambil dari catatan dan tidak diubah di sini.
          </p>
        </form>
      ) : null}

      {teksGagal ? (
        <div className="no-print sheet mx-auto mb-6 w-full max-w-2xl px-5 py-6 text-ink sm:px-8">
          <p className="text-lg">Salin teks ini untuk dibagikan.</p>
          <textarea
            readOnly
            value={buatTeks(detail)}
            className="mt-3 h-64 w-full resize-none bg-transparent text-base leading-relaxed text-ink outline-none"
            onFocus={(e) => e.currentTarget.select()}
          />
        </div>
      ) : null}

      <div className="space-y-6 sm:space-y-8">
        <Surat detail={detail} />
        <Lampiran />
      </div>
    </main>
  );
}

function Bidang({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (nilai: string) => void;
}) {
  return (
    <label className="block">
      <span className="block text-sm tracking-crest uppercase text-ink/60">{label}</span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border-b border-ink/20 bg-transparent py-2 text-2xl text-ink outline-none placeholder:text-ink/30 focus:border-gold"
      />
    </label>
  );
}
