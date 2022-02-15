
# Documentação da API #

Esta API fornece todos os meios para qualquer aplicação cliente que necessite manipular dados acerca de **utilizadores**, **animais**, **publicações de animais** e **favoritos**.

## Alterações necessárias para o funcionamento da API  ##

 1. Correr o ficheiro ***create_adopt4paws.sql*** que está na pasta *MySqlScripts* no *phpAdmin* do *Xamp*
 2. Efetuar a alteração nas seguintes variáveis situadas no início do documento *request-handlers.js* que está na pasta *scripts* da pasta *www*:
 ***imagesFolderPathToWrite*** = apenas caminho, sem nome do disco, da pasta *imagens* na diretoria; 
***imagesFolderPathToRead*** = caminho completo, da pasta *imagens* na diretoria.

 3. Criar ficheiro com o nome ".*env*", na diretoria inicial, com o seguinte texto:   

> TOKEN_SECRET=*string de caracteres aleatórios (quanto mais extensa melhor)* 
> ANIMAL_BREEDS_API_KEY = OGRDjwilwChLCjGLElCo
> HOST=*ip do host* 
> USER="*nome do utilizador da base de dados*" 
> PASSWORD="*password do utilizador*" 
> DATABASE=*nome da base de dados*

## Gets  ##

### Tabela *animals* ###

----------
#### /api/getAnimalsInfoForItem ####
Permite consultar todos os animais criados, podendo ser filtrados pelos elementos presentes no *body*.

### Pedido ###

#### **Headers** ####
- x-access-token

#### **Body** ####
- type
- breed
- age
- gender
- photo

### Resposta ###
    [
    {
	    "id": 3,
	    "type": "Dog",
	    "breed": "Chihuahua",
	    "age": 1,
	    "gender": "Male",
	    "photo": "http://10.0.2.2:8080/getProfileImage/animalplaceholder.jpg",
	    "name": "Guga",
	    "id_user": 64
    }
    ]

----------

### API Externa ###

----------
#### /api/getDogBreeds; /api/getCatBreeds; /api/getBothBreeds ####
Mostra todas as raças dos animais presentes na API usada, necessários para a aplicação.

### Pedido ###

#### **Headers** ####
- x-access-token

### Resposta ###
    [
    {
	    "id": 401,
	    "breed": "Abyssinian",
	    "type": "cat"
    },
    {
	    "id": 412,
	    "breed": "American Bobtail",
	    "type": "cat"
    },
    {
	    "id": 983,
	    "breed": "American Burmese",
	    "type": "cat"
    }
    ...
    ]
 ----------
 
### Tabela *users* ###

----------

#### /getProfileImage/:fileName? ####

Retorna uma imagem anteriormente gravada.

### Pedido ###

#### **Params** ####
- fileName

### Resposta ###

Ficheiro *.jpg ou *.png

----------

## Posts  ##

### Tabela *users* ###

----------

#### /getExistingUsers ####
Serve para efetuar o *login*, retornando o *token* necessário à autenticação do utilizador, assim como os dados e as preferências fornecidas anteriormente pelo utilizador.

### Pedido ###

#### **Body** ####
- email
- *password*

### Resposta ###
    [
    {
	    "auth": true,
	    "token": *token a ser usado pelo cliente*,
	    "id": 64,
	    "email": "admin@admin.com",
	    "username": "admin",
	    "profileImage": "http://10.0.2.2:8080/getProfileImage/profile_placeholder.jpg",
	    "is_preferences_set": 1,
	    "p_type": "Type",
	    "p_age": "Age",
	    "p_gender": "Gender",
	    "p_breed": "Breed"
    }
    ]
    
----------

#### /postUser ####

Insere um utilizador novo na base de dados.

### Pedido ###

#### **Body** ####
- is_preference_set
- type
- breed
- age
- gender
- userId

### Resposta ###
    sucess
    
----------

