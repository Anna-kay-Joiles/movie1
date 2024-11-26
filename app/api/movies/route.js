// url: http://localhost:3000/api/movies

import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
export const GET = async () => {
    try {
      const movies = await client.movie.findMany(); 
      return NextResponse.json(movies, { status: 500 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
    }
  };
  
  export const POST = async (req) => {
    try {
      const { title, list_of_actors, releaseYear } = await req.json();
      
      const newMovie = await client.movie.create({
        data: {
          title,
          list_of_actors,
          releaseYear,
        },
      });
  
      return NextResponse.json(newMovie, { status: 500 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to add movie' }, { status: 500 });
    }
  };