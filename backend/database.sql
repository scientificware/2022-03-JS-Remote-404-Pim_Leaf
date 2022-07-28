SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database name : `pimleaf`

-- Database tables :
-- `user`
-- `files`
-- `activity_field`
-- `company_group`
-- `company`
-- `connection`
-- `origin`
-- `label`
-- `allergen_category`
-- `category`
-- `products`
-- `labels_types`
-- `allergens_types`
-- `stock`

-- ----------------------------------------------------------------------------


DROP TABLE IF EXISTS `stock`;
DROP TABLE IF EXISTS `allergens_types`;
DROP TABLE IF EXISTS `labels_types`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `category`;
DROP TABLE IF EXISTS `allergen_category`;
DROP TABLE IF EXISTS `label`;
DROP TABLE IF EXISTS `origin`;
DROP TABLE IF EXISTS `connection`;
DROP TABLE IF EXISTS `company`;
DROP TABLE IF EXISTS `company_group`;
DROP TABLE IF EXISTS `activity_field`;
DROP TABLE IF EXISTS `files`;
DROP TABLE IF EXISTS `user`;

-- ----------------------------------------------------------------------------
--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  `password` VARCHAR(255) NOT NULL,
  `mail` VARCHAR(255) NOT NULL UNIQUE,
  `phone` VARCHAR(20) NULL
) ENGINE=InnoDB;

--
-- Content for table `user`
--

LOCK TABLES `user` WRITE;
INSERT INTO `user` (`name`, `password`, `mail`, `phone`) VALUES
("JohnA", "$argon2id$v=19$m=65536,t=5,p=1$FkjcCc0+F15P0N5TLh3ndQ$FkttWmV6YpXwaqtjrKfALtaYkwyHv2ongXDP/C6bvY4", "JohnA@company.com", "+33111111111"),
("JohnB", "$argon2id$v=19$m=65536,t=5,p=1$FkjcCc0+F15P0N5TLh3ndQ$FkttWmV6YpXwaqtjrKfALtaYkwyHv2ongXDP/C6bvY4", "JohnB@company.com", "+33222222222"),
("JohnC", "$argon2id$v=19$m=65536,t=5,p=1$FkjcCc0+F15P0N5TLh3ndQ$FkttWmV6YpXwaqtjrKfALtaYkwyHv2ongXDP/C6bvY4", "JohnC@company.com", "+33333333333"),
("JohnD", "$argon2id$v=19$m=65536,t=5,p=1$FkjcCc0+F15P0N5TLh3ndQ$FkttWmV6YpXwaqtjrKfALtaYkwyHv2ongXDP/C6bvY4", "JohnD@company.com", "+33444444444"),
("JohnE", "$argon2id$v=19$m=65536,t=5,p=1$FkjcCc0+F15P0N5TLh3ndQ$FkttWmV6YpXwaqtjrKfALtaYkwyHv2ongXDP/C6bvY4", "JohnE@company.com", "+33555555555"),
("Fabricant", "$argon2id$v=19$m=65536,t=5,p=1$FkjcCc0+F15P0N5TLh3ndQ$FkttWmV6YpXwaqtjrKfALtaYkwyHv2ongXDP/C6bvY4", "Fabricant@company.com", NULL);

UNLOCK TABLES;

-- ----------------------------------------------------------------------------
--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(255) NOT NULL,
  `alt` VARCHAR(255) NULL
) ENGINE=InnoDB;

--
-- Content for table `files`
--

LOCK TABLES `files` WRITE;
INSERT INTO `files` (`url`, `alt`) VALUES
("testURL1", "testALT1"),
("testURL2", "testALT2"),
("testURL3", "testALT3"),
("testURL4", "testALT4"),
("testURL5", "testALT5");
UNLOCK TABLES;


-- ----------------------------------------------------------------------------
--
-- Table structure for table `activity_field`
--

CREATE TABLE `activity_field` (
  `id` TINYINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL
) ENGINE=InnoDB;

--
-- Content for table `activity_field`
--

LOCK TABLES `activity_field` WRITE;
INSERT INTO `activity_field` (`name`) VALUES
("Epicerie vrac"),
("Fabricant de pâtes"),
("Biscuiterie"),
("Autre"),
("Vente de thé et infusions"),
("Cosmétiques");
UNLOCK TABLES;

