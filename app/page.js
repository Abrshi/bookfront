import Header from '@/components/Home/header/Header'
import Book from '@/components/Home/books/books'
import React from 'react'

function page() {
  return (
    <div className='min-h-screen bg-black'>
      <Header />
       <Book />
      </div>
  )
}

export default page