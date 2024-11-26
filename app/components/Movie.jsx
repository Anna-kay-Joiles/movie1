"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import { useRouter } from "next/navigation";

const Movie = ({ movie }) => {
  const router = useRouter();
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState(movie);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleEditSubmit = (e) => {
    e.preventDefault();

    // Check if movieToEdit contains the necessary data
    console.log("Submitting movie:", movieToEdit);
    console.log("Movie ID:", movieToEdit.id);

    axios
      .patch(`/api/movies/${movieToEdit.id}`, movieToEdit)
      .then((res) => {
        console.log("Updated movie:", res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setShowModalEdit(false);
        router.refresh();
      });
  };

  const handleDelete = () => {
    axios
      .delete(`/api/movies/${movie.id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setShowModalDelete(false);
        router.refresh();
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieToEdit((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <li className="p-3 my-5 bg-slate-300">
      <h1 className="font-bold">{movie.title}</h1>
      <p>{movie.list_of_actors.join(", ")}</p>
      <p>{movie.releaseYear}</p>

      <button
        className="text-blue-600 mr-5"
        onClick={() => setShowModalEdit(true)}
      >
        Edit
      </button>

      <Modal showModal={showModalEdit} setShowModal={setShowModalEdit}>
        <form className="w-full px-5 pb-6" onSubmit={handleEditSubmit}>
          <h1 className="font-bold">Edit Movie</h1>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="w-full p-3 my-3"
            value={movieToEdit.title}
            onChange={handleChange}
          />
          <textarea
            placeholder="List of Actors (comma-separated)"
            name="list_of_actors"
            className="w-full p-3 my-3"
            value={movieToEdit.list_of_actors.join(", ")}
            onChange={(e) =>
              setMovieToEdit((prevState) => ({
                ...prevState,
                list_of_actors: e.target.value.split(",").map((actor) => actor.trim()),
              }))
            }
          />
          <input
            type="number"
            placeholder="Release Year"
            name="releaseYear"
            className="w-full p-3 my-3"
            value={movieToEdit.releaseYear}
            onChange={handleChange}
          />
          <button type="submit" className="bg-red-600 text-white px-5 py-2">
            Save Changes
          </button>
        </form>
      </Modal>

      <button
        className="text-red-400 p-2"
        onClick={() => setShowModalDelete(true)}
      >
        Delete
      </button>

      <Modal showModal={showModalDelete} setShowModal={setShowModalDelete}>
        <div className="text-center">
          <h2 className="font-bold">Are you sure you want to delete this movie?</h2>
          <div className="flex justify-center space-x-3 mt-4">
            <button
              className="bg-green-500 text-white px-4 py-2"
              onClick={handleDelete}
            >
              Yes
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2"
              onClick={() => setShowModalDelete(false)}
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </li>
  );
};

export default Movie;
