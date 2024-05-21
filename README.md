**Project Overview: Fugitive Pursuit Simulator**

**Description:**
This project is a simple server-side application built using Node.js and Express.js. It simulates a scenario where law enforcement officers pursue a fugitive through various cities using different vehicles. The simulation involves selecting vehicles for the officers, assigning cities to them, and determining if the fugitive is captured.

**Features:**
1. **City and Vehicle Data:** The server stores data about cities and available law enforcement vehicles.

2. **Vehicle Selection:** It allows users to select vehicles for two cops involved in the pursuit.

3. **City Assignment:** After vehicle selection, the server randomly assigns cities to each cop.

4. **Simulation Start:** Initiates the pursuit simulation and determines if the fugitive is captured.

5. **Result Retrieval:** Provides an endpoint to retrieve the result of the pursuit, indicating whether the fugitive was captured or not.

**Endpoints:**
- **GET /cities:** Retrieves data about available cities.
- **GET /vehicles:** Retrieves data about available law enforcement vehicles.
- **POST /vehicles:** Allows users to select vehicles for pursuit.
- **POST /api/start-simulation:** Initiates the pursuit simulation.
- **GET /result:** Retrieves the result of the pursuit.

**Dependencies:**
- **express:** Handles routing and middleware management.
- **body-parser:** Parses incoming request bodies.
- **cors:** Enables Cross-Origin Resource Sharing.
- **path:** Provides utilities for working with file and directory paths.

**Setup:**
1. Install Node.js if not already installed.
2. Clone the repository.
3. Run `npm install` to install dependencies.
4. Start the server using `node server.js` or `npm start`.

**Usage:**
1. Access the provided endpoints using tools like Postman or cURL.
2. Select vehicles for pursuit using the `/vehicles` endpoint.
3. Initiate the pursuit simulation using the `/api/start-simulation` endpoint.
4. Retrieve the result of the pursuit using the `/result` endpoint.

**Note:** 
- This project is a basic simulation and can be extended with additional features such as user authentication, more complex vehicle and city data, and graphical user interface for interaction.
