## 🌟 Welcome to ics2timesheet!

Hello digital nomads and freelancers! Struggling with timesheet creation? *ics2timesheet* is here to help. This tool transforms your calendar events into a well-organized timesheet, making life a bit easier. 🚀

### 📣 Disclaimer

This is my personal tool designed for my own use. You're welcome to try it at [ics.bilharz.net](http://ics.bilharz.net). Remember, it's a "use-at-your-own-risk" solution. Questions? Feel free to ask, and I'll try to help out! ✨

### 🎩 Features

*ics2timesheet* automates the conversion of your calendar file into a timesheet. It includes total earnings calculations and VAT (19%).

- **Timeframe Shortcuts**: Easily bill for 'today', 'yesterday', 'this week', 'last week', 'this month', or 'last month'.
- **Daily Groupings**: Your work hours are grouped by day for clarity.
- **Printable Format**: Get a print-friendly HTML timesheet, best viewed in Chrome for proper table header formatting.

### 🚀 How to Use

#### With an `.ics` File:
1. Export your calendar as an `.ics` file.
2. Go to [ics.bilharz.net](http://ics.bilharz.net) and upload your file.
3. Select the desired time range for billing.
4. To filter jobs, add them in parentheses in your event title (e.g., `Coding Session (Project X)`).

#### With a Webcal Link:
1. Copy your webcal link.
2. Paste it into [ics.bilharz.net](http://ics.bilharz.net).
3. Choose the billing period.
4. Use the parentheses format for job filtering.


> Enjoy a more streamlined way of creating timesheets with *ics2timesheet*! Simplify your workflow and focus on what you do best. 🌴💻📅


## 💻 Setting Up `ics2timesheet` locally

Want to run `ics2timesheet` locally? Here’s how to get it up and running on your machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and npm installed. You can download them from the Node.js official website.

### Installation Steps

1. **Clone the Repository**:
   First, clone the `ics2timesheet` repository to your local machine:
    ```bash
    git clone https://github.com/lbilharz/ics2timesheet.git
    cd ics2timesheet
    ```

2. **Install Dependencies**:
   Navigate into the project directory and install the necessary npm packages:
    ```bash
    npm install
    ```

3. **Start the Server**:
   Run the server using Node.js. If you have Nodemon installed, it will automatically restart the server upon file changes. Otherwise, use `node` to start the server.
    ```bash
    npm run dev  # If Nodemon is installed
    # or
    node server.js  # If not using Nodemon
    ```

4. **Access the Application**:
   Open your web browser and navigate to `http://localhost:3000`. You should see the `ics2timesheet` interface.

That's it! You're now ready to use `ics2timesheet` on your local machine.

### Additional Notes

- For live reloading of the frontend, you can use Browser-Sync. If you've run `npm run dev`, it should already be in action.
- Any modifications you make to the source code will be reflected when you refresh your browser (if using live reloading) or restart the server.

Enjoy using `ics2timesheet`, and feel free to contribute to its development!

