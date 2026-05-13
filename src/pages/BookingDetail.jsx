import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import bookingData from "../data/booking.json"

export default function BookingDetail() {
    const { id } = useParams()
    const [booking, setBooking] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const foundBooking = bookingData.find(
            (b) => b.bookingId === id
        )

        if (!foundBooking) {
            setError("Booking not found")
            return
        }

        setBooking(foundBooking)
    }, [id])

    if (error) {
        return (
            <div className="text-red-600 p-4">
                {error}
            </div>
        )
    }

    if (!booking) {
        return (
            <div className="p-4">
                Loading...
            </div>
        )
    }

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg max-w-2xl mx-auto mt-6">
            <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    booking.patientName
                )}&background=FDE2E4&color=D88C9A&size=400`}
                alt={booking.patientName}
                className="rounded-xl mb-4 w-full h-56 object-cover"
            />

            <h2 className="text-3xl font-bold mb-2 text-[#5C5B7F]">
                {booking.patientName}
            </h2>

            <p className="text-gray-600 mb-1">
                Booking ID: {booking.bookingId}
            </p>

            <p className="text-gray-600 mb-1">
                Treatment Type: {booking.treatmentType}
            </p>

            <p className="text-gray-600 mb-1">
                Therapist / Doctor: {booking.therapistDoctor}
            </p>

            <p className="text-gray-600 mb-1">
                Date & Time: {booking.dateTime}
            </p>

            <div className="mt-4">
                <p className="text-sm font-semibold text-gray-500 mb-2">
                    Booking Status
                </p>

                <span
                    className={`px-4 py-2 rounded-full text-sm font-bold ${
                        booking.status === "Completed"
                            ? "bg-green-100 text-green-500"
                            : booking.status === "Scheduled"
                            ? "bg-yellow-100 text-yellow-500"
                            : booking.status === "Cancelled"
                            ? "bg-red-100 text-red-400"
                            : "bg-blue-100 text-blue-500"
                    }`}
                >
                    {booking.status}
                </span>
            </div>

            <div className="mt-4">
                <p className="text-sm font-semibold text-gray-500 mb-2">
                    Payment Status
                </p>

                <span
                    className={`px-4 py-2 rounded-full text-sm font-bold ${
                        booking.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-500"
                            : booking.paymentStatus === "Pending"
                            ? "bg-yellow-100 text-yellow-500"
                            : "bg-red-100 text-red-400"
                    }`}
                >
                    {booking.paymentStatus}
                </span>
            </div>
        </div>
    )
}