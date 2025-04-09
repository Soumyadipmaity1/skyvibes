# 🌦️ SkyVibes

A modern, responsive Weather App built that allows users to search for any city and view the current weather, 5-day forecast, and additional climate insights in a clean, animated UI.

<img width="953" alt="image" src="https://res.cloudinary.com/da3u4ukxz/image/upload/v1744176404/Screenshot_2025-04-09_105325_u3p0sv.png" />
<img width="953" alt="image" src="https://res.cloudinary.com/da3u4ukxz/image/upload/v1744176404/Screenshot_2025-04-09_105352_yqt0q6.png" />





## 🔧 Tech Stack

- **Next.js 15 (App Router)**
- **React 19**
- **TypeScript**
- **Toaster** - for notification
- **Framer Motion** – for animations
- **Lucide React** – for icons
- **Tailwind CSS / Custom CSS** – for styling
- **Loader Animation** - To increase user interaction
- **OpenWeatherMap API** – for real-time weather and forecast data
- **LocalStorage** – for storing recent searches



## 🚀 Features

- Real-time weather display (temperature, description, humidity, wind speed)
- 5-Day weather forecast with icons
- Light/Dark theme toggle
- City-based search functionality
- Recent search history with quick access
- Refresh button to re-fetch data
- Smooth animations via Framer Motion
- Smart loader while data is being fetched


## 🌐 API Integration

The Weather App integrates with the **[OpenWeatherMap API](https://openweathermap.org/api)** to retrieve real-time weather conditions and 5-day forecasts based on the user’s selected city.

### 🔑 API Key Setup

To access OpenWeatherMap services, you'll need to obtain a free API key:

1. Sign up at [https://openweathermap.org/](https://openweathermap.org/).
2. Navigate to your account > API keys.
3. Create a new key or use the default one provided.

Add your API key to a local environment variable file:

```bash
# .env.local
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

> ⚠️ **Important:** Never expose your API key directly in the code. Use environment variables (`.env.local`) and the `NEXT_PUBLIC_` prefix for secure client-side access in Next.js.



### 📡 Endpoints Used

The app makes use of the following OpenWeatherMap endpoints:

- Current Weather Data

  ```
  https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric
  ```

- 5-Day / 3-Hour Forecast

  ```
  https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric
  ```



### ⚙️ Data Fetching

Weather data is fetched using native `fetch()` calls inside React components. Example:

```ts
const fetchWeatherData = async (city: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
  );
  const data = await response.json();
  return data;
};
```

- Error handling included for invalid city input
- Refresh button re-fetches latest data on demand
- Search dynamically queries data using city name





## 🧩 Folder Structure


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.


### 👨‍💻 Developer Contact

| 🔹 Field    | 🔗 Information |
|------------|----------------|
| **Name**   | Soumyadip Maity |
| **Email**  | [22053029@kiit.ac.in](mailto:22053029@kiit.ac.in) |
| **Website**| [soumyadip.tech](https://www.soumyadip.tech) |
| **GitHub** | [github.com/soumyadipmaity1](https://github.com/soumyadipmaity1) |
| **LinkedIn** | [linkedin.com/in/soumyadip-maity-a77b41282](https://www.linkedin.com/in/soumyadip-maity-a77b41282/) |

> 📩 *Feel free to reach out!*

