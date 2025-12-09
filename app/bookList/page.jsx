import BooksList from '@/components/Home/books/booksList'
import Header from '@/components/Home/header/Header'
import React from 'react'

function page() {
  return (
    <div>
        <Header />
        <BooksList />
    </div>
  )
}

export default page