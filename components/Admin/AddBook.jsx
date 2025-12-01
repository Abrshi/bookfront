"use client";

import { useEffect, useState } from "react";
import api from "@/axios/axios";

export default function AddBook() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    categoryId: "",
    publishedAt: "",
  });

  const [file, setFile] = useState(null);
  const [cover, setCover] = useState(null);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/admin/getallbookcatagories");
        setCategories(res.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setMessage("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) return setMessage("Title is required");
    if (!form.categoryId) return setMessage("Select a category");
    if (!file) return setMessage("Book file is required");

    try {
      const data = new FormData();

      data.append("title", form.title);
      data.append("author", form.author);
      data.append("description", form.description);
      data.append("categoryId", form.categoryId);
      data.append("publishedAt", form.publishedAt);
      data.append("file", file);

      if (cover) data.append("cover", cover);

      const res = await api.post("/admin/addbook", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message);

      // reset form
      setForm({
        title: "",
        author: "",
        description: "",
        categoryId: "",
        publishedAt: "",
      });
      setFile(null);
      setCover(null);

    } catch (error) {
      console.error(error);

      if (error.response?.data?.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Something went wrong");
      }
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto ">
      <h2 className="text-xl font-bold mb-4">Add New Book</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-white">

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Book Title *"
          className="border p-2 rounded"
        />

        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author (optional)"
          className="border p-2 rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description (optional)"
          className="border p-2 rounded"
        />

        {/* Category Dropdown */}
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
        >
          <option className="bg-black" value="">Select Category *</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}
            className="bg-black">
              {cat.category || cat.name}
            </option>
          ))}
        </select>


        <input
          type="date"
          name="publishedAt"
          value={form.publishedAt}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        {/* Book File */}
        <div>
          <label className="block text-sm">Book File *</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm">Cover Image (optional)</label>
          <input
            type="file"
            onChange={(e) => setCover(e.target.files[0])}
            className="border p-2 rounded"
            accept="image/*"
          />
        </div>

        <button
          className="bg-yellow-600 text-white py-2 rounded"
          type="submit"
        >
          Add Book
        </button>
      </form>

      {message && (
        <p className="mt-3 text-sm text-red-600">{message}</p>
      )}
    </div>
  );
}
