-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Фев 23 2021 г., 22:10
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
-- База данных: `contest-tracker-test`
--

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `role` enum('User','Admin','Teacher','Curator') DEFAULT 'User'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `created_at`, `role`) VALUES
(9, 'root', '$2y$10$XSKGIHUiL/0Yi0fizveTP.5PjdXJwl80dwGac5tv1S/drnTRcnP7q', '2021-02-24 01:01:36', 'User'),
(10, 'sehl', '$2y$10$y1qBinqzQl8CIahsLFxB4.X50rx/ib87WbXnNa9wu.zZKbA/0u0r.', '2021-02-24 01:01:41', 'User'),
(11, 'kola', '$2y$10$KE/fHYbtMORm2RySADNIYujLLnJEPFpRHYBplN.fld8apqq.yrEsq', '2021-02-24 01:01:48', 'User'),
(12, 'user', '$2y$10$NoNg4lV5.fetb17bY9n50ePDULCFceEl5aY4kIkQ7pADBlEem8gqe', '2021-02-24 01:02:05', 'User'),
(13, 'oleg', '$2y$10$s0EMlee/ewUyvca2psn1lOBUfVsi0WUNp/0mjSdLCiwWqXpSULVsW', '2021-02-24 01:03:37', 'User'),
(14, 'admin', '$2y$10$Z4XmNDbBb0kKRcBxJRlWmOQuPCVvM376tGntt74.TINfNQ6Phoo7q', '2021-02-24 02:18:28', 'Admin');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
