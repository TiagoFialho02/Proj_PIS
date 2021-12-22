Use adopt4paws;

-- preenchimento da tabela animals
INSERT INTO `animals` (`id`, `type`, `breed`, `age`, `gender`, `photo`) 
	VALUES (1, 'dog', 'Yorkshire', 2, 'male', '');

INSERT INTO `animals` (`id`, `type`, `breed`, `age`, `gender`, `photo`) 
	VALUES (2, 'dog', 'Pinscher', 3, 'male', '');

INSERT INTO `animals` (`id`, `type`, `breed`, `age`, `gender`, `photo`) 
	VALUES (3, 'dog', 'Chihuahua', 1, 'male', '');
    
INSERT INTO `animals` (`id`, `type`, `breed`, `age`, `gender`, `photo`) 
	VALUES (4, 'dog', 'Buldogue', 3, 'female', '');
    
INSERT INTO `animals` (`id`, `type`, `breed`, `age`, `gender`, `photo`) 
	VALUES (5, 'cat', 'Siamese', 2, 'male', '');
    
INSERT INTO `animals` (`id`, `type`, `breed`, `age`, `gender`, `photo`) 
	VALUES (6, 'dog', 'Yorkshire', 0.3, 'female', '');

    
-- preenchimento da tabela user
INSERT INTO `users` (`id`, `email`, `username`, `password`, `birthdate`, `profile_image`, `is_enterprise`) 
	VALUES (1, 'mariamariana@gmail.com', 'MariaM', '', '1990-01-08', '', b'0');
    
INSERT INTO `users` (`id`, `email`, `username`, `password`, `birthdate`, `profile_image`, `is_enterprise`) 
	VALUES (2, 'zecaAntonio@gmail.com', 'ZecaAn', '', '1989-01-22', '', b'0');
    
INSERT INTO `users` (`id`, `email`, `username`, `password`, `birthdate`, `profile_image`, `is_enterprise`) 
	VALUES (3, 'joaquim123@gmail.com', 'Joaquim1', '', '1996-05-04', '', b'0');
    
INSERT INTO `users` (`id`, `email`, `username`, `password`, `birthdate`, `profile_image`, `is_enterprise`) 
	VALUES (4, 'jecasmalacuec33o@gmail.com', 'Jecas123', '', '1994-08-07', '', b'0');
    
INSERT INTO `users` (`id`, `email`, `username`, `password`, `birthdate`, `profile_image`, `is_enterprise`) 
	VALUES (5, '2200matias@gmail.com', 'Matias', '', '1980-07-01', '', b'0');
    
-- preenchimento da tabela posts
INSERT INTO `posts` (`id`, `id_user`, `id_animal`, `is_active`, `description`) 
	VALUES (1, 2, 2, b'1', 'Um cão muito bonito e também muito meigo.');
    
INSERT INTO `posts` (`id`, `id_user`, `id_animal`, `is_active`, `description`) 
	VALUES (2, 5, 4, b'1', 'Cão bastante meigo e bonito. Pode estar ao lado de crianças.');
    
INSERT INTO `posts` (`id`, `id_user`, `id_animal`, `is_active`, `description`) 
	VALUES (3, 1, 5, b'0', '...');
    
    