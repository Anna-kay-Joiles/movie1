import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
    const { id } = params;
    const { title, list_of_actors, releaseYear } = await req.json();
  
    try {
      const updatedMovie = await client.movie.update({
        where: { id: parseInt(id) },
        data: {
          title,
          list_of_actors,
          releaseYear,
        },
      });
  
      return NextResponse.json(updatedMovie, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to update movie' }, { status: 500 });
    }
  };
  
  export const DELETE = async (req, { params }) => {
    const { id } = params;
  
    try {
      await client.movie.delete({
        where: { id: parseInt(id) },
      });
  
      return NextResponse.json({ message: 'Movie deleted successfully' }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to delete movie' }, { status: 500 });
    }
  };