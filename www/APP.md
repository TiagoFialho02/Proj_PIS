# Documentação da APP #

----------

## Get  ##


----------

### Tabela users ###

----------

#### getExistingUsers ####
Efetua o login na aplicação,fornecendo o token necessário à autenticação do utilizador, assim como as preferências setadas no utilizador anteriormente.

### Pedido ###

#### **Body** ####
- email
- password

### Resposta ###
    {
    "auth": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY0NDY5MTQxMX0.6qDV6KqQLaju_1hhdly7V8JsDI_4SOPbDqCUazgbHZE",
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
----------

### Tabela animals ###

----------
#### getAnimalsInfoForItem ####
Permite consultar todos os animais criados, podendo ser filtrados todos os parâmetros presentes no body.

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

### Tabela posts ###

----------

#### verifyFavoritePost ####
Verifica se existe um determinado favorito dum determinado utilizador.

### Pedido ###
#### **Headers** ####
- x-access-token
#### **Body** ####
- userId
- postId

### Resposta ###
    Found

----------

### Tabela favorites ###

----------
#### getFavoritePost ####
Mostra todos os favoritos dum determinado utilizador.

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

### API ###

----------
#### getDogBreeds/ getCatBreeds/ getBothBreeds ####
Mostra todas as raças dos animais presentes na API usada.

### Pedido ###
#### **Headers** ####
- x-access-token
#### **Body** ####
- type
- breed

### Resposta ###
    "response": [
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
    ]
 

## Post  ##
----------

### Tabela users ###

----------
#### postUser ####
Efetua o login na aplicação,fornecendo o token necessário à autenticação do utilizador, assim como as preferências setadas no utilizador anteriormente.

### Pedido ###
#### **Headers** ####
- x-access-token

#### **Body** ####
- is_preference_set
- type
- breed
- age
- gender
- userId

### Resposta ###
    Sucess

----------

### Tabela animals ###

----------
#### postAnimal ####
Insere um animal com todos os parametros e identifica o utilizador criador.

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
    Added

----------

### Tabela post ###

----------
#### postPost ####
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

### Tabela favorites ###

----------
#### postFavoritePost ####
Insere um post existente aos favoritos de um determinado utilizador.

### Pedido ###
#### **Headers** ####
- x-access-token
#### **Body** ####
- userId
- postId

### Resposta ###
    Added

## Put  ##

----------

### Tabela users ###

----------

#### updateUser ####
Permite a alteração da password de um determinado utilizador.

### Pedido ###
#### **Headers** ####
- x-access-token
#### **Body** ####
- userId
- password

### Resposta ###
    Updated
#### updateUserPreferences ####
Permite alterar todas as preferências de um determinado utilizador anteriormente definidas.

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
    Sucess
   
----------

### Tabela posts ###

----------
#### updatePost ####
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
#### updateAnimal ####
Permite a alteração do nome de um determinado animal.

### Pedido ###
#### **Headers** ####
- x-access-token
#### **Body** ####
- animalId
- nome

### Resposta ###
  	Updated
----------

### Tabela favorites ###

----------
*Nota: Nesta tabela não foi implementada a possibilidade de alteração de dados pois não era justificativo, já que os favoritos apenas se devem inserir e remover.*

## Delete  ##
----------

### Tabela users ###

----------
#### deleteUser ####
Permite remover uma conta de utilizador.

### Pedido ###
#### **Headers** ####
- x-access-token
#### **Body** ####
- userId

### Resposta ###
  	Deleted

----------

### Tabela posts ###

----------
#### deletePost ####
Permite remover uma determinada publicação de um determinado utilizador.

### Pedido ###
#### **Headers** ####
-x-access-token
#### **Body** ####
- userId
- postId

### Resposta ###
  	Deleted

----------

### Tabela animals ###

----------
### deleteAnimal ###
Permite remover um determinado animal  criado por um  determinado utilizador.

###### Pedido ######
#### **Headers** ####
- x-access-token
#### **Body** ####
- userId
- animalId

### Resposta ###
  	Deleted

----------

### Tabela favorites ###

----------

#### deleteFavoritePost ####
Efetua o login na aplicação,fornecendo o token necessário à autenticação do utilizador, assim como as preferências setadas no utilizador anteriormente.

### Pedido ###
#### **Headers** ####
- x-access-token
#### **Body** ####
- userId
- postId

### Resposta ###
    Deleted

# MiddleWare #


Para maior segurança da App foi implementado um middleware com uma função de verificação de um Jason Web Token correspondente a cada utilizador logado sempre que é requisitado um recurso ao servidor. 

    app.use('/api', function (req, res, next) {
    verifyJWT(req, res, next);
    });

> função


    function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ 
        auth: false, message: 'No token provided.' 
    });    
    jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
        if (err) return res.status(500).json({ 
            auth: false, message: 'Failed to authenticate token.' 
        });
        
        // se tudo estiver ok, salva no request para uso posterior      
        req.email = decoded.email;      
        next();    
    });
    }


 Para controlo de acesso na App foi implementado um middleware para a contagem de pedidos efetuados ao servidor

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