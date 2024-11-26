import React from "react";
import MovieList from "../components/MovieList";
import AddMovie from "../components/AddMovie";

async function getData() {
  const res = await fetch("http://localhost:3000/api/movies", { cache: "no-store" });
  if (!res.ok) {
    console.error("Failed to fetch data");
    return [];
  }
  const data = await res.json();
  console.log("Fetched Movies:", data); // Debugging log
  return data;
}

const Page = async () => {
  const movies = await getData();

  console.log("Movies fetched in Page component:", movies); // Debug log

  return (
    <main className="flex flex-col justify-between p-24">
      <h1 className="p-5">My Movie App</h1>
      <div>
        <AddMovie />
        <MovieList movie={movies || []} />
      </div>
    </main>
  );
};

export default Page;
