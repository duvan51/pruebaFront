import React, { useState, useEffect, useMemo } from "react";
import { GetAllUsers } from "../services/4sides.jsx";

import { RiDeleteBin6Fill } from "react-icons/ri";

import { BsArrowLeft } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";


import { motion, AnimatePresence } from "framer-motion";
//uso de la camara
import CameraComponent from "../components/capturePhoto.jsx";

const DataTable = (props) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const [dataQt, setQt] = useState(10)
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await GetAllUsers();
        const usuarios = Array.isArray(response.data.usuarios) ? response.data.usuarios : [];
        //setData(usuarios);


        //cargar imagenes de local
        const usersImage = JSON.parse(localStorage.getItem("users")) || [];
        
        const userAndImages = usuarios.map(user=>{
          const filterUserEmail = usersImage.find(local => local.email === user.usuarioTelefono);
          return {...user, photo: filterUserEmail? filterUserEmail.photo: null }
        })
        setData(userAndImages)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);



//guardar y relacionar las fotos con la data
const handleCapture = (email, image) => {
  // Obtener imágenes existentes en localStorage
  const usersImage = JSON.parse(localStorage.getItem("users")) || [];

  // Actualizar la imagen solo del usuario correspondiente
  const upDateUser = usersImage.filter(user => user.email !== email);
  upDateUser.push({ email, photo: image });

  // Guardar en localStorage
  localStorage.setItem("users", JSON.stringify(upDateUser));

  // Actualizar el estado local
  setData(prevData => prevData.map(user => 
    user.usuarioTelefono === email ? { ...user, photo: image } : user
  ));
};

