import Image from "next/image";
import { fetchCollectionType } from "@/lib/strapi";

export default async function Home() {
    const movies = await fetchCollectionType("movies");
    console.log("Les films:", movies);
    return (
        <div>
            <h1>Les films</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
}
