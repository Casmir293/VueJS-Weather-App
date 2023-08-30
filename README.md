# VueJS-Weather-App

A simple weather app built using Vue.js that fetches weather data from the OpenWeatherMap API based on user input or their current geolocation.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Credits](#credits)

## Features

- Display current weather data based on location search or geolocation.
- Show current temperature and weather conditions.
- Dynamic background and theme based on temperature.

## Getting Started

### Prerequisites

To run this project, you'll need:

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/casmir293/vue-weather-app.git

   ```

2. Navigate to the project directory:

   ```sh
   cd vue-weather-app

   ```

3. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

1. Run the development server:

   ```sh
   npm run serve

   ```

2. Open your browser and go to http://localhost:8080 (or the specified port).

3. Enter a location in the input field and press Enter to fetch weather data for that location. You can also allow the app to use your geolocation by clicking on the browser's geolocation prompt.

## Configuration

Before running the app, you need to configure your OpenWeatherMap API key. Follow these steps:

1. Create an account on OpenWeatherMap and obtain an API key.

2. Rename the config.example.js file in the project's root directory to config.js.

3. Replace "YOUR_API_KEY" in config.js with your actual API key.

## Credits

- This app is based on the Vue.js framework.
- Weather data is fetched using the OpenWeatherMap API.
