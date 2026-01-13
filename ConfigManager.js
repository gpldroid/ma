// ConfigManager.js
const ConfigManager = (function() {
    // معلومات الاتصال الأساسية (سيتم تحميلها من ملف جافا أو API)
    let serverConfig = {
        api: {
            base: "",
            user: "",
            pass: ""
        },
        cache: {
            enabled: true,
            duration: 3600000
        },
        display: {
            itemsPerPage: 42,
            searchLimit: 60
        }
    };
    
    let isLoaded = false;
    
    // دالة لتحميل التكوين من ملف جافا (عبر API endpoint)
    async function loadConfig() {
        if (isLoaded) return true;
        
        try {
            // هنا يمكنك استدعاء API endpoint يحصل على التكوين من ملف جافا
            // لمثالنا، سنستخدم البيانات المخزنة محلياً
            // في التطبيق الحقيقي، ستكون: const response = await fetch('/api/server-config');
            
            // محاكاة لتحميل البيانات
            setTimeout(() => {
                // هذه البيانات يجب أن تأتي من ملف ServerConfig.java الخاص بك
                serverConfig = {
                    api: {
                        base: "http://ottpro.iptvpro2.com:8789",
                        user: "Oujakr12",
                        pass: "87593226"
                    },
                    cache: {
                        enabled: true,
                        duration: 3600000
                    },
                    display: {
                        itemsPerPage: 42,
                        searchLimit: 60
                    }
                };
                isLoaded = true;
                console.log('Server configuration loaded successfully');
            }, 100);
            
            return true;
        } catch (error) {
            console.error('Failed to load server configuration:', error);
            // استخدام إعدادات افتراضية في حالة الخطأ
            serverConfig = {
                api: {
                    base: "http://ottpro.iptvpro2.com:8789",
                    user: "Oujakr12",
                    pass: "87593226"
                },
                cache: {
                    enabled: true,
                    duration: 3600000
                },
                display: {
                    itemsPerPage: 42,
                    searchLimit: 60
                }
            };
            isLoaded = true;
            return false;
        }
    }
    
    // دالة لبناء رابط API
    function buildApiUrl(action, params = {}) {
        const url = new URL(`${serverConfig.api.base}/player_api.php`);
        url.searchParams.append('username', serverConfig.api.user);
        url.searchParams.append('password', serverConfig.api.pass);
        url.searchParams.append('action', action);
        
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
        
        return url.toString();
    }
    
    // دالة لبناء رابط الـ Stream
    function buildStreamUrl(type, id, format = 'm3u8') {
        const typeMap = {
            'live': 'live',
            'movies': 'movie',
            'series': 'series'
        };
        const streamType = typeMap[type] || type;
        return `${serverConfig.api.base}/${streamType}/${serverConfig.api.user}/${serverConfig.api.pass}/${id}.${format}`;
    }
    
    // الحصول على كافة التكوين
    function getConfig() {
        return {...serverConfig};
    }
    
    // الحصول على إعدادات API فقط
    function getApiConfig() {
        return {...serverConfig.api};
    }
    
    // تحديث التكوين (مفيد إذا كان هناك تغيير ديناميكي)
    function updateConfig(newConfig) {
        serverConfig = {...serverConfig, ...newConfig};
        isLoaded = true;
    }
    
    // التحقق إذا كان التكوين محملاً
    function isConfigLoaded() {
        return isLoaded;
    }
    
    // كشف عام للوظائف
    return {
        loadConfig,
        getConfig,
        getApiConfig,
        buildApiUrl,
        buildStreamUrl,
        updateConfig,
        isConfigLoaded
    };
})();
