# Watch Management System

A full-stack application for managing a collection of watches with a modern, responsive UI. This application provides a RESTful API backend and an elegant frontend interface for creating, reading, updating, and deleting watch records in a MySQL database.

## Features

- Full-stack watch management system
- Modern, responsive UI with real-time updates
- Automatic categorization of watches:
  - Luxury watches (above ₹50,000)
  - Luxury watches (below ₹50,000)
  - Casual watches
- RESTful API endpoints
- MySQL database integration
- CORS enabled for cross-origin requests
- Input validation and error handling
- Real-time price updates and deletion

## Tech Stack

### Frontend
- HTML5
- CSS3 (with modern features like CSS variables)
- Vanilla JavaScript
- Responsive design with modern UI/UX

### Backend
- Node.js
- Express.js
- MySQL
- MySQL2 (Node.js MySQL client)

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm (Node Package Manager)
- Modern web browser

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

6. Open the application:
   - The backend server will run at `http://localhost:3000`
   - Open `index.html` in your web browser to access the frontend interface

## Application Structure

### Frontend
- Modern, responsive UI with a clean design
- Real-time updates for watch management
- Automatic categorization based on price and category
- Price display in Indian Rupees (₹)
- Interactive forms with validation
- Smooth animations and transitions

### API Endpoints

#### Create a Watch
- **POST** `/api/watches`
- Body: `{ "name": "Watch Name", "price": 29999.99, "category": "luxury" }`

#### Get All Watches
- **GET** `/api/watches`

#### Update Watch Price
- **PUT** `/api/watches/:id`
- Body: `{ "price": 39999.99 }`

#### Delete a Watch
- **DELETE** `/api/watches/:id`


## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
