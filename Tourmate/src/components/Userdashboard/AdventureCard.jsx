
import { handleEsewaPayment } from "../../services/payment";

export default function AdventureCard({ booking }) {
  const { tour, tourName, guideName, startDate, bookingId, totalPrice } = booking;

  const handlePaymentClick = async () => {
    await handleEsewaPayment(totalPrice, bookingId);
  };


  return (
    <div className="bg-white rounded-xl shadow-sm flex items-center justify-between p-3 hover:shadow-md transition">
      {/* Left: Tour Info */}
      <div className="flex items-center gap-4">
        <img
          src={
            tour.tourPic
              ? `data:image/jpeg;base64,${tour.tourPic}`
              : "/images/placeholder.jpg" // your default image
          }
          alt={tour.name}
          className="w-24 h-20 object-cover rounded-lg"
        />
        <div>
          <h3 className="font-semibold">{tourName}</h3>
          <p className="text-sm text-gray-500">with {guideName}</p>
          <p className="text-xs text-green-500">Rs {totalPrice}</p>
          <p className="text-xs text-gray-400">{startDate}</p>
        </div>
      </div>

      {/* Right: Buttons grouped */}
      <div className="flex gap-2">
        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          View Details
        </button>
        <button
          onClick={handlePaymentClick}
          className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
          disabled={booking.paymentStatus === "PAID"}
        >
          {booking.paymentStatus === "PAID" ? "Paid" : "Pay"}
        </button>
      </div>
    </div>

  );
}
