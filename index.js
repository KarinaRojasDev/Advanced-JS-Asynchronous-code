//RESUELVE TUS EJERCICIOS AQUI

//https://dog.ceo/dog-api/documentation/

function getAllBreeds() {
  return fetch("https://dog.ceo/api/breeds/list/all")
    .then((res) => res.json())
    .then((data) => {
      let razas = Object.keys(data.message);
      return razas;
    })
    .catch((error) => {
      console.error("Error fetching data from fakestoreapi:", error);
    });
}
getAllBreeds().then((array) => console.log(array));

//2.- Declara una función **getRandomDog**
// que obtenga una imagen random de una raza.

function getRandomDog() {
  return fetch("https://dog.ceo/api/breeds/image/random")
    .then((res) => res.json())
    .then((data) => {
      let imgUrl = data.message;
      /* (document.body.innerHTML = `<img src="${data.message}" alt="Random dog">`); */

      return imgUrl;
    });
}

getRandomDog().then((imgUrl) => console.log(imgUrl));

//3.- Declara una función **getAllImagesByBreed** que obtenga todas las imágenes de la raza komondor.

//https://dog.ceo/api/breed/hound/images

function getAllImagesByBreed() {
  return fetch("https://dog.ceo/api/breed/komondor/images")
    .then((res) => res.json())
    .then((data) => {
      return data.message;
    })
    .catch((error) => {
      console.error("Error fetching data from fakestoreapi:", error);
    });
}

getAllImagesByBreed().then((imgUrl) => console.log(imgUrl));

//4.- Declara una funcion **getAllImagesByBreed2(breed)**
// que devuelva las imágenes de la raza pasada por el argumento

function getAllImagesByBreed2(breed) {
  return fetch(`https://dog.ceo/api/breed/${breed}/images`)
    .then((res) => res.json())
    .then((data) => {
      return data.message;
    })
    .catch((error) => {
      console.error("Error fetching data from fakestoreapi:", error);
    });
}

getAllImagesByBreed2("komondor").then((razas) => console.log(razas));
getAllImagesByBreed2("bulldog").then((razas) => console.log(razas));
getAllImagesByBreed2("hound").then((razas) => console.log(razas));

/* 5.- Declarara una función **getGitHubUserProfile(username)** 
que obtenga el perfil de usuario de github a partir de su nombre de usuario. 
(https://api.github.com/users/{username}). */

function getGitHubUserProfile(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error fetching data from fakestoreapi:", error);
    });
}

getGitHubUserProfile("KarinaRojasDev").then((userGit) => console.log(userGit));

/*  [ ] 6.- Declara una función **printGithubUserProfile(username)** 
que reciba como argumento el nombre de un usuario (username), 
retorne {img, name} y pinte la foto y el nombre en el DOM. */

function printGithubUserProfile(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then((data) => {
      let img = data.avatar_url;
      let name = data.name;

      return { img, name };
    })
    .catch((error) => {
      console.error("Error fetching data from fakestoreapi:", error);
    });
}

printGithubUserProfile("KarinaRojasDev").then((userGit) => {
  console.log(userGit);
  console.log(userGit.name);
  console.log(userGit.img);
});

/* function printGithubUserProfile(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then((data) => {
        document.body.innerHTML = 
            `<img src="${data.avatar_url}" alt="foto gitHub"> 
            <p>${data.name}</p>`;
        return {img:data.avatar_url,name:data.name};
    });
}

printGithubUserProfile("KarinaRojasDev"); */

/* [ ] 7. Crea una función **getAndPrintGitHubUserProfile(username)** 
que contenga una petición a la API para obtener información de ese usuario y 
devuelva un string que represente una tarjeta HTML como en el ejemplo, 
la estructura debe ser exactamente la misma:

```html
<section>
    <img src="url de imagen" alt="imagen de usuario">
    <h1>Nombre de usuario</h1>
    <p>Public repos: (número de repos)</p>
</section>
``` */

function getAndPrintGitHubUserProfile(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then((data) => {
      let infoPrint = `<section>
            <img src="${data.avatar_url}" alt="${data.name}">
            <h1>${data.name}</h1>
            <p>Public repos: ${data.public_repos}</p>
        </section>  `;

      return infoPrint;
    })
    .catch((error) => {
      console.error("Error fetching data from fakestoreapi:", error);
    });
}
getAndPrintGitHubUserProfile("KarinaRojasDev").then((infoGit) =>
  console.log(infoGit),
);

/* [ ] 8.- Manipulación del DOM: Crea un input de tipo texto, y un botón buscar. 
El usuario escribirá en el input el nombre de usuario de GitHub que quiera buscar. 
Después llamaremos a la función **getAndPrintGitHubUserProfile(username)** 
que se ejecute cuando se pulse el botón buscar.(Esto no se testea). */

/* document.body.innerHTML = `<label for="userGit">Introduzca usuario de GitHub</label>
     <input type="text" id="userGit">
     <button type="submit" class="btnBuscar">Buscar</button>`;

document.querySelector(".btnBuscar").addEventListener("click", () => {
  let userGitHub = document.getElementById("userGit").value;
  getAndPrintGitHubUserProfile(userGitHub).then(
    (html) => (document.body.innerHTML += html),
  );
}); */

/* 9.- Dada una lista de usuarios de github guardada en una array,
crea una funcion **fetchGithubUsers(userNames)** 
que utilice 'https://api.github.com/users/${name}' para obtener el nombre de cada usuario. \

Objetivo: Usar Promise.all()\
Recordatorio: Una llamada a fetch() devuelve un objeto promesa.\
Pregunta. ¿cuántas promesas tendremos?

Hasta que no se resuelvan todas las promesas desencadenadas por cada fetch(), no se cargarán los datos.

Pasos:

- Mapear el array y hacer un fetch() para cada usuario. Esto nos de vuelve un array lleno de promesas.
- Con Promise.all() harás que se tenga que resolver todo el proceso de peticiones a GitHub a la vez.
- Cuando Promise.all() haya terminado:
Consigue que se imprima por consola la url del repositorio de cada usuario.
Consigue que se imprima por consola el nombre de cada usuario. */

let listNamesUser = [
  "KarinaRojasDev",
  "torvalds",
  "gaearon",
  "sindresorhus",
  "midudev",
  "kamranahmedse",
  "addyosmani",
  "KarinaRojasDev",
];

async function fetchGithubUsers(userNames) {
  try {
    let promesas = userNames.map((user) =>
      fetch(`https://api.github.com/users/${user}`).then((rest) => rest.json()),
    );

    const users = await Promise.all(promesas);
    for (const user of users) {
      console.log(user.name);
      console.log(user.url);
    }
    return users;
  } catch (error) {
    console.error("Error fetching data from fakestoreapi:", error);
  }
}

fetchGithubUsers(listNamesUser);