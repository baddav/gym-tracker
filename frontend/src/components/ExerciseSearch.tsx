import {useEffect, useState} from 'react';
import type {Exercise} from "../types/interface.ts";

export default function ExerciseSearch() {

    const [input, setInput] = useState<string>("");
    const [allExercises, setAllExercises] = useState<Exercise[]>([]);
    const [searchResults, setSearchResults] = useState<Exercise[]>([]);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/exercises');
                if (!response.ok) {
                    console.error('Network response was not ok:', response.status);
                    return;
                }

                const data = await response.json();
                setAllExercises(data);
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };
        fetchExercises();
    }, []);


    const handleChange = (text: string) => {

        setInput(text);
        if (text.length === 0) {
            setSearchResults([]);
            return;
        }

        const matchingExercises = allExercises.filter((exercise) =>
            exercise.name.toLowerCase().includes(text.toLowerCase())
        );

        setSearchResults(matchingExercises);
    }

    return (
        <div className="search">
            <input 
                type="text"
                placeholder="Please enter an exercise"
                value={input} 
                onChange={(e) => handleChange(e.target.value)} 
                id="exercise-search"
            />
            <div className="searchResults">
                {input.length > 0 && searchResults.length === 0 ? (
                    <div className="no-results">
                        <p>No exercises found</p>
                    </div>
                ) : (
                    searchResults.map((searchResult) => (
                        <div key={searchResult._id} className="searchResult-entry">
                            <strong>{searchResult.name}</strong>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}