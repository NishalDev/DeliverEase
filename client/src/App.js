import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage"; // Homepage component
import GoodsDashboard from "./pages/GoodsDashboard"; // GoodsDashboard component
import TransporterDashboard from "./pages/TransporterDashboard"; // TransporterDashboard component
import PaymentPage from "./pages/PaymentPage"; // PaymentPage component
import Navigation from "./components/Navigation"; // Navigation component
import ServicesPage from "./pages/ServicesPage"; // ServicesPage component
import Dashboard from "./pages/Dashboard"; // Dashboard component
import ManageDashboard from "./pages/ManageDashboard"; // ManageDashboard component
import RegisterPage from "./pages/RegisterPage"; // RegisterPage component
import LoginPage from "./pages/LoginPage"; // LoginPage component
import "./App.css"; // Import your CSS for styling
import SetDeliveryPrice from "./pages/SetDeliveryPrice.js";
import OfferApprovalPage from "./pages/OfferApprovalPage";
import GoodStatus from "./pages/GoodStatus.js";
import TransporterStatus from "./pages/TransporterStatus.js";
const App = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = document.querySelectorAll(".section");

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // Check if the section is in the viewport
        if (
          scrollY >= sectionTop - sectionHeight / 2 &&
          scrollY < sectionTop + sectionHeight / 2
        ) {
          section.classList.add("visible");
        } else {
          section.classList.remove("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Router>
      <Navigation />{" "}
      {/* Navigation bar should be consistent across all routes */}
      <Routes>
        <Route path="/" element={<Homepage />} /> {/* Homepage route */}
        <Route path="/register" element={<RegisterPage />} />{" "}
        {/* Register route */}
        <Route path="/login" element={<LoginPage />} /> {/* Login route */}
        <Route path="/goods-dashboard" element={<GoodsDashboard />} />{" "}
        {/* Goods owner dashboard */}
        <Route
          path="/transporter-dashboard"
          element={<TransporterDashboard />}
        />{" "}
        <Route
          path="/set-delivery-price/:goodsId"
          element={<SetDeliveryPrice />}
        />
        <Route path="/offers/:goodsId" element={<OfferApprovalPage />} />
        {/* Transporter dashboard */}
        <Route path="/payment" element={<PaymentPage />} /> {/* Payment page */}
        <Route path="/services" element={<ServicesPage />} />{" "}
        {/* Services page */}
        <Route path="/dashboard" element={<Dashboard />} />{" "}
        <Route path="/check-good-status" element={<GoodStatus />} />
        <Route path="/check-transport-status" element={<TransporterStatus />} />
        {/* General dashboard */}
        <Route path="/manage" element={<ManageDashboard />} />{" "}
        {/* Manage dashboard */}
      </Routes>
      {/* Additional Sections for Scrolling */}
      <div className="section" id="hero">
        Hero Section
      </div>
      <div className="section" id="fast">
        Fast
      </div>
      <div className="section" id="reliable">
        Reliable
      </div>
      <div className="section" id="secure">
        Secure
      </div>
    </Router>
  );
};

export default App;
