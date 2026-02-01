Agricultural Management Dashboard

A modern Agricultural Management System dashboard built with HTML, CSS, JavaScript, and Bootstrap. This project provides an intuitive interface to manage crops, farmers, yields, and reports. Data is stored locally using localStorage, making it easy to run without any backend.

🛠 Features

Dashboard Overview

Summary cards: Total Crops, Total Farms, Total Farmers, Total Yields

Interactive charts for crops, farmers, and yields (Bar, Pie, Line)

Crop Management

Add, edit, delete crops

Search and filter crops dynamically

Updates reflected in dashboard charts

Farmer Management

Add, edit, delete farmers

Search and filter farmers dynamically

Integrated into dashboard statistics

Reports

Visualize crop distribution, farmer ratio, and yield trends

Dynamic charts update automatically based on stored data

Responsive Design

Fully responsive sidebar, header, and main content

Mobile-friendly layout using Bootstrap and custom CSS

LocalStorage Integration

All data (crops, farmers, yields) persist between sessions

No backend required, runs entirely in the browser

💻 Technologies Used

Frontend: HTML5, CSS3, JavaScript (ES6+)

UI Framework: Bootstrap 5

Charts: Chart.js

Data Storage: LocalStorage (Browser-based)

📁 Project Structure
Agricultural-Dashboard/
│
├── Dashboard.html         # Main dashboard overview
├── Crops.html             # Crop management page
├── Farmers.html           # Farmers management page
├── Reports.html           # Reports page with charts
├── style.css              # Custom styling
├── script.js              # Shared JS (sidebar, toggle, etc.)
├── dashboard.js           # Dashboard-specific chart logic
├── Farmers.js             # Farmer management JS
├── README.md              # Project documentation
