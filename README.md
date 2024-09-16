# Kinmel - E-commerce Website

**Kinmel** is an e-commerce website built for the Nepal market. It allows users to browse products, filter by category and price, and add items to their cart. This project was developed as part of a portfolio to demonstrate full-stack development skills, focusing on a seamless shopping experience.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Running Backend and Frontend Together](#running-backend-and-frontend-together)
- [Future Improvements](#future-improvements)
- [License](#license)

## Features

- **Add to Cart**: Users can easily add products to their shopping cart.
- **Filter by Category**: Products can be filtered based on different categories for easier navigation.
- **Filter by Price**: Users can adjust the price range to find products that match their budget.
- **Responsive Design**: The website is fully responsive, ensuring a smooth experience on both desktop and mobile devices.

## Tech Stack

- **Frontend**: React, HTML, CSS, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/itsBikramRai/kinmel.git
   ```

2. Navigate to the project directory:
   ```bash
   cd kinmel
   ```
3. To run both frontend and backend together, use the following script

    ```bash
    Kinmel/
    ├── frontend/    # Contains the React frontend code
    ├── backend/     # Contains the backend code     with Node.js and Express
    ├── package.json # Contains the scripts for running frontend and backend together
    └── README.md    # Project documentation

## Running Backend and Frontend Together 
* package.json

``` 
{
  "name": "kinmel",
  "version": "1.0.0",
  "scripts": {
    "frontend": "cd frontend && npm start",
    "backend": "cd backend && npm start",
    "dev": "concurrently \"npm run frontend\" \"npm run backend\""
  },
  "devDependencies": {
    "concurrently": "^6.2.0"
  }
}
```
* Run
```
npm run dev
```

## Future Improvements

- Add a review section for users to provide feedback.
- Integrate payment gateways for a complete shopping experience.
- OAuth for login and signup
## API 
```
https://kinmel-backend.onrender.com/
```

 ## Contributing
* Contributions are welcome! If you'd like to improve this project, feel free to open an issue or submit a pull request.


## License
- This project currently has no license.

