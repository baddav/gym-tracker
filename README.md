# Gym-Tracker application
The gym-tracker is an application to keep track of your workouts and add exercises to those workouts. It is for people who are going on a regular basis to the gym and want to improve their training. You can save the exact exercises with your reps, sets and weights you used.  

## Setup
To start this application on your local machine, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/baddav/gym-tracker.git
   ```

2. **Install dependencies**
   You need to install the dependencies for the root, frontend, and backend folders.
   ```bash
   # In the root folder
   npm install

   # In the frontend folder
   cd frontend
   npm install
   cd ..

   # In the backend folder
   cd backend
   npm install
   cd ..
   ```

3. **Environment Variables**
   Create a `.env` file inside the `backend` folder and add your MongoDB connection string:
   ```env
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Run the application**
   From the root folder, run:
   ```bash
   npm start