#### /api/updateUser ####
Permite a alteração da *password* de um determinado utilizador.

### Pedido ###

#### **Headers** ####
- x-access-token

#### **Body** ####
- userId
- password

### Resposta ###
    updated
    
----------

#### /api/updateUserPreferences ####
Permite alterar todas as preferências de um determinado utilizador.

### Pedido ###

#### **Headers** ####
- x-access-token

#### **Body** ####
- is-preference-set
- type
- breed
- age
- gender
- userId

### Resposta ###
    sucess
   
----------

### Tabela *posts* ###

----------

#### /api/getPosts ####
Retorna os posts filtrados pelos elementos enviados no body.

### Pedido ###
#### **Headers** ####
- x-access-token
#### **Body** ####
- type
- age (-1, 1-2, 3-5, 5+)
- gender
- breed

### Resposta ###

    [
    { 
	    postId: 1, 
	    description: 'Um cão muito bonito e também muito meigo.', 
	    pub_date: 2022-02-04T00:00:00.000Z, 
	    userId: 64, email: 'admin@admin.com', 
	    username: 'admin', 
	    profile_image: 'http://10.0.2.2:8080/getProfileImage/profile_placeholder.jpg', 
	    animalId: 2, 
	    type: 'Dog', 
	    breed: 'Pinscher', 
	    age: 3, 
	    gender: 'Male', 
	    photo: 'http://10.0.2.2:8080/getProfileImage/animalplaceholder.jpg', name: 'Mantorras' 
    }, 
    { 
	    postId: 2, 
	    description: 'Cão bastante meigo e bonito. Pode estar ao lado de crianças.', 
	    pub_date: 2022-02-04T00:00:00.000Z, 
	    userId: 63, 
	    email: '1234@gmail.com', 
	    username: '1234', 
	    profile_image: 'http://10.0.2.2:8080/getProfileImage/c76a7580-8073-11ec-8768-13ec6fe2e9b1IMG_20220115_000910.jpg', animalId: 4, 
	    type: 'Dog', 
	    breed: 'Beagle', 
	    age: 3, 
	    gender: 'Female', 
	    photo: 'http://10.0.2.2:8080/getProfileImage/animalplaceholder.jpg', 
	    name: 'Kiara' 
    } 
    ]
    
----------

#### /api/postPost ####
Insere uma publicação em nome de um utilizador sobre um determinado animal, já criado.

### Pedido ###

#### **Headers** ####
- x-access-token

#### **Body** ####
- userId
- animalId
- description

### Resposta ###
    inserted
    
----------

### Tabela *favorites* ###

----------

#### /api/getFavoritePost ####
Mostra todos os favoritos de um determinado utilizador. Retorna os dados do utilizador e do animal.

### Pedido ###

#### **Headers** ####
- x-access-token

#### **Body** ####
- userId

### Resposta ###
    [
    {
	    "postId": 17,
	    "description": "Cão do Gonçalo                                                                                                                                                      ",
	    "pub_date": "2022-02-10T00:00:00.000Z",
	    "userId": 67,
	    "email": "gonzalo@gmail.com",
	    "username": "Gonzalo",
	    "profile_image": "http://10.0.2.2:8080/getProfileImage/profile_placeholder.jpg",
	    "animalId": 26,
	    "type": "Dog",
	    "breed": "Chihuahua",
	    "age": 4,
	    "gender": "Male",
	    "photo": "http://10.0.2.2:8080/getProfileImage/400fcd50-8a10-11ec-8052-cf6329e42a3dIMG_20220115_000937.jpg",
	    "name": "Black"
    }
    ]
    
----------

#### /api/postFavoritePost ####
Insere um post existente aos favoritos de um determinado utilizador.

### Pedido ###

#### **Headers** ####
- x-access-token

#### **Body** ####
- userId
- postId

### Resposta ###
    Added
    
----------

