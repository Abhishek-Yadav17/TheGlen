import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../services/api';
import '../styles/ListingDetails.scss';

const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    API.get(`/listings/${id}`).then(res => {
      setListing(res.data);
    });
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/bookings', {
        listing: id,
        startDate,
        endDate,
      });
      setMessage('Booking successful!');
    } catch (err) {
      setMessage('Booking failed. Please try again.');
    }
  };

  if (!listing) return <p>Loading...</p>;

  return (
    <div className="detail-page">
      <div className="image-section">
        <img src={listing.images[0] || 'https://via.placeholder.com/600'} alt={listing.title} />
      </div>

      <div className="info-section">
        <h1>{listing.title}</h1>
        <p>{listing.description}</p>
        <p>Location: {listing.location}</p>
        <p>${listing.price}/night</p>

        <form className="booking-form" onSubmit={handleBooking}>
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
          <button type="submit">Book Now</button>
        </form>

        {message && <p className="booking-message">{message}</p>}
      </div>
    </div>
  );
};

export default ListingDetail;
