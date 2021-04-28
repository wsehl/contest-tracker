CREATE TABLE `events` (
  `id` int(10) NOT NULL,
  `organization_id` int(10) NOT NULL,
  `event_title` varchar(255) NOT NULL,
  `event_description` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `organizations` (
  `id` int(10) NOT NULL,
  `organization_name` varchar(100) NOT NULL,
  `organization_image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `registered` datetime NOT NULL,
  `role` enum('User','Admin','Teacher','Curator') NOT NULL,
  `last_login` datetime NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `organizations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `organization_name` (`organization_name`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `events`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

ALTER TABLE `organizations`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
COMMIT;