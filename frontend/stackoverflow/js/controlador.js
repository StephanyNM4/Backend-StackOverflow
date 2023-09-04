function votar(i) {
  console.log('Agregar votación ', i);
}

function modalUsuario() {
  $('#modal-usuarios').modal('show');
}

function modalPregunta() {
  $('#modal-pregunta').modal('show');
}



function verPreguntas() {
  document.getElementById('listaPreguntas').style.display = 'block';
  document.getElementById('detallePregunta').style.display = 'none';
}



//-----------------------------------------------------------------------------------
//Agregar funciones con backend:
var usuarios = [];
var preguntas = [];


const cargarUsuarios = async () => {
  let respuesta = await fetch("http://localhost:8088/usuarios/",
  {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
  }
  );
  usuarios = await respuesta.json();
  console.log(usuarios);
  renderizarUsuarios();
}
cargarUsuarios();

const renderizarUsuarios = () => {
  document.getElementById('modal-usuarios1').innerHTML = "";
  
  usuarios.resultado.forEach((usuario) => {
      document.getElementById('modal-usuarios1').innerHTML +=
      `
          <div class="col-3 p-0 m-0">
            <img src="${usuario.urlImage}" class="img-fluid select-image" onclick="seleccionarUsuario('${usuario._id}', '${usuario.urlImage}', '${usuario.id}')">
          </div>
      `
  });
}

const seleccionarUsuario = async (idMongo, foto, id) => {
  console.log('Usuario', id, foto, idMongo);
  localStorage.setItem("usuarioIdMongo", idMongo);
  localStorage.setItem("usuarioId", id);

  $('#modal-usuarios').modal('hide');
  document.getElementById('navbarSupportedContent').innerHTML = '';
  document.getElementById('navbarSupportedContent').innerHTML +=
  `
  <form class="form-inline my-2 my-lg-0 ml-auto">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-warning my-2 my-sm-0" type="button">Search</button>
        </form>
  <img src="${foto}" class="profile-pic" onclick="modalUsuario()">
  `

  preguntas = await cargarPreguntas();
  renderizarPreguntas(preguntas);
}

const cargarPreguntas = async () => {
  let respuesta = await fetch("http://localhost:8088/preguntas/",
  {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
  }
  );
  let preguntas1 = await respuesta.json();
  return preguntas1;
}

const renderizarPreguntas = (preguntas) => {
  
  document.getElementById('preguntas-renderizar').innerHTML = '';
  console.log(preguntas);
  

  preguntas.result.forEach((pregunta) => {
          console.log(pregunta);

  let htmlHashtags = '';
    pregunta.hashtags.forEach(hashtag=>{
      htmlHashtags += `<span class="badge badge-warning">${hashtag}</span>`;
    });


    document.getElementById('preguntas-renderizar').innerHTML +=
    `
    <div class="col-md-2 col-lg-1 text-center text-muted small">
          <div>${pregunta.votos}</div>
          <div>Votos</div>
        </div>
        <div class="col-md-2 col-lg-1 text-center text-muted small">
          <div>${pregunta.respuestas.length}</div>
          <div>Respuestas</div>
        </div>
        <div class="col-md-2 col-lg-1 text-center text-muted small">
          <div>${pregunta.vistas}</div>
          <div>Vistas</div>
        </div>
        <div class="col-md-6 col-lg-9">
          <div>
            <button class="btn btn-link" onclick="verDetallePregunta('${pregunta._id}','${pregunta.id}')">${pregunta.titulo}</button>
          </div>
          <div>
          ${htmlHashtags}
          <!--<span class="badge badge-warning">off-topic</span>
            <span class="badge badge-warning">honduras</span>
            <span class="badge badge-warning">joh</span>-->
          </div>
          <div class="float-right">
            <span class="small text-muted">${pregunta.fecha}</span>
            <span class="small user-text">${pregunta.detallePreguntasConUsuario[0].nombre}</span>
            <img src="${pregunta.detallePreguntasConUsuario[0].urlImage}" class="small-profile-pic">
          </div>
        </div>
    `
});
}

const crearPregunta = () => {

  const hashtag1 = document.getElementById('hashtag').value;
  const titulo1 = document.getElementById('titulo-pregunta').value;

  let json = {
    id: "8",
    titulo: titulo1,
    descripcion: "Lorem",
    fecha: "22/10/2030",
    votos: 0,
    vistas: 0,
    hashtags: [hashtag1],
    idUsuario: localStorage.getItem('usuarioId'),
    respuestas: []
  }

  console.log(json);

  crearPreguntaBackend(json);
}

