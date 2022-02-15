-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 15-Fev-2022 às 19:13
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
  `photo` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `name` varchar(200) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `animals`
--

INSERT INTO `animals` (`id`, `type`, `breed`, `age`, `gender`, `photo`, `name`, `id_user`) VALUES
(1, 'Dog', 'Yorkshire', 2, 'Male', 'http://10.0.2.2:8080/getProfileImage/animalplaceholder.jpg', 'Tobias', 2),
(2, 'Dog', 'Pinscher', 3, 'Male', 'http://10.0.2.2:8080/getProfileImage/animalplaceholder.jpg', 'Mantorras', 64),
(3, 'Dog', 'Chihuahua', 1, 'Male', 'http://10.0.2.2:8080/getProfileImage/animalplaceholder.jpg', 'Guga', 64),
(4, 'Dog', 'Beagle', 3, 'Female', 'http://10.0.2.2:8080/getProfileImage/animalplaceholder.jpg', 'Kiara', 63),
(5, 'Cat', 'Siamese', 2, 'Female', 'http://10.0.2.2:8080/getProfileImage/animalplaceholder.jpg', 'Mantorras', 63),
(15, 'Cat', 'American shorthair', 2, 'Female', 'http://10.0.2.2:8080/getProfileImage/c9c12340-89d5-11ec-bad7-47d111f896a0Screenshot_20220128-041547.png', 'Luna', 2),
(19, 'Cat', 'American curl', 3, 'Male', 'http://10.0.2.2:8080/getProfileImage/animalplaceholder.jpg', '123', 64),
(26, 'Dog', 'Chihuahua', 4, 'Male', 'http://10.0.2.2:8080/getProfileImage/400fcd50-8a10-11ec-8052-cf6329e42a3dIMG_20220115_000937.jpg', 'Black', 67),
(27, 'Dog', 'Finnish Spitz', -1, 'Female', 'http://10.0.2.2:8080/getProfileImage/b518b380-8aa3-11ec-b265-15c518f9f675Screenshot_20220128-040136.png', 'Estrela', 64),
(28, 'Dog', 'Yorkshire Terrier', 3, 'Male', 'http://10.0.2.2:8080/getProfileImage/fef978d0-8ac7-11ec-8530-8fb837e89fb7IMG_20220115_000937.jpg', 'Nico', 73),
(29, 'Cat', 'Siamese', 5, 'Female', 'http://10.0.2.2:8080/getProfileImage/animalplaceholder.jpg', 'Riscas', 2),
(30, 'Dog', 'Aidi', 5, 'Male', 'http://10.0.2.2:8080/getProfileImage/animalplaceholder.jpg', 'Ted', 2),
(31, 'Dog', 'Airedale Terrier', 6, 'Male', 'http://10.0.2.2:8080/getProfileImage/animalplaceholder.jpg', 'Tadeu', 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_post` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `favorites`
--

INSERT INTO `favorites` (`id`, `id_user`, `id_post`) VALUES
(35, 67, 17),
(36, 67, 1),
(56, 73, 1),
(102, 80, 1),
(103, 80, 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_animal` int(11) NOT NULL,
  `is_active` bit(1) NOT NULL DEFAULT b'1',
  `description` longtext NOT NULL,
  `pub_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `posts`
--

INSERT INTO `posts` (`id`, `id_user`, `id_animal`, `is_active`, `description`, `pub_date`) VALUES
(1, 64, 2, b'1', 'Um cão muito bonito e também muito meigo.', '2022-02-04'),
(2, 63, 4, b'1', 'Cão bastante meigo e bonito. Pode estar ao lado de crianças.', '2022-02-04'),
(17, 67, 26, b'1', 'Cão do Gonçalo                                                                                                                                                      ', '2022-02-10'),
(18, 64, 27, b'1', 'Pequena, brincalhona e muito meiga. Gosta de crianças e não reage mal a desconhecidos', '2022-02-10');

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
  `profile_image` varchar(300) NOT NULL,
  `is_enterprise` tinyint(1) NOT NULL DEFAULT 0,
  `is_preferences_set` tinyint(11) NOT NULL DEFAULT 0,
  `p_type` varchar(200) DEFAULT NULL,
  `p_age` varchar(200) DEFAULT NULL,
  `p_gender` varchar(200) DEFAULT NULL,
  `p_breed` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `birthdate`, `profile_image`, `is_enterprise`, `is_preferences_set`, `p_type`, `p_age`, `p_gender`, `p_breed`) VALUES
(1, 'mariamariana@gmail.com', 'MariaM', 'mariamaria', '1990-01-08', 'http://10.0.2.2:8080/getProfileImage/profile_placeholder.jpg', 1, 1, 'dog', 'Age', 'Male', 'Yorkshire Terrier'),
(2, 'zecaAntonio@gmail.com', 'ZecaAn', '123456', '1989-01-22', 'http://10.0.2.2:8080/getProfileImage/profile_placeholder.jpg', 1, 1, 'dog', '-1', 'Male', 'Breed'),
(63, '1234@gmail.com', '1234', '12341234', '1998-01-22', 'http://10.0.2.2:8080/getProfileImage/c76a7580-8073-11ec-8768-13ec6fe2e9b1IMG_20220115_000910.jpg', 0, 1, 'dog', 'Age', 'Female', 'Breed'),
(64, 'admin@admin.com', 'admin', 'adminadmin', '1978-01-25', 'http://10.0.2.2:8080/getProfileImage/profile_placeholder.jpg', 0, 1, 'Type', 'Age', 'Gender', 'Breed'),
(65, '12341@gmail.com', '12341', '12342134', '1997-01-28', 'http://10.0.2.2:8080/getProfileImage/c76a7580-8073-11ec-8768-13ec6fe2e9b1IMG_20220115_000910.jpg', 0, 1, 'cat', '1-2', 'Female', 'Siamese'),
(66, '12341234@gmail.com', '12341234', '12341234', '1991-01-28', 'http://10.0.2.2:8080/getProfileImage/c76a7580-8073-11ec-8768-13ec6fe2e9b1IMG_20220115_000910.jpg', 0, 1, 'dog', '3-5', 'Female', 'Buldogue'),
(67, 'gonzalo@gmail.com', 'Gonzalo', 'gonzalo', '2001-12-19', 'http://10.0.2.2:8080/getProfileImage/profile_placeholder.jpg', 0, 1, 'dog', '1-2', 'Gender', 'Breed'),
(73, '123411@gmail.com', '1234123', '12341234', '1975-02-10', 'http://10.0.2.2:8080/getProfileImage/profile_placeholder.jpg', 0, 1, 'dog', '1-2', 'Gender', 'Breed'),
(75, 'erica@gmail.com', 'erica2', '123456', '2001-02-02', 'http://10.0.2.2:8080/getProfileImage/profile_placeholder.jpg', 0, 1, 'both', '+5', 'Gender', 'Breed'),
(80, 'iarix@gmail.com', 'Iara', 'iara1234', '1995-02-12', 'http://10.0.2.2:8080/getProfileImage/profile_placeholder.jpg', 0, 1, 'both', '3-5', 'Gender', 'Breed');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `animals`
--
ALTER TABLE `animals`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `post_ibfk` (`id_user`);

--
-- Índices para tabela `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `FK` (`id_post`),
  ADD KEY `FK1` (`id_user`);

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
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `animals`
--
ALTER TABLE `animals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de tabela `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT de tabela `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `animals`
--
ALTER TABLE `animals`
  ADD CONSTRAINT `post_ibfk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `FK` FOREIGN KEY (`id_post`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

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
