import { useEffect, useState } from "react";
import { MailOpen } from "lucide-react";
import { ACARA } from "@/lib/acara";

/** Satu periode gelombang = 600px, diulang 6x (3600px) supaya bisa bergeser mulus 1200px. */
const LEBAR_GELOMBANG = 3600;
const JALUR_GELOMBANG = `M0 60 Q150 20 300 60 ${Array.from({ length: 11 }, (_, i) => `T${(i + 2) * 300} 60`).join(" ")} L${LEBAR_GELOMBANG} 140 L0 140 Z`;

function Gelombang({ className, warna, tinggi }: { className: string; warna: string; tinggi: number }) {
  return (
    <div className="absolute inset-x-0 bottom-0 overflow-hidden" style={{ height: tinggi }} aria-hidden="true">
      <svg
        viewBox={`0 0 ${LEBAR_GELOMBANG} 140`}
        width={LEBAR_GELOMBANG}
        height={tinggi}
        preserveAspectRatio="none"
        className={`max-w-none ${className}`}
      >
        <path d={JALUR_GELOMBANG} fill={warna} />
      </svg>
    </div>
  );
}

export function Sampul({ onBuka, onSelesai }: { onBuka: () => void; onSelesai: () => void }) {
  const [keluar, setKeluar] = useState(false);

  useEffect(() => {
    const sebelumnya = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = sebelumnya;
    };
  }, []);

  function buka() {
    if (keluar) return;
    setKeluar(true);
    onBuka();
    window.setTimeout(onSelesai, 1100);
  }

  return (
    <div
      role="dialog"
      aria-label="Sampul undangan"
      className="sampul no-print fixed inset-0 z-50 overflow-hidden text-paper"
      style={{
        transform: keluar ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 1100ms cubic-bezier(0.7, 0, 0.2, 1)",
      }}
    >
      <Gelombang className="anim-gelombang-b" warna="#1d4ea8" tinggi={150} />
      <Gelombang className="anim-gelombang-a" warna="#0f3274" tinggi={110} />

      <div className="absolute inset-0 overflow-y-auto overflow-x-hidden">
        <div className="mx-auto flex min-h-full w-full max-w-md flex-col items-center justify-center px-6 pt-10 pb-40 text-center">
          <div className="relative grid size-52 place-items-center sm:size-60">
            {[0, 1.5, 3].map((tunda) => (
              <span
                key={tunda}
                aria-hidden="true"
                className="anim-riak absolute inset-0 rounded-full border border-sky/60"
                style={{ animationDelay: `${tunda + 1.2}s` }}
              />
            ))}
            <span
              aria-hidden="true"
              className="anim-putar absolute -inset-3 rounded-full border border-dashed border-sky/40"
            />
            <div className="anim-logo">
              <img
                src="/logo-samudra.png"
                alt="Logo SMK Samudra, Kabupaten Sukabumi"
                width={512}
                height={512}
                className="anim-apung size-44 object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)] sm:size-52"
              />
            </div>
          </div>

          <p className="anim-naik mt-8 text-lg text-sky" style={{ animationDelay: "1.4s" }}>
            Panitia SMK Samudra mengundang Anda ke
          </p>
          <p className="anim-naik mt-2 text-6xl leading-none italic text-balance sm:text-7xl" style={{ animationDelay: "1.7s" }}>
            {ACARA.judul}
          </p>
          <p className="anim-naik mt-4 text-xl text-paper/85" style={{ animationDelay: "2s" }}>
            {ACARA.hari}, {ACARA.tanggal}
          </p>

          <div className="anim-naik mt-9" style={{ animationDelay: "2.5s" }}>
            <button
              type="button"
              onClick={buka}
              className="anim-kilau inline-flex min-h-12 items-center gap-2 border border-gold bg-gold px-7 text-xl text-deep"
            >
              <MailOpen className="size-5" aria-hidden="true" />
              Buka undangan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
