-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Апр 06 2021 г., 20:12
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
(1, 'admin', '$2a$10$5Gg7vD5azhilXd7XnZ21JOGKh2SFRUn6QnimVOGPoXo3FR.RWdMgW', '2021-04-06 23:31:55', 'Admin', '2021-04-07 00:11:39', 'widesehl@gmail.com'),
(2, 'user', '$2a$10$weVXe6FCgyASslLNbTVnU.soDxnPmInLJEpkA4cIxcEZizIGktzqG', '2021-04-06 23:33:21', 'User', '2021-04-07 00:10:13', 'user@gmail.com'),
(3, 'curator', '$2a$10$BPi4eSyOEQBQf.ztnI.ebuXBYYjAif1SSDzMjR3wZW1RmzIwSlQMa', '2021-04-06 23:37:10', 'Curator', '2021-04-06 23:37:15', 'curator@gmail.com'),
(4, 'teacher', '$2a$10$fgbwTtfX9mgZhnPUT8.SBubrYAbwlXBPMsBfOy1YTcoedD.L4.atK', '2021-04-06 23:37:58', 'Teacher', '2021-04-06 23:38:05', 'teacher@gmail.com');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
