

export default function BadgePriorite({priorite}: {priorite:number}) {

    return(
        priorite === 1 ? 
        <p className=" p-3 rounded bg-green-400 transition duration-200 ease-in-out hover:scale-105">
            faible
        </p> :
        priorite === 2 ?
        <p className=" p-3 rounded bg-orange-400 transition duration-200 ease-in-out hover:scale-105">
            modéré
        </p> : 
        <p className=" p-3 rounded bg-red-400 transition duration-200 ease-in-out hover:scale-105">
            urgent
        </p>
        
    )
}