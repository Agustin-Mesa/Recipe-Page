var firebaseConfig = {
    apiKey: "AIzaSyBp3LqW_NqqnUc2YJlSMrvEt76em_xAWmM",
    authDomain: "proyecto2-cocina.firebaseapp.com",
    projectId: "proyecto2-cocina",
    databaseURL: "https://proyecto2-cocina-default-rtdb.firebaseio.com/",
    storageBucket: "proyecto2-cocina.appspot.com",
    messagingSenderId: "1053289843542",
    appId: "1:1053289843542:web:a409131e7525f27e0c24f7",
    measurementId: "G-6108FSMF17"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let database = firebase.database(),
    userConnect = null,
    connectKey = "";


//********************************
//Autenticación con Google

const ingresoGoogle = () => {
    if(!firebase.auth().currentUser) {
        const provider = new firebase.auth.GoogleAuthProvider();
        
        provider.addScope('https://www.googleapis.com/auth/userinfo.email');
        
        firebase.auth().signInWithPopup(provider).then(result => {
            // Esto le da un token de acceso de Google. Puede usarlo para acceder a la API de Google.
            var token = result.credential.accessToken;
            // La información del usuario que inició sesión.
            var user = result.user;
            // ...
            window.location.href = "../shop.html";
        }).catch(error => {
            // Manejar errores aquí.
            catchIngresos(1);
        });
    } else {
        catchIngresos(2);
    }
}

//Autenticación con Facebook
const ingresoFacebook = () => {
    if(!firebase.auth().currentUser) {
        const provider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(provider).then(result => {
            // Esto le da un token de acceso de Facebook. Puede usarlo para acceder a la API de Facebook.
            var token = result.credential.accessToken;
            // La información del usuario que inició sesión.
            var user = result.user;
            // ...
            window.location.href = "../shop.html";
            
        }).catch(error => {
            // Manejar errores aquí.
            catchIngresos(1);
        });
    } else {
        catchIngresos(2);
    }
}


// Catch de los ingresos
const catchIngresos = (alerta) => {
    let alertaError = document.getElementById("alertaError"),
        alertaP = document.getElementById("alertaP");
    if (alerta == 1) {
        alertaP.innerHTML = "Sorry, there was a problem trying to log in, please try again later.";
    } else if (alerta == 2) {
        alertaP.innerHTML = "You already have an active account. Log out to start another session.";
    }
    alertaError.classList.add("show");
    setTimeout(() => {
        alertaError.classList.remove("show");
    }, 8000);
}

//Obtener información del Usuario
let userImage = document.getElementById('foto-user'),
    userSubMenu = document.querySelector('.submenu-user'),
    userSubMenuLi = document.getElementById('submenu-user-option'),
    btnLogin = document.getElementById('btnLogin');

const observadorFire = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // Acceso a la base de datos
            userConnect = database.ref("/users");
            agregarUserBD(user.uid, user.displayName, user.email, user.photoURL);

            //No permitir loguearse teniendo una cuenta activa.
            

            //Actualizamos foto de perfil del usuario
            let photoURL = user.photoURL;
            userImage.style.backgroundImage = `url("${photoURL}")`;
            //Le damos permiso para cerrar sesión
            userSubMenuLi.innerHTML = `Cerrar sesión`;
            userSubMenuLi.onclick = () => {
                //eliminarUserBD();
                firebase.auth().signOut().then(function () {
                    // Cerrando sesión...
                    userSubMenuLi.innerHTML = ``;
                    window.location.reload();
                }).catch(function (error) {
                    // An error happened.
                });
            };
            if (userSubMenu.classList == "") {
                userSubMenu.classList.add('submenu-user');
            }

        } else {
            // Si no hay ningun usuario activo, se remueve el cerrar sesión y tiene permiso para ir a loguearse.
            userSubMenu.classList.remove('submenu-user');
            userImage.setAttribute('href', '../login.html');
            // A su vez no puede realizar compras por dicho motivo.
            let alertaDiv = document.querySelector('.alertas'),
                btnCompras = document.querySelectorAll('.recetas div .btn-compras'),
                alertaParrafo = document.createElement('p'),
                alertaParrafoContent = document.createTextNode('Sign in to buy recipes.');
            alertaParrafo.appendChild(alertaParrafoContent);
            alertaDiv.appendChild(alertaParrafo);
            for (let i = 0; i < btnCompras.length; i++) {
                btnCompras[i].addEventListener('click', (e) => {
                    e.preventDefault();
                    alertaDiv.classList.add('show');
                    setTimeout(() => {
                        alertaDiv.classList.remove("show");
                    }, 5000);
                });
            }
        }
    });
}

const agregarUserBD = (uid, name, email, photoURL) => {
    userConnect.child(uid).set({
        uid: uid,
        email: email,
        name: name,
        profile_picture: photoURL
    });
    connectKey = uid;
}

const eliminarUserBD = () => {
    userConnect.child(connectKey).remove();
}

window.onload = () => {
    observadorFire();
}