-- ----------------------------------------------------------------------------
--
-- Table structure for table `company_group`
--

CREATE TABLE `company_group` (
  `id` TINYINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

--
-- Content for table `company_group`
--

LOCK TABLES `company_group` WRITE;
INSERT INTO `company_group` (`name`) VALUES
("Commerce"),
("Fournisseur"),
("Fabricant");
UNLOCK TABLES;

-- ----------------------------------------------------------------------------
--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `company_name` VARCHAR(100) NULL,
  `address` VARCHAR(255) NULL,
  `postcode` INT NULL,
  `city` VARCHAR(255) NULL,
  `company_mail` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20) NULL,
  `description` VARCHAR(255) NULL,
  `website` VARCHAR(255) NULL,
  `file_id` INT NULL,
  `company_group_id` TINYINT NULL,
  `activity_field_id` TINYINT NULL,
  `user_id` INT NOT NULL,
  FOREIGN KEY (file_id) REFERENCES files(id),
  FOREIGN KEY (company_group_id) REFERENCES company_group(id),
  FOREIGN KEY (activity_field_id) REFERENCES activity_field(id),
  FOREIGN KEY (user_id) REFERENCES user(id)
) ENGINE=InnoDB;

--
-- Content for table `company`
--

LOCK TABLES `company` WRITE;
INSERT INTO `company` (`company_name`, `address`, `postcode`, `city`, `company_mail`, `phone`, `description`, `website`, `file_id`, `company_group_id`, `activity_field_id`, `user_id`) VALUES
("Eco Vrac", "13, avenue du Maréchal Foch", 68100, "Mulhouse", "ecovrac@email.com", "+33-655-535-768", "desc test", "http://website.com", NULL, 1, 1, 1),
("Valfleuri", "5, rue de la Charente", 68270, "Wittenheim", "valfleuri@email.com", "+33-755-552-764", "desc test", "http://website.com", NULL, 1, 5, 2),
("Le petit épicier","6 rue des timoniers",29470,"Plougastel-Daoulas","le-petit-epicier@email.com","+33-655-586-499", "desc test", "http://website.com", NULL, 1, 2, 3),
("DAO", "1664, avenue Saint-Maurice", 4100, "Manosque", "dao@email.com", "+33-655-527-008", "desc test", "http://website.com", NULL, 2, 4, 4),
("Nat-ali", "ZAC de la Brosse, 3 Rue Nicolas Appert", 44400, "Reze", "nat-alie@email.com", "+33-655-536-223", "desc test", "http://website.com", NULL, 2, 4, 5),
("Tagopia","48877 Buhler Circle",15963,"Longxing","qrisborough5@cisco.com","+86-726-641-0692", "desc test", "http://website.com", NULL, 3, 3, 6),
("Plambee","386 Haas Crossing",45963,"Xiaozhi","bdobbison8@cbsnews.com","+86-732-798-6831", "desc test", "http://website.com", NULL, 3, 4, 6);
UNLOCK TABLES;


-- ----------------------------------------------------------------------------
--
-- Table structure for table `connection`
--

