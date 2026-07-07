import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

export default function PasienDetail() {
    const { id } = useParams();
    const [pasien, setPasien] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPasien = async () => {
            setLoading(true);

            const { data, error } = await supabase
                .from("patients")
                .select("*")
                .eq("patientId", id)
                .single();

            if (error || !data) {
                setError("Pasien not found");
                setLoading(false);
                return;
            }

            setPasien(data);
            setLoading(false);
        };

        fetchPasien();
    }, [id]);

    if (error) return <div className="text-red-600 p-4">{error}</div>;
    if (loading) return <div className="p-4">Loading...</div>;
    if (!pasien) return <div className="p-4">Pasien tidak ditemukan</div>;

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg max-w-2xl mx-auto mt-6">
            <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    pasien.name
                )}&background=FDE2E4&color=D88C9A&size=400`}
                alt={pasien.name}
                className="rounded-xl mb-4 w-full h-56 object-cover"
            />

            <h2 className="text-3xl font-bold mb-2 text-[#5C5B7F]">
                {pasien.name}
            </h2>

            <p className="text-gray-600 mb-1">
                Patient ID: {pasien.patientId}
            </p>

            <p className="text-gray-600 mb-1">
                Age: {pasien.age}
            </p>

            <p className="text-gray-600 mb-1">
                Gender: {pasien.gender}
            </p>

            <p className="text-gray-600 mb-1">
                Phone: {pasien.phone}
            </p>

            <p className="text-gray-600 mb-1">
                Email: {pasien.email}
            </p>

            <p className="text-gray-600 mb-1">
                Treatment History: {pasien.treatmentHistory}
            </p>

            <p className="text-gray-600 mb-1">
                Allergies / Skin Type: {pasien.allergiesSkinType}
            </p>

            <p className="text-gray-600 mb-3">
                Last Visit: {pasien.lastVisit}
            </p>

            <div className="mt-3">
                <span
                    className={`px-4 py-2 rounded-full text-sm font-bold ${
                        pasien.membershipStatus === "Platinum"
                            ? "bg-purple-100 text-purple-400"
                            : pasien.membershipStatus === "Gold"
                            ? "bg-yellow-100 text-yellow-500"
                            : pasien.membershipStatus === "Silver"
                            ? "bg-gray-200 text-gray-500"
                            : "bg-pink-100 text-pink-400"
                    }`}
                >
                    {pasien.membershipStatus}
                </span>
            </div>
        </div>
    );
}