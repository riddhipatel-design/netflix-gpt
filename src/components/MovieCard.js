import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({ posterPath, title }) => {
    if (!posterPath) return null;
 
  return (
    <div className='w-36 md:w-48'>
        <img
        className="rounded"
        alt={title}
        src={IMG_CDN_URL + posterPath}
      />
    </div>
  )
}

export default MovieCard