#### /api/deleteFavoritePost ####
Apaga um determinado registo da tabela *favorites* que corresponda a uma publicação.

### Pedido ###
#### **Headers** ####
- x-access-token
#### **Body** ####
- userId
- postId

### Resposta ###
    Deleted

----------

#### /api/verifyFavoritePost ####
Verifica se um determinado utilizador possui uma determinada publicação como favorita.

### Pedido ###
#### **Headers** ####
- x-access-token
#### **Body** ####
- userId
- postId

### Resposta ###
    Found

----------

### Tabela animals ###

----------

#### /api/getAnimalsByUser ####
Retorna os animais de criados por um determinado utilizador.

### Pedido ###

#### **Headers** ####
- x-access-token

#### **Body** ####
- userId

### Resposta ###

    [ 
    { 
	    id: 2, 
	    breed: 'Pinscher', 
	    name: 'Mantorras' 
    }, 
    { 
	    id: 3, 
	    breed: 'Chihuahua', 
	    name: 'Guga' 
    }, 
    ]

----------

#### /api/postAnimal ####
Insere um animal identificando o utilizador criador, através do seu id.

### Pedido ###

#### **Headers** ####
- x-access-token

#### **Body** ####
- type
- breed
- age
- gender
- photo
- name
- userId

### Resposta ###
    inserted

----------

## Puts  ##

### Tabela posts ###

----------
#### /api/updatePost ####
Permite a alteração da descrição de uma determinada publicação.

### Pedido ###

#### **Headers** ####
- x-access-token

#### **Body** ####
- userId
- description

### Resposta ###
  	updated

----------

### Tabela animals ###

----------
#### /api/updateAnimal ####
Permite a alteração do nome de um determinado animal.

### Pedido ###

#### **Headers** ####
- x-access-token

#### **Body** ####
- animalId
- nome

### Resposta ###
  	updated
----------

### Tabela favorites ###
----------

*Nota: Nesta tabela não foi implementada a possibilidade de alteração de dados, pois não era justificativo, já que os favoritos apenas se devem inserir e remover.*

## Deletes  ##

### Tabela posts ###

----------
#### /api/deletePost ####
Permite remover uma determinada publicação de um determinado utilizador.

### Pedido ###

#### **Headers** ####
 - x-access-token
 
#### **Body** ####
- userId
- postId

### Resposta ###
  	Deleted

----------

### Tabela animals ###

----------
#### /api/deleteAnimal ####
Permite remover um determinado animal  criado por um  determinado utilizador.

### Pedido ###

#### **Headers** ####
- x-access-token

#### **Body** ####
- userId
- animalId

### Resposta ###
  	Deleted

----------

### Tabela users ###

----------
#### /api/deleteUser ####
Permite remover uma conta de utilizador.

### Pedido ###

#### **Headers** ####
- x-access-token

#### **Body** ####
- userId

### Resposta ###
  	Deleted

----------

# *Middlewares* #

Para maior segurança do cliente foi implementado um *middleware* com uma função de verificar um Json Web Token, correpondente a cada utilizador com sessão iniciada, sempre que é requisitado um recurso ao servidor. 
Durante o uso desta API, em todos os *URLs* que têm /api/, terá de ser incluído, no *header* dos *requests*, o token retornado no pedido /getExistingUsers.

> função usada

    app.use('/api', function (req, res, next) {
    	verifyJWT(req, res, next);
    });


 Para controlo de acesso na App foi implementado outro *middleware* para a contagem de pedidos efetuados ao servidor

    app.use(function (req, res, next) {
   	 if (countUrlAccess[req.url]) {
   	 	countUrlAccess[req.url] += 1;
  	  } else {   
   	 	countUrlAccess[req.url] = 1;
   	 }
    	console.log(countUrlAccess.sort());
   	next();
    });



***Desenvolvido por:***
Érica Ferreira
Gonçalo Alexandre
Tiago Fialho 