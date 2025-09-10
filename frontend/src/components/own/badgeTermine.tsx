

export default function BadgeTermine({statut}: {statut:number}) {

    return(
        statut === 0 ? 
        <p className=" p-1 rounded bg-blue-400 transition duration-200 ease-in-out hover:scale-105">
            inachevée
        </p> :
        <p className=" p-1 rounded bg-violet-400 transition duration-200 ease-in-out hover:scale-105">
            terminée
        </p>
        
    )
}