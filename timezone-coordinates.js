// timezone-coordinates.js
// Static mapping of IANA timezones to coordinates for weather lookups
const TIMEZONE_COORDINATES = {
  // North America
  'America/New_York': { lat: 40.7143, lon: -74.0060, city: 'New York' },
  'America/Chicago': { lat: 41.8500, lon: -87.6500, city: 'Chicago' },
  'America/Denver': { lat: 39.7392, lon: -104.9903, city: 'Denver' },
  'America/Los_Angeles': { lat: 34.0522, lon: -118.2437, city: 'Los Angeles' },
  'America/Phoenix': { lat: 33.4484, lon: -112.0740, city: 'Phoenix' },
  'America/Anchorage': { lat: 61.2181, lon: -149.9003, city: 'Anchorage' },
  'America/Toronto': { lat: 43.6532, lon: -79.3832, city: 'Toronto' },
  'America/Vancouver': { lat: 49.2827, lon: -123.1207, city: 'Vancouver' },
  'America/Mexico_City': { lat: 19.4326, lon: -99.1332, city: 'Mexico City' },
  'America/Detroit': { lat: 42.3314, lon: -83.0458, city: 'Detroit' },
  'America/Boston': { lat: 42.3601, lon: -71.0589, city: 'Boston' },
  'America/Miami': { lat: 25.7617, lon: -80.1918, city: 'Miami' },
  'America/Seattle': { lat: 47.6062, lon: -122.3321, city: 'Seattle' },
  'America/San_Francisco': { lat: 37.7749, lon: -122.4194, city: 'San Francisco' },
  'America/Las_Vegas': { lat: 36.1699, lon: -115.1398, city: 'Las Vegas' },
  'America/Atlanta': { lat: 33.7490, lon: -84.3880, city: 'Atlanta' },
  'America/Dallas': { lat: 32.7767, lon: -96.7970, city: 'Dallas' },
  'America/Houston': { lat: 29.7604, lon: -95.3698, city: 'Houston' },
  'America/Philadelphia': { lat: 39.9526, lon: -75.1652, city: 'Philadelphia' },
  'America/Montreal': { lat: 45.5017, lon: -73.5673, city: 'Montreal' },
  'America/Calgary': { lat: 51.0447, lon: -114.0719, city: 'Calgary' },
  'America/Edmonton': { lat: 53.5461, lon: -113.4938, city: 'Edmonton' },
  'America/Winnipeg': { lat: 49.8951, lon: -97.1384, city: 'Winnipeg' },
  'America/Halifax': { lat: 44.6488, lon: -63.5752, city: 'Halifax' },
  
  // Europe
  'Europe/London': { lat: 51.5074, lon: -0.1278, city: 'London' },
  'Europe/Paris': { lat: 48.8566, lon: 2.3522, city: 'Paris' },
  'Europe/Berlin': { lat: 52.5200, lon: 13.4050, city: 'Berlin' },
  'Europe/Rome': { lat: 41.9028, lon: 12.4964, city: 'Rome' },
  'Europe/Madrid': { lat: 40.4168, lon: -3.7038, city: 'Madrid' },
  'Europe/Amsterdam': { lat: 52.3676, lon: 4.9041, city: 'Amsterdam' },
  'Europe/Vienna': { lat: 48.2082, lon: 16.3738, city: 'Vienna' },
  'Europe/Stockholm': { lat: 59.3293, lon: 18.0686, city: 'Stockholm' },
  'Europe/Moscow': { lat: 55.7558, lon: 37.6176, city: 'Moscow' },
  'Europe/Dublin': { lat: 53.3498, lon: -6.2603, city: 'Dublin' },
  'Europe/Brussels': { lat: 50.8503, lon: 4.3517, city: 'Brussels' },
  'Europe/Copenhagen': { lat: 55.6761, lon: 12.5683, city: 'Copenhagen' },
  'Europe/Oslo': { lat: 59.9139, lon: 10.7522, city: 'Oslo' },
  'Europe/Helsinki': { lat: 60.1699, lon: 24.9384, city: 'Helsinki' },
  'Europe/Warsaw': { lat: 52.2297, lon: 21.0122, city: 'Warsaw' },
  'Europe/Prague': { lat: 50.0755, lon: 14.4378, city: 'Prague' },
  'Europe/Budapest': { lat: 47.4979, lon: 19.0402, city: 'Budapest' },
  'Europe/Zurich': { lat: 47.3769, lon: 8.5417, city: 'Zurich' },
  'Europe/Athens': { lat: 37.9838, lon: 23.7275, city: 'Athens' },
  'Europe/Lisbon': { lat: 38.7223, lon: -9.1393, city: 'Lisbon' },
  
  // Asia
  'Asia/Tokyo': { lat: 35.6762, lon: 139.6503, city: 'Tokyo' },
  'Asia/Shanghai': { lat: 31.2304, lon: 121.4737, city: 'Shanghai' },
  'Asia/Hong_Kong': { lat: 22.3193, lon: 114.1694, city: 'Hong Kong' },
  'Asia/Singapore': { lat: 1.3521, lon: 103.8198, city: 'Singapore' },
  'Asia/Seoul': { lat: 37.5665, lon: 126.9780, city: 'Seoul' },
  'Asia/Mumbai': { lat: 19.0760, lon: 72.8777, city: 'Mumbai' },
  'Asia/Kolkata': { lat: 22.5726, lon: 88.3639, city: 'Kolkata' },
  'Asia/Bangkok': { lat: 13.7563, lon: 100.5018, city: 'Bangkok' },
  'Asia/Dubai': { lat: 25.2048, lon: 55.2708, city: 'Dubai' },
  'Asia/Jakarta': { lat: -6.2088, lon: 106.8456, city: 'Jakarta' },
  'Asia/Manila': { lat: 14.5995, lon: 120.9842, city: 'Manila' },
  'Asia/Kuala_Lumpur': { lat: 3.1390, lon: 101.6869, city: 'Kuala Lumpur' },
  'Asia/Tel_Aviv': { lat: 32.0853, lon: 34.7818, city: 'Tel Aviv' },
  'Asia/Istanbul': { lat: 41.0082, lon: 28.9784, city: 'Istanbul' },
  'Asia/Tehran': { lat: 35.6892, lon: 51.3890, city: 'Tehran' },
  'Asia/Karachi': { lat: 24.8607, lon: 67.0011, city: 'Karachi' },
  'Asia/Riyadh': { lat: 24.7136, lon: 46.6753, city: 'Riyadh' },
  'Asia/Doha': { lat: 25.2854, lon: 51.5310, city: 'Doha' },
  'Asia/Kuwait': { lat: 29.3759, lon: 47.9774, city: 'Kuwait City' },
  'Asia/Beirut': { lat: 33.8938, lon: 35.5018, city: 'Beirut' },
  
  // Australia & Oceania
  'Australia/Sydney': { lat: -33.8679, lon: 151.2073, city: 'Sydney' },
  'Australia/Melbourne': { lat: -37.8136, lon: 144.9631, city: 'Melbourne' },
  'Australia/Brisbane': { lat: -27.4698, lon: 153.0251, city: 'Brisbane' },
  'Australia/Perth': { lat: -31.9505, lon: 115.8605, city: 'Perth' },
  'Australia/Adelaide': { lat: -34.9285, lon: 138.6007, city: 'Adelaide' },
  'Australia/Hobart': { lat: -42.8821, lon: 147.3272, city: 'Hobart' },
  'Australia/Darwin': { lat: -12.4634, lon: 130.8456, city: 'Darwin' },
  'Pacific/Auckland': { lat: -36.8485, lon: 174.7633, city: 'Auckland' },
  'Pacific/Honolulu': { lat: 21.3099, lon: -157.8581, city: 'Honolulu' },
  'Pacific/Fiji': { lat: -18.1248, lon: 178.4501, city: 'Suva' },
  'Pacific/Guam': { lat: 13.4443, lon: 144.7937, city: 'Hagatña' },
  
  // South America
  'America/Sao_Paulo': { lat: -23.5558, lon: -46.6396, city: 'São Paulo' },
  'America/Buenos_Aires': { lat: -34.6037, lon: -58.3816, city: 'Buenos Aires' },
  'America/Lima': { lat: -12.0464, lon: -77.0428, city: 'Lima' },
  'America/Bogota': { lat: 4.7110, lon: -74.0721, city: 'Bogotá' },
  'America/Santiago': { lat: -33.4489, lon: -70.6693, city: 'Santiago' },
  'America/Caracas': { lat: 10.4806, lon: -66.9036, city: 'Caracas' },
  'America/Rio_Branco': { lat: -9.9757, lon: -67.8243, city: 'Rio Branco' },
  'America/Montevideo': { lat: -34.9011, lon: -56.1645, city: 'Montevideo' },
  'America/La_Paz': { lat: -16.5000, lon: -68.1193, city: 'La Paz' },
  'America/Asuncion': { lat: -25.2637, lon: -57.5759, city: 'Asunción' },
  
  // Africa
  'Africa/Cairo': { lat: 30.0444, lon: 31.2357, city: 'Cairo' },
  'Africa/Lagos': { lat: 6.5244, lon: 3.3792, city: 'Lagos' },
  'Africa/Johannesburg': { lat: -26.2041, lon: 28.0473, city: 'Johannesburg' },
  'Africa/Nairobi': { lat: -1.2921, lon: 36.8219, city: 'Nairobi' },
  'Africa/Casablanca': { lat: 33.5731, lon: -7.5898, city: 'Casablanca' },
  'Africa/Tunis': { lat: 36.8065, lon: 10.1815, city: 'Tunis' },
  'Africa/Algiers': { lat: 36.7538, lon: 3.0588, city: 'Algiers' },
  'Africa/Addis_Ababa': { lat: 9.1450, lon: 40.4897, city: 'Addis Ababa' },
  'Africa/Accra': { lat: 5.6037, lon: -0.1870, city: 'Accra' },
  'Africa/Kinshasa': { lat: -4.4419, lon: 15.2663, city: 'Kinshasa' }
};

