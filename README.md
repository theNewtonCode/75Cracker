# 75CRACKER
75CRACKER is a web application designed to help me and my friends track progress on the Blind 75 coding challenge sheet. It allows users to log their progress, view others' progress, and communicate through a common chat area.

## Features

- User selection
- Progress tracking for each question in the Blind 75 sheet
- Daily goal of 2 questions per day
- Visual representation of each user's progress
- Status indicators for solved, and stuck questions
- Dark mode support

## Tech Stack

- MongoDB Atlas (Database)
- Express.js (Backend)
- React.js (Frontend)
- Node.js (Runtime Environment)

## Screenshots

### Progress Tracker
![Progress Tracker](project_ss/cp.png)
*Caption: The main progress tracking page showing individual and overall progress.*

### Update Progress Form
![Update Progress Form](project_ss/uf.png)
*Caption: The form where users can update their progress on specific questions.*

## Installation

1. Clone the repository
   git clone https://github.com/theNewtonCode/75Cracker.git
2. Install dependencies for backend
   cd blind-75-tracker/server
    npm install
3. Install dependencies for frontend
   cd ../client
   npm install
4. Set up environment variables
- Create a `.env` file in the server directory
- Add your MongoDB Atlas connection string and other necessary variables

5. Start the backend server
6. Start the frontend application

7. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Select your username from the dropdown on the home page
2. Use the "Update Progress" form to log your progress on specific questions
3. View your progress and others' progress on the main tracker page
4. Toggle dark mode using the button on the home page

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
