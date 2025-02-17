import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import Footer from "./Footer.js";
import Navigation from "../components/Navigation.js";

const Homepage = () => {
  const navigate = useNavigate();

  const handleServiceClick = () => {
    navigate("/features");
  };

  const handleSignInClick = () => {
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;
      const sections = document.querySelectorAll(".full-page");
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
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
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navigation />
      <section
        className="full-page"
        style={{
          backgroundColor: "#F5F5F5",
          position: "relative",
          height: "100vh",
          overflow: "hidden",
          maxWidth: "100%",
          margin: "0",
          padding: "3rem 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          sx={{
            position: "relative",
            zIndex: 1,
            background: "linear-gradient(to right,rgb(255, 255, 255),rgb(255, 223, 80))",
            // backgroundColor: "#FFFFFF",
            height: "100%",
            width: "80%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // Column layout on small screens, row on larger
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            padding: "2rem",
            borderRadius: "10px",
          }}
        >
          {/* Left Side - Text Content */}
          <Box
            sx={{
              flex: 1,
              textAlign: "left",
              padding: "1rem",
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                color: "#202020",
                fontWeight: "normal",
              }}
            >
              Smart Logistics <br /> Simplified
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#202020",
                marginTop: "1rem",
              }}
            >
              Connecting You with Trusted Transporters for Seamless Delivery
              Solutions
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                marginTop: "2rem",
                justifyContent: "flex-start",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  border: "2px solid #333333",
                  color: "#FFFFFF",
                  background: "linear-gradient(to right, #444444, #222222)",
                  padding: "0.8rem 2rem",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    background: "linear-gradient(to right, #222222, #444444)",
                    boxShadow: "0px 4px 10px rgba(50, 50, 50, 0.6)",
                  },
                  "&:active": {
                    background: "linear-gradient(to right, #1A1A1A, #000000)",
                  },
                }}
                onClick={handleServiceClick}
              >
                Explore Services
              </Button>
              <Button
                variant="outlined"
                sx={{
                  border: "2px solid #FFD700",
                  color: "#202020",
                  background: "linear-gradient(to right, #FFD700, #E6B800)",
                  padding: "0.8rem 2rem",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    background: "linear-gradient(to right, #E6B800, #FFD700)",
                    boxShadow: "0px 4px 10px rgba(255, 215, 0, 0.6)",
                  },
                  "&:active": {
                    background: "linear-gradient(to right, #D4A017, #B8860B)",
                  },
                }}
                onClick={handleSignInClick}
              >
                Sign In
              </Button>
            </Box>
          </Box>

          {/* Right Side - Image */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "1rem",
              background: "linear-gradient(to left,rgb(255, 255, 255),rgb(255, 223, 80))",
            }}
          >
            <img
              src="/assets/logistics (1).png" // Replace with your actual image path
              alt="Logistics Icon"
              style={{
                maxWidth: "70%",
                height: "auto",
                borderRadius: "10px",
               
              }}
            />
          </Box>
        </Container>
      </section>

      {/* Image Section */}
      <section
        className="full-page"
        style={{
          backgroundColor: "#F5F5F5",
          position: "relative",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          
        }}
      >
        <img
          src="/assets/req.png" // Replace with your actual image path
          alt="Logistics Workflow"
          style={{
            maxWidth: "80%",
            height: "auto",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            background: "linear-gradient(to left,rgb(255, 255, 255),rgb(255, 223, 80))",
          }}
        />
      </section>
      <Footer />
    </div>
  );
};

export default Homepage;
