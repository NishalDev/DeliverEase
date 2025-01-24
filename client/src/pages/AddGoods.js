import React, { useState, useEffect } from "react";
import GoodsService from "../Services/GoodsService"; // Import the GoodsService
import BackButton from "../components/BackButton";
import {
  Box,
  Button,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Navigation1 from "../components/Navigation1.js";
const AddGood = () => {
  const [goods, setGoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentGoodId, setCurrentGoodId] = useState(null);
  const [newGood, setNewGood] = useState({
    name: "",
    quantity: 1,
    pickupLocation: "",
    dropoffLocation: "",
  });

  // Fetch goods from backend on component mount
  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const goodsData = await GoodsService.fetchGoods();
        setGoods(goodsData);
      } catch (error) {
        console.error("Error fetching goods:", error);
      }
    };

    fetchGoods();
  }, []);

  // Handle search term input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle selecting a good for editing
  const handleEditGood = (id) => {
    const goodToEdit = goods.find((good) => good._id === id);
    setNewGood(goodToEdit);
    setIsEditing(true);
    setCurrentGoodId(id);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGood({ ...newGood, [name]: value });
  };

  // Handle adding a new good or updating an existing good
  const handleAddOrUpdateGood = async (e) => {
    e.preventDefault();
    if (newGood.name && newGood.pickupLocation && newGood.dropoffLocation) {
      try {
        if (isEditing) {
          const updatedGood = await GoodsService.updateGood(
            currentGoodId,
            newGood
          );
          setGoods(
            goods.map((good) =>
              good._id === currentGoodId ? updatedGood : good
            )
          );
          setIsEditing(false);
          setCurrentGoodId(null);
        } else {
          const addedGood = await GoodsService.addGood(newGood);
          setGoods([...goods, addedGood]);
        }
        setNewGood({
          name: "",
          quantity: 1,
          pickupLocation: "",
          dropoffLocation: "",
        });
      } catch (error) {
        console.error("Error adding/updating good:", error);
      }
    }
  };

  // Handle deleting a good
  const handleDeleteGood = async (id) => {
    try {
      await GoodsService.deleteGood(id);
      setGoods(goods.filter((good) => good._id !== id));
    } catch (error) {
      console.error("Error deleting good:", error);
    }
  };

  return (
    <div>
      <Navigation1/>
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <BackButton />
      <Typography variant="h4" component="h1" gutterBottom>
        Goods Dashboard
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Search Goods..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Pickup Location</TableCell>
              <TableCell>Dropoff Location</TableCell>
              <TableCell>Actions</TableCell>
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
                      onClick={() => handleEditGood(good._id)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteGood(good._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" component="h2" gutterBottom>
        {isEditing ? "Edit Good" : "Add New Good"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleAddOrUpdateGood}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Name of the Good"
          name="name"
          value={newGood.name}
          onChange={handleInputChange}
          required
        />
        <TextField
          type="number"
          label="Quantity"
          name="quantity"
          value={newGood.quantity}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Pickup Location"
          name="pickupLocation"
          value={newGood.pickupLocation || ""}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Dropoff Location"
          name="dropoffLocation"
          value={newGood.dropoffLocation || ""}
          onChange={handleInputChange}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ alignSelf: "flex-start" }}
        >
          {isEditing ? "Update Good" : "Add Good"}
        </Button>
      </Box>
    </Container>
    </div>
  );
};

export default AddGood;
