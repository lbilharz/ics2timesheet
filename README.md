# ics2timesheet

Track your working times conviently in your favorite calendar tool and use ics2timesheet to convert the calendar events into a sleek timesheet.

### 📣 Disclaimer

This is my personal tool designed for my own use. You're welcome to try it at [https://timesheet.bilharz.eu](https://timesheet.bilharz.eu)!. Remember, it's a "use-at-your-own-risk" solution. Questions? Feel free to ask, and I'll try to help out! ✨

### 🎩 Features

*ics2timesheet* automates the conversion of your calendar file into a timesheet. It includes total earnings calculations and VAT (19%).

- **Timeframe Shortcuts**: Easily bill for 'today', 'yesterday', 'this week', 'last week', 'this month', or 'last month'.
- **Daily Groupings**: Your work hours are grouped by day for clarity.
- **Printable Format**: Get a print-friendly HTML timesheet, best viewed in Chrome for proper table header formatting.

### 🚀 How to Use

- Fetch and process `.ics` calendar files or URLs.
- Filter events for specific jobs or tags.
- Calculate total hours spent on each task.

## Setup and Usage

1. **Access the Web Application:**
   Simply head over to [https://timesheet.bilharz.eu](https://timesheet.bilharz.eu) to start converting your calendar into a timesheet.

2. **Using the Application:**
   - To process a `.ics` file, choose the file from your device.
   - To process a calendar URL, enter the URL and hit 'Fetch Calendar'.

3. **Filtering and Summaries:**
   Utilize the filtering options to focus on specific jobs or events within your calendar.

## Local Development Setup

To set up a local development environment:

- Clone the repository:
    ```bash
    git clone https://github.com/lbilharz/ics2timesheet.git
    ```
- Navigate to the project directory:
    ```bash
    cd ics2timesheet
    ```
- Serve the `public` directory using a local server. For PHP environments:
    ```bash
    php -S localhost:8000 -t public
    ```
- Access the application in your browser at `http://localhost:8000`.

## Deployment

To deploy your own instance:

1. Upload the contents of the `public` directory to your web server's document root.
2. Ensure your server is configured to serve `index.html` as the default document.
3. If using `calendar.php` for fetching calendar data, ensure your server is capable of processing PHP scripts.

