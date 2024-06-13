#!/bin/bash

# Function to check if a command exists
command_exists () {
    command -v "$1" >/dev/null 2>&1 ;
}

# Step 1: Install pipenv if it is not installed
if command_exists pipenv; then
    echo "pipenv is already installed."
else
    echo "pipenv is not installed. Installing pipenv..."
    pip install pipenv
fi

# Step 2: Install backend dependencies using pipenv
echo "Installing backend dependencies..."
cd backend || exit
pipenv install

# Step 3: Run the Django server in a new terminal
echo "Running the Django server in a new terminal..."
pipenv run python3 manage.py runserver &>/dev/null &

# Step 4: Navigate to the frontend directory and install dependencies
echo "Installing frontend dependencies..."
cd ../frontend || exit
npm install

# Step 5: Run the React frontend
echo "Running the React frontend..."
npm run dev

# comment npm run dev, and use nom start for deployment.
# add "start": "vite --host" to the package.json last scripts line inside the frontend.
# npm start