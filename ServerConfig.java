// ServerConfig.java
public class ServerConfig {
    // معلومات الاتصال بالسيرفر Xtream
    public static final String SERVER_BASE_URL = "http://ottpro.iptvpro2.com:8789";
    public static final String USERNAME = "Oujakr12";
    public static final String PASSWORD = "87593226";
    
    // إعدادات الكاش
    public static final long CACHE_DURATION_MS = 3600000; // ساعة واحدة
    
    // إعدادات العرض
    public static final int ITEMS_PER_PAGE = 42;
    public static final int SEARCH_LIMIT = 60;
    
    // مسارات API
    public static final String API_ENDPOINT = "/player_api.php";
    
    // بناء رابط كامل للـ API
    public static String buildApiUrl(String action, String... params) {
        StringBuilder url = new StringBuilder(SERVER_BASE_URL)
                .append(API_ENDPOINT)
                .append("?username=").append(USERNAME)
                .append("&password=").append(PASSWORD)
                .append("&action=").append(action);
        
        if (params.length > 0 && params.length % 2 == 0) {
            for (int i = 0; i < params.length; i += 2) {
                url.append("&").append(params[i]).append("=").append(params[i + 1]);
            }
        }
        
        return url.toString();
    }
    
    // بناء رابط الـ Stream
    public static String buildStreamUrl(String type, String streamId, String format) {
        return SERVER_BASE_URL + "/" + type + "/" + USERNAME + "/" + PASSWORD + "/" + streamId + "." + format;
    }
    
    // الحصول على كائن التكوين كامل
    public static ServerConfiguration getConfiguration() {
        ServerConfiguration config = new ServerConfiguration();
        config.serverBaseUrl = SERVER_BASE_URL;
        config.username = USERNAME;
        config.password = PASSWORD;
        config.cacheDurationMs = CACHE_DURATION_MS;
        config.itemsPerPage = ITEMS_PER_PAGE;
        config.searchLimit = SEARCH_LIMIT;
        config.apiEndpoint = API_ENDPOINT;
        return config;
    }
    
    // فئة مساعدة لحمل التكوين
    public static class ServerConfiguration {
        public String serverBaseUrl;
        public String username;
        public String password;
        public long cacheDurationMs;
        public int itemsPerPage;
        public int searchLimit;
        public String apiEndpoint;
        
        @Override
        public String toString() {
            return "ServerConfiguration{" +
                   "serverBaseUrl='" + serverBaseUrl + '\'' +
                   ", username='" + username + '\'' +
                   ", cacheDurationMs=" + cacheDurationMs +
                   ", itemsPerPage=" + itemsPerPage +
                   '}';
        }
    }
}
