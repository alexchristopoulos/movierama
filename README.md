# Movie-rama web application
> A simple web application where users can post and vote movies

#### Example screenshots
![alt text](/images/app-guest.PNG)
![alt text](/images/app-user.PNG)

## Software Stack
1. Backend: 
    - node.js
    - express framework
    - MongoDB
2. Frontend
    - React
    - redux
    - redux sagas
    - typescript

## Prerequisites for installation
1. **Node.js** installed on the system
2. Packaga manager **npm** needs to be installed on the system
3. **MongoDB** to be installed locally

## Installation
1. Make sure that **MongoDB** is **up & running** (mongod command)
2. Clone/download repo
3. **cd movierama/**
4. **cd backend/**
5. **npm install**
6. **cd ../frontend/**
7. **npm install**

## Running the application
1. With an open terminal on the **backend folder** run: **npm start**
2. With an open terminal on the **frontend folder** run: **npm start**



##### Configuring the backend app (optional)
1. Via backend/config.js file (Configuring MongoDB connection uri etc.)

##### Configuring the frontend app (optional)
1. Via frontend/src/config/config.ts file (Configuring backend url)