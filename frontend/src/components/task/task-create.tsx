
export default function TaskCreate({date}:{date:Date|undefined}) {
    return(
        <div>
            <h2>Souhaitez vous créer une tâche ou une catégorie?</h2>
            {date && (
                <p>Date sélectionnée : {date.toLocaleDateString('fr-FR')}</p>
            )}
        </div>
    )
}