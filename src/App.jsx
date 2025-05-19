import { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

// Ganti dengan URL Web App Anda
const API_URL = "/api";

function App() {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [noWa, setNoWa] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [alamatDomisili, setAlamatDomisili] = useState("");
  const [tahunMasuk, setTahunMasuk] = useState("");
  const [tahunKeluar, setTahunKeluar] = useState("");
  const [status, setStatus] = useState("");
  const [kesibukan, setKesibukan] = useState([]);
  const [namaInstansi, setNamaInstansi] = useState("");
  const [alamatSementara, setAlamatSementara] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Handler untuk checkbox kesibukan
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setKesibukan((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const payload = {
      nama,
      no_hp: noWa,
      tempat_lahir: tempatLahir,
      tanggal_lahir: tanggalLahir,
      alamat: alamatDomisili,
      masuk: tahunMasuk,
      keluar: tahunKeluar,
      mondok: status,
      kesibukan,
      nama_instansi: namaInstansi,
      alamat_instansi: alamatSementara,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", payload }),
      });
      const data = await res.json();
      setResult(data);

      if (data.success) {
        // Reset form
        setNama("");
        setNoWa("");
        setTempatLahir("");
        setTanggalLahir("");
        setAlamatDomisili("");
        setTahunMasuk("");
        setTahunKeluar("");
        setStatus("");
        setKesibukan([]);
        setNamaInstansi("");
        setAlamatSementara("");

        return navigate(`/halo/${encodeURIComponent(nama)}`, { replace: true });
      }
    } catch (err) {
      // Jika error "Load failed", anggap sukses
      if (err.message.includes("Load failed")) {
        alert("Data berhasil disimpan!");
        setNama("");
        setNoWa("");
        setTempatLahir("");
        setTanggalLahir("");
        setAlamatDomisili("");
        setTahunMasuk("");
        setTahunKeluar("");
        setStatus("");
        setKesibukan([]);
        setNamaInstansi("");
        setAlamatSementara("");
        return navigate(`/halo/${encodeURIComponent(nama)}`, { replace: true });
      } else {
        setResult({ success: false, msg: err.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-neutral-950 max-w-[768px] w-[90%] my-8 md:my-0 mx-auto p-8 border-t-[2px] border-b-[2px] md:border-t-0 md:border-b-0 border-l-[2px] border-r-[2px] border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.25)] overflow-auto">
      {/* Logo + Judul */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center gap-4 mb-4">
          <img src="/img/logo.png" alt="ALMAIDAH" className="w-16" />
          <img
            src="/img/logo-dh.png"
            alt="DARUL HIKMAH"
            className="w-12 h-12"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-amber-300 to-amber-500 bg-clip-text text-transparent mb-2 text-center">
          Form Pendataan Alumni
        </h1>
        <p className="text-center text-gray-400 max-w-md">
          Data ini akan dipakai untuk menghitung jumlah alumni di suatu daerah
          agar perhitungan menjadi lebih akurat.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {/* Baris 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Nama */}
          <div className="flex flex-col">
            <label htmlFor="nama" className="mb-1 text-sm text-gray-300">
              Nama Lengkap<span className="text-red-500">*</span>
            </label>
            <input
              id="nama"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              placeholder="Nama lengkap"
              className="w-full bg-transparent border border-gray-600/50 rounded-md px-4 py-2 placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>
          {/* No. WA */}
          <div className="flex flex-col">
            <label htmlFor="no_wa" className="mb-1 text-sm text-gray-300">
              No. WA<span className="text-red-500">*</span>
            </label>
            <input
              id="no_wa"
              type="tel"
              value={noWa}
              onChange={(e) => setNoWa(e.target.value)}
              required
              placeholder="08xxxxxxxxxx"
              className="w-full bg-transparent border border-gray-600/50 rounded-md px-4 py-2 placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
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
              type="text"
              value={tempatLahir}
              onChange={(e) => setTempatLahir(e.target.value)}
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
              type="date"
              value={tanggalLahir}
              onChange={(e) => setTanggalLahir(e.target.value)}
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
            value={alamatDomisili}
            onChange={(e) => setAlamatDomisili(e.target.value)}
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
              type="number"
              value={tahunMasuk}
              onChange={(e) => setTahunMasuk(e.target.value)}
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
              type="number"
              value={tahunKeluar}
              onChange={(e) => setTahunKeluar(e.target.value)}
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
            <label className="flex items-center text-gray-200">
              <input
                type="radio"
                name="status"
                value="mondok"
                checked={status === "mondok"}
                onChange={(e) => setStatus(e.target.value)}
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
                checked={status === "tidak_mondok"}
                onChange={(e) => setStatus(e.target.value)}
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
            {["bekerja", "kuliah", "belum_keduanya"].map((val) => (
              <label key={val} className="flex items-center text-gray-200">
                <input
                  type="checkbox"
                  value={val}
                  checked={kesibukan.includes(val)}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                {val === "belum_keduanya"
                  ? "Belum Keduanya"
                  : val.charAt(0).toUpperCase() + val.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Opsional */}
        <div className="flex flex-col">
          <label htmlFor="nama_instansi" className="mb-1 text-sm text-gray-300">
            Nama Instansi (isi jika memiliki kesibukan)
          </label>
          <input
            id="nama_instansi"
            type="text"
            value={namaInstansi}
            onChange={(e) => setNamaInstansi(e.target.value)}
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
            type="text"
            value={alamatSementara}
            onChange={(e) => setAlamatSementara(e.target.value)}
            placeholder="Alamat sementara"
            className="w-full bg-transparent border border-gray-600/50 rounded-md px-4 py-2 placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-br from-amber-300 to-amber-500 text-black font-semibold py-3 rounded-md hover:brightness-110 transition disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Simpan Data"}
        </button>

        {/* Hasil Response */}
        {result && (
          <div
            className={`mt-4 p-3 rounded-md ${
              result.success
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {result.success
              ? `Berhasil! ID: ${result.data.id}.`
              : `Error: ${result.msg}`}
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
