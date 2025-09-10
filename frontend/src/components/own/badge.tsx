

export default function BadgePriorite({priorite}: {priorite:number}) {

    return(
        priorite === 1 ? 
        <p className=" p-3 rounded bg-green-400">
            faible
        </p> :
        priorite === 2 ?
        <p className=" p-3 rounded bg-orange-400">
            modéré
        </p> : 
        <p className=" p-3 rounded bg-red-400">
            urgent
        </p>
        
    )
}