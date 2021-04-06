-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 05, 2021 at 06:22 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `contest-tracker-test`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `eventID` int(11) NOT NULL,
  `organizerID` varchar(150) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `date` date NOT NULL,
  `published` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`eventID`, `organizerID`, `name`, `description`, `date`, `published`) VALUES
(1, '1', 'Chemistry', 'Desrc', '2021-04-16', 1),
(2, '1', 'Biology', 'Desc', '2021-04-06', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `role` enum('User','Admin','Teacher','Curator') DEFAULT 'User'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `created_at`, `role`) VALUES
(1, 'admin', '$2y$10$PZm8zL/SqwMOIXKxpoGKP.QYBdyiwEbkaYZ8i4MA.L5Wru7gFqpOS', 'widesehl@gmail.com', '2021-02-24 16:05:14', 'Admin'),
(2, 'curator', '$2y$10$1slFKqTugt1qrrgd0hQ4QeL70Sk1ywg6KtUFr83C0VXn6ybf/WJ26', 'nonameyah8@gmail.com', '2021-02-24 17:47:50', 'Curator'),
(17, 'wsehl', '$2y$10$ub4VaJO4nVaEHLaWCpnzxusHK47SwmZIjmEG4LZm5YjMiilwJDVwe', 'widesehlcom@gmail.com', '2021-04-01 19:03:09', 'User'),
(18, 'rabbit', '$2y$10$XWgO4AbYtDuu.nJ29FRwtOhdaEF1JY//hVshILK31XfQ1qHrJZzSy', 'weslo@mail.ru', '2021-04-01 19:05:17', 'User'),
(19, 'asdasd', '$2y$10$r3LLMvOsMbBOex5qeKUBduv79IbBYqaPnPBWBSqyGGbsGCA3nlB8S', 'asdasd@asd', '2021-04-02 09:23:07', 'User'),
(20, 'asdas', '$2y$10$wK9SWBP8Vtc8nTHMkZUTmOvt91P6wiVGajLg0lpDuHOBoI3Rp8mx2', 'dasadsa@ga', '2021-04-02 12:13:45', 'User');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`eventID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `eventID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
