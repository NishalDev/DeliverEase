import React from 'react';
import Navigation from '../components/Navigation';
import TransportersList from '../components/TransportersList';

const TransporterDashboard = () => {
  return (
    <div>
      <Navigation />
      <TransportersList />
    </div>
  );
};

export default TransporterDashboard;
