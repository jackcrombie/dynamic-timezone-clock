
// js/timezone-data.js

export const TIMEZONE_COORDINATES = {
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

export const IANA_TIMEZONES = [
    "Africa/Abidjan", "Africa/Accra", "Africa/Addis_Ababa", "Africa/Algiers", "Africa/Asmara", "Africa/Bamako", "Africa/Bangui", "Africa/Banjul", "Africa/Bissau", "Africa/Blantyre", "Africa/Brazzaville", "Africa/Bujumbura", "Africa/Cairo", "Africa/Casablanca", "Africa/Ceuta", "Africa/Conakry", "Africa/Dakar", "Africa/Dar_es_Salaam", "Africa/Djibouti", "Africa/Douala", "Africa/El_Aaiun", "Africa/Freetown", "Africa/Gaborone", "Africa/Harare", "Africa/Johannesburg", "Africa/Juba", "Africa/Kampala", "Africa/Khartoum", "Africa/Kigali", "Africa/Kinshasa", "Africa/Lagos", "Africa/Libreville", "Africa/Lome", "Africa/Luanda", "Africa/Lubumbashi", "Africa/Lusaka", "Africa/Malabo", "Africa/Maputo", "Africa/Maseru", "Africa/Mbabane", "Africa/Mogadishu", "Africa/Monrovia", "Africa/Nairobi", "Africa/Ndjamena", "Africa/Niamey", "Africa/Nouakchott", "Africa/Ouagadougou", "Africa/Porto-Novo", "Africa/Sao_Tome", "Africa/Tripoli", "Africa/Tunis", "Africa/Windhoek",
    "America/Adak", "America/Anchorage", "America/Anguilla", "America/Antigua", "America/Araguaina", "America/Argentina/Buenos_Aires", "America/Argentina/Catamarca", "America/Argentina/Cordoba", "America/Argentina/Jujuy", "America/Argentina/La_Rioja", "America/Argentina/Mendoza", "America/Argentina/Rio_Gallegos", "America/Argentina/Salta", "America/Argentina/San_Juan", "America/Argentina/San_Luis", "America/Argentina/Tucuman", "America/Argentina/Ushuaia", "America/Aruba", "America/Asuncion", "America/Atikokan", "America/Bahia", "America/Bahia_Banderas", "America/Barbados", "America/Belem", "America/Belize", "America/Blanc-Sablon", "America/Boa_Vista", "America/Bogota", "America/Boise", "America/Buenos_Aires", "America/Cambridge_Bay", "America/Campo_Grande", "America/Cancun", "America/Caracas", "America/Cayenne", "America/Cayman", "America/Chicago", "America/Chihuahua", "America/Costa_Rica", "America/Creston", "America/Cuiaba", "America/Curacao", "America/Danmarkshavn", "America/Dawson", "America/Dawson_Creek", "America/Denver", "America/Detroit", "America/Dominica", "America/Edmonton", "America/Eirunepe", "America/El_Salvador", "America/Fort_Nelson", "America/Fortaleza", "America/Glace_Bay", "America/Godthab", "America/Goose_Bay", "America/Grand_Turk", "America/Grenada", "America/Guadeloupe", "America/Guatemala", "America/Guayaquil", "America/Guyana", "America/Halifax", "America/Havana", "America/Hermosillo", "America/Indiana/Indianapolis", "America/Indiana/Knox", "America/Indiana/Marengo", "America/Indiana/Petersburg", "America/Indiana/Tell_City", "America/Indiana/Vevay", "America/Indiana/Vincennes", "America/Indiana/Winamac", "America/Inuvik", "America/Iqaluit", "America/Jamaica", "America/Juneau", "America/Kentucky/Louisville", "America/Kentucky/Monticello", "America/Kralendijk", "America/La_Paz", "America/Lima", "America/Los_Angeles", "America/Lower_Princes", "America/Maceio", "America/Managua", "America/Manaus", "America/Marigot", "America/Martinique", "America/Matamoros", "America/Mazatlan", "America/Menominee", "America/Merida", "America/Metlakatla", "America/Mexico_City", "America/Miquelon", "America/Moncton", "America/Monterrey", "America/Montevideo", "America/Montserrat", "America/Nassau", "America/New_York", "America/Nipigon", "America/Nome", "America/Noronha", "America/North_Dakota/Beulah", "America/North_Dakota/Center", "America/North_Dakota/New_Salem", "America/Ojinaga", "America/Panama", "America/Pangnirtung", "America/Paramaribo", "America/Phoenix", "America/Port-au-Prince", "America/Port_of_Spain", "America/Porto_Velho", "America/Puerto_Rico", "America/Punta_Arenas", "America/Rainy_River", "America/Rankin_Inlet", "America/Recife", "America/Regina", "America/Resolute", "America/Rio_Branco", "America/Santarem", "America/Santiago", "America/Santo_Domingo", "America/Sao_Paulo", "America/Scoresbysund", "America/Sitka", "America/St_Barthelemy", "America/St_Johns", "America/St_Kitts", "America/St_Lucia", "America/St_Thomas", "America/St_Vincent", "America/Swift_Current", "America/Tegucigalpa", "America/Thule", "America/Thunder_Bay", "America/Tijuana", "America/Toronto", "America/Tortola", "America/Vancouver", "America/Whitehorse", "America/Winnipeg", "America/Yakutat", "America/Yellowknife",
    "Antarctica/Casey", "Antarctica/Davis", "Antarctica/DumontDUrville", "Antarctica/Macquarie", "Antarctica/Mawson", "Antarctica/McMurdo", "Antarctica/Palmer", "Antarctica/Rothera", "Antarctica/Syowa", "Antarctica/Troll", "Antarctica/Vostok",
    "Arctic/Longyearbyen",
    "Asia/Aden", "Asia/Almaty", "Asia/Amman", "Asia/Anadyr", "Asia/Aqtau", "Asia/Aqtobe", "Asia/Ashgabat", "Asia/Atyrau", "Asia/Baghdad", "Asia/Bahrain", "Asia/Baku", "Asia/Bangkok", "Asia/Barnaul", "Asia/Beirut", "Asia/Bishkek", "Asia/Brunei", "Asia/Chita", "Asia/Choibalsan", "Asia/Colombo", "Asia/Damascus", "Asia/Dhaka", "Asia/Dili", "Asia/Dubai", "Asia/Dushanbe", "Asia/Famagusta", "Asia/Gaza", "Asia/Hebron", "Asia/Ho_Chi_Minh", "Asia/Hong_Kong", "Asia/Hovd", "Asia/Irkutsk", "Asia/Jakarta", "Asia/Jayapura", "Asia/Jerusalem", "Asia/Kabul", "Asia/Kamchatka", "Asia/Karachi", "Asia/Kathmandu", "Asia/Khandyga", "Asia/Kolkata", "Asia/Krasnoyarsk", "Asia/Kuala_Lumpur", "Asia/Kuching", "Asia/Kuwait", "Asia/Macau", "Asia/Magadan", "Asia/Makassar", "Asia/Manila", "Asia/Muscat", "Asia/Nicosia", "Asia/Novokuznetsk", "Asia/Novosibirsk", "Asia/Omsk", "Asia/Oral", "Asia/Phnom_Penh", "Asia/Pontianak", "Asia/Pyongyang", "Asia/Qatar", "Asia/Qostanay", "Asia/Qyzylorda", "Asia/Riyadh", "Asia/Sakhalin", "Asia/Samarkand", "Asia/Seoul", "Asia/Shanghai", "Asia/Singapore", "Asia/Srednekolymsk", "Asia/Taipei", "Asia/Tashkent", "Asia/Tbilisi", "Asia/Tehran", "Asia/Thimphu", "Asia/Tokyo", "Asia/Tomsk", "Asia/Ulaanbaatar", "Asia/Urumqi", "Asia/Ust-Nera", "Asia/Vientiane", "Asia/Vladivostok", "Asia/Yakutsk", "Asia/Yangon", "Asia/Yekaterinburg", "Asia/Yerevan",
    "Atlantic/Azores", "Atlantic/Bermuda", "Atlantic/Canary", "Atlantic/Cape_Verde", "Atlantic/Faroe", "Atlantic/Madeira", "Atlantic/Reykjavik", "Atlantic/South_Georgia", "Atlantic/St_Helena", "Atlantic/Stanley",
    "Australia/Adelaide", "Australia/Brisbane", "Australia/Broken_Hill", "Australia/Currie", "Australia/Darwin", "Australia/Eucla", "Australia/Hobart", "Australia/Lindeman", "Australia/Lord_Howe", "Australia/Melbourne", "Australia/Perth", "Australia/Sydney",
    "Europe/Amsterdam", "Europe/Andorra", "Europe/Astrakhan", "Europe/Athens", "Europe/Belgrade", "Europe/Berlin", "Europe/Bratislava", "Europe/Brussels", "Europe/Bucharest", "Europe/Budapest", "Europe/Busingen", "Europe/Chisinau", "Europe/Copenhagen", "Europe/Dublin", "Europe/Gibraltar", "Europe/Guernsey", "Europe/Helsinki", "Europe/Isle_of_Man", "Europe/Istanbul", "Europe/Jersey", "Europe/Kaliningrad", "Europe/Kiev", "Europe/Kirov", "Europe/Lisbon", "Europe/Ljubljana", "Europe/London", "Europe/Luxembourg", "Europe/Madrid", "Europe/Malta", "Europe/Mariehamn", "Europe/Minsk", "Europe/Monaco", "Europe/Moscow", "Europe/Oslo", "Europe/Paris", "Europe/Podgorica", "Europe/Prague", "Europe/Riga", "Europe/Rome", "Europe/Samara", "Europe/San_Marino", "Europe/Sarajevo", "Europe/Saratov", "Europe/Simferopol", "Europe/Skopje", "Europe/Sofia", "Europe/Stockholm", "Europe/Tallinn", "Europe/Tirane", "Europe/Ulyanovsk", "Europe/Uzhgorod", "Europe/Vaduz", "Europe/Vatican", "Europe/Vienna", "Europe/Vilnius", "Europe/Volgograd", "Europe/Warsaw", "Europe/Zagreb", "Europe/Zaporozhye", "Europe/Zurich",
    "Indian/Antananarivo", "Indian/Chagos", "Indian/Christmas", "Indian/Cocos", "Indian/Comoro", "Indian/Kerguelen", "Indian/Mahe", "Indian/Maldives", "Indian/Mauritius", "Indian/Mayotte", "Indian/Reunion",
    "Pacific/Apia", "Pacific/Auckland", "Pacific/Bougainville", "Pacific/Chatham", "Pacific/Chuuk", "Pacific/Easter", "Pacific/Efate", "Pacific/Enderbury", "Pacific/Fakaofo", "Pacific/Fiji", "Pacific/Funafuti", "Pacific/Galapagos", "Pacific/Gambier", "Pacific/Guadalcanal", "Pacific/Guam", "Pacific/Honolulu", "Pacific/Kiritimati", "Pacific/Kosrae", "Pacific/Kwajalein", "Pacific/Majuro", "Pacific/Marquesas", "Pacific/Midway", "Pacific/Nauru", "Pacific/Niue", "Pacific/Norfolk", "Pacific/Noumea", "Pacific/Pago_Pago", "Pacific/Palau", "Pacific/Pitcairn", "Pacific/Pohnpei", "Pacific/Port_Moresby", "Pacific/Rarotonga", "Pacific/Saipan", "Pacific/Tahiti", "Pacific/Tarawa", "Pacific/Tongatapu", "Pacific/Wake", "Pacific/Wallis"
];

export const LOCAL_TIMEZONE_CODE_MAP = {
    // Australian cities
    "Australia/Adelaide": "ADL", "Australia/Brisbane": "BNE", "Australia/Broken_Hill": "BHQ", "Australia/Currie": "CUR", "Australia/Darwin": "DRW", "Australia/Eucla": "EUC", "Australia/Hobart": "HBA", "Australia/Lindeman": "LDC", "Australia/Lord_Howe": "LDH", "Australia/Melbourne": "MEL", "Australia/Perth": "PER", "Australia/Sydney": "SYD",
    // Major international cities for quick reference
    "America/New_York": "NYC", "America/Los_Angeles": "LAX", "America/Chicago": "CHI", "America/Denver": "DEN", "America/Phoenix": "PHX", "America/Anchorage": "ANC", "America/Toronto": "YYZ", "America/Vancouver": "YVR", "America/Mexico_City": "MEX",
    "Europe/London": "LON", "Europe/Paris": "PAR", "Europe/Berlin": "BER", "Europe/Rome": "ROM", "Europe/Madrid": "MAD", "Europe/Amsterdam": "AMS", "Europe/Vienna": "VIE", "Europe/Stockholm": "STO", "Europe/Moscow": "MSK",
    "Asia/Tokyo": "TYO", "Asia/Shanghai": "SHA", "Asia/Hong_Kong": "HKG", "Asia/Singapore": "SIN", "Asia/Seoul": "SEL", "Asia/Mumbai": "BOM", "Asia/Bangkok": "BKK", "Asia/Dubai": "DXB",
    "Pacific/Auckland": "AKL", "Pacific/Honolulu": "HNL",
};

export const FALLBACK_COORDINATES = {
    // Australia major cities/timezones
    "Australia/Sydney": { lat: -33.8679, lon: 151.2073 }, "Australia/Melbourne": { lat: -37.8136, lon: 144.9631 }, "Australia/Brisbane": { lat: -27.4698, lon: 153.0251 }, "Australia/Perth": { lat: -31.9505, lon: 115.8605 }, "Australia/Adelaide": { lat: -34.9285, lon: 138.6007 }, "Australia/Hobart": { lat: -42.8821, lon: 147.3272 }, "Australia/Darwin": { lat: -12.4634, lon: 130.8456 }, "Australia/Broken_Hill": { lat: -31.9530, lon: 141.4535 }, "Australia/Lord_Howe": { lat: -31.5183, lon: 159.0833 }, "Australia/Eucla": { lat: -31.7172, lon: 128.8853 }, "Australia/Currie": { lat: -39.9308, lon: 143.8503 }, "Australia/Lindeman": { lat: -20.4411, lon: 149.0450 },
    // New Zealand
    "Pacific/Auckland": { lat: -36.8485, lon: 174.7633 }, "Pacific/Chatham": { lat: -43.9510, lon: -176.5630 },
    // Other major world cities/timezones
    "America/New_York": { lat: 40.7128, lon: -74.0060 }, "Europe/London": { lat: 51.5074, lon: -0.1278 }, "Europe/Paris": { lat: 48.8566, lon: 2.3522 }, "Asia/Tokyo": { lat: 35.6895, lon: 139.6917 }, "America/Los_Angeles": { lat: 34.0522, lon: -118.2437 }, "Europe/Berlin": { lat: 52.52, lon: 13.405 }, "Asia/Singapore": { lat: 1.3521, lon: 103.8198 }, "America/Chicago": { lat: 41.8781, lon: -87.6298 }, "America/Denver": { lat: 39.7392, lon: -104.9903 }, "America/Phoenix": { lat: 33.4484, lon: -112.074 }, "America/Toronto": { lat: 43.6532, lon: -79.3832 }, "Europe/Moscow": { lat: 55.7558, lon: 37.6173 }
};
