# Watch Management System

A RESTful API service for managing a collection of watches. This application provides endpoints to create, read, update, and delete watch records in a MySQL database.

## Features

- CRUD operations for watch management
- RESTful API endpoints
- MySQL database integration
- CORS enabled for cross-origin requests
- Input validation and error handling

## Tech Stack

- Node.js
- Express.js
- MySQL
- MySQL2 (Node.js MySQL client)

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm (Node Package Manager)

## Project Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Database Setup:
   - Create a new MySQL database
   - Run the following SQL command to create the watches table:
   ```sql
   CREATE TABLE IF NOT EXISTS watches (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       price DECIMAL(10, 2) NOT NULL,
       category VARCHAR(50) NOT NULL DEFAULT 'casual'
   );
   ```

4. Configure Database Connection:
   - Open `index.js`
   - Update the MySQL connection pool configuration with your database credentials:
   ```javascript
   const pool = mysql.createPool({
     host: 'your-host',
     user: 'your-username',
     password: 'your-password',
     database: 'your-database-name'
   });
   ```

5. Start the server:
```bash
npm start
```

The server will start running at `http://localhost:3000`

## API Endpoints

### Create a Watch
- **POST** `/api/watches`
- Body: `{ "name": "Watch Name", "price": 299.99, "category": "luxury" }`

### Get All Watches
- **GET** `/api/watches`

### Update Watch Price
- **PUT** `/api/watches/:id`
- Body: `{ "price": 399.99 }`

### Delete a Watch
- **DELETE** `/api/watches/:id`

## Error Handling

The API includes error handling for:
- Invalid JSON format
- Missing required fields
- Database errors
- Not found resources

## Security Notes

- The application has CORS enabled for all origins (`*`). In a production environment, you should restrict this to specific origins.
- Database credentials should be stored in environment variables rather than directly in the code.
- Consider implementing authentication and authorization for production use.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
