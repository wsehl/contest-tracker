-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Апр 13 2021 г., 20:49
-- Версия сервера: 10.4.14-MariaDB
-- Версия PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `contest-tracker-v2`
--

-- --------------------------------------------------------

--
-- Структура таблицы `events`
--

CREATE TABLE `events` (
  `id` int(10) NOT NULL,
  `organization_id` int(10) NOT NULL,
  `event_title` varchar(255) NOT NULL,
  `event_description` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `events`
--

INSERT INTO `events` (`id`, `organization_id`, `event_title`, `event_description`, `start_date`, `end_date`) VALUES
(1, 1, 'Event', 'Event', '2021-04-01', '2021-04-30'),
(2, 1, 'ads', 'adsads', '2021-04-01', '2021-04-30'),
(3, 1, 'dfsdfsdf', 'adsasdadssad', '2021-04-01', '2021-04-30'),
(4, 2, 'EVENT2', 'asd', '2021-04-01', '2021-04-29');

-- --------------------------------------------------------

--
-- Структура таблицы `organizations`
--

CREATE TABLE `organizations` (
  `id` int(10) NOT NULL,
  `organization_name` varchar(100) NOT NULL,
  `organization_image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `organizations`
--

INSERT INTO `organizations` (`id`, `organization_name`, `organization_image`) VALUES
(1, 'NIS', 'file-1618331019656.jpeg'),
(2, 'NIS3', 'file-1618332240873.jpeg');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `registered` datetime NOT NULL,
  `role` enum('User','Admin','Teacher','Curator') NOT NULL,
  `last_login` datetime NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `registered`, `role`, `last_login`, `email`) VALUES
(1, 'admin', '$2a$10$5Gg7vD5azhilXd7XnZ21JOGKh2SFRUn6QnimVOGPoXo3FR.RWdMgW', '2021-04-06 23:31:55', 'Admin', '2021-04-11 19:52:44', 'widesehl@gmail.com'),
(2, 'user', '$2a$10$weVXe6FCgyASslLNbTVnU.soDxnPmInLJEpkA4cIxcEZizIGktzqG', '2021-04-06 23:33:21', 'User', '2021-04-07 00:10:13', 'user@gmail.com'),
(3, 'curator', '$2a$10$BPi4eSyOEQBQf.ztnI.ebuXBYYjAif1SSDzMjR3wZW1RmzIwSlQMa', '2021-04-06 23:37:10', 'Curator', '2021-04-06 23:37:15', 'curator@gmail.com'),
(4, 'teacher', '$2a$10$fgbwTtfX9mgZhnPUT8.SBubrYAbwlXBPMsBfOy1YTcoedD.L4.atK', '2021-04-06 23:37:58', 'Teacher', '2021-04-06 23:38:05', 'teacher@gmail.com'),
(5, 'insertedUser', '$2a$10$8LlHlR18i1.4lUGzOYk.H.nyqbQfbq96oUHZ4xIiUXIHxV6d2c0m2', '2021-04-11 16:25:33', 'User', '0000-00-00 00:00:00', 'insertedUser@gmail.com'),
(6, 'insertedUser2', '$2a$10$B.SOxsXfEtOmMOMDF3a1I.2RNNB9FYEWAxJp68.BROAL1s56H6hvi', '2021-04-11 18:21:38', 'Admin', '0000-00-00 00:00:00', 'emaialsdasd2@gmail.com'),
(7, 'Glack', '$2a$10$w59IswJEyIMWNHopr0WUAebUrNVJ1ZE/8FIZcICV6r/dcAlWd7qXO', '2021-04-11 19:53:33', 'Teacher', '0000-00-00 00:00:00', 'wwasdasd@gmail.com'),
(8, 'glacks', '$2a$10$GI6V4HphkdD7Y2toegff.e0qZpiDb6N0V.03FwIhcx9FvBv5fZTOy', '2021-04-11 19:54:39', 'Admin', '0000-00-00 00:00:00', 'asdasd@gmal.com'),
(9, 'asdads', '$2a$10$v/WHF3zkVdS/D5BnZ7QYDu7gU09GojvDvS/4o.4j3PWcByz9rW16m', '2021-04-11 19:57:27', 'User', '0000-00-00 00:00:00', 'asdasd'),
(10, 'asdasd', '$2a$10$89oNfGjpyl3iqSfFLpn.z.gOa.OZ2/4Zr.gpu5BMSgdqqpTfZ8NHa', '2021-04-11 19:58:25', 'User', '0000-00-00 00:00:00', 'asdasd'),
(11, 'asd', '$2a$10$j3eqEET/H1LHbR.utn5F3.84sYTXsrmiyDmMVjyDEjXRJ7b4OK36G', '2021-04-11 19:59:39', 'Curator', '0000-00-00 00:00:00', 'asd'),
(12, 'asd123', '$2a$10$CxOG0Pw6FyWzulT2sox/aOHC5S2G.o1nIYu6f4CVUP0kQnjLA3QoG', '2021-04-11 20:00:33', 'User', '0000-00-00 00:00:00', 'ads'),
(13, 'asd1233', '$2a$10$1Uxa5dXHLwrNWvXK/M0WPO0HACYQNdAwZhKjV.sPjcGM7BIpGvRt.', '2021-04-11 20:01:52', 'User', '0000-00-00 00:00:00', 'asdasd'),
(14, 'asdasda', '$2a$10$Q1Ip80TLvEMrGAFk2jAZLudG1WPWLQUqbiSdHU/jxgx4UizV3bT3K', '2021-04-11 20:03:06', 'Curator', '0000-00-00 00:00:00', 'sdasdasd'),
(15, 'asdasdasda', '$2a$10$pEd//IjPxga.BPqUY1Sglumhv4Z33K1ZHEGADf/KwdPaZ5TE06bB.', '2021-04-11 20:03:46', 'User', '0000-00-00 00:00:00', 'sdasdasdasd'),
(16, 'asddgfdfgd', '$2a$10$8ENSBRgd2m02koEeFAzqRehLqzgD06QNT7kvx2XlSCTg.T.dBdNim', '2021-04-11 20:05:31', 'Curator', '0000-00-00 00:00:00', 'asdasd'),
(17, 'adsfgdgf', '$2a$10$/Q7PAX7hIlTXOG.N2939buV6z7/tVh40bxxuNG2GpEsQnMl2PEoay', '2021-04-11 20:06:15', 'Curator', '0000-00-00 00:00:00', 'asdasda'),
(18, 'dfgdgfdfg', '$2a$10$GHlv7CbM8xu7ce3LOKlFWuyblIQGxKnYTq.8lwqKAS77uk9mYGST.', '2021-04-11 20:07:26', 'Curator', '0000-00-00 00:00:00', 'dfgdfgdfg'),
(19, 'asdasdasd', '$2a$10$znw.zj.eGr9cfdhWfT99yOTMvVqmkiMPkys2W6upLDde6Vb.QjfW6', '2021-04-11 20:08:08', 'User', '0000-00-00 00:00:00', 'asdasd'),
(20, 'asdasda123123', '$2a$10$14pvICiZmx5.xEr/XqAW5OAI7NJ2DxwJfGY7M67tC07gwr22rjncq', '2021-04-11 20:09:53', 'Curator', '0000-00-00 00:00:00', 'sdasdasda'),
(21, 'sdfsdf', '$2a$10$FOTOB4yBVqdnH4AaBnYwA.GNR0nJmIBtigMWS2J8OIC6FY8JFgxO2', '2021-04-11 20:11:05', 'Curator', '0000-00-00 00:00:00', 'sdfsdfsdf'),
(22, 'geasdnasd', '$2a$10$r3tSxn4TLGvb0f.OBpXCl.Bt9KtZbDv1z/WNxa6DzSqxJMFI4yNwS', '2021-04-11 21:36:10', 'Teacher', '0000-00-00 00:00:00', 'wasdasdasd@gmail.com'),
(23, 'adsasda', '$2a$10$hUZiNMBhxC4WYEHoWsO1YuseauWjQrpXvtOQwiKenLmM5AVwj.jSC', '2021-04-11 21:36:47', 'User', '0000-00-00 00:00:00', 'asdasd'),
(24, 'userghfghfgh', '$2a$10$uTPssl.OthQGXQa8YMhpiemhMmi4hwOdIC5mqBKSp/R8E7uDa8ezW', '2021-04-12 17:33:56', 'User', '0000-00-00 00:00:00', 'adasdas'),
(25, 'asdasdasdhjh', '$2a$10$Hm9MHKTSsOEo/50ydEtR/.AOjlHsUMNQq/SfCh.RTcbGYbC.4DUT2', '2021-04-12 18:05:03', 'User', '0000-00-00 00:00:00', 'asdasdasd'),
(26, 'фывчя', '$2a$10$Cs3R83bF98AEwAddrvz6UexD6NGnsnt.5aObx2TKWsfWo8qcs8ZVG', '2021-04-12 18:06:57', 'User', '0000-00-00 00:00:00', 'asdasd231'),
(27, 'asdadsfd', '$2a$10$UnqU31pKR2K9.Rrt3bTcwefcvLTzkRB/Gwg9JZGvXgZAr5SO.BAVm', '2021-04-12 20:16:45', 'User', '0000-00-00 00:00:00', 'asdasd');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `organization_name` (`organization_name`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `events`
--
ALTER TABLE `events`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `organizations`
--
ALTER TABLE `organizations`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