CREATE TABLE `connection` (
  `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `status` VARCHAR(30) NOT NULL,
  `retailer_id` INT NOT NULL,
  `supplier_id` INT NOT NULL,
  FOREIGN KEY (retailer_id) REFERENCES company(id),
  FOREIGN KEY (supplier_id) REFERENCES company(id)
) ENGINE=InnoDB;

--
-- Content for table `connection`
--

LOCK TABLES `connection` WRITE;
INSERT INTO `connection` (`status`, `retailer_id`, `supplier_id`) VALUES
("Connecté", 1, 4),
("En attente de connexion", 2, 4),
("Connecté", 2, 5),
("En attente de connexion", 3, 5);
UNLOCK TABLES;

-- ----------------------------------------------------------------------------
--
-- Table structure for table `origin`
--

CREATE TABLE `origin` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `country` VARCHAR(255) NULL,
  `region` VARCHAR(255) NULL,
  `file_id` INT NULL,
  FOREIGN KEY (file_id) REFERENCES files(id)
) ENGINE=InnoDB;

--
-- Content for table `origin`
--

LOCK TABLES `origin` WRITE;
INSERT INTO `origin` (`country`, `region`, `file_id`) VALUES
("France","Alsace", NULL),
("UE/NonUE", NULL, NULL),
("Afrique du Sud", NULL, NULL),
("Inde ", NULL, NULL),
("Colombie", NULL, NULL),
("Ethiopie", NULL, NULL),
("Guatemalas", NULL, NULL),
("Honduras", NULL, NULL),
("Pérou", NULL, NULL),
("France","Drome", NULL),
("Amérique Latine", NULL, NULL),
("Afrique", NULL, NULL),
("Bulgarie", NULL, NULL),
("Egypte", NULL, NULL),
("Chine", NULL, NULL),
("Cameroun", NULL, NULL),
("Togo", NULL, NULL);
UNLOCK TABLES;

-- ----------------------------------------------------------------------------
--
-- Table structure for table `label`
--

CREATE TABLE `label` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `file_id` INT NULL,
  FOREIGN KEY (file_id) REFERENCES files(id)
) ENGINE=InnoDB;

--
-- Content for table `label`
--

LOCK TABLES `label` WRITE;
INSERT INTO `label` (`name`, `file_id`) VALUES
("AB", NULL),
("Eurofeuille", NULL),
("Eurofeuille - FR", NULL),
("Savourez l'Alsace", NULL),
("Savourez l'Alsace - Produit du terroir", NULL),
("PME +", NULL),
("Alsace Excellence", NULL),
("Vegan Society", NULL),
("Fairtrade - Max Havelaar", NULL),
("Symbole des Producteurs Paysans - SPP", NULL);
UNLOCK TABLES;

-- ----------------------------------------------------------------------------
--
-- Table structure for table `allergen_category`
--

CREATE TABLE `allergen_category` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

--
-- Content for table `allergen_category`
--

LOCK TABLES `allergen_category` WRITE;
INSERT INTO `allergen_category` (`name`) VALUES
("Gluten"),
("Sésame"),
("Fruits à coque"),
("Crustacés"),
("Œuf"),
("Poisson"),
("Moutarde"),
("Lait"),
("Céleri"),
("Arachide"),
("Soja"),
("Mollusques"),
("Lupin"),
("Sulfites");
UNLOCK TABLES;

-- ----------------------------------------------------------------------------
--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` TINYINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

--
-- Content for table `category`
--

LOCK TABLES `category` WRITE;
INSERT INTO `category` (`name`) VALUES
("Boissons"),
("Épicerie sucrée"),
("Épicerie salée"),
("Produits frais"),
("Conserves"),
("Cosmétiques / Hygiène / Entretien"),
("Accessoires"),
("Autre"),
("Épices"),
("Huiles et condiments");
UNLOCK TABLES;

-- ----------------------------------------------------------------------------
--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(100) NOT NULL,
  `detail` VARCHAR(255) NULL,
  `advise` VARCHAR(255) NULL,
  `manufacturing_method` VARCHAR(255) NULL,
  `category_id` TINYINT NOT NULL,
  `origin_id` INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES category(id),
  FOREIGN KEY (origin_id) REFERENCES origin(id)
) ENGINE=InnoDB;

--
-- Content for table `products`
--