// Check if timezone has coordinates mapping
function hasWeatherCoordinates(timezone) {
  return TIMEZONE_COORDINATES.hasOwnProperty(timezone);
}

// Weather service implementation
class WeatherService {
  constructor() {
    this.cache = new Map();
    this.cacheDuration = 5 * 60 * 1000; // 5 minutes
  }

  async getWeatherForTimezone(timezone, overrideLat = null, overrideLon = null, tempUnit = 'C', windUnit = 'KPH') {
    try {
      // Check cache first (use timezone + coordinates + units as cache key for overrides)
      const cacheKey = `${timezone}_${overrideLat || ''}_${overrideLon || ''}_${tempUnit}_${windUnit}`;
      const cached = this.getFromCache(cacheKey);
      if (cached) return cached;

      // Get coordinates
      let coords;
      if (overrideLat && overrideLon) {
        coords = { 
          lat: parseFloat(overrideLat), 
          lon: parseFloat(overrideLon), 
          city: 'Custom Location' 
        };
      } else {
        coords = this.getCoordinatesForTimezone(timezone);
      }
      // Fetch weather
      const weatherData = await this.fetchWeatherData(coords, tempUnit, windUnit);
      // Cache result
      this.setCache(cacheKey, weatherData);
      return weatherData;
    } catch (error) {
      console.error('Weather fetch error:', error);
      return this.getFallbackWeather(timezone, tempUnit, windUnit);
    }
  }

