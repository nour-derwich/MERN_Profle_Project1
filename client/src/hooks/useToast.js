import React, { useState } from "react";
import { useToast } from "../hooks/useToast";
import { formationService } from "../services/formationService";

const FormationForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });
  const { success, error, warning } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title) {
      warning("Please enter a title");
      return;
    }

    try {
      await formationService.create(formData);
      success("Formation created successfully!");
      setFormData({ title: "", description: "", price: "" });
    } catch (err) {
      error("Failed to create formation");
    }
  };

  return <form onSubmit={handleSubmit}>{/* Form fields... */}</form>;
};
const DeleteButton = ({ itemId, onDelete }) => {
  const { success, error } = useToast();

  const handleDelete = async () => {
    if (window.confirm("Are you sure?")) {
      try {
        await onDelete(itemId);
        success("Item deleted successfully");
      } catch (err) {
        error("Failed to delete item");
      }
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-600">
      Delete
    </button>
  );
};