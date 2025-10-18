import { Link } from "react-router";

export default function NotFound() {
    return (
        <section
            className="flex flex-col items-center justify-center h-screen"
        >
            <h1
                className="text-2xl font-bold"
            > 
                La page que vous cherchez n'existe pas
            </h1>
            <Link 
                to={"/"}
                className="text-xl underline text-blue-400"
            >
                Retourner à la page d'accueil
            </Link>
        </section>
    )
}