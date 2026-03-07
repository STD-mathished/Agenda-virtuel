
export default function TaskEdit({taskId}:{taskId:string | null}) {
    return(
        <div>
            <h1>modifier une tâche</h1>
            {taskId && (
                <p className="text-gray-600">
                    Date sélectionnée : {taskId}
                </p>
            )}
        </div>
    )
}