-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 17, 2026 at 02:35 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `delivery_address` text NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','confirmed','processing','delivering','delivered','cancelled') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `category` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `stock`, `category`, `image`, `created_at`) VALUES
(9, 'isabune', ' imesa imyenda igacya', 2000.00, 3, 'Other', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD9dGxXuKZ-liqsNKAtMWm1HUZsQGrr3RwWI5kYlK2cc5fuVfgh3of3q4&s', '2026-11-17 00:44:27'),
(11, 'indazi', 'ziryoshye', 200.00, 7, 'Indazi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPul4itdDuaxhROB58-AMkXqR-xw3LYNMspaJs-o-B2QOxEZgObhbv1pk&s', '2026-11-17 00:50:34'),
(13, 'umugati', 'ducuruza imigati\n', 500.00, 12, 'Other', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRW1syiGQVEaFUGiGGQKX1E9bUFA6JTj09qhQHT1Obs4k1lpxHoJD4e0E&s', '2026-11-17 00:56:00'),
(15, 'milk', 'icyivuguto ni cyushyu', 3500.00, 50, 'Amata', 'https://media.istockphoto.com/id/1222018207/photo/pouring-milk-into-a-drinking-glass.jpg?s=612x612&w=0&k=20&c=eD4YHoSjKIYSPDgnM2OgWD_HVH2IcmjZSRq7IjUnH6M=', '2026-11-17 01:01:33'),
(18, 'tea', 'drinks', 200.00, 3, 'Icyayi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuhd-k0tf-oc49sZUOMkV_BRZi8fd-imf4U89V7MIScQ&s', '2026-11-17 01:09:22'),
(19, 'kawunga', 'eat mugurusu', 25000.00, 50, 'Kawunga', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRExE1RClxlh-Mrd0cf6n-ODybFHVZLpKfe5ryWSy0WVA&s', '2026-11-17 01:13:28'),
(21, 'beans', 'eaten food', 2000.00, 3, 'Ibishyimbo', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfdhcTa7Rv6CvnhgKux2hc_OvpqGdMkiVq6_q_mFW6w2eMaBLXViv2A7w&s', '2026-11-17 01:18:47'),
(22, 'rice', 'eaten', 1500.00, 50, 'Umuceri', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDVZLL-6QfRgA9F7PSrZtXNwEmR3Ydeg9Ug1nD5dAlDQ&s', '2026-11-17 01:21:22'),
(23, 'soda', 'drink to improve energy', 1200.00, 0, 'Other', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0M6FV6XfHBjERU_YK8jKMoceKBkqGuL8tNmAwM3PHZw&s=10', '2026-11-17 01:32:36');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('customer','admin') DEFAULT 'customer',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `phone`, `password`, `role`, `created_at`) VALUES
(1, 'deborah uwineza', 'deborah@gmail.com', '978453276', '$2a$10$0eoI6E/mRcGWvGX1ozc0T.kBb788catyTIqEOZKmvNWHKPTxvaDeG', 'customer', '2026-11-16 15:43:38'),
(2, 'Theogen Admin', 'theogen@gmail.com', '0780000000', '$2a$10$9bl0LKqaQHGSgDd5JtYyG.saD6wbI678bDnaOYpAHBvLHFoI.Gjm.', 'admin', '2026-11-16 22:42:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
