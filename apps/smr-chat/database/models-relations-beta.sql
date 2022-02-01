CREATE TABLE `users` (
  `full_name` varchar(255),
  `created_at` timestamp,
  `role_code` int,
  `worker_id` int,
  `customer_id` int,
  `id` int PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE `roles` (
  `code` int PRIMARY KEY,
  `name` varchar(255)
);

CREATE TABLE `rooms` (
  `id` int PRIMARY KEY,
  `name` varchar(255)
);

CREATE TABLE `messages` (
  `id` int PRIMARY KEY,
  `content` varchar(255),
  `user_id` int,
  `room_id` int
);

CREATE TABLE `room_users` (
  `room_id` integer,
  `user_id` integer,
  `users_number` int DEFAULT 2,
  PRIMARY KEY (`room_id`, `user_id`)
);

CREATE TABLE `actions` (
  `id` int PRIMARY KEY,
  `name` varchar(255),
  `room_id` int,
  `status` ENUM ('new', 'in_negotiation', 'in_production', 'published', 'done'),
  `created_at` datetime DEFAULT (now())
);

ALTER TABLE `roles` ADD FOREIGN KEY (`code`) REFERENCES `users` (`role_code`);

ALTER TABLE `users` ADD FOREIGN KEY (`id`) REFERENCES `messages` (`user_id`);

ALTER TABLE `messages` ADD FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`);

ALTER TABLE `room_users` ADD FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`);

ALTER TABLE `room_users` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

