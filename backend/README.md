#### 后台服务部署

1. 数据库部署

```
CREATE DATABASE IF NOT EXISTS security_trend DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
CREATE DATABASE IF NOT EXISTS security_trend_development DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
CREATE DATABASE IF NOT EXISTS security_trend_test DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
GRANT all privileges ON security_trend.* TO 'username'@127.0.0.1;
GRANT all privileges ON security_trend_development.* TO 'username'@127.0.0.1;
GRANT all privileges ON security_trend_test.* TO 'username'@127.0.0.1;
FLUSH PRIVILEGES;

```