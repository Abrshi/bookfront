"use client";

import { useState, useEffect } from "react";
import api from "@/axios/axios";

function DalitCategory() {
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/admin/getAllBookCatagories");
        setCategories(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchCategories();
  }, []);

  // Delete category
  const deleteCategory = async (id) => {
    try {
      await api.delete(`/admin/deleteBookCategory/${id}`);

      setCategories((prev) => prev.filter((c) => c.id !== id)); // update UI
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Start editing
  const startEdit = (cat) => {
    setEditId(cat.id);
    setEditValue(cat.category);
  };

  // Save edit
  const saveEdit = async () => {
    try {
      await api.put(`/admin/updateBookCategory/${editId}`, {
        category: editValue,
      });

      setCategories((prev) =>
        prev.map((c) =>
          c.id === editId ? { ...c, category: editValue } : c
        )
      );

      setEditId(null);
      setEditValue("");
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Manage Categories</h2>

      <ul className="space-y-3">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="p-3 bg-gray-100 rounded-lg flex justify-between items-center"
          >
            {editId === cat.id ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="border p-1 rounded mr-2"
              />
            ) : (
              <span className="font-medium">{cat.category}</span>
            )}

            <div className="flex gap-2">
              {editId === cat.id ? (
                <button
                  onClick={saveEdit}
                  className="px-2 py-1 bg-gray-500-500 text-white rounded"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEdit(cat)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => deleteCategory(cat.id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default DalitCategory;
