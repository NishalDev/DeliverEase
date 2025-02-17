import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import TransportService from "../Services/TransportService.js";
import BackButton from "../components/BackButton";
import Navigation1 from "../components/Navigation1.js";
const OfferGood = () => {
  const [goods, setGoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch all goods from backend on component mount
  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const goodsData = await TransportService.getAllGoods();
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        const filteredGoods = goodsData.filter(
          (good) => good.owner._id !== loggedInUser._id
        ); // Fetch all goods from the service
        setGoods(filteredGoods);
      } catch (error) {
        console.error("Error fetching goods:", error);
      }
    };

    fetchGoods();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectGood = (goodsId) => {
    navigate(`/set-delivery-price/${goodsId}`);
  };

  return (
    <div className="transporter-dashboard">
      <Navigation1/>
      <div className="search-bar" style={{ marginBottom: "20px" }}>
        <Typography variant="h4">Available Goods for Transport</Typography>
        <TextField
          label="Search Goods"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
          sx={{ marginTop: 2 }}
        />
      </div>

      <div className="goods-list">
        <Typography variant="h6" style={{ marginBottom: "16px" }}>
          Goods List
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Quantity</strong>
                </TableCell>
                <TableCell>
                  <strong>Pickup Location</strong>
                </TableCell>
                <TableCell>
                  <strong>Dropoff Location</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {goods
                .filter((good) =>
                  good.name?.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((good) => (
                  <TableRow key={good._id}>
                    <TableCell>{good.name}</TableCell>
                    <TableCell>{good.quantity}</TableCell>
                    <TableCell>{good.pickupLocation}</TableCell>
                    <TableCell>{good.dropoffLocation}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleSelectGood(good._id)}
                      >
                        Select for Delivery
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default OfferGood;
