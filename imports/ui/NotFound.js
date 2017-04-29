import React from 'react';
import {Link} from 'react-router';


export default NotFound =()=>{
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Pagina no encontrada</h1>
          <p> No se puedo encontrar la pagina</p>
          <Link to="/" className="button button--link">Back Home</Link>
        </div>
      </div>

    );
}
