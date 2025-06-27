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
  
  // Australia & Oceania
  'Australia/Sydney': { lat: -33.8679, lon: 151.2073, city: 'Sydney' },
  'Australia/Melbourne': { lat: -37.8136, lon: 144.9631, city: 'Melbourne' },
  'Australia/Brisbane': { lat: -27.4698, lon: 153.0251, city: 'Brisbane' },
  'Australia/Perth': { lat: -31.9505, lon: 115.8605, city: 'Perth' },
  'Australia/Adelaide': { lat: -34.9285, lon: 138.6007, city: 'Adelaide' },
  'Australia/Hobart': { lat: -42.8821, lon: 147.3272, city: 'Hobart' },
  'Australia/Darwin': { lat: -12.4634, lon: 130.8456, city: 'Darwin' },
  'Pacific/Auckland': { lat: -36.8485, lon: 174.7633, city: 'Auckland' },
  
  // South America
  'America/Sao_Paulo': { lat: -23.5558, lon: -46.6396, city: 'São Paulo' },
  'America/Buenos_Aires': { lat: -34.6037, lon: -58.3816, city: 'Buenos Aires' },
  'America/Lima': { lat: -12.0464, lon: -77.0428, city: 'Lima' },
  'America/Bogota': { lat: 4.7110, lon: -74.0721, city: 'Bogotá' },
  
  // Africa
  'Africa/Cairo': { lat: 30.0444, lon: 31.2357, city: 'Cairo' },
  'Africa/Lagos': { lat: 6.5244, lon: 3.3792, city: 'Lagos' },
  'Africa/Johannesburg': { lat: -26.2041, lon: 28.0473, city: 'Johannesburg' },
  'Africa/Nairobi': { lat: -1.2921, lon: 36.8219, city: 'Nairobi' }
};

// Weather service implementation
class WeatherService {
  constructor() {
    this.cache = new Map();
    this.cacheDuration = 5 * 60 * 1000; // 5 minutes
  }

  async getWeatherForTimezone(timezone) {
    try {
      // Check cache first
      const cached = this.getFromCache(timezone);
      if (cached) return cached;

      // Get coordinates
      const coords = this.getCoordinatesForTimezone(timezone);
      
      // Fetch weather
      const weatherData = await this.fetchWeatherData(coords);
      
      // Cache result
      this.setCache(timezone, weatherData);
      
      return weatherData;
    } catch (error) {
      console.error('Weather fetch error:', error);
      return this.getFallbackWeather(timezone);
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

  async fetchWeatherData({ lat, lon }) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code&hourly=precipitation_probability&timezone=auto`;
    
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
      windSpeed: Math.round(current.wind_speed_10m * 2.237), // Convert m/s to mph
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

  getFromCache(timezone) {
    const cached = this.cache.get(timezone);
    if (cached && (Date.now() - cached.timestamp < this.cacheDuration)) {
      return cached.data;
    }
    return null;
  }

  setCache(timezone, data) {
    this.cache.set(timezone, {
      data: data,
      timestamp: Date.now()
    });
  }

  getFallbackWeather(timezone) {
    return {
      temperature: 20,
      humidity: 50,
      windSpeed: 5,
      windDirection: 180,
      windCompass: 'S',
      precipitationChance: 0,
      condition: 'Weather Unavailable',
      isFallback: true,
      timestamp: Date.now()
    };
  }
}