
export default function TaskList({date}:{date:Date|undefined}) {
    return(
        <div>
            <h1>liste des tâches</h1>
            {date && (
                <p className="text-gray-600">
                    Date sélectionnée : {date.toLocaleDateString('fr-FR')}
                </p>
            )}
        </div>
    )
}