This repository contains an Express.js backend application that performs CRUD (Create, Read, Update, Delete) operations on a JSON file named logindetails.json. The application serves as a simple user management system, allowing users to be created, retrieved, updated, and deleted via HTTP requests.





Features:


1.Create: Users can be added to the system by sending a POST request with user data to the appropriate endpoint.


2.Read: User data can be retrieved from the system using GET requests to fetch all users or a specific user by ID.


3.Update: Existing user data can be modified by sending a PUT request with updated data to the relevant endpoint.


4.Delete: Users can be removed from the system by sending a DELETE request with the user's ID.







Technologies Used:


1.Express.js: A minimalist web framework for Node.js used to build the backend server and handle HTTP requests.


2.JSON: The data storage format for storing user information. The application reads from and writes to the logindetails.json file to perform CRUD operations.


3.Node.js: The JavaScript runtime used to execute the backend application.






Installation:


1.Clone the repository to your local machine.


2.Navigate to the project directory in your terminal.


3.Install dependencies by running npm install.


4.Start the server using npm start.


5.Access the API endpoints using a tool like Postman or integrate them into your frontend application.






Endpoints:


1.GET /users: Retrieve all users.


2.GET /users/:userId: Retrieve a specific user by ID.


3.POST /users: Add a new user.


4.PUT /users/:userId: Update an existing user.


5.DELETE /users/:userId: Delete a user by ID.
