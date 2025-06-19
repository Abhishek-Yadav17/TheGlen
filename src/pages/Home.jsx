import { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import '../styles/Home.scss';

const Home = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    API.get('/listings').then(res => {
      setListings(res.data);
    });
  }, []);

  return (
    <div className="home-page">
      <div className="navbar">
        <h1>The Glen</h1>
        <div className="nav-links">
          <h4>Home</h4>
          <h4>About</h4>
          <Link to="/bookings"><h4>Bookings</h4></Link>
          <h4>Contact</h4>
        </div>
      </div>

      <div className="hero">
        <h1>THE <br />GLEN</h1>
        <p>Discover and book the perfect stay for your next adventure — comfort, convenience, and great deals all in one place.</p>
        <div className="scroll-indicator">
          <div className="text">Scroll Down</div>
          <div className="circle">
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      </div>

      <div className="listings">
        {listings.map(listing => (
          <div key={listing._id} className="listing-card">
            <img src={listing.images[0] || 'https://via.placeholder.com/150'} alt={listing.title} />
            <div className="card-content">
              <h2>{listing.title}</h2>
              <p>{listing.location}</p>
              <p>${listing.price}/night</p>
              <Link to={`/listings/${listing._id}`}>View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
