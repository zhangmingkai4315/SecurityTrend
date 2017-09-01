#### 后台服务部署

1. 数据库部署

```
CREATE USER 'username'@'%' IDENTIFIED BY 'password';
CREATE DATABASE IF NOT EXISTS security_trend DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
GRANT all privileges ON security_trend.* TO 'username'@'%';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `confirmed` tinyint(1) DEFAULT NULL,
  `email` varchar(64) NOT NULL ,
  `username` varchar(64) DEFAULT NULL,
  `mobile_phone` varchar(64) DEFAULT NULL,
  `password_hash` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `test` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `title` varchar(50) DEFAULT NULL,
 `description` varchar(100) DEFAULT NULL,
 PRIMARY KEY (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8 ;

```