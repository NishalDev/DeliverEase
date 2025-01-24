import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import Footer from './Footer';
import Navigation from '../components/Navigation.js';
const teamMembers = [
  {
    name: 'Nishal',
    role: 'Lead & Backend Developer',
    email: 'nishaldevadiga2003@gmail.com',
    phone: '+91 99720 64696',
    image: '/assets/team-leader.png', // Add image or placeholder for each team member
  },
  {
    name: 'Savio Saldanha',
    role: 'Frontend Developer',
    email: 'savio01new@gmail.com',
    phone: '+91 93537 83761',
    image: '/assets/front-development.png',
  },
  {
    name: 'Prasad',
    role: 'Database Administrator',
    email: 'Prasadbhandary5@gmail.com',
    phone: '+91 73380 89830',
    image: '/assets/backend-coding.png',
  },
  {
    name: 'Harshith R',
    role: 'Backend Security Developer',
    email: 'harshithpoojary37@google.com',
    phone: '+91 82174 71584',
    image: '/assets/cyber-security.png',
  },
];

const AboutUsPage = () => {
  return (
    <div>
         <Navigation />
      {/* Hero Section */}
      <Box sx={{ backgroundColor: '#F5F5F5', padding: '4rem 0', textAlign: 'center' }}>
        <Container>
          <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#333' }}>
            About Us
          </Typography>
          <Typography variant="h6" sx={{ marginTop: '1rem', color: '#555' }}>
            Meet the passionate team behind the DeliverEase platform.
          </Typography>
        </Container>
      </Box>

      {/* Team Members Section */}
      <Container sx={{ padding: '3rem 0' }}>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                <CardMedia
                  component="img"
                  image={member.image}
                  alt={member.name}
                  sx={{
                    height: 150,
                    width: 75,
                    objectFit: 'contain',
                    borderRadius: '50%',
                    marginBottom: '1rem',
                  }}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: '0.5rem', color: '#777' }}>
                   {member.email}
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: '0.5rem', color: '#777' }}>
                   {member.phone}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box sx={{ backgroundColor: '#222', color: '#fff', padding: '3rem 0' }}>
        <Container sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{color:"#FFF", fontWeight: 'bold' }}>
            Have Questions? Get in Touch!
          </Typography>
          <Typography variant="body1" sx={{ color:"#FFF", marginTop: '1rem' }}>
            Feel free to reach out to any of our team members for more information.
          </Typography>
          <Button
         
            variant="contained"
            sx={{
              marginTop: '2rem',
              backgroundColor: '#FFD700',
              color: '#000',
              padding: '0.8rem 2rem',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#E6B800',
              },
            }}
          >
           
           Contact Us
          </Button>
        </Container>
      </Box>
      <Footer>
      </Footer>
    </div>
  );
};

export default AboutUsPage;
