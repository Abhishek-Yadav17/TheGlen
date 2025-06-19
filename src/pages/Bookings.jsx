import { useEffect, useState } from 'react';
import API from '../services/api';
import '../styles/Bookings.scss';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get('/bookings')
      .then(res => setBookings(res.data))
      .catch(() => alert('Failed to load bookings'));
  }, []);

  return (
    <div className="bookings-page">
      <h1>Your Bookings</h1>
      <div className="bookings-list">
        {bookings.length === 0 ? (
          <p className="no-bookings">No bookings found.</p>
        ) : (
          bookings.map(booking => (
            <div key={booking._id} className="booking-card">
              <h2>{booking.listing?.title || 'Untitled Listing'}</h2>
              <p><strong>Location:</strong> {booking.listing?.location}</p>
              <p><strong>From:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
              <p><strong>To:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Bookings;
