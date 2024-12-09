'use client'

import { useState } from "react";

enum ACTIONS { increase, decrease }

export default function Home() {
    const [student, setStudent] = useState({
        name: 'Danny',
        age: 17,
        class: 12
    })

    const handleStudentAge = (action: ACTIONS) => {
        setStudent((prev) => {
            const newAge = action === ACTIONS.increase ? prev.age + 1 : Math.max(1, prev.age - 1);
            const newClass = action === ACTIONS.increase ? prev.age >= 6 ? prev.class + 1 : 1 : Math.max(1, prev.class - 1);

            return { ...prev, age: newAge, class: newClass }
        })
    }

    // const handleIncreaseStudentAge = () => {
    //     setStudent((prev) => ({
    //             ...prev,
    //             age: prev.age + 1,
    //             class: prev.age >= 6 ? prev.class + 1 : 1
    //         }
    //     ))
    // }
    // const handleDecreaseStudentAge = () => {
    //     setStudent((prev) => ({
    //         ...prev,
    //         age: Math.max(1, prev.age - 1),
    //         class: Math.max(1, prev.class - 1),
    //     }))
    // }

    const getClassStatus = () => {
        if (student.class > 12) {
            return 'Graduated'
        }
        else if (student.age < 6 && student.age > 3) {
            return 'junior class'
        }
        else if (student.age <= 3) {
            return 'Kindergarten'
        }
        else {
            return student.class
        }
    }

    return (
        <main className="flex flex-col items-center justify-center h-screen gap-5">
            <h2>Student Name: {student.name}</h2>
            <h3>Student Age: {student.age}</h3>
            <p>Student Class: {getClassStatus()}</p>
            <button className="bg-white text-black px-2 py-2 rounded-md" onClick={() => handleStudentAge(ACTIONS.increase)}>Increase Age</button>
            <button className="bg-white text-black px-2 py-2 rounded-md" onClick={() => handleStudentAge(ACTIONS.decrease)}>Decrease Age</button>
        </main>
    );
}
