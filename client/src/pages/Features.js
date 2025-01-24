import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import Footer from "./Footer";
import Navigation from "../components/Navigation.js";
const features = [
  {
    title: "Smart Transport Matching",
    description:
      "Our platform connects goods owners with trusted transporters, ensuring seamless delivery solutions.",
    icon: "/assets/trust.png", // Replace with relevant images/icons
  },
  {
    title: "Real-Time Tracking",
    description:
      "Track your deliveries in real-time with GPS integration to know exactly where your shipment is.",
    icon: "/assets/pin.png",
  },
  {
    title: "Secure Payment Gateway",
    description:
      "Integrated payment systems, including Razorpay and Ethereum smart contracts for secure transactions.",
    icon: "/assets/verified.png",
  },
];

const FeaturePage = () => {
  return (
    <div>
      <Navigation />
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: "#F5F5F5",
          padding: "4rem 0",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h2" sx={{ fontWeight: "bold", color: "#333" }}>
            Key Features of Our Platform
          </Typography>
          <Typography variant="h6" sx={{ marginTop: "1rem", color: "#555" }}>
            Explore the features that make our logistics platform efficient,
            secure, and user-friendly.
          </Typography>
        </Container>
      </Box>

      {/* Features List Section */}
      <Container sx={{ padding: "3rem 0" }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  image={feature.icon}
                  alt={feature.title}
                  sx={{
                    height: 200,
                    width: 200,
                    objectFit: "cover",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "center", // Centers horizontally
                    alignItems: "center", // Centers vertically
                    margin: "0 auto", // Ensures the image is centered in the parent container
                  }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ marginTop: "1rem", color: "#666" }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box
        sx={{
          marginBottom: 10,
          backgroundColor: "#222",
          color: "#fff",
          padding: "3rem 0",
        }}
      >
        <Container sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={{ color: "#FFF", fontWeight: "bold" }}>
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" sx={{ color: "#FFF", marginTop: "1rem" }}>
            Join our platform today and experience the future of logistics
            management.
          </Typography>
          <Button
            variant="contained"
            sx={{
              marginTop: 5,
              background: "linear-gradient(to right, #FFD700, #E6B800)", // Gold Gradient
              color: "#202020",
              fontWeight: "bold",
              "&:hover": {
                background: "linear-gradient(to right, #E6B800, #FFD700)",
              }, // Reverse gradient on hover
            }}
          >
            Sign Up Now
          </Button>
        </Container>
      </Box>
      <Footer></Footer>
    </div>
  );
};

export default FeaturePage;