//quitar ascentos tildes y demas
const normalizeText = (text) => {
  return text
    .normalize("NFD") //aqui descompongo los ascentos
    .replace(/[\u0300-\u036f]/g, "") // aqui elimino tildes
    .toUpperCase(); // convierto todo a mayuscula
};
  const filteredData = data.filter((x)=>{
    const filterBy = normalizeText(`${x?.usuarioNombre || ""} ${x?.usuarioApellidoPaterno || ""} ${x?.usuarioApellidoMaterno}`.toUpperCase())
    const datos = filterBy.includes(search.toUpperCase())
    return datos
  })


  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const inFinal = currentPage * dataQt;
  const inInicial = inFinal - dataQt;
  const nData = filteredData.slice(inInicial, inFinal);

  const totalPages = Math.ceil(filteredData.length / dataQt);



  //deleted usuarios
  const removeItem = (email)=>{
    const upDateUserDeleted = data.filter(user=> user.usuarioTelefono !== email);
    //actualizando los usuarios en memoria
    setData(upDateUserDeleted)
     // actualizando el localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    }



  return (
    <>
    <div className={`p-3 bg-${props.mode} w-100`}>
      <div className="mb-4"> 
        <input
          className={`
              form-control 
              ${props.mode === "dark" ? "dark-mode text-white" : "bg-light text-black"} 
          `}
          style=
            {props.mode === "dark" ? { backgroundColor: "#5F6368", border: "none", outline: "none", boxShadow: "none"} : {}}
          id="exampleDataList"
          placeholder="Escribe un nombre..."
          onChange={handleChange}
          value={search}
        />
      </div>
      {/**aqui va el formato tablet - escritorio   table-dark*/}
      <div className="w-100">
        <div className="table-responsive">
        <table 
          className={`
            ${props.mode === "dark" ? "table-dark table  table-bordered table-responsive w-100 d-none d-md-table" : "table  table-bordered table-responsive w-100 d-none d-md-table"} 
        `}
          style={props.mode === "dark" ? { backgroundColor: "#28292A", color: "#fff" } : {}}
        >
        <thead className="w-100">
          <tr className="w-full">
            <th
            style=
            {props.mode === "dark" ? { backgroundColor: "#28292A"} : {}}
            >#</th>
            <th
            style=
            {props.mode === "dark" ? { backgroundColor: "#28292A"} : {}}
            >Nombre</th>
            <th
            style=
            {props.mode === "dark" ? { backgroundColor: "#28292A"} : {}}
            >Teléfono</th>
            <th
            style=
            {props.mode === "dark" ? { backgroundColor: "#28292A"} : {}}
            >Email</th>
            <th
            style=
            {props.mode === "dark" ? { backgroundColor: "#28292A"} : {}}
            >Foto</th>
            <th
            style=
            {props.mode === "dark" ? { backgroundColor: "#28292A"} : {}}
            >Foto</th>
          </tr>
        </thead>
        <tbody className="w-100 rounded-1">
        <AnimatePresence>
          {nData.map((user, index) => (
            <motion.tr  key={user.usuarioTelefono}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            layout
            className="rounded-1"
            >
              <td>{inInicial + index + 1}</td>
              <td>{`${user.usuarioNombre} ${user.usuarioApellidoPaterno} ${user.usuarioApellidoMaterno}`}</td>
              <td>{user.usuarioEmail}</td>
              <td>{user.usuarioTelefono}</td>
              <td>
                <div style={{width:"50px"}}>
                <img 
                    src={user.photo}
                    className="w-100 h-100 rounded"
                />
            </div>
              </td>
              <td className="d-flex w-100 justify-content-evenly">
                <CameraComponent mode={props.mode} onCapture={(image) => handleCapture(user.usuarioTelefono, image)} />  
                <button 
                  type="button" 
                  onClick={()=> removeItem(user.usuarioTelefono)}
                  className={`
                    ${props.mode === "dark" ? "btn btn-outline-danger" : "btn btn-danger"} 
                `}
                >
                  <RiDeleteBin6Fill />
                </button>
              </td>
            </motion.tr>
          ))}
        </AnimatePresence>
        </tbody>
        </table>
        </div>
       
      </div>

      {/**aqui va el formato mobile */}
    <div 
      className={`d-flex flex-column gap-2 bg-${props.mode} text-bg-${props.mode} d-md-none`}
    >
    <AnimatePresence>
    {nData.map((user, index) => (
      <motion.div 
        key={user.usuarioTelefono} 
        className={`
          ${props.mode === "dark" ? " d-flex flex-column p-2 rounded-1" : "border d-flex flex-column p-2 rounded-1"} 
      `}
      style=
            {props.mode === "dark" ? { backgroundColor: "#303030", border: "#212529"} : {}}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
        layout
      >
        <div className="d-flex justify-content-between pb-2 "
          style=
          {props.mode === "dark" ? { 
              backgroundColor: "#303030", 
              borderBottom: "1px solid #212529",  
              } : {
                borderBottom: "1px solid #DEE2E6",  
              }}
    
          >
          <div className="text-secondary d-flex gap-2 align-items-center">
            <div>{inInicial + index + 1}</div>
            <div style={{width:"50px"}}>
              <img 
                    src={user.photo}
                    className="w-100 h-100 rounded"
              />
            </div>
          </div>
          <div className="d-flex gap-2">
                
                <CameraComponent mode={props.mode} onCapture={(image) => handleCapture(user.usuarioTelefono, image)} />

                <button 
                  type="button" 
                  onClick={()=> removeItem(user.usuarioTelefono)}
                  className={`
                    ${props.mode === "dark" ? "btn btn-outline-danger" : "btn btn-danger"} 
                `}
                >
                  <RiDeleteBin6Fill />
                </button>
          </div>
        </div>
        <div className="d-flex justify-content-between pt-2">
          <div className=""><strong>Nombre</strong></div>
          <div>{`${user.usuarioNombre} ${user.usuarioApellidoPaterno} ${user.usuarioApellidoMaterno}`}</div>
        </div>
        <div className="d-flex justify-content-between">
          <div className=""><strong>Telefono</strong></div>
          <div>{user.usuarioEmail}</div>
        </div>
        <div className="d-flex justify-content-between">
          <div className=""><strong>Email</strong></div>
          <div>{user.usuarioTelefono}</div>
        </div>
      </motion.div>
    ))}
    </AnimatePresence>
    </div>
      

      {/**aqui va la paginacion*/}
      <div className="d-flex justify-content-around mt-3">
        <button 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`
            ${props.mode === "dark" ? "border bg-transparent border-0 text-white" : "border bg-transparent border-0"} 
        `}
        >
          <BsArrowLeft />
        </button>

        <button 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`
            ${props.mode === "dark" ? "border bg-transparent border-0 text-white" : "border bg-transparent border-0"} 
        `}
        >
          <BsArrowRight />
        </button>
      </div>

    </div>

    
    </>
    


  );
};

export default DataTable;
