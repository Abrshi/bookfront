import Header from '@/components/Home/header/Header'
import Book from '@/components/Home/books/books'
import React from 'react'
import Hero from '@/components/Home/books/Hero'

function page() {
  return (
    <div className='min-h-screen bg-black'>
      <Header />
      <Hero />
       <Book />
      </div>
  )
}

export default page