// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);
  return (
    <div
      className="
        flex flex-col items-center 
        bg-neutral-950 max-w-[768px] w-[90%] my-8 md:my-0
        border-t-[2px] border-b-[2px] md:border-t-0 md:border-b-0
        mx-auto p-8
        border-l-[2px] border-r-[2px] border-amber-500/25
        shadow-[0_0_30px_rgba(245,158,11,0.25)]
        overflow-auto
      "
    >
      {/* — Logo + Judul — */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center gap-4 mb-4">
          <img src="/img/logo.png" alt="ALMAIDAH" className="w-16" />
          <img
            src="/img/logo-dh.png"
            alt="DARUL HIKMAH"
            className="w-12 h-12"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-amber-400 mb-2 text-center">
          Form Pendataan Alumni
        </h1>
        <p className="text-center text-gray-400 max-w-md ">
          Data ini akan dipakai untuk menghitung jumlah alumni di suatu daerah
          agar perhitungan menjadi lebih akurat.
        </p>
      </div>

      {/* — Form — */}
      <form className="w-full space-y-6">
        {/* Baris 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Nama */}
          <div className="flex flex-col">
            <label htmlFor="nama" className="mb-1 text-sm text-gray-300">
              Nama Lengkap<span className="text-red-500">*</span>
            </label>
            <input
              id="nama"
              name="nama"
              type="text"
              required
              placeholder="Nama lengkap"
              className="
                w-full bg-transparent border border-gray-600/50 rounded-md px-4 py-2
                placeholder-gray-500 focus:outline-none
                focus:border-amber-500 focus:ring-1 focus:ring-amber-500
              "
            />
          </div>
          {/* No. WA */}
          <div className="flex flex-col">
            <label htmlFor="no_wa" className="mb-1 text-sm text-gray-300">
              No. WA<span className="text-red-500">*</span>
            </label>
            <input
              id="no_wa"
              name="no_wa"
              type="tel"
              required
              placeholder="08xxxxxxxxxx"
              className="
                w-full bg-transparent border border-gray-600/50 rounded-md px-4 py-2
                placeholder-gray-500 focus:outline-none
                focus:border-amber-500 focus:ring-1 focus:ring-amber-500
              "
            />
          </div>
        </div>

        {/* Baris 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Tempat Lahir */}
          <div className="flex flex-col">
            <label
              htmlFor="tempat_lahir"
              className="mb-1 text-sm text-gray-300"
            >
              Tempat Lahir<span className="text-red-500">*</span>
            </label>
            <input
              id="tempat_lahir"
              name="tempat_lahir"
              type="text"
              required
              placeholder="Tempat lahir"
              className="w-full bg-transparent border border-gray-600/50 rounded-md px-4 py-2 placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>
          {/* Tanggal Lahir */}
          <div className="flex flex-col">
            <label
              htmlFor="tanggal_lahir"
              className="mb-1 text-sm text-gray-300"
            >
              Tanggal Lahir<span className="text-red-500">*</span>
            </label>
            <input
              id="tanggal_lahir"
              name="tanggal_lahir"
              type="date"
              required
              className="w-full bg-transparent border border-gray-600/50 rounded-md px-4 py-2 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Alamat Domisili */}
        <div className="flex flex-col">
          <label
            htmlFor="alamat_domisili"
            className="mb-1 text-sm text-gray-300"
          >
            Alamat Domisili<span className="text-red-500">*</span>
          </label>
          <textarea
            id="alamat_domisili"
            name="alamat_domisili"
            rows={3}
            required
            placeholder="Alamat domisili"
            className="w-full bg-transparent border border-gray-600/50 rounded-md px-4 py-2 placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Tahun Masuk & Keluar */}
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="tahun_masuk" className="mb-1 text-sm text-gray-300">
              Tahun Masuk<span className="text-red-500">*</span>
            </label>
            <input
              id="tahun_masuk"
              name="tahun_masuk"
              type="number"
              min="2010"
              max="2100"
              placeholder="YYYY"
              required
              className="w-full bg-transparent border border-gray-600/50 rounded-md px-4 py-2 placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="tahun_keluar"
              className="mb-1 text-sm text-gray-300"
            >
              Tahun Keluar<span className="text-red-500">*</span>
            </label>
            <input
              id="tahun_keluar"
              name="tahun_keluar"
              type="number"
              min="2017"
              max="2100"
              placeholder="YYYY"
              required
              className="w-full bg-transparent border border-gray-600/50 rounded-md px-4 py-2 placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <span className="mb-1 text-sm text-gray-300">
            Status<span className="text-red-500">*</span>
          </span>
          <div className="flex justify-center items-center gap-8">
            <label className="flex  items-center text-gray-200">
              <input
                type="radio"
                name="status"
                value="mondok"
                required
                className="mr-2"
              />
              Mondok
            </label>
            <label className="flex items-center text-gray-200">
              <input
                type="radio"
                name="status"
                value="tidak_mondok"
                required
                className="mr-2"
              />
              Tidak Mondok
            </label>
          </div>
        </div>

        {/* Kesibukan */}
        <div className="flex flex-col">
          <span className="mb-1 text-sm text-gray-300">
            Kesibukan<span className="text-red-500">*</span>
          </span>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <label className="flex items-center text-gray-200">
              <input
                type="checkbox"
                name="kesibukan[]"
                value="bekerja"
                className="mr-2"
              />
              Bekerja
            </label>
            <label className="flex items-center text-gray-200">
              <input
                type="checkbox"
                name="kesibukan[]"
                value="kuliah"
                className="mr-2"
              />
              Kuliah
            </label>
            <label className="flex items-center text-gray-200">
              <input
                type="checkbox"
                name="kesibukan[]"
                value="belum_keduanya"
                className="mr-2"
              />
              Belum Keduanya
            </label>
          </div>
        </div>

        {/* Opsional */}
        <div className="flex flex-col">
          <label htmlFor="nama_instansi" className="mb-1 text-sm text-gray-300">
            Nama Instansi (isi jika memiliki kesibukan)
          </label>
          <input
            id="nama_instansi"
            name="nama_instansi"
            type="text"
            placeholder="Nama instansi"
            className="w-full bg-transparent border border-gray-600/50 rounded-md px-4 py-2 placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="alamat_sementara"
            className="mb-1 text-sm text-gray-300"
          >
            Alamat Sementara (isi jika tidak sama dengan domisili)
          </label>
          <input
            id="alamat_sementara"
            name="alamat_sementara"
            type="text"
            placeholder="Alamat sementara"
            className="w-full bg-transparent border border-gray-600/50 rounded-md px-4 py-2 placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="
            w-full bg-amber-500 text-black font-semibold py-3 rounded-md
            hover:brightness-110 transition
          "
        >
          Simpan Data
        </button>
      </form>
    </div>
  );
}

export default App;
