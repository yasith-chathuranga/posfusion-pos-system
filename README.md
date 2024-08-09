# POSFusion POS System

## Overview

POSFusion POS System is a web-based Point of Sale (POS) application designed to manage essential operations such as adding, searching, updating, and deleting records. The frontend is built using HTML, CSS, JavaScript, and jQuery, while the backend leverages Java EE with Tomcat.

## Features

### Customer Management
- **Add new customers:** Easily add customer records to the system.
- **Search existing customers:** Quickly search for customers by ID.
- **Update customer information:** Modify customer details as needed.
- **Delete customers:** Remove customer records from the system.

### Item Management
- **Add new items to inventory:** Keep your inventory up-to-date by adding new items.
- **Search existing items:** Find items in the inventory by ID.
- **Update item information:** Update item details as required.
- **Delete items from inventory:** Remove items from your inventory.

### Order Management
- **Create new orders:** Generate new orders quickly and efficiently.
- **Retrieve and view existing orders:** Access and review past orders.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript, jQuery
- **Backend:** Java EE, Tomcat
- **API Documentation:** Postman Documentation

## Controllers and Endpoints

### Customer Controller
- **Add Customer:** `POST /customer` - Adds a new customer.
- **Search Customer:** `GET /customer/{id}` - Retrieves customer details by ID.
- **Update Customer:** `PUT /customer` - Updates the details of an existing customer.
- **Delete Customer:** `DELETE /customer/{id}` - Deletes a customer by ID.
- **Get Customers:** `GET /customer` - Retrieves a list of all customers.

### Item Controller
- **Add Item:** `POST /item` - Adds a new item to the inventory.
- **Search Item:** `GET /item/{id}` - Retrieves item details by ID.
- **Update Item:** `PUT /item` - Updates the details of an existing item.
- **Delete Item:** `DELETE /item/{id}` - Deletes an item by ID.
- **Get Items:** `GET /item` - Retrieves a list of all items.

### Order Controller
- **Add Order:** `POST /order` - Creates a new order.
- **Get Orders:** `GET /order` - Retrieves a list of all orders.

## Getting Started
1. Prerequisites Ensure you have a Java EE environment set up with Tomcat installed.
2. Clone the Repository: `git clone https://github.com/yasith-chathuranga/posfusion-pos-system.git`
3. Setup Database: Configure your database settings in `application.properties`
4. Build and Run: Deploy the WAR file to Tomcat and access the application.

### License
This project is licensed under the [MIT License](LICENSE).
