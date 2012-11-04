# ************************************************************
# Sequel Pro SQL dump
# Version 3408
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.5.28-log)
# Database: market
# Generation Time: 2012-11-04 21:47:02 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;

INSERT INTO `category` (`id`)
VALUES
	(13),
	(14),
	(15);

/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table category_i18n
# ------------------------------------------------------------

DROP TABLE IF EXISTS `category_i18n`;

CREATE TABLE `category_i18n` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int(10) unsigned DEFAULT NULL,
  `language_id` int(11) unsigned DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `language_id` (`language_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `category_i18n_ibfk_2` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `category_i18n_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `category_i18n` WRITE;
/*!40000 ALTER TABLE `category_i18n` DISABLE KEYS */;

INSERT INTO `category_i18n` (`id`, `category_id`, `language_id`, `name`)
VALUES
	(83,13,2,'Телефони'),
	(84,13,1,'Телефоны'),
	(85,14,2,'Ноутбуки'),
	(86,14,1,'Ноутбуки'),
	(87,15,2,'Одяг'),
	(88,15,1,'Одежда');

/*!40000 ALTER TABLE `category_i18n` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table language
# ------------------------------------------------------------

DROP TABLE IF EXISTS `language`;

CREATE TABLE `language` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `language` WRITE;
/*!40000 ALTER TABLE `language` DISABLE KEYS */;

INSERT INTO `language` (`id`, `name`)
VALUES
	(1,'ru'),
	(2,'ua');

/*!40000 ALTER TABLE `language` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table maker
# ------------------------------------------------------------

DROP TABLE IF EXISTS `maker`;

CREATE TABLE `maker` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `maker` WRITE;
/*!40000 ALTER TABLE `maker` DISABLE KEYS */;

INSERT INTO `maker` (`id`, `name`)
VALUES
	(25,'Nokia'),
	(26,'Apple'),
	(27,'Adidas'),
	(29,'Puma'),
	(30,'Nike');

/*!40000 ALTER TABLE `maker` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table product
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int(11) unsigned DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `maker_id` int(11) unsigned DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `maker_id` (`maker_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_ibfk_2` FOREIGN KEY (`maker_id`) REFERENCES `maker` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;

INSERT INTO `product` (`id`, `category_id`, `amount`, `maker_id`, `price`)
VALUES
	(2,13,NULL,26,NULL),
	(3,13,NULL,25,NULL),
	(4,13,NULL,26,NULL),
	(10,15,NULL,27,NULL),
	(11,15,NULL,30,NULL);

/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table product_i18n
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product_i18n`;

CREATE TABLE `product_i18n` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(11) unsigned DEFAULT NULL,
  `language_id` int(11) unsigned DEFAULT NULL,
  `title` varchar(255) DEFAULT 'no_name',
  `description` text,
  `params` text,
  PRIMARY KEY (`id`),
  KEY `language_id` (`language_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_i18n_ibfk_2` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_i18n_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `product_i18n` WRITE;
/*!40000 ALTER TABLE `product_i18n` DISABLE KEYS */;

INSERT INTO `product_i18n` (`id`, `product_id`, `language_id`, `title`, `description`, `params`)
VALUES
	(51,2,1,'IPhone 5','5 поколение','Memory:2GB\r\nDisplay:5inc\r\nMaterial:iron\r\nOS: iOS\r\nGood:Luck'),
	(52,2,2,'IPhone 5','5  поколiiня','Memory:2GB\r\nDisplay:5inc\r\nMaterial:iron\r\nOS: iOS\r\nGood:Luck'),
	(53,3,1,'Lumia N900','Новый ультрасовременный телефон от Nokia','Memory:2GB\r\nDisplay:5inc\r\nMaterial:iron\r\nOS: iOS\r\nGood:Luck'),
	(54,3,2,'Lumia N900','Новий ультрасучасний телефон вiд Nokia','Memory:2GB\r\nDisplay:5inc\r\nMaterial:iron\r\nOS: iOS\r\nGood:Luck'),
	(55,4,1,'IPhone 3gs','Хiпстерский айфончик',''),
	(56,4,2,'IPhone 3gs','Хипстерский айфончик',''),
	(67,10,2,'Кросiвки','Кросiвки',''),
	(68,10,1,'Кросовки','Кросовки',''),
	(69,11,2,'Кросiвки','Кросiвки',''),
	(70,11,1,'Кросовки','Кросовки','');

/*!40000 ALTER TABLE `product_i18n` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table product_image
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product_image`;

CREATE TABLE `product_image` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(11) unsigned DEFAULT NULL,
  `image_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_image_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;

INSERT INTO `product_image` (`id`, `product_id`, `image_name`)
VALUES
	(20,2,'873ae040ac5489795fd3c58bbbc6daa6iphone-5-2012-09-14-600-1.jpg'),
	(21,2,'303211b8356a4b32fd8f80b344973d0ciphone-5-2012-09-14-600-20.jpg'),
	(22,2,'57cb33274b3a32e84f319d0e44ca8d6ciphone-5-2012-09-14-600-21.jpg'),
	(23,4,'124f50dbcc4ee0e6f5be93d475c182922009-08-20iphonehd.jpg'),
	(24,4,'d0e9de547d9d1153438d2ce766bd146biphone-3gs-supreme-1.jpg'),
	(25,3,'a8db96c9f7313738cc2deb8b36e58c71nokia-lumia-920-black_2.jpeg'),
	(26,3,'a3802573ce99b6776b8c92c8abc3bfeanokia-lumia-920-white_1.jpeg'),
	(27,3,'610943cc861120d78f897dcb723bb88dnokia-lumia-920-yellow_1.jpeg'),
	(39,10,'65b75cc40b6806cd12cf3330d1318d2aadidas-ivano-frankovsk_rev002.jpg'),
	(40,10,'d6fc3fb98238460704be9b92998fd291krosvki-gucci-ternopol.jpg'),
	(41,11,'1ac3b402f73730d4eae6561a89d917f2Adidas_Marathon_10_Womens_03_b11853.jpg'),
	(42,11,'15f2c3c35d86d404a70845697d3e2679Adidas_Titan_Bounce_02_b11835.jpg');

/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) DEFAULT NULL,
  `language_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `language_id` (`language_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `role`, `username`, `password`, `language_id`)
VALUES
	(1,'admin','wice','c389e285c73e49ba197581321b37b58ed07c0fd9',1),
	(6,NULL,'sasha','def9a6e7c3a9785f219450a2543d1a42d8fd9ed3',2),
	(7,NULL,'Sebastian','c389e285c73e49ba197581321b37b58ed07c0fd9',2),
	(8,NULL,'qwe','056eafe7cf52220de2df36845b8ed170c67e23e3',2),
	(9,NULL,'qweqwe','f4542db9ba30f7958ae42c113dd87ad21fb2eddb',2),
	(10,NULL,'asd','f10e2821bbbea527ea02200352313bc059445190',2),
	(11,NULL,'','da39a3ee5e6b4b0d3255bfef95601890afd80709',2),
	(12,NULL,'asda','4aeb195cd69ed93520b9b4129636264e0cdc0153',2);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
