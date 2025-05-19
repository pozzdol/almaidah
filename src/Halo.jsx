import { useParams } from "react-router-dom";

export default function Halo() {
  const { nama } = useParams();
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Halo {nama}!</h1>
    </div>
  );
}
