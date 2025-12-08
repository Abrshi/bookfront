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
  const [coverPreview, setCoverPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

  // Update form fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle cover preview
  const handleCoverChange = (e) => {
    const selected = e.target.files[0];
    setCover(selected);
    if (selected) {
      setCoverPreview(URL.createObjectURL(selected));
    } else {
      setCoverPreview(null);
    }
  };

  // Handle book submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    
    if (!form.title.trim()) return setMessage("Title is required");
    if (!form.categoryId) return setMessage("Select a category");
    if (!file) return setMessage("Book file is required");

    setLoading(true);
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
      setCoverPreview(null);

    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-gray-900 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-yellow-400 text-center">Add New Book</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-white">

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Book Title *"
          className="border border-gray-700 p-3 rounded bg-gray-800 focus:outline-yellow-400"
        />

        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author (optional)"
          className="border border-gray-700 p-3 rounded bg-gray-800 focus:outline-yellow-400"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description (optional)"
          className="border border-gray-700 p-3 rounded bg-gray-800 focus:outline-yellow-400 resize-none"
        />

        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="border border-gray-700 p-3 rounded bg-gray-800 focus:outline-yellow-400"
        >
          <option value="">Select Category *</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.category || cat.name}</option>
          ))}
        </select>

        <input
          type="date"
          name="publishedAt"
          value={form.publishedAt}
          onChange={handleChange}
          className="border border-gray-700 p-3 rounded bg-gray-800 focus:outline-yellow-400"
        />

        {/* Book File */}
        <div>
          <label className="block text-sm mb-1">Book File *</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded w-full bg-gray-800 text-white"
          />
          {file && <p className="text-yellow-400 mt-1 text-sm">Selected: {file.name}</p>}
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm mb-1">Cover Image (optional)</label>
          <input
            type="file"
            onChange={handleCoverChange}
            className="border p-2 rounded w-full bg-gray-800 text-white"
            accept="image/*"
          />
          {coverPreview && (
            <img
              src={coverPreview}
              alt="Cover Preview"
              className="mt-2 w-32 h-40 object-cover rounded shadow-md transition-transform duration-200 hover:scale-105"
            />
          )}
        </div>

        <button
          className={`bg-yellow-600 text-white py-2 rounded hover:bg-yellow-500 transition-colors ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-red-500">{message}</p>
      )}
    </div>
  );
}
