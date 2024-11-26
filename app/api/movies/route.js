// url: http://localhost:3000/api/movies

import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
export const GET = async () => {
    try {
      const movies = await client.movie.findMany(); // Assuming the model is "movie"
      return NextResponse.json(movies, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
    }
  };
  
  // POST request to add a new movie
  export const POST = async (req) => {
    try {
      const { title, list_of_actors, releaseYear } = await req.json();
      
      // Create the new movie
      const newMovie = await client.movie.create({
        data: {
          title,
          list_of_actors,
          releaseYear,
        },
      });
  
      return NextResponse.json(newMovie, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to add movie' }, { status: 500 });
    }
  };