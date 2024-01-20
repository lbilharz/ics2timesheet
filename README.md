## Disclaimer

> **DISCLAIMER:** This is a personal project, used to generate my own timesheets. It is not intended for public use.
>
> If you wish to use it, feel free to do so at [ics.bilharz.net](http://ics.bilharz.net).
>
> However, please note that I may not provide extensive support, but you can still ask questions.

## ics2timesheet

Extract a timesheet from a calendar file. You can set an hourly rate and the timesheet will calculate the total amount of money you earned. including added value tax (VAT) of 19%.

There are serveral short hands for the time frame you want to bill: `today`, `yesterday`, `this week`, `last week`, `this month`, `last month` …

The timesheet will be generated as printable HTML view. Chrome is recommended for printing, as it supports repeating table headers.

### Usage

1. Export your calendar as an `.ics` file.
2. Open the exported file in the file selection dialog on the site.
3. Select the time range for which you want the timesheet to be generated.
4. The timesheet will allow filtering on specific jobs. To do this, add the event in parentheses `()` to the title of the calendar event. For example: `JobName (Event)`.