LOCK TABLES `products` WRITE;
INSERT INTO `products` (`product_name`, `detail`, `advise`, `manufacturing_method`, `category_id`, `origin_id`) VALUES
("Sucre de canne non raffiné", "details test 1", "advise test 1", "manufacturing test 1", 2, 1),
("Sel de Guérande", "details test 2", "advise test 1", "manufacturing test 2", 10, 1),
("Sirop d'agave", "details test 3", "advise test 3", "manufacturing test 3", 2, 1),
("Son d'avoine", "details test 4", "advise test 4", "manufacturing test 4", 3, 1),
("Conserve Haricot", "details test 5", "advise test 5", "manufacturing test 5", 10, 10),
("Huile essentielle de citron", "details test 6", "advise test 6", "manufacturing test 6", 6, 1),
("Huile de sésame", "details test 7", "advise test 7", "manufacturing test 7", 10, 10),
("Huile essentielle de lavande", "details test 8", "advise test 8", "manufacturing test 8", 6, 1),
("Acide tartarique", "details test 9", "advise test 9", "manufacturing test 9", 6, 10),
("Fève de Cacao", "details test 10", "advise test 10", "manufacturing test 10", 2, 7),
("Bicarbonate de sodium", "details test 11", "advise test 11", "manufacturing test 11", 6, 2),
("Vinaigre blanc", "details test 12", "advise test 12", "manufacturing test 12", 6, 1),
("Farine de Quinoa", "details test 13", "advise test 13", "manufacturing test 13", 8, 1),
("Farine de blé T65", "details test 14", "advise test 14", "manufacturing test 14", 8, 10),
("Farine de seigle", "details test 15", "advise test 15", "manufacturing test 15", 8, 1),
("Gingembre", "details test 16", "advise test 16", "manufacturing test 16", 4, 1),
("Botte de carotte", "details test 17", "advise test 17", "manufacturing test 17", 4, 10),
("Poivre noir", "details test 18", "advise test 18", "manufacturing test 18", 10, 1),
("Menthe poivrée", "details test 19", "advise test 19", "manufacturing test 19", 4, 1),
("Romarin", "details test 20", "advise test 20", "manufacturing test 20",4, 1);
UNLOCK TABLES;
-- ----------------------------------------------------------------------------
--
-- Table structure for table `labels_types`
--

CREATE TABLE `labels_types` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `label_id` INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (label_id) REFERENCES label(id)
) ENGINE=InnoDB;

--
-- Content for table `labels_types`
--

LOCK TABLES `labels_types` WRITE;

INSERT INTO `labels_types` (`product_id`, `label_id`) VALUES
(1, 9),
(2, 3),
(3, 4),
(3, 6),
(4, 1),
(4, 7),
(5, 4),
(5, 7),
(5, 8),
(6, 1),
(6, 3),
(7, 1),
(8, 1),
(10, 1),
(10, 9),
(12, 8),
(13, 1),
(13, 3),
(14, 1),
(14, 8),
(15, 1),
(15, 8),
(16, 5),
(17, 5),
(19, 4),
(20, 1),
(20, 10);

UNLOCK TABLES;
-- ----------------------------------------------------------------------------
--
-- Table structure for table `allergens_types`
--

CREATE TABLE `allergens_types` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `allergen_id` INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (allergen_id) REFERENCES allergen_category(id)
) ENGINE=InnoDB;

--
-- Content for table `allergens_types`
--

LOCK TABLES `allergens_types` WRITE;

INSERT INTO `allergens_types` (`product_id`, `allergen_id`) VALUES
(3, 1),
(4, 1),
(4, 2),
(5, 11),
(6, 14),
(7, 2),
(8, 14),
(9, 14),
(10, 3),
(11, 14),
(12, 14),
(13, 1),
(14, 1),
(14, 2),
(14, 3);

UNLOCK TABLES;
-- ----------------------------------------------------------------------------
--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `owner_id` INT NOT NULL,
  `supplier_id` INT NOT NULL,
  `disponibility` TINYINT NOT NULL,
  `price_ttc` INT NULL,
  `price_ht` INT NULL,
  `recipe_idea` VARCHAR(255) NULL,
  `tips` VARCHAR(255) NULL,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (owner_id) REFERENCES company(id),
  FOREIGN KEY (supplier_id) REFERENCES company(id)
) ENGINE=InnoDB;

--
-- Content for table `stock`
--

