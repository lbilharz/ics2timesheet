<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: text/plain');

$webcalUrl = str_replace('webcal', 'https', $_GET['url'] ?? '');
$calendarData = file_get_contents($webcalUrl);

if ($calendarData === false) {
    http_response_code(500);
    echo 'Error fetching calendar';
    exit;
}

echo $calendarData;
