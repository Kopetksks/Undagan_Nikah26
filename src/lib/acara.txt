export type DetailUndangan = {
  penerima: string;
  waktu: string;
  tempat: string;
  instansi: string;
};

export const DETAIL_AWAL: DetailUndangan = {
  penerima: "",
  waktu: "06.00 pagi",
  tempat: "SMKS SAMUDRA",
  instansi: "",
};

export const ACARA = {
  judul: "Praktik Nikah",
  hari: "Kamis",
  tanggal: "5 November 2026",
  iso: "2026-11-05",
  nomor: "01/UND-PN/XI/2026",
};

export type BarisPetugas = {
  peran: string;
  nama: string;
  kelas: string | null;
  jurusan?: string;
  kosong?: boolean;
};

export const KELOMPOK: { judul: string; baris: BarisPetugas[] }[] = [
  {
    judul: "Petugas akad",
    baris: [
      { peran: "Bapak Penghulu", nama: "Johana Saputra", kelas: "XII TKR 2", jurusan: "Teknik Kendaraan Ringan" },
      { peran: "Bapak pihak pria", nama: "Sigit", kelas: "XII TKJ 3", jurusan: "Teknik Komputer dan Jaringan" },
      { peran: "Ibu pihak pria", nama: "Dela Aulia", kelas: "XII Akuntansi", jurusan: "Akuntansi" },
      { peran: "Bapak pihak wanita", nama: "Ihsan", kelas: "XII TKR 2", jurusan: "Teknik Kendaraan Ringan" },
      { peran: "Ibu pihak wanita", nama: "Tiara Wiraguna", kelas: "XII TKJ 3", jurusan: "Teknik Komputer dan Jaringan" },
      { peran: "Saksi", nama: "Muhyi", kelas: "XII TKR 2", jurusan: "Teknik Kendaraan Ringan" },
      { peran: "Saksi", nama: "Parel", kelas: "XII TKJ 3", jurusan: "Teknik Komputer dan Jaringan" },
    ],
  },
  {
    judul: "Petugas acara",
    baris: [
      { peran: "Sambutan pihak wanita", nama: "Rehan", kelas: null },
      { peran: "Sambutan pihak pria", nama: "Rangga", kelas: "XII TKR 1", jurusan: "Teknik Kendaraan Ringan" },
      { peran: "MC", nama: "Shela", kelas: "XII AK", jurusan: "Akuntansi" },
      { peran: "MC", nama: "Aril", kelas: "XII TKJ 1", jurusan: "Teknik Komputer dan Jaringan" },
      { peran: "Qoriah", nama: "Asyad", kelas: "XII TKJ 1", jurusan: "Teknik Komputer dan Jaringan" },
      { peran: "Sungkem", nama: "", kelas: null, kosong: true },
    ],
  },
  {
    judul: "Panitia",
    baris: [
      { peran: "Ketua", nama: "Johana Saputra", kelas: "XII TKR 2", jurusan: "Teknik Kendaraan Ringan" },
      { peran: "Wakil Ketua", nama: "Dela Amelia", kelas: null },
      { peran: "Sekretaris", nama: "Ezra", kelas: "XII TKJ 1", jurusan: "Teknik Komputer dan Jaringan" },
      { peran: "Sekretaris", nama: "Aril", kelas: "XII TKJ 1", jurusan: "Teknik Komputer dan Jaringan" },
      { peran: "Bendahara", nama: "Ane", kelas: null },
      { peran: "Bendahara", nama: "Salsa", kelas: null },
    ],
  },
  {
    judul: "Seksi",
    baris: [
      { peran: "Seksi acara", nama: "XII AK", kelas: null, jurusan: "Akuntansi" },
      { peran: "Seksi kesenian", nama: "XII TKJ 1", kelas: null, jurusan: "Teknik Komputer dan Jaringan" },
      { peran: "Seksi peralatan hantaran", nama: "XII TKJ 3", kelas: null, jurusan: "Teknik Komputer dan Jaringan" },
      { peran: "Seksi logistik", nama: "XII TKR 1 dan 2", kelas: null, jurusan: "Teknik Kendaraan Ringan" },
      { peran: "Seksi konsumsi", nama: "XII TKJ 2", kelas: null, jurusan: "Teknik Komputer dan Jaringan" },
    ],
  },
];

const PENYIMPANAN = "undangan-praktik-nikah";

export function muatDetail(): DetailUndangan {
  try {
    const mentah = localStorage.getItem(PENYIMPANAN);
    if (!mentah) return DETAIL_AWAL;
    const data = JSON.parse(mentah) as Partial<DetailUndangan>;
    return {
      penerima: typeof data.penerima === "string" ? data.penerima : "",
      waktu: typeof data.waktu === "string" && data.waktu.trim() ? data.waktu : DETAIL_AWAL.waktu,
      tempat: typeof data.tempat === "string" && data.tempat.trim() ? data.tempat : DETAIL_AWAL.tempat,
      instansi: typeof data.instansi === "string" ? data.instansi : "",
    };
  } catch {
    return DETAIL_AWAL;
  }
}

export function simpanDetail(detail: DetailUndangan) {
  localStorage.setItem(PENYIMPANAN, JSON.stringify(detail));
}

export function tampilPenerima(detail: DetailUndangan) {
  return detail.penerima.trim() || "Bapak/Ibu/Saudara/i";
}

export function tampilWaktu(detail: DetailUndangan) {
  return detail.waktu.trim() || "Menyusul";
}

export function tampilTempat(detail: DetailUndangan) {
  return detail.tempat.trim() || "Menyusul";
}

export function buatTeks(detail: DetailUndangan) {
  const instansi = detail.instansi.trim();
  return [
    "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    "",
    "SURAT UNDANGAN",
    "Praktik Nikah",
    `Nomor: ${ACARA.nomor}`,
    ...(instansi ? ["", instansi] : []),
    "",
    "Assalamu'alaikum warahmatullahi wabarakatuh.",
    "",
    "Kepada Yth.",
    tampilPenerima(detail),
    "di tempat",
    "",
    "Dengan hormat,",
    "Kami panitia mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara Praktik Nikah yang insya Allah dilaksanakan pada:",
    "",
    `Hari, tanggal : ${ACARA.hari}, ${ACARA.tanggal}`,
    `Waktu         : ${tampilWaktu(detail)}`,
    `Tempat        : ${tampilTempat(detail)}`,
    "Acara         : Praktik Nikah",
    "",
    "Kehadiran Bapak/Ibu/Saudara/i sangat kami nantikan.",
    "Demikian undangan ini kami sampaikan. Atas perhatian dan kehadirannya, kami ucapkan terima kasih.",
    "",
    "Wassalamu'alaikum warahmatullahi wabarakatuh.",
    "",
    "Hormat kami,",
    instansi || "Panitia Praktik Nikah",
    "",
    "Ketua",
    "Johana Saputra",
    "XII TKR 2",
    "",
    "Sekretaris",
    "Ezra dan Aril",
  ].join("\n");
}

export function hariMenuju(iso: string) {
  const [tahun, bulan, hari] = iso.split("-").map(Number);
  const tujuan = new Date(tahun, bulan - 1, hari);
  const kini = new Date();
  const hariIni = new Date(kini.getFullYear(), kini.getMonth(), kini.getDate());
  return Math.round((tujuan.getTime() - hariIni.getTime()) / 86_400_000);
}
