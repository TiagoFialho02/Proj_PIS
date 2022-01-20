-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 20-Jan-2022 às 11:34
-- Versão do servidor: 10.4.22-MariaDB
-- versão do PHP: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `adopt4paws`
--

DROP DATABASE IF EXISTS adopt4paws;
CREATE DATABASE adopt4paws;

-- --------------------------------------------------------

--
-- Estrutura da tabela `animals`
--

CREATE TABLE `animals` (
  `id` int(11) NOT NULL,
  `type` varchar(15) NOT NULL,
  `breed` varchar(45) NOT NULL,
  `age` double NOT NULL,
  `gender` varchar(15) NOT NULL,
  `photo` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `animals`
--

INSERT INTO `animals` (`id`, `type`, `breed`, `age`, `gender`, `photo`) VALUES
(1, 'dog', 'Yorkshire', 2, 'male', ''),
(2, 'dog', 'Pinscher', 3, 'male', ''),
(3, 'dog', 'Chihuahua', 1, 'male', ''),
(4, 'dog', 'Buldogue', 3, 'female', ''),
(5, 'cat', 'Siamese', 2, 'male', ''),
(6, 'dog', 'Yorkshire', 0.3, 'female', '');

-- --------------------------------------------------------

--
-- Estrutura da tabela `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_animal` int(11) NOT NULL,
  `is_active` bit(1) NOT NULL,
  `description` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `posts`
--

INSERT INTO `posts` (`id`, `id_user`, `id_animal`, `is_active`, `description`) VALUES
(1, 2, 2, b'1', 'Um cão muito bonito e também muito meigo.'),
(2, 5, 4, b'1', 'Cão bastante meigo e bonito. Pode estar ao lado de crianças.'),
(3, 1, 5, b'0', '...');

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(25) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(64) NOT NULL,
  `birthdate` date NOT NULL,
  `profile_image` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `is_enterprise` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `birthdate`, `profile_image`, `is_enterprise`) VALUES
(1, 'mariamariana@gmail.com', 'MariaM', 'mariamaria', '1990-01-08', '', 1),
(2, 'zecaAntonio@gmail.com', 'ZecaAn', '', '1989-01-22', '', 1),
(3, 'joaquim123@gmail.com', 'Joaquim1', '', '1996-05-04', '', 0),
(4, 'jecasmalacuec33o@gmail.co', 'Jecas123', '', '1994-08-07', '', 0),
(5, '2200matias@gmail.com', 'Matias', '', '1980-07-01', '', 1),
(6, 'admin@admin.com', 'admin', 'adminadmin', '0000-00-00', NULL, 1),
(7, 'tiagofialho2002@gmail.com', 'TiagoFialho', '12341234', '1994-01-15', 'src/main/res/drawable/profile_placeholder.png', 0),
(8, 'ritacoisa@hotmail.com', 'Rita1234', '12341234', '1994-01-15', '/storage/emulated/0/Pictures/IMG_20220115_000937.jpg', 0),
(9, 'goncas@gmail.com', 'Gonçalo Rebouço', 'goncasgoncas', '2001-12-19', '/storage/emulated/0/Pictures/IMG_20220115_000937.jpg', 0),
(10, 'goncs@gmail.com', 'Gonçalo Rebou', 'goncasgoncs', '2001-12-19', '/storage/emulated/0/Pictures/IMG_20220115_000937.jpg', 0);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `animals`
--
ALTER TABLE `animals`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Índices para tabela `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_animal` (`id_animal`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `email` (`email`,`username`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `animals`
--
ALTER TABLE `animals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `post_ibfk_2` FOREIGN KEY (`id_animal`) REFERENCES `animals` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