  getCoordinatesForTimezone(timezone) {
    const coords = TIMEZONE_COORDINATES[timezone];
    if (!coords) {
      // Try to extract city name as fallback
      const parts = timezone.split('/');
      const city = parts[parts.length - 1].replace(/_/g, ' ');
      throw new Error(`Coordinates not found for timezone: ${timezone}. City: ${city}`);
    }
    return coords;
  }

  async fetchWeatherData({ lat, lon }, tempUnit = 'C', windUnit = 'KPH') {
    // Open-Meteo API: temperature_unit (celsius/fahrenheit), windspeed_unit (kmh/ms/mph)
    let temperature_unit = (tempUnit === 'F') ? 'fahrenheit' : 'celsius';
    let windspeed_unit = 'kmh';
    if (windUnit === 'MPH') windspeed_unit = 'mph';
    else if (windUnit === 'MS') windspeed_unit = 'ms';

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code` +
      `&hourly=precipitation_probability&timezone=auto` +
      `&temperature_unit=${temperature_unit}&windspeed_unit=${windspeed_unit}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    return this.formatWeatherData(data);
  }

  formatWeatherData(data) {
    const current = data.current;
    const precipitation = data.hourly.precipitation_probability[0] || 0;
    return {
      temperature: Math.round(current.temperature_2m),
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m),
      windDirection: current.wind_direction_10m,
      windCompass: this.degreesToCompass(current.wind_direction_10m),
      precipitationChance: precipitation,
      condition: this.getWeatherCondition(current.weather_code),
      timestamp: Date.now()
    };
  }

  degreesToCompass(degrees) {
    if (degrees === null || degrees === undefined) return 'N';
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
                       'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  }

  getWeatherCondition(code) {
    const conditions = {
      0: 'Clear',
      1: 'Mainly Clear',
      2: 'Partly Cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Rime Fog',
      51: 'Light Drizzle',
      53: 'Drizzle',
      55: 'Heavy Drizzle',
      61: 'Light Rain',
      63: 'Rain',
      65: 'Heavy Rain',
      71: 'Light Snow',
      73: 'Snow',
      75: 'Heavy Snow',
      95: 'Thunderstorm'
    };
    return conditions[code] || 'Unknown';
  }

  getFromCache(key) {
    const cached = this.cache.get(key);
    if (cached && (Date.now() - cached.timestamp < this.cacheDuration)) {
      return cached.data;
    }
    return null;
  }

  setCache(key, data) {
    this.cache.set(key, {
      data: data,
      timestamp: Date.now()
    });
  }

  getFallbackWeather(timezone, tempUnit = 'C', windUnit = 'KPH') {
    // Provide fallback in requested units
    let temperature = 20;
    if (tempUnit === 'F') temperature = Math.round((temperature * 9/5) + 32);
    let windSpeed = 5;
    if (windUnit === 'MPH') windSpeed = Math.round(windSpeed * 0.621371);
    else if (windUnit === 'MS') windSpeed = Math.round(windSpeed / 3.6);
    return {
      temperature,
      humidity: 50,
      windSpeed,
      windDirection: 180,
      windCompass: 'S',
      precipitationChance: 0,
      condition: 'Weather Unavailable',
      isFallback: true,
      timestamp: Date.now()
    };
  }
}