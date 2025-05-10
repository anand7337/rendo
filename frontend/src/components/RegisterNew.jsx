import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    eventType: "",
    participants: [],
    eventDate: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const participantsOptions = ["John", "Jane", "Doe", "Alice", "Bob"];
  const eventTypes = ["Workshop", "Seminar", "Conference"];

  const validate = () => {
    const errors = {};
    if (!formData.name || formData.name.length < 3 || /[^a-zA-Z\s]/.test(formData.name)) {
      errors.name = "Name must be at least 3 characters and contain no special characters.";
    }
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Valid email is required.";
    }
    if (!formData.eventType) {
      errors.eventType = "Event type is required.";
    }
    if (formData.participants.length < 1) {
      errors.participants = "At least one participant is required.";
    }
    if (!formData.eventDate || new Date(formData.eventDate) <= new Date()) {
      errors.eventDate = "Event date must be in the future.";
    }
    if (formData.description.length > 500) {
      errors.description = "Description must not exceed 500 characters.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post("/api/events", formData);
      setSuccessMessage("Event created successfully!");
      setFormData({
        name: "",
        email: "",
        eventType: "",
        participants: [],
        eventDate: "",
        description: "",
      });
    } catch (error) {
      setErrors({ submit: "Failed to create event. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    // Trigger validation after each change
    const validationErrors = validate();
    setErrors(validationErrors);  // Update errors after each change
  };
  
  const handleMultiSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, participants: selectedOptions });
  
    // Trigger validation after participants selection
    const validationErrors = validate();
    setErrors(validationErrors);
  };
  
  

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      {successMessage && <div className="p-4 bg-green-100 text-green-700 rounded">{successMessage}</div>}
      {errors.submit && <div className="p-4 bg-red-100 text-red-700 rounded">{errors.submit}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            className={`w-full border p-2 rounded ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className={`w-full border p-2 rounded ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium">Event Type</label>
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.eventType ? "border-red-500" : ""}`}
          >
            <option value="">Select one</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.eventType && <span className="text-red-500 text-sm">{errors.eventType}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium">Participants</label>
          <select
            name="participants"
            multiple
            value={formData.participants}
            onChange={handleMultiSelectChange}
            className={`w-full border p-2 rounded ${errors.participants ? "border-red-500" : ""}`}
          >
            {participantsOptions.map((participant) => (
              <option key={participant} value={participant}>
                {participant}
              </option>
            ))}
          </select>
          {errors.participants && <span className="text-red-500 text-sm">{errors.participants}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium">Event Date</label>
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.eventDate ? "border-red-500" : ""}`}
          />
          {errors.eventDate && <span className="text-red-500 text-sm">{errors.eventDate}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Optional, max 500 chars"
            className="w-full border p-2 rounded"
          />
          {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 rounded ${isSubmitting ? "opacity-50" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default Register;
