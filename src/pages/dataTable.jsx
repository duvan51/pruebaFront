import React, { useState, useEffect, useMemo } from "react";
import { GetAllUsers } from "../services/4sides.jsx";

import { RiDeleteBin6Fill } from "react-icons/ri";

import { BsArrowLeft } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";

//uso de la camara
import CameraComponent from "../components/capturePhoto.jsx";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const [dataQt, setQt] = useState(10)
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await GetAllUsers();
        const usuarios = Array.isArray(response.data.usuarios) ? response.data.usuarios : [];
        setData(usuarios);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const filteredData = data.filter((x)=>{
    const filterBy = `${x?.usuarioNombre || ""} ${x?.usuarioApellidoPaterno || ""} ${x?.usuarioApellidoMaterno}`.toUpperCase();
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




  return (
    <>
    <div className="bg-white p-3">
      <div className="mb-4"> 
        <label htmlFor="exampleDataList" className="form-label">Buscar Usuario</label>
        <input
          className="form-control"
          id="exampleDataList"
          placeholder="Escribe un nombre..."
          onChange={handleChange}
          value={search}
        />
      </div>
      {/**aqui va el formato tablet - escritorio*/}
      <table className="table d-none">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{`${user.usuarioNombre} ${user.usuarioApellidoPaterno} ${user.usuarioApellidoMaterno}`}</td>
              <td>{user.usuarioEmail}</td>
              <td>{user.usuarioTelefono}</td>
              <td>
                <button type="button" className="btn btn-danger">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                    </svg>
                </button>
                
                <button type="button" className="btn btn-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-fill" viewBox="0 0 16 16">
                      <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                      <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0"/>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/**aqui va el formato mobile */}
    <div className="bg-white  d-flex flex-column gap-2" >
    {nData.map((user, index) => (
      <div key={index} className="border d-flex flex-column p-2 rounded-1">
        <div className="d-flex justify-content-between pb-2 border-bottom">
          <div className="text-secondary">
              {inInicial + index + 1}
          </div>
          <div className="d-flex gap-2">
                
                <CameraComponent />
                
                <button type="button" className="btn btn-danger">
                  <RiDeleteBin6Fill />
                </button>
          </div>
        </div>
        <div className="d-flex justify-content-between">
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
      </div>
    ))}
    </div>
      <div className="d-flex justify-content-around mt-3">
        <button 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(currentPage - 1)}
          className="border bg-transparent border-0"
        >
          <BsArrowLeft />
        </button>

        <button 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage(currentPage + 1)}
          className="border bg-transparent border-0"
        >
          <BsArrowRight />
        </button>
      </div>

    </div>

    
    </>
    


  );
};

export default DataTable;
