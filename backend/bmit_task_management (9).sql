-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 21, 2023 at 07:00 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bmit_task_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `project_name` varchar(255) NOT NULL,
  `project_description` varchar(255) NOT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `project_name`, `project_description`, `status`, `created_at`) VALUES
(1, 'project 1', 'project 1 description', 'new', '2023-08-20 10:13:32');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `task_name` varchar(255) NOT NULL,
  `task_description` varchar(255) NOT NULL,
  `note` varchar(255) NOT NULL,
  `status` varchar(20) NOT NULL,
  `assign_user_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `asssign_date` date DEFAULT NULL,
  `completed_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `task_name`, `task_description`, `note`, `status`, `assign_user_id`, `project_id`, `asssign_date`, `completed_date`, `created_at`) VALUES
(1, 'task One', 'task 1 note', 'task 1 description', 'ongoing', 1, 1, '2023-08-20', '2023-08-24', '2023-08-20 10:18:15'),
(2, 'new task 1', 'new', 'new', 'new', 2, 1, '2023-08-20', '2023-08-23', '2023-08-20 10:26:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `userrole` varchar(255) NOT NULL,
  `profilepic` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `userrole`, `profilepic`, `status`, `created_at`) VALUES
(1, 'arif', 'arif@email.com', '$2b$10$Hrm4PshlCiyZ6WuumavHO.8fpSUfKRhFpAXFKUTlrSxyyBmG74m5O', 'admin', 'http://localhost:8800/public/images/profilepic-1691494137096.jpg', 0, '2023-08-09 05:19:44'),
(2, 'vasha', 'vasha@email.com', '$2b$10$GugrlOkqtyVMlgnANjVPa.iG8BAE3xk6Qa0y/nNzPKP0K5cyu7Xpa', 'user', 'profilepic-1691636978259.jpg', 0, '2023-08-10 03:09:38'),
(3, 'rana', 'rana@email.com', '$2b$10$R83Vqgc7pOLZn.6k25Dy7uL0e44U4AlWNOmXr3sJoc2xumBfsaBka', 'user', '1.jpeg', 0, '2023-08-14 08:50:40'),
(4, 'syed', 'syed@email.com', '$2b$10$G8xfPRNUr28nCW/b9sdYhuDSIjlC1eWPdRO2zanBTVGcG6YLDxbQG', 'admin', 'profilepic-1692248836023.png', 0, '2023-08-17 05:07:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
