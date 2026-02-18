export default function ExerciseList({ exercises, deleteExercise }) {
  const totalCalories = exercises.reduce(
    (sum, ex) => sum + Number(ex.calories),
    0
  );

  const totalDuration = exercises.reduce(
    (sum, ex) => sum + Number(ex.duration),
    0
  );

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Exercises</h2>

      {exercises.length === 0 && <p>No exercises added yet.</p>}

      {exercises.map((ex) => (
        <div
          key={ex.id}
          className="flex justify-between border-b py-2"
        >
          <div>
            <p className="font-semibold">{ex.name}</p>
            <p className="text-sm text-gray-500">
              {ex.duration} mins • {ex.calories} cal
            </p>
          </div>

          <button
            onClick={() => deleteExercise(ex.id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}

      <div className="mt-4 font-bold">
        <p>Total Duration: {totalDuration} mins</p>
        <p>Total Calories: {totalCalories} cal</p>
      </div>
    </div>
  );
}
