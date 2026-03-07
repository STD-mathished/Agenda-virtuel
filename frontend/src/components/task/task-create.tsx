
export default function TaskCreate({date}:{date:Date|undefined}) {
    return(
        <div>
            <h1>créer une tâche</h1>
            {date && (
                <p>Date sélectionnée : {date.toLocaleDateString('fr-FR')}</p>
            )}
        </div>
    )
}