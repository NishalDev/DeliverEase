import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoodsService from "../Services/GoodsService";
import {
  Box,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
const GoodStatus = () => {
  const [goods, setGoods] = useState([]); // List of goods
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Loading state for fetching goods
  const navigate = useNavigate();

  // Fetch all goods owned by the user on component mount
  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const goodsData = await GoodsService.fetchGoods();
        setGoods(goodsData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch goods. Please try again.");
        setLoading(false);
      }
    };

    fetchGoods();
  }, []);

  // Handle the selection of a good to redirect to its detail page
  const handleGoodClick = (goodId) => {
    navigate(`/goods/${goodId}`); // Navigate to GoodDetailPage
  };

  return (
    <Box sx={{ padding: 6, minHeight: "100vh", backgroundColor: "#e8f0fe" }}>
      <Paper
        elevation={6}
        sx={{
          padding: 6,
          maxWidth: 900,
          margin: "0 auto",
          borderRadius: "12px",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          align="center"
          sx={{ color: "#3f51b5", fontWeight: "bold", fontSize: "2.5rem" }}
        >
          Goods List
        </Typography>

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="150px"
          >
            <CircularProgress size={80} thickness={4} />
          </Box>
        ) : error ? (
          <Typography color="error" align="center" sx={{ fontSize: "1.5rem" }}>
            {error}
          </Typography>
        ) : goods.length > 0 ? (
          <List>
            {goods.map((good) => (
              <ListItem
                button
                key={good._id}
                onClick={() => handleGoodClick(good._id)}
                sx={{
                  padding: 3,
                  marginBottom: 3,
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  boxShadow: 5,
                  "&:hover": {
                    backgroundColor: "#c5cae9",
                    boxShadow: 8,
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "#3f51b5",
                        fontSize: "1.5rem",
                      }}
                    >
                      {good.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      sx={{ fontSize: "1.25rem" }}
                    >{`Status: ${good.status}`}</Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography align="center" variant="h6">
            No goods available
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default GoodStatus;
