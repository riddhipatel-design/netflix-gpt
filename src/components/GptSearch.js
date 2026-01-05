import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'

const GptSearch = () => {
  return (
      <div
      className="
        min-h-screen w-full
        bg-gradient-to-b
       from-black/90
       via-zinc-800/90
       to-black/90
        text-white
      "
    >
      <GptSearchBar />
      <GptMovieSuggestion />
    </div>
  )
}

export default GptSearch