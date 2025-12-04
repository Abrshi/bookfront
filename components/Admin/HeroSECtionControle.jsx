import React, { useEffect, useState } from "react";
import api from "@/axios/axios";

function HeroSECtionControle() {
  const [books, setBooks] = useState([]);
  const [heros, setHeros] = useState([]);

  useEffect(() => {
    fetchBooks();
    fetchHeroes();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await api.get("/admin/getAllBook");
      setBooks(res.data);
    } catch (err) {
      console.error("Fetch books error:", err);
    }
  };

  const fetchHeroes = async () => {
    try {
      const res = await api.get("/admin/getAllHeroes");
      setHeros(res.data);
    } catch (err) {
      console.error("Fetch heroes error:", err);
    }
  };

 const addHero = async (id) => {
  try {
    await api.post(`/admin/addHero`, { id }); // send id in req.body
    fetchHeroes();
  } catch (err) {
    console.error("Add hero error:", err);
  }
};


  const deleteHero = async (id) => {
    try {
      await api.delete(`/admin/deleteHero/${id}`);
      fetchHeroes();
    } catch (err) {
      console.error("Delete hero error:", err);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-10">

      {/* Add Hero Table */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Add Hero</h2>

        <div className="overflow-x-auto glass bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-md border border-white/10">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/10">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Author</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr
                  key={book.id}
                  className="hover:bg-white/5 transition"
                >
                  <td className="p-3 border">{book.id}</td>
                  <td className="p-3 border">{book.title}</td>
                  <td className="p-3 border">{book.author}</td>
                  <td className="p-3 border">{book.categoryId}</td>
                  <td className="p-3 border">
                    <button
                      onClick={() => addHero(book.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-1 rounded-md transition"
                    >
                      Add
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Remove Hero Table */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Remove Hero</h2>

        <div className="overflow-x-auto glass bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-md border border-white/10">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/10">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {heros.map((hero) => (
                <tr
                  key={hero.id}
                  className="hover:bg-white/5 transition"
                >
                  <td className="p-3 border">{hero.id}</td>
                  <td className="p-3 border">{hero.title}</td>
                  <td className="p-3 border">
                    <button
                      onClick={() => deleteHero(hero.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {heros.length === 0 && (
            <p className="text-gray-300 text-center py-3">
              No heroes added yet.
            </p>
          )}
        </div>
      </div>

    </div>
  );
}

export default HeroSECtionControle;
