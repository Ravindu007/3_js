import React, { useEffect } from 'react'
import "./Home.scss"

import {use3D} from "../hooks/use3D"

const Home = () => {
  const {threeD} = use3D()

  useEffect(() => {
    const canvas = document.getElementById("bg")
    threeD(canvas);
  }, []);


  return (
    <div className='home'>
     <div className="container">
      <div className="row">
        <div className="col-6">
          <canvas id='bg' style={{height:"70vh"}}></canvas>
        </div>
        <div className="col-6">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos natus dolorum similique, officia voluptatem ipsum sunt voluptatum soluta accusamus error, pariatur aperiam enim recusandae, optio velit magni quod aut ex.</p>
        </div>
      </div>
     </div>
    </div>
  )
}

export default Home