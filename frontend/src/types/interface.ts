export interface Exercise {
    _id: string;
    name: string;
    description: string;
    muscleGroup: string;
    difficulty: string;
}

export interface Workout {
    _id: string;
    name: string;
    date: string;
    notes?: string;
}

export interface WorkoutLog {
    _id: string;
    workoutId: Workout;
    exerciseId: Exercise;
    sets: number;
    reps: number;
    weight: number;
}

export interface PendingExercise {
    exerciseId: string;
    name: string;
    sets: number;
    reps: number;
    weight: number;
}

export interface WorkoutWithLogs {
    _id: string;
    name: string;
    date: string;
    notes?: string;
    logs: WorkoutLog[];
}