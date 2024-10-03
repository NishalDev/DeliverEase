# Documentation of API endpoints
API endpoints including their request and response formats.

## User Authentication
### Register a User
- Method: POST
- URL: http://localhost:5002/api/users/register
- Headers: "Content-Type: application/json"
- Body:
{
    "username": "testUser",
    "email": "testuser@example.com",
    "password": "securePassword123",
    "role": "goodsOwner" // or "transporter"
}

### Login a User
- Method: POST
- URL: http://localhost:5002/api/auth/register
- Headers: "Content-Type: application/json"
- Body:
{
    "email": "testuser@example.com",
    "password": "securePassword123"
}


## Goods Management
### Create Goods
- Method: POST
- URL: http://localhost:5002/api/goods
- Headers: "Content-Type: application/json" and "Authorization: Bearer <your_token>" 
- Body:
{
    "goodsType": "Electronics",
    "size": "Medium",
    "weight": 2.5,
    "pickupLocation": "New York",
    "dropoffLocation": "Los Angeles",
    "deliveryPrice": 150
}

### Get All Goods
- Method: GET
- URL: http://localhost:5002/api/goods
- Headers: "Authorization: Bearer <your_token>"
- Response: Returns a list of all goods.

### Get Goods by ID
- Method: GET
- URL: http://localhost:5002/api/goods/:id
- Headers: "Authorization: Bearer <your_token>"
- Response: Returns details of the specified goods.

### Update Goods
- Method: PUT
- URL: http://localhost:5002/api/goods/:id
- Headers: "Content-Type: application/json" and "Authorization: Bearer <your_token>"
- Body:
  {
    "goodsType": "Updated Electronics",
    "size": "Large",
    "weight": 3.0,
    "pickupLocation": "New York",
    "dropoffLocation": "San Francisco",
    "deliveryPrice": 200,
    "status": "pending" // Can update the status as well
}

### Delete Goods
- Method: DELETE
- URL: http://localhost:5002/api/goods/:id
- Headers: "Authorization: Bearer <your_token>"
- Response: Confirmation of deletion.

<br>

## Transport Management
### Get Available Goods for Transporters
- Method: GET
- URL: http://localhost:5002/api/transporters/available-goods
- Headers: "Authorization: Bearer <your_token>"
- Response: Returns a list of goods that are available for transport (pending status).

### Offer Transport for Goods
- Method: POST
- URL: http://localhost:5002/api/transporters/offer/:goodsId
- Headers: "Authorization: Bearer <your_token>"
- Response: Confirmation of the transport offer.

### Start Delivery
- Method: PUT
- URL: http://localhost:5002/api/transporters/start-delivery/:transportId
- Headers: "Authorization: Bearer <your_token>"
- Response: Confirmation that the delivery has started.

### Complete Delivery
- Method: PUT
- URL: http://localhost:5002/api/transporters/complete-delivery/:transportId
- Headers: "Authorization: Bearer <your_token>"
- Response: Confirmation that the delivery has been completed.


> [!NOTE]
> Some features may change after frontend development or future Blockchain and AI integration







