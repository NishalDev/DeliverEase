import React from 'react';
import { Box, Typography, Button, Grid, Container, Paper } from '@mui/material';

const ServicesPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* Header Section */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" color="primary" gutterBottom>
          DeliverEase Services
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Simplifying logistics with reliable and efficient transportation solutions.
        </Typography>
      </Box>

      {/* Service Overview Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Service Overview
        </Typography>
        <Typography variant="body1" color="textSecondary" lineHeight={1.8}>
          At DeliverEase, we offer a wide range of services tailored to streamline your logistics processes. From parcel deliveries to custom logistics solutions, 
          we prioritize efficiency, safety, and customer satisfaction.
        </Typography>
      </Paper>

      {/* Key Services Section */}
      <Box mb={6}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Key Services
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: 'Parcel Delivery',
              description:
                'Fast and secure delivery of small packages across the country with real-time tracking.',
            },
            {
              title: 'Freight Transportation',
              description:
                'Customized freight solutions for businesses, ensuring cost-effective and timely deliveries.',
            },
            {
              title: 'Real-Time Tracking',
              description:
                'Stay informed with live updates on the status of your shipment via our advanced tracking system.',
            },
            {
              title: 'Custom Logistics Solutions',
              description:
                'Tailored logistics planning that meets your unique business requirements.',
            },
            {
              title: '24/7 Customer Support',
              description:
                'Our dedicated team is available around the clock to assist with any inquiries or issues.',
            },
          ].map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {service.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {service.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Benefits Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 6, backgroundColor: '#f8f9fa' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Why Choose DeliverEase?
        </Typography>
        <Typography component="ul" sx={{ pl: 2 }}>
          {[
            'Reliability: Timely and safe delivery with a proven track record.',
            'Efficiency: Streamlined processes that minimize delays and maximize productivity.',
            'Flexibility: Adaptive services that cater to your evolving needs.',
            'Affordability: Competitive pricing without compromising quality.',
          ].map((benefit, index) => (
            <Typography key={index} component="li" variant="body1" color="textSecondary" sx={{ mb: 1 }}>
              {benefit}
            </Typography>
          ))}
        </Typography>
      </Paper>

      {/* Testimonials Section */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          What Our Clients Say
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              quote:
                '"DeliverEase transformed how we manage logistics. Reliable and efficient services!"',
              author: '- Jane Doe, Logistics Manager',
            },
            {
              quote: '"Real-time tracking is a game changer! Highly recommend DeliverEase."',
              author: '- John Smith, Business Owner',
            },
          ].map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={5} key={index}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="body1" color="textSecondary" sx={{ fontStyle: 'italic' }}>
                  {testimonial.quote}
                </Typography>
                <Typography variant="subtitle2" color="textPrimary" sx={{ mt: 2, fontWeight: 'bold' }}>
                  {testimonial.author}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action Section */}
      <Box textAlign="center" sx={{ py: 4, backgroundColor: '#e3f2fd', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Ready to Simplify Your Logistics?
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          Contact us today to experience hassle-free transportation solutions!
        </Typography>
        <Button variant="contained" color="primary" sx={{ px: 5, py: 1.5 }}>
          Get in Touch
        </Button>
      </Box>
    </Container>
  );
};

export default ServicesPage;
