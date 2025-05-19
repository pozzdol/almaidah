import { useLocation, Navigate } from 'react-router-dom'

export default function Halo() {
  const location = useLocation()
  const { fromForm, nama } = location.state || {}

   if (!fromForm) {
    return <Navigate to="/" replace />
  }

  const handleClick = () => {
    alert("Website ALMAIDAH belum terbuat, developer masih sibuk, hehe😁");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center bg-neutral-950 max-w-[768px] w-[90%] my-8 md:my-0 mx-auto p-8 border-t-[2px] border-b-[2px] border-l-[2px] border-r-[2px] border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.25)] overflow-auto rounded-lg">
        {/* Logo */}
        <div className="flex justify-center items-center gap-4 mb-5">
          <img src="/img/logo.png" alt="ALMAIDAH" className="w-16" />
          <img
            src="/img/logo-dh.png"
            alt="DARUL HIKMAH"
            className="w-12 h-12"
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl text-center font-bold bg-gradient-to-br from-amber-300 to-amber-500 bg-clip-text text-transparent">
          Halo {nama}!
        </h1>

        {/* Message */}
        <div className="space-y-3 text-center text-gray-300 leading-relaxed">
          <p>Terima kasih telah melakukan pengisian pendataan kami.</p>
          <p>
            Untuk informasi lebih lanjut, silakan bergabung dengan grup ALMAIDAH
            atau kunjungi website kami.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
          <a
            href="https://chat.whatsapp.com/FMkTtVBIPKLBM4CauxXLcC"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-br from-amber-300 to-amber-500 text-neutral-950 font-semibold py-2 px-6 rounded-lg shadow-md hover:brightness-110 transition"
          >
            Join Grup WA
          </a>

          <button
            onClick={handleClick}
            className="inline-block border-2 border-amber-500 text-amber-500 font-semibold py-2 px-6 rounded-lg hover:bg-amber-500/10 transition"
          >
            Kunjungi Website
          </button>
        </div>
      </div>
    </div>
  );
}
