import React from "react";
import { Box, Typography, Container, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "rgba(217, 217, 217, 0.29)", // Box background
        padding: "2rem 0", // Box padding
        marginTop: "auto", // Pushes the box to the bottom
        width: "100%",
      }}
    >
      <Container>
        {/* Platform */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "20px",
              color: "#000000",
            }}
          >
            DeliverEase
          </Typography>

          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Link
              href="/features"
              sx={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "20px",
                color: "#000000",
                textDecoration: "none",
              }}
            >
              Features
            </Link>
           
          
            
          
            <Link
              href="/aboutus"
              sx={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "20px",
                color: "#000000",
                textDecoration: "none",
              }}
            >
              Contact
            </Link>
          </Box>
        </Box>

        {/* Footer Content */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1.5rem",
          }}
        >
          <Box sx={{ display: "flex", gap: "1rem" }}>
           


            <Box sx={{ width: "400px", height: "90px" }}>
              <Typography
                sx={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "18px",
                  color: "#000000",
                }}
              >
                Mangalore Institute OF Technology & Engineering, Moodbidri, South Canara, Karnataka - 574227
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