LOCK TABLES `stock` WRITE;
INSERT INTO `stock` (`product_id`, `owner_id`,`supplier_id`, `disponibility`, `price_ttc`, `price_ht`, `recipe_idea`, `tips`) VALUES
(1, 4, 4, 1, 20, 19, "recipe test 1", "tips test 1"),
(2, 4, 4, 1, 40, 38, "recipe test 2", "tips test 2"),
(3, 4, 4, 1, 20, 19, "recipe test 3", "tips test 3"),
(4, 4, 4, 1, 20, 19, "recipe test 4", "tips test 4"),
(5, 4, 4, 1, 20, 19, "recipe test 5", "tips test 5"),
(6, 4, 6, 1, 20, 19, "recipe test 6", "tips test 6"),
(7, 4, 6, 0, 10, 9.5, "recipe test 7", "tips test 7"),
(8, 4, 4, 1, 20, 19, "recipe test 8", "tips test 8"),
(9, 4, 4, 1, 20, 19, "recipe test 9", "tips test 9"),
(10, 4, 7, 0, 20, 19, "recipe test 10", "tips test 10"),
(11, 5, 7, 1, 20, 19, "recipe test 11", "tips test 11"),
(12, 5, 5, 1, 20, 19, "recipe test 12", "tips test 12"),
(13, 5, 5, 1, 20, 19, "recipe test 13", "tips test 13"),
(14, 5, 5, 1, 20, 19, "recipe test 14", "tips test 14"),
(15, 5, 7, 1, 20, 19, "recipe test 15", "tips test 15"),
(16, 5, 5, 1, 20, 19, "recipe test 16", "tips test 16"),
(17, 5, 5, 1, 20, 19, "recipe test 17", "tips test 17"),
(18, 5, 5, 0, 20, 19, "recipe test 18", "tips test 18"),
(19, 5, 5, 1, 20, 19, "recipe test 19", "tips test 19"),
(20, 5, 5, 1, 20, 19, "recipe test 20", "tips test 20"),
(1, 1, 4, 1, 20, 19, "recipe test 21", "tips test 21"),
(1, 2, 4, 1, 20, 19, "recipe test 22", "tips test 22"),
(1, 3, 4, 1, 20, 19, "recipe test 23", "tips test 23"),
(2, 2, 4, 1, 40, 38, "recipe test 24", "tips test 24"),
(3, 1, 4, 1, 20, 19, "recipe test 25", "tips test 25"),
(3, 2, 4, 1, 20, 19, "recipe test 26", "tips test 26"),
(4, 2, 4, 1, 20, 19, "recipe test 27", "tips test 27"),
(4, 3, 4, 1, 20, 19, "recipe test 28", "tips test 28"),
(5, 1, 4, 1, 20, 19, "recipe test 29", "tips test 29"),
(5, 3, 4, 1, 20, 19, "recipe test 30", "tips test 30"),
(6, 3, 4, 1, 20, 19, "recipe test 31", "tips test 31"),
(7, 1, 4, 0, 10, 9.5, "recipe test 32", "tips test 32"),
(7, 3, 4, 0, 10, 9.5, "recipe test 33", "tips test 33"),
(9, 1, 4, 1, 20, 19, "recipe test 34", "tips test 34"),
(9, 2, 4, 1, 20, 19, "recipe test 35", "tips test 35"),
(11, 2, 5, 1, 20, 19, "recipe test 36", "tips test 36"),
(11, 3, 5, 1, 20, 19, "recipe test 37", "tips test 37"),
(12, 3, 5, 1, 20, 19, "recipe test 38", "tips test 38"),
(13, 3, 5, 1, 20, 19, "recipe test 39", "tips test 39"),
(14, 2, 5, 1, 20, 19, "recipe test 40", "tips test 40"),
(15, 1, 5, 1, 20, 19, "recipe test 41", "tips test 41"),
(15, 3, 5, 1, 20, 19, "recipe test 42", "tips test 42"),
(16, 1, 5, 1, 20, 19, "recipe test 43", "tips test 43"),
(16, 2, 5, 1, 20, 19, "recipe test 44", "tips test 44"),
(16, 3, 5, 1, 20, 19, "recipe test 45", "tips test 45"),
(17, 1, 5, 1, 20, 19, "recipe test 46", "tips test 46"),
(18, 2, 5, 0, 20, 19, "recipe test 47", "tips test 47"),
(18, 3, 5, 0, 20, 19, "recipe test 48", "tips test 48"),
(19, 1, 5, 1, 20, 19, "recipe test 49", "tips test 49"),
(19, 2, 5, 1, 20, 19, "recipe test 50", "tips test 50"),
(19, 3, 5, 1, 20, 19, "recipe test 51", "tips test 51");
UNLOCK TABLES;

-- ----------------------------------------------------------------------------