export interface ConfigModel {
    appName?: 'FBS-AppName';
    mock?: boolean;
    apiBaseUrl?: string;
    apiVersionName?: string;
    clientBaseUrl?: string; // Ip o Host donde se despliega el aplicativo
    lenguaje?: string;
    secretKey?: string;
}
