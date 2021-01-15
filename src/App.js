import React, {useEffect, useState} from 'react';
import axios from 'axios'
import loading from './image/loading.gif'; 
import  './css/style.css'; 
import {Edit, Delete} from '@material-ui/icons'

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const url = 'https://gorest.co.in/public-api/users'

function App() {

  const loadingVisible = () => { 
    document.getElementById("loading").style.display='block';
  }

  const loadingInvisible = () => { 
    document.getElementById("loading").style.display='none';
  }

  const [data, setData]=useState([])
  const [dataSelect, setDataSelect]=useState({
    name:'',
    email:'',
    gender:'',
    status:''
  })

  const code=`\nResumen de códigos de respuesta Http
    200: OK. Todo funcionó como se esperaba.
    201: Se creó correctamente un recurso en respuesta a una solicitud POST. El encabezado Ubicación contiene la URL que apunta al recurso recién creado.
    204: La solicitud se manejó con éxito y la respuesta no contiene contenido del cuerpo (como una solicitud DELETE).
    304: el recurso no se modificó. Puede utilizar la versión en caché.
    400 Petición Incorrecta. Esto podría deberse a varias acciones del usuario, como proporcionar datos JSON no válidos en el cuerpo de la solicitud, proporcionar parámetros de acción no válidos, etc.
    401: Error de autenticación.
    403: el usuario autenticado no puede acceder al punto final de API especificado.
    404: el recurso solicitado no existe.
    405: Método no permitido. Compruebe el encabezado Permitir para conocer los métodos HTTP permitidos.
    415: Tipo de medio no admitido. El tipo de contenido solicitado o el número de versión no es válido.
    422: La validación de datos falló (en respuesta a una solicitud POST, por ejemplo). Consulte el cuerpo de la respuesta para ver los mensajes de error detallados.
    429: Demasiadas solicitudes. La solicitud fue rechazada debido a la limitación de la tasa.
    Error interno de servidor 500. Esto podría deberse a errores internos del programa.`

  const peticionGet=async()=>{
    loadingVisible()
    await axios.get(url)
    .then(response=>{
      console.log(response.data.data)
      setData(response.data.data)
      loadingInvisible()
    })
  }

  const peticionPost=async()=>{
    loadingVisible()
    await axios.post('https://gorest.co.in/public-api/users',
    dataSelect,
    {
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization': 'Bearer 5ed001b7075fc0f426cc04668a43067096e55845c6f25cd7591d543fe17ba76d'
      }
    })
    .then(response=>{
      setDataSelect(data.concat(response.data))
      loadingInvisible()
      alert('Codigo '+response.data.code+code)
    })
  }

  const peticionPut=async()=>{
    loadingVisible()
    await axios.put(url+'/'+dataSelect.id,dataSelect,
      {
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
          'Authorization': 'Bearer 5ed001b7075fc0f426cc04668a43067096e55845c6f25cd7591d543fe17ba76d'
        }
      })
    .then(response=>{
      setDataSelect(data.concat(response.data))
      loadingInvisible()
      alert('Codigo '+response.data.code+code)
      peticionGet()
    })
  }

  const peticionDelete=async()=>{
    loadingVisible()
    await axios.delete(url+'/'+dataSelect.id,
    {
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization': 'Bearer 5ed001b7075fc0f426cc04668a43067096e55845c6f25cd7591d543fe17ba76d'
      }
    })
    .then(response=>{
      setDataSelect(data.concat(response.data))
      loadingInvisible()
      alert('Codigo '+response.data.code+code)
      peticionGet()
    }
    )
    
  }

  const peticionPath=async()=>{
    await axios.path(url+'/'+dataSelect.id,dataSelect,
      {
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
          'Authorization': 'Bearer 5ed001b7075fc0f426cc04668a43067096e55845c6f25cd7591d543fe17ba76d'
        }
      })
    .then(response=>{
      setDataSelect(data.concat(response.data))
      alert('Codigo '+response.data.code+code)
      peticionGet()
    })
  }

  const selectData=(data)=>{
    console.log(data)
    setDataSelect(data)
  }

  const deleteData=(data)=>{
    console.log(data)
    setDataSelect(data)
  }

  const handleChange=e=>{
    const {name,value}=e.target;
    setDataSelect(prevState=>({
      ...prevState,
      [name]:value
    }))
  }

  useEffect(async()=>{
    await peticionGet()
  },[])
  
  const cancelCourse = () => { 
    document.getElementById("create-course-form").reset();
  }

  
  

  return (
    <div className="App container">
      <img id='loading' src={loading}></img>
      <table class="table table-striped">
        <thead>
        <tr>
        <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"><a class="btn btn-primary btn-sm " href="#" role="button" data-toggle="modal" data-target="#exampleModal"> Añadir</a></th>
          </tr>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Genero</th>
            <th scope="col">Estado</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
      <tbody>
            {
                data.map(item => (
                    <tr>
                        <th scope="row">{item.id}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.gender}</td>
                        <td>{item.status}</td>
                        <td><a  data-toggle="modal" data-target="#modalUpdate" onClick={()=>selectData(item)} href='#'><Edit/></a> 
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <a class='btn btn-danger' data-toggle="modal" data-target="#modalDelete" onClick={()=>selectData(item)} href='#'><Delete/></a> 
                        </td>
                    </tr>
                ))
            }
      </tbody>
    </table>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Añadir</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form id="create-course-form">
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input type="text" class="form-control" id="name" name='name' placeholder="Nombre*" onChange={handleChange}/>
        </div>
        <div class="form-group">
          <label for="email">Correo</label>
          <input type="text" class="form-control" id="email" name="email" placeholder="Correo*" onChange={handleChange}/>
        </div>
        <div class="form-group">
          <label for="gender">Genero</label>
          <select class="form-control" id="gender" name="gender" onChange={handleChange}>
            <option></option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div class="form-group">
          <label for="status">Estado</label>
          <select class="form-control" id="status" name="status" onChange={handleChange}>
            <option></option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-warning" onClick={()=>cancelCourse()}>Limpiar</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={()=>peticionPost()}>Guardar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modalUpdate" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Actualizar</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form id="create-course-form2">
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input type="text" class="form-control" id="name" name='name' placeholder="Nombre*" onChange={handleChange} value={dataSelect.name} />
        </div>
        <div class="form-group">
          <label for="email">Correo</label>
          <input type="text" class="form-control" id="email" name="email" placeholder="Correo*" onChange={handleChange} value={dataSelect.email}/>
        </div>
        <div class="form-group">
          <label for="gender">Genero</label>
          <input type="text" class="form-control" id="gender" name="gender" placeholder="Genero*" onChange={handleChange} value={dataSelect.gender}/>
        </div>
        <div class="form-group">
          <label for="status">Estado</label>
          <input type="text" class="form-control" id="status" name="status" placeholder="Estado*" onChange={handleChange} value={dataSelect.status}/>
        </div>
      </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal"onClick={()=>peticionPut()}>Actualizar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modalDelete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Eliminar</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form id="create-course-form3">
        <label>¿Eliminar registro?</label>
        <div class="form-group">
          <input type="hidden" class="form-control" id="name" name='name' placeholder="Nombre*" disabled value={dataSelect.name} />
        </div>
        <div class="form-group">
          <input type="text" class="form-control" id="email" name="email" placeholder="Correo*" disabled value={dataSelect.email}/>
        </div>
        <div class="form-group">
          <input type="hidden" class="form-control" id="gender" name="gender" placeholder="Genero*" disabled value={dataSelect.gender}/>
        </div>
        <div class="form-group">
          <input type="hidden" class="form-control" id="status" name="status" placeholder="Estado*" disabled value={dataSelect.status}/>
        </div>
      </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-danger" onClick={()=>peticionDelete()}>Eliminar</button>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}

export default App;
