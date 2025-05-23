import { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  /* ────────────────  MASTER DATA WILAYAH  ─────────────── */
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  /* ────────────────  PILIHAN WILAYAH (NAMA)  ──────────── */
  const [provinceName, setProvinceName] = useState("");
  const [cityName, setCityName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [villageName, setVillageName] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  /* id disimpan terpisah (hanya untuk fetch) */
  const [provinceId, setProvinceId] = useState("");
  const [cityId, setCityId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [tempCities, setTempCities] = useState([]);
  const [tempDistricts, setTempDistricts] = useState([]);
  const [tempVillages, setTempVillages] = useState([]);

  /* —— FLAG: alamat sementara sama? (default = true) —— */
  const [sameAddress, setSameAddress] = useState(false);

  /* —— State alamat-sementara (nama & id, mirip domisili) —— */
  const [tempProvinceName, setTempProvinceName] = useState("");
  const [tempProvinceId, setTempProvinceId] = useState("");

  const [tempCityName, setTempCityName] = useState("");
  const [tempCityId, setTempCityId] = useState("");

  const [tempDistrictName, setTempDistrictName] = useState("");
  const [tempDistrictId, setTempDistrictId] = useState("");

  const [tempVillageName, setTempVillageName] = useState("");
  const [tempDetail, setTempDetail] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://pozzdol.github.io/api-wilayah-indonesia/api/provinces.json"
        );
        setProvinces(data);
      } catch (err) {
        console.error("Gagal mengambil provinsi:", err);
      }
    })();
  }, []);

  useEffect(() => {
    if (!provinceId) {
      setCities([]);
      setCityId("");
      setCityName("");
      return;
    }

    const ctl = new AbortController();
    (async () => {
      try {
        const { data } = await axios.get(
          `https://pozzdol.github.io/api-wilayah-indonesia/api/regencies/${provinceId}.json`,
          { signal: ctl.signal }
        );
        setCities(data);
      } catch (err) {
        if (!axios.isCancel(err)) console.error("Gagal mengambil kota:", err);
      }
    })();

    return () => ctl.abort();
  }, [provinceId]);

  useEffect(() => {
    if (!cityId) {
      setDistricts([]);
      setDistrictId("");
      setDistrictName("");
      return;
    }

    const ctl = new AbortController();
    (async () => {
      try {
        const { data } = await axios.get(
          `https://pozzdol.github.io/api-wilayah-indonesia/api/districts/${cityId}.json`,
          { signal: ctl.signal }
        );
        setDistricts(data);
      } catch (err) {
        if (!axios.isCancel(err))
          console.error("Gagal mengambil kecamatan:", err);
      }
    })();

    return () => ctl.abort();
  }, [cityId]);

  useEffect(() => {
    if (!districtId) {
      setVillages([]);
      setVillageName("");
      return;
    }

    const ctl = new AbortController();
    (async () => {
      try {
        const { data } = await axios.get(
          `https://pozzdol.github.io/api-wilayah-indonesia/api/villages/${districtId}.json`,
          { signal: ctl.signal }
        );
        setVillages(data);
      } catch (err) {
        if (!axios.isCancel(err))
          console.error("Gagal mengambil kelurahan:", err);
      }
    })();

    return () => ctl.abort();
  }, [districtId]);

  /* ────────────────  HANDLERS WILAYAH  ────────────────── */
  const handleProvinceChange = (e) => {
    const name = e.target.value;
    const id = e.target.selectedOptions[0].dataset.id;

    setProvinceName(name);
    setProvinceId(id);

    /* reset level di bawah */
    setCityName("");
    setCityId("");
    setDistrictName("");
    setDistrictId("");
    setVillageName("");
  };

  const handleCityChange = (e) => {
    const name = e.target.value;
    const id = e.target.selectedOptions[0].dataset.id;

    setCityName(name);
    setCityId(id);

    setDistrictName("");
    setDistrictId("");
    setVillageName("");
  };

  const handleDistrictChange = (e) => {
    const name = e.target.value;
    const id = e.target.selectedOptions[0].dataset.id;

    setDistrictName(name);
    setDistrictId(id);

    setVillageName("");
  };

  const handleVillageChange = (e) => {
    setVillageName(e.target.value);
    /* detail address selalu diisi manual → tidak perlu id di sini */
  };

  /* —— copy otomatis jika centang “sama” —— */
  useEffect(() => {
    if (sameAddress) {
      setTempProvinceName(provinceName);
      setTempProvinceId(provinceId);
      setTempCityName(cityName);
      setTempCityId(cityId);
      setTempDistrictName(districtName);
      setTempDistrictId(districtId);
      setTempVillageName(villageName);
      setTempDetail(detailAddress);
    }
  }, [
    sameAddress,
    provinceName,
    provinceId,
    cityName,
    cityId,
    districtName,
    districtId,
    villageName,
    detailAddress,
  ]);

  useEffect(() => {
    if (sameAddress) {
      setAlamatSementara(alamatDomisili); // copy
    } else if (
      tempVillageName &&
      tempDetail // pastikan lengkap
    ) {
      setAlamatSementara(`${tempDetail}`);
    }
  }, [
    sameAddress,
    alamatDomisili,
    tempDetail,
    tempProvinceName,
    tempCityName,
    tempDistrictName,
    tempVillageName,
  ]);

  useEffect(() => {
    if (villageName && detailAddress) {
      setAlamatDomisili(`${detailAddress}`);
    }
  }, [detailAddress, villageName, districtName, cityName, provinceName]);

  /* 1️⃣  KOTA SEMENTARA  (depend: tempProvinceId) */
  useEffect(() => {
    if (!tempProvinceId) {
      setTempCities([]);
      setTempCityId("");
      setTempCityName("");
      return;
    }

    const ctl = new AbortController();
    (async () => {
      try {
        /* kota = regencies/{provinceId}.json */
        const { data } = await axios.get(
          `https://pozzdol.github.io/api-wilayah-indonesia/api/regencies/${tempProvinceId}.json`,
          { signal: ctl.signal }
        );
        setTempCities(data);
      } catch (err) {
        if (!axios.isCancel(err))
          console.error("Gagal mengambil kota sementara:", err);
      }
    })();

    return () => ctl.abort();
  }, [tempProvinceId]);

  /* 2️⃣  KECAMATAN SEMENTARA  (depend: tempCityId) */
  useEffect(() => {
    if (!tempCityId) {
      setTempDistricts([]);
      setTempDistrictId("");
      setTempDistrictName("");
      return;
    }

    const ctl = new AbortController();
    (async () => {
      try {
        /* kecamatan = districts/{cityId}.json */
        const { data } = await axios.get(
          `https://pozzdol.github.io/api-wilayah-indonesia/api/districts/${tempCityId}.json`,
          { signal: ctl.signal }
        );
        setTempDistricts(data);
      } catch (err) {
        if (!axios.isCancel(err))
          console.error("Gagal mengambil kecamatan sementara:", err);
      }
    })();

    return () => ctl.abort();
  }, [tempCityId]);

  /* 3️⃣  DESA SEMENTARA  (depend: tempDistrictId) */
  useEffect(() => {
    if (!tempDistrictId) {
      setTempVillages([]);
      setTempVillageName("");
      return;
    }

    const ctl = new AbortController();
    (async () => {
      try {
        /* desa = villages/{districtId}.json */
        const { data } = await axios.get(
          `https://pozzdol.github.io/api-wilayah-indonesia/api/villages/${tempDistrictId}.json`,
          { signal: ctl.signal }
        );
        setTempVillages(data);
      } catch (err) {
        if (!axios.isCancel(err))
          console.error("Gagal mengambil desa sementara:", err);
      }
    })();

    return () => ctl.abort();
  }, [tempDistrictId]);

  // Handler untuk checkbox kesibukan
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setKesibukan((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const resetForm = () => {
    setNama("");
    setNoWa("");
    setTempatLahir("");
    setTanggalLahir("");
    setTahunMasuk("");
    setTahunKeluar("");
    setStatus("");
    setKesibukan([]);
    setNamaInstansi("");

    /* alamat domisili */
    setProvinceName("");
    setProvinceId("");
    setCityName("");
    setCityId("");
    setDistrictName("");
    setDistrictId("");
    setVillageName("");
    setDetailAddress("");
    setAlamatDomisili("");

    /* alamat sementara */
    setSameAddress(false); // kembali centang “sama”
    setTempProvinceName("");
    setTempProvinceId("");
    setTempCityName("");
    setTempCityId("");
    setTempDistrictName("");
    setTempDistrictId("");
    setTempVillageName("");
    setTempDetail("");
    setAlamatSementara("");
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    /* ①  Tentukan mana “alamat_lengkap” (alamat sekarang)  */
    const isSame = sameAddress; // true → alamat sementara = domisili
    const fullAddress = isSame ? alamatDomisili : alamatSementara;

    /* ②  Payload persis seperti yang diminta Apps Script  */
    const payload = {
      /* wajib                                     */
      no_hp: noWa,
      nama,
      alamat_lengkap: alamatDomisili,
      desa_lengkap: villageName,
      kecamatan_lengkap: districtName,
      kota_lengkap: cityName,
      provinsi_lengkap: provinceName,
      tempat_lahir: tempatLahir,
      tanggal_lahir: tanggalLahir,
      kesibukan, // array OK (Apps Script join sendiri)

      /* opsional                                 */
      masuk: tahunMasuk,
      keluar: tahunKeluar,
      mondok: status,
      nama_instansi: namaInstansi,

      /* set domisili  (tetap dikirim walau sama) */
      alamat_domisili: fullAddress, // ← hasil ① atau ②
      desa_domisili: isSame ? villageName : tempVillageName,
      kecamatan_domisili: isSame ? districtName : tempDistrictName,
      kota_domisili: isSame ? cityName : tempCityName,
      provinsi_domisili: isSame ? provinceName : tempProvinceName,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", payload }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setResult(data);

      if (data.success) {
        resetForm();
        navigate(`/halo/${encodeURIComponent(nama)}`, {
          replace: true,
          state: { fromForm: true, nama },
        });
      } else {
        throw new Error(data.msg || "Gagal menyimpan di server");
      }
    } catch (err) {
      /* fallback offline / jaringan putus */
      if (
        err.message.includes("Failed to fetch") ||
        err.message.includes("Load failed")
      ) {
        alert("Data disimpan secara offline (fallback)");
        resetForm();
        navigate(`/halo/${encodeURIComponent(nama)}`, {
          replace: true,
          state: { fromForm: true, nama },
        });
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
        <div className="flex flex-col border border-gray-600/50 rounded-2xl p-4 gap-4">
          <label htmlFor="alamat_domisili">
            Alamat Lengkap (sesuai KTP)<span className="text-red-500">*</span>
          </label>
          {/* === PILIHAN PROVINSI === */}
          <select
            id="provinsi"
            value={provinceName}
            onChange={handleProvinceChange}
            required
            className="w-full bg-transparent text-gray-200 border border-gray-600/50 rounded-md px-4 py-2 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          >
            <option value="" disabled hidden>
              Pilih Provinsi
            </option>
            {provinces.map((prov) => (
              <option
                key={prov.id}
                value={prov.name} /* ← nama tersimpan */
                data-id={prov.id} /* ← id untuk fetch */
                className="text-gray-900"
              >
                {prov.name}
              </option>
            ))}
          </select>

          {/* === PILIHAN KOTA (hanya jika provinsi dipilih) === */}
          {provinceName && (
            <select
              id="kota"
              value={cityName}
              onChange={handleCityChange}
              required
              className="w-full bg-transparent text-gray-200 border border-gray-600/50 rounded-md px-4 py-2 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            >
              <option value="" disabled hidden>
                Pilih Kota
              </option>
              {cities.map((city) => (
                <option
                  key={city.id}
                  value={city.name}
                  data-id={city.id}
                  className="text-gray-900"
                >
                  {city.name}
                </option>
              ))}
            </select>
          )}

          {/* === PILIHAN KECAMATAN === */}
          {cityName && (
            <select
              id="kecamatan"
              value={districtName}
              onChange={handleDistrictChange}
              required
              className="w-full bg-transparent text-gray-200 border border-gray-600/50 rounded-md px-4 py-2 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            >
              <option value="" disabled hidden>
                Pilih Kecamatan
              </option>
              {districts.map((dis) => (
                <option
                  key={dis.id}
                  value={dis.name}
                  data-id={dis.id}
                  className="text-gray-900"
                >
                  {dis.name}
                </option>
              ))}
            </select>
          )}

          {/* === PILIHAN DESA === */}
          {districtName && (
            <select
              id="desa"
              value={villageName}
              onChange={handleVillageChange}
              required
              className="w-full bg-transparent text-gray-200 border border-gray-600/50 rounded-md px-4 py-2 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            >
              <option value="" disabled hidden>
                Pilih Desa
              </option>
              {villages.map((vil) => (
                <option key={vil.id} value={vil.name} className="text-gray-900">
                  {vil.name}
                </option>
              ))}
            </select>
          )}

          {/* === INPUT DETAIL ALAMAT === */}
          {villageName && (
            <input
              type="text"
              id="detail"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              required
              placeholder="No. Rumah, RT, RW, Dusun (Contoh: Jl. Melati No. 12 RT 03/RW 05)"
              className="w-full mt-4 bg-transparent text-gray-200 placeholder-gray-500 border border-gray-600/50 rounded-md px-4 py-2 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          )}
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <span className="mb-1 text-sm text-gray-300">
            Pernah Mondok?<span className="text-red-500">*</span>
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
              Pernah
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
              Tidak
            </label>
          </div>
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
              min="2000"
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
              min="2015"
              max="2100"
              placeholder="YYYY"
              required
              className="w-full bg-transparent border border-gray-600/50 rounded-md px-4 py-2 placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
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

        <label className="inline-flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={sameAddress}
            onChange={(e) => setSameAddress(e.target.checked)}
            className="accent-amber-500"
          />
          Alamat saat ini sama dengan alamat lengkap
        </label>
        {!sameAddress && (
          <div className="flex flex-col border border-gray-600/50 rounded-2xl p-4 gap-4">
            <label htmlFor="tempAlamat">Alamat Domisili</label>

            {/* PROVINSI SEMENTARA */}
            <select
              value={tempProvinceName}
              onChange={(e) => {
                setTempProvinceName(e.target.value);
                setTempProvinceId(e.target.selectedOptions[0].dataset.id);
                /* reset level bawah */
                setTempCityName("");
                setTempCityId("");
                setTempDistrictName("");
                setTempDistrictId("");
                setTempVillageName("");
              }}
              className="w-full bg-transparent text-gray-200 border border-gray-600/50 rounded-md px-4 py-2 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            >
              <option value="" disabled hidden>
                Pilih Provinsi (domisili)
              </option>
              {provinces.map((prov) => (
                <option
                  key={prov.id}
                  value={prov.name}
                  data-id={prov.id}
                  className="text-gray-900"
                >
                  {prov.name}
                </option>
              ))}
            </select>

            {/* KOTA SEMENTARA */}
            {tempProvinceName && (
              <select
                value={tempCityName}
                onChange={(e) => {
                  setTempCityName(e.target.value);
                  setTempCityId(e.target.selectedOptions[0].dataset.id);
                  setTempDistrictName("");
                  setTempDistrictId("");
                  setTempVillageName("");
                }}
                className="w-full bg-transparent text-gray-200 border border-gray-600/50 rounded-md px-4 py-2 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              >
                <option value="" disabled hidden>
                  Pilih Kota (domisili)
                </option>
                {tempCities.map((city) => (
                  <option
                    key={city.id}
                    value={city.name} /* kirim NAMA */
                    data-id={city.id} /* simpan id utk fetch selanjutnya */
                    className="text-gray-900"
                  >
                    {city.name}
                  </option>
                ))}
              </select>
            )}

            {/* KECAMATAN SEMENTARA */}
            {tempCityName && (
              <select
                value={tempDistrictName}
                onChange={(e) => {
                  setTempDistrictName(e.target.value);
                  setTempDistrictId(e.target.selectedOptions[0].dataset.id);

                  /* reset hanya anak level ↓ */
                  setTempVillageName("");
                }}
                className="w-full bg-transparent text-gray-200 border border-gray-600/50 rounded-md px-4 py-2 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              >
                <option value="" disabled hidden>
                  Pilih Kecamatan (domisili)
                </option>

                {tempDistricts.map((district) => (
                  <option
                    key={district.id}
                    value={district.name} /* kirim NAMA */
                    data-id={district.id} /* id utk fetch desa */
                    className="text-gray-900"
                  >
                    {district.name}
                  </option>
                ))}
              </select>
            )}

            {/* DESA SEMENTARA */}
            {tempDistrictName && (
              <select
                value={tempVillageName}
                onChange={(e) => {
                  /* simpan NAMA desa terpilih */
                  setTempVillageName(e.target.value);

                  /* ⬇ TIDAK ADA level anak, jadi tidak perlu reset apa pun */
                }}
                className="w-full bg-transparent text-gray-200 border border-gray-600/50 rounded-md px-4 py-2 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              >
                <option value="" disabled hidden>
                  Pilih Desa (domisili)
                </option>

                {tempVillages.map((village) => (
                  <option
                    key={village.id}
                    value={village.name} /* kirim NAMA */
                    data-id={village.id} /* id—jika suatu saat dibutuhkan */
                    className="text-gray-900"
                  >
                    {village.name}
                  </option>
                ))}
              </select>
            )}

            {/* DETAIL SEMENTARA */}
            {tempVillageName && (
              <input
                type="text"
                value={tempDetail}
                onChange={(e) => setTempDetail(e.target.value)}
                placeholder="Detail alamat domisili: No./RT/RW"
                className="w-full bg-transparent text-gray-200 placeholder-gray-500 border border-gray-600/50 rounded-md px-4 py-2 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            )}
          </div>
        )}

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
