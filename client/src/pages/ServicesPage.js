import React from 'react';
import '../css/main.css'; // Import the CSS file
import BackButton from '../components/BackButton';

const ServicesPage = () => {
  return (
    <div className="services">
        <BackButton /> {/* Add the Back Button here */}
      <header className="services-header">
        <h1 className="services-title">Our Services</h1>
        <p className="intro">
          At DeliverEase, we pride ourselves on providing reliable and efficient transportation solutions tailored to meet your needs. Our commitment to excellence ensures that your cargo reaches its destination safely and on time.
        </p>
      </header>

      <section className="service-overview">
        <h2>Service Overview</h2>
        <p>
          We offer a variety of services designed to streamline your logistics processes and enhance your supply chain efficiency. Whether you need to transport small packages or large freight, we have the right solution for you.
        </p>
      </section>

      <section className="service-list">
        <h3>Key Services</h3>
        <div className="service-grid">
          <div className="service-item">
            <h4>Parcel Delivery</h4>
            <p>Fast and secure delivery of small packages across the country with real-time tracking.</p>
          </div>
          <div className="service-item">
            <h4>Freight Transportation</h4>
            <p>Customized freight solutions for businesses of all sizes, ensuring cost-effective and timely deliveries.</p>
          </div>
          <div className="service-item">
            <h4>Real-Time Tracking</h4>
            <p>Stay informed with our advanced tracking system that provides live updates on the status of your shipment.</p>
          </div>
          <div className="service-item">
            <h4>Custom Logistics Solutions</h4>
            <p>Tailored logistics planning that adapts to your unique business needs and industry requirements.</p>
          </div>
          <div className="service-item">
            <h4>24/7 Customer Support</h4>
            <p>Our dedicated customer service team is available around the clock to assist you with any inquiries or issues.</p>
          </div>
        </div>
      </section>

      <section className="service-benefits">
        <h3>Why Choose DeliverEase?</h3>
        <ul>
          <li><strong>Reliability:</strong> Your cargo is safe with us. We have a proven track record of timely deliveries.</li>
          <li><strong>Efficiency:</strong> Our streamlined processes minimize delays and maximize productivity.</li>
          <li><strong>Flexibility:</strong> We adapt our services to meet your changing needs, ensuring that we are always a perfect fit for your logistics requirements.</li>
          <li><strong>Affordability:</strong> Competitive pricing without compromising on quality, making our services accessible to everyone.</li>
        </ul>
      </section>

      <section className="testimonial">
        <h3>What Our Clients Say</h3>
        <blockquote>
          <p>"DeliverEase has transformed the way we manage our logistics. Their services are unmatched in reliability and efficiency!"</p>
          <footer>- Jane Doe, Logistics Manager</footer>
        </blockquote>
        <blockquote>
          <p>"The real-time tracking feature is a game changer. I can monitor my shipments effortlessly!"</p>
          <footer>- John Smith, Business Owner</footer>
        </blockquote>
      </section>

      <footer className="contact-section">
        <h2>Get Started Today!</h2>
        <p>
          Ready to experience hassle-free transport solutions? Contact us today for a free consultation and let us help you streamline your logistics.
        </p>
        <button className="contact-button">Contact Us</button>
      </footer>
    </div>
  );
};

export default ServicesPage;
