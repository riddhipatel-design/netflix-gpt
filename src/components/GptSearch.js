import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'

const GptSearch = () => {
  return (
      <div
      className="
        min-h-screen w-full
        bg-gradient-to-b
        from-black via-zinc-900 to-black
        text-white
      "
    >
      <GptSearchBar />
      <GptMovieSuggestion />
    </div>
  )
}

export default GptSearch