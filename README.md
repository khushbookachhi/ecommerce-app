
# Ecommerce-BuyBusy-React-App
## Overview
Ecommerce BuyBusy is a full stack web application designed to provide a seamless shopping experience. The application includes user authentication, product management, a shopping cart, and an order tracking system.
## Technologies Used
- **Front-end**:- HTML, CSS, JavaScript, React, Redux, Redux-Thunk, BootStrap
- **Back-end**:- Node.js, Express.js
- **Database**:- MongoDB, Mongoose (ODM)
- **Authentication**:- JWT (Json Web Token) Authentication (signUp, signIn, signOut)
- **API Integration**: Axios
## Features
### User Authentication
- **SignUp, SignIn, SignOut**:- Managed by JWT (Json Web Token) Authentication to ensure secure user access.
### State Management
- **Redux**:- Application state is managed using Redux, which dispatches actions to reducers and maintains the store.
### Products Management
- **Product Display**:- Products are shown on the main page where users can search and filter by price and category.
- **Add to Cart**:- Authenticated users can add products to their cart. Clicking once adds the product, and clicking again increases the quantity.
- **View Cart**:- Authenticated users can view their cart, see the items, and the total price.
- **Modify Cart**:- Users can increase, decrease, or remove items from the cart.
### Purchase and Orders
- **Purchase**:- Users can purchase the items in their cart.
- **Order Tracking**:- After purchasing, users are redirected to the order page where they can see a list of their ordered items.
  ## Detailed Implementation
  ### Front-end
  Developed using React, the front-end of BuyBusy is dynamic made with BootSTrap. Redux is used for state management to ensure that components efficiently react to changes in the application's state.
  #### Product Page
  - **Search Functionality**:- Allows users to search for products by name.
  - **Filter**:- Users can filter products by price and category.
  #### Cart Management
  - **Add to Cart**:- An action is dispatched to add items to the cart. The cart state updates to reflect the added product or increased quantity.
  - **Cart View**:- Displays a list of products in the cart along with the total price.
  - **Modify Cart**:- Actions can increase or decrease the quantity of products, or remove them from the cart.
  ### Back-end
  Built using Node.js and Express.js, the back-end handles API requests and communicates with the MongoDB database.
  #### Authentication
  - **JWT Tokens**:- Used for securing API endpoints and ensuring that users are authenticated before they can perform certain actions.
  #### Database
  - **MongoDB**:- Mongoose schemas are used to model the application data, ensuring efficient data structures and integrity.
  ### API Integration
  Axios is used to integrate with REST APIs, facilitating communication between the front-end and back-end of the application.
  ___
