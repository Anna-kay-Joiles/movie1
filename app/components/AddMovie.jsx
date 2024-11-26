"use client";
import { useState } from "react";
import React from "react";
import Modal from "./Modal";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddMovie = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState({
    title: "",
    list_of_actors: "",
    releaseYear: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const year = parseInt(input.releaseYear);
    if (isNaN(year)) {
      console.error("Invalid release year");
      return;
    }

    const actorsArray = input.list_of_actors.split(",").map(actor => actor.trim());

    const newMovie = { 
      ...input, 
      releaseYear: year, 
      list_of_actors: actorsArray 
    };

    axios
      .post("api/movies", newMovie)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setInput({ title: "", list_of_actors: "", releaseYear: "" });
        setShowModal(false);
        router.refresh();
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <button
        className="bg-blue-600 text-white p-3 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        Add New Movie Information
      </button>

      <Modal showModal={showModal} setShowModal={setShowModal}>
        <form className="w-full px-5 pb-6" onSubmit={handleSubmit}>
          <h1 className="font-bold"> Add New Movies </h1>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="w-full p-3 my-3"
            value={input.title}
            onChange={handleChange}
          />
          <textarea
            placeholder="List of Actors (comma-separated)"
            name="list_of_actors"
            className="w-full p-3 my-3"
            value={input.list_of_actors}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Release Year"
            name="releaseYear"
            className="w-full p-3 my-3"
            value={input.releaseYear}
            onChange={handleChange}
          />
          <button type="submit" className="bg-red-600 text-white px-5 py-2">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddMovie;
