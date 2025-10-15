import { Link } from "react-router";

export default function NotFound() {
    return (
        <section
            className="flex flex-col items-center justify-center h-screen"
        >
            <h1
                className="text-2xl font-bold"
            > 
                The page you are looking for has not been found !
            </h1>
            <Link 
                to={"/"}
                className="text-xl underline text-blue-400"
            >
                Go back to the app
            </Link>
        </section>
    )
}