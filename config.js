const e = {};

e.isK8sEnv = function () {
    return process.env.KUBERNETES_SERVICE_HOST && process.env.KUBERNETES_SERVICE_PORT;
};

function parseBoolean(val) {
    if (typeof val === 'boolean') return val;
    else if (typeof val === 'string') {
        return val.toLowerCase() === 'true';
    } else {
        return false;
    }
}
e.port = process.env.PORT || 3000;
e.httpsPort = process.env.HTTPS_PORT || 3443;
e.imageTag = process.env.IMAGE_TAG || '1.0.0';
e.hookConnectionTimeout = parseInt(process.env.HOOK_CONNECTION_TIMEOUT) || 30;
e.mongoDataUrl = process.env.MONGO_APPCENTER_URL || 'mongodb://localhost';
e.authorDB = process.env.MONGO_AUTHOR_DBNAME || 'datastackConfig';
e.mongoAuthorUrl = process.env.MONGO_AUTHOR_URL || 'mongodb://localhost';
e.mongoLogUrl = process.env.MONGO_LOGS_URL || 'mongodb://localhost';
e.logsDB = process.env.MONGO_LOGS_DBNAME || 'datastackLogs';
e.googleKey = process.env.GOOGLE_API_KEY || '';
e.queueName = 'webHooks';
e.streamingConfig = {
    url: process.env.STREAMING_HOST || 'nats://localhost:4222',
    user: process.env.STREAMING_USER || '',
    pass: process.env.STREAMING_PASS || '',
    maxReconnectAttempts: process.env.STREAMING_RECONN_ATTEMPTS || 500,
    connectTimeout: 2000,
    stanMaxPingOut: process.env.STREAMING_RECONN_TIMEWAIT_MILLI || 500
};
e.mongoAuthorOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    minSize: process.env.MONGO_CONNECTION_POOL_SIZE || 5,
};
e.mongoDataOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    minSize: process.env.MONGO_CONNECTION_POOL_SIZE || 5,
};
e.mongoLogsOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    minSize: process.env.MONGO_CONNECTION_POOL_SIZE || 5,
    dbName: process.env.MONGO_LOGS_DBNAME || 'datastackLogs'
};

e.transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' }
};

e.allowedExt = (process.env.DATA_STACK_ALLOWED_FILE_TYPE ? process.env.DATA_STACK_ALLOWED_FILE_TYPE : 'ppt,xls,csv,doc,jpg,png,apng,gif,webp,flif,cr2,orf,arw,dng,nef,rw2,raf,tif,bmp,jxr,psd,zip,tar,rar,gz,bz2,7z,dmg,mp4,mid,mkv,webm,mov,avi,mpg,mp2,mp3,m4a,oga,ogg,ogv,opus,flac,wav,spx,amr,pdf,epub,exe,swf,rtf,wasm,woff,woff2,eot,ttf,otf,ico,flv,ps,xz,sqlite,nes,crx,xpi,cab,deb,ar,rpm,Z,lz,msi,mxf,mts,blend,bpg,docx,pptx,xlsx,3gp,3g2,jp2,jpm,jpx,mj2,aif,qcp,odt,ods,odp,xml,mobi,heic,cur,ktx,ape,wv,wmv,wma,dcm,ics,glb,pcap,dsf,lnk,alias,voc,ac3,m4v,m4p,m4b,f4v,f4p,f4b,f4a,mie,asf,ogm,ogx,mpc').split(',');

e.hostname = process.env.HOSTNAME;
e.namespace = process.env.DATA_STACK_NAMESPACE || 'appveen';
e.permanentDelete = process.env.PERMANENT_DELETE ? parseBoolean(process.env.PERMANENT_DELETE) : true;
e.MaxJSONSize = process.env.MAX_JSON_SIZE || '1mb';
e.dataStackDefaultTimezone = process.env.TZ_DEFAULT || 'Zulu';
e.release = process.env.RELEASE || '1.1.0';


e.baseUrlSM = get('sm') + '/sm';
e.baseUrlNE = get('ne') + '/ne';
e.baseUrlUSR = get('user') + '/rbac';
e.baseUrlMON = get('mon') + '/mon';
e.baseUrlWF = get('wf') + '/workflow';
e.baseUrlSEC = get('sec') + '/sec';
e.baseUrlDM = get('dm') + '/dm';
e.baseUrlPM = get('pm') + '/pm';
e.baseUrlGW = get('gw');
e.TOKEN_SECRET = process.env.TOKEN_SECRET || 'u?5k167v13w5fhjhuiweuyqi67621gqwdjavnbcvadjhgqyuqagsduyqtw87e187etqiasjdbabnvczmxcnkzn';


function get(_service) {
    if (e.isK8sEnv()) {
        if (_service == 'dm') return `http://dm.${e.namespace}`;
        if (_service == 'ne') return `http://ne.${e.namespace}`;
        if (_service == 'sm') return `http://sm.${e.namespace}`;
        if (_service == 'pm') return `http://pm.${e.namespace}`;
        if (_service == 'user') return `http://user.${e.namespace}`;
        if (_service == 'gw') return `http://gw.${e.namespace}`;
        if (_service == 'wf') return `http://wf.${e.namespace}`;
        if (_service == 'sec') return `http://sec.${e.namespace}`;
        if (_service == 'mon') return `http://mon.${e.namespace}`;
        if (_service == 'gw') return `http://gw.${e.namespace}`;
    } else {
        if (_service == 'dm') return 'http://localhost:10709';
        if (_service == 'ne') return 'http://localhost:10010';
        if (_service == 'sm') return 'http://localhost:10003';
        if (_service == 'pm') return 'http://localhost:10011';
        if (_service == 'user') return 'http://localhost:10004';
        if (_service == 'gw') return 'http://localhost:9080';
        if (_service == 'wf') return 'http://localhost:10006';
        if (_service == 'sec') return 'http://localhost:10007';
        if (_service == 'mon') return 'http://localhost:10005';
        if (_service == 'gw') return 'http://localhost:9080';
    }
}

module.exports = e;