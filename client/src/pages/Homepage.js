import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/main.css";

const Homepage = () => {
  const navigate = useNavigate();

  const handleServiceClick = () => {
    navigate("/services");
  };

  const handleSignInClick = () => {
    navigate("/register");
  };

  const handleScroll = () => {
    const scrollY = window.scrollY + window.innerHeight / 2;
    const sections = document.querySelectorAll(".full-page");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        section.classList.add("visible");
        console.log("Section visible:", section);
      } else {
        section.classList.remove("visible");
      }
    });
  };

  useEffect(() => {
    const optimizedScroll = () => {
      window.requestAnimationFrame(handleScroll);
    };

    // Add scroll event listener
    window.addEventListener("scroll", optimizedScroll);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("scroll", optimizedScroll);
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-content full-page visible">
        <h1 className="hero-title">
          Fast
          <br></br>
          Reliable
          <br></br>
          Affordable
        </h1>
        
        <p className="hero-subtitle">
        Connecting You with Trusted Transporters for Seamless Delivery Solutions
        </p>
        <div className="hero-buttons">
          {/* <button
            className="hero-button primary"
            aria-label="Explore Our Services"
            onClick={handleServiceClick}
          >
            Our Services
          </button> */}
          <button
            className="hero-button secondary"
            aria-label="Sign In to Your Account"
            onClick={handleSignInClick}
          >
            Sign In
          </button>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="full-page">
        <article className="card">
        <h2>Services</h2>
          <div className="features-container">
            <div className="feature-card">
              
              <h3>Transport Management</h3>
              <p>
                Efficient Transport Options: We connect goods owners with nearby
                transporters, offering a variety of transport options such as
                trucks, tempos, and more.
              </p>
              <p>
                Real-Time Tracking: Monitor your delivery status with our
                real-time tracking system, ensuring transparency and
                reliability.
              </p>
            </div>

            <div className="feature-card">
              <h3>Cost-Effective Solutions</h3>
              <p>
                Competitive Pricing: We provide cost-effective pricing options
                for all transport services, ensuring you get the best value for
                your money.
              </p>
              <p>
                Instant Quotes: Receive quick quotes based on your goods and
                transport requirements, helping you make informed decisions.
              </p>
            </div>

            <div className="feature-card">
              <h3>User-Friendly Platform</h3>
              <p>
                Intuitive Interface: Our platform is designed for ease of use,
                allowing both goods owners and transporters to navigate
                effortlessly.
              </p>
              <p>
                Quick Registration and Login: Easy access to your account with a
                simple registration and login process, ensuring a hassle-free
                experience.
              </p>
            </div>

            <div className="feature-card">
              <h3>Personalized Services</h3>
              <p>
                Custom Solutions: We understand that every client has unique
                needs. Our team works closely with you to create personalized
                logistics solutions.
              </p>
              <p>
                Dedicated Support: Our customer support team is available 24/7
                to assist you with any inquiries or concerns, ensuring a smooth
                experience from start to finish.
              </p>
            </div>

            <div className="feature-card">
              <h3>Safety and Security</h3>
              <p>
                Secure Transactions: We prioritize the security of your data and
                transactions, ensuring a safe and trustworthy platform.
              </p>
              <p>
                Insurance Options: Protect your goods with our insurance
                options, providing peace of mind during transportation.
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* Feedback Section */}
      <section className="full-page">
        <article className="card">
          <h2>Feedback</h2>
          <p>
            Your opinion matters! Let us know how we can improve our services to
            serve you better.
          </p>
        </article>
      </section>

      {/* Features Section */}
      <section className="full-page">
        <article className="card">
          <h2>Features</h2>
          <div className="features-container">
            {/* Fast Feature Card */}
            <div className="feature-card">
              <h3>Fast</h3>
              <p>
                Experience rapid delivery times with our optimized logistics
                network.
              </p>
            </div>

            {/* Reliable Feature Card */}
            <div className="feature-card">
              <h3>Reliable</h3>
              <p>
                Count on us for consistent and dependable transport solutions
                every time.
              </p>
            </div>

            {/* Secure Feature Card */}
            <div className="feature-card">
              <h3>Secure</h3>
              <p>
                Your goods are safe with us, thanks to our robust security
                measures and tracking systems.
              </p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Homepage;