const crearPreguntaBackend = async (json) => {
  const id = localStorage.getItem('usuarioId');
  let respuesta = await fetch(`http://localhost:8088/preguntas/${id}/usuario/crear-pregunta/`,
  {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(json)
  }
  );
  usuarioGuardado = await respuesta.json();
  console.log(usuarioGuardado);
}

const verDetallePregunta = async (idMongo, id) => {
  console.log(idMongo, id);
  document.getElementById('listaPreguntas').style.display = 'none';
  document.getElementById('detallePregunta').style.display = 'block';
  let preguntaDetalle = await cargarPregunta(idMongo);

  renderizarPregunta(preguntaDetalle);
  renderizarRespuestas(idMongo);
}

const renderizarPregunta = (pregunta) => {
  document.getElementById('detallePregunta1').innerHTML = "";
      let htmlHashtags = '';
      pregunta.hashtags.forEach(hashtag=>{
        htmlHashtags += `<span class="badge badge-warning">${hashtag}</span>`;
      });
      document.getElementById('detallePregunta1').innerHTML =
      `
      <div class="row" >
        <div class="col-12">
          <h2><svg class="arrow" onclick="verPreguntas()" width="36" height="36" viewBox="0 0 36 36"><path d="M16,0,16,32,0,16Z"/></svg>${pregunta.titulo}</h2>
        </div>
      </div>
      <div class="row question">
        <div class="col-1 text-center">
          <div><svg class="arrow" onclick="votar(1)" width="36" height="36" viewBox="0 0 36 36"><path d="M2 26h32L18 10 2 26z"></path></svg></div>
          <div class="h4 text-muted m-0">${pregunta.votos}</div>
          <div><svg class="arrow" onclick="votar(-1)" width="36" height="36" viewBox="0 0 36 36"><path d="M2 10h32L18 26 2 10z"></path></svg></div>
        </div>
        <div class="col-10">
          ${pregunta.descripcion}
        </div>
        <div class="col-8">
          <div>
            ${htmlHashtags}
          </div>
        </div>
        <div class="col-4">
          <div class="float-right text-center user-card">
            <div class="text-muted small">${pregunta.fecha}</div>
            <div><img src="${pregunta.detallePreguntasConUsuario[0].urlImage}" class="small-profile-pic mr-2">${pregunta.detallePreguntasConUsuario[0].nombre}</div>
          </div>
        </div>
      </div>
      <div>
        <h5>${pregunta.respuestas.length} Respuestas</h5>
      </div>
      `
}

const renderizarRespuestas = async (idMongo) => {
  let respuesta = await cargarRespuesta(idMongo);
  console.log(respuesta);

  // document.getElementById('respuestas-renderizar').innerHTML = '';
  respuesta.respuestas.forEach(res=>{
    // console.log(res.detallePreguntaConUsuario[0]);
    document.getElementById('respuestas-renderizar').innerHTML =
  `
    <div class="row answer">
        <div class="col-1 text-center">
          <div><svg class="arrow" onclick="votar(1)" width="36" height="36" viewBox="0 0 36 36"><path d="M2 26h32L18 10 2 26z"></path></svg></div>
          <div class="h4 text-muted m-0">${res.votos}</div>
          <div><svg class="arrow" onclick="votar(-1)" width="36" height="36" viewBox="0 0 36 36"><path d="M2 10h32L18 26 2 10z"></path></svg></div>
        </div>
        <div class="col-10">
        <h6>${res.descripcion}</h6>
        </div>
        <div class="col-12">
          <div class="float-right text-center user-card">
            <div class="text-muted small">${res.fecha}</div>
            <div><img src="${respuesta.detallePreguntaConUsuario[0].urlImage}" class="small-profile-pic mr-2">${respuesta.detallePreguntaConUsuario[0].nombre}</div>
          </div>
        </div>
      </div>
  `
  });
  
  
}


const cargarPregunta = async (indice) => {
  let respuesta = await fetch(`http://localhost:8088/preguntas/${indice}/pregunta`,
  {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
  }
  );
  let preguntaC = await respuesta.json();
  return preguntaC;
}

const cargarRespuesta = async (indice) => {
  let respuesta = await fetch(`http://localhost:8088/preguntas/${indice}/pregunta/respuestas`,
  {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
  }
  );
  let RespuestasC = await respuesta.json();
  return RespuestasC;
}







