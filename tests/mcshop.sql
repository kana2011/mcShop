-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 13, 2015 at 07:34 AM
-- Server version: 5.6.26
-- PHP Version: 5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mcshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `authme`
--

CREATE TABLE IF NOT EXISTS `authme` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `ip` varchar(40) NOT NULL DEFAULT '127.0.0.1',
  `lastlogin` bigint(20) DEFAULT '0',
  `x` double NOT NULL DEFAULT '0',
  `y` double NOT NULL DEFAULT '0',
  `z` double NOT NULL DEFAULT '0',
  `world` varchar(255) DEFAULT 'world',
  `email` varchar(255) DEFAULT 'your@email.com',
  `isLogged` smallint(6) NOT NULL DEFAULT '0',
  `remember_token` varchar(255) NOT NULL,
  `money` int(11) NOT NULL DEFAULT '0',
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `authme`
--

INSERT INTO `authme` (`id`, `username`, `password`, `ip`, `lastlogin`, `x`, `y`, `z`, `world`, `email`, `isLogged`, `remember_token`, `money`, `updated_at`) VALUES
(1, 'test', '$SHA$0475ce39fb153c35$0ea60ed41bf1985d6137d35278d6c9f9ea9345f948a1e416e0ad6a1da666be68', '198.18.0.1', 0, 0, 0, 0, 'world', 'your@email.com', 0, 'Z2tUIoYrDj1JtcExaoJj1T9UsT7PGucbhfjAX79jaGTeI7Ii6uU4eQDmcIMt', 2000, '2015-10-13 04:49:07'),
(2, 'test2', '$SHA$0475ce39fb153c35$0ea60ed41bf1985d6137d35278d6c9f9ea9345f948a1e416e0ad6a1da666be68', '198.18.0.1', 0, 0, 0, 0, 'world', 'your@email.com', 0, '', 0, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `plugins`
--

CREATE TABLE IF NOT EXISTS `plugins` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `authors` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `enabled` enum('0','1') COLLATE utf8_unicode_ci NOT NULL,
  `priority_level` int(2) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `plugins`
--

INSERT INTO `plugins` (`id`, `name`, `authors`, `enabled`, `priority_level`, `created_at`, `updated_at`) VALUES
(1, 'TMTopup', 'mcShop dev', '1', 15, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `shopgroup`
--

CREATE TABLE IF NOT EXISTS `shopgroup` (
  `id` int(11) NOT NULL,
  `dispname` varchar(64) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `shopgroup`
--

INSERT INTO `shopgroup` (`id`, `dispname`) VALUES
(1, 'Test'),
(2, 'ทดสอบ');

-- --------------------------------------------------------

--
-- Table structure for table `shopitem`
--

CREATE TABLE IF NOT EXISTS `shopitem` (
  `id` int(11) NOT NULL,
  `dispname` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `igroup` int(8) NOT NULL,
  `icomment` varchar(256) COLLATE utf8_unicode_ci NOT NULL DEFAULT '-',
  `price` int(11) NOT NULL,
  `cmd` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `shopitem`
--

INSERT INTO `shopitem` (`id`, `dispname`, `igroup`, `icomment`, `price`, `cmd`) VALUES
(1, 'Test Item 1', 1, 'Just a test item', 50, 'say Hello %player%'),
(2, 'ทดสอบไอเทม', 2, '-', 50, NULL),
(3, 'Test Item 2', 1, '-', 100, NULL),
(4, 'ทดสอบไอเทม2', 2, '-', 100, NULL),
(5, 'Test Item 3', 1, '-', 150, NULL),
(6, 'ทดสอบไอเทม3', 2, '-', 150, NULL),
(7, 'Test Item 4', 1, '-', 200, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE IF NOT EXISTS `tokens` (
  `id` varchar(255) NOT NULL,
  `userid` int(11) NOT NULL,
  `appname` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE IF NOT EXISTS `transactions` (
  `id` int(11) NOT NULL,
  `txid` varchar(15) NOT NULL DEFAULT '',
  `user_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` enum('0','1','2') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `txid`, `user_id`, `amount`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'TEST1', 1, 1000, 'Transaction system test', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'ZHgAD3b7a', 1, -50, 'Server offline while buying Test Item 1', '0', '2015-10-13 05:30:24', '2015-10-13 05:30:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authme`
--
ALTER TABLE `authme`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `plugins`
--
ALTER TABLE `plugins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shopgroup`
--
ALTER TABLE `shopgroup`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shopitem`
--
ALTER TABLE `shopitem`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`txid`),
  ADD KEY `id_2` (`id`),
  ADD KEY `id_3` (`id`),
  ADD FULLTEXT KEY `description` (`description`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authme`
--
ALTER TABLE `authme`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `plugins`
--
ALTER TABLE `plugins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `shopgroup`
--
ALTER TABLE `shopgroup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `shopitem`
--
ALTER TABLE `shopitem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
