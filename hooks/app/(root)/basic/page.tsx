/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { useState } from "react";

enum ACTIONS { increase, decrease }

interface Student {
    name: string
    age: number | string
    class: number
}

export default function Basics() {
    const [student, setStudent] = useState<Student>({
        name: 'Danny',
        age: 17,
        class: 12
    })

    const handleInputChange = (value: string) => {
        if (value === '') {
            setStudent((prev) => ({
                ...prev,
                age: ''
            }))
        } else {
            const parseAge = parseInt(value)
            if (!isNaN(parseAge)) {
                setStudent((prev) => ({
                    ...prev,
                    age: parseAge,
                    class: parseAge >= 6 ? parseAge - 5 : 1,
                }))
            }
        }
    }

    const handleStudentAge = (action: ACTIONS) => {
        setStudent((prev) => {
            const currentAge = typeof prev.age === 'number' ? prev.age : parseInt(prev.age)
            const newAge = action === ACTIONS.increase ? currentAge + 1 : Math.max(1, currentAge - 1);
            const newClass = action === ACTIONS.increase ? currentAge >= 6 ? prev.class + 1 : 1 : Math.max(1, prev.class - 1);

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
        const currentAge = typeof student.age === 'number' ? student.age : parseInt(student.age)

        if (student.class > 12) {
            return 'Graduated'
        }
        else if (currentAge < 6 && currentAge > 3) {
            return 'junior class'
        }
        else if (currentAge <= 3) {
            return 'Kindergarten'
        }
        else {
            return student.class
        }
    }

    return (
        <main className="center gap-5">
            <h2>Student Name: {student.name}</h2>
            <h3>Student Age: {student.age}</h3>
            <p>Student Class: {getClassStatus()}</p>
            <input type="number" className="input" onChange={(e) => handleInputChange(e.target.value)} value={student.age === '' ? '' : student.age} />
            <button className="button" onClick={() => handleStudentAge(ACTIONS.increase)}>Increase Age</button>
            <button className="button" onClick={() => handleStudentAge(ACTIONS.decrease)}>Decrease Age</button>
        </main>
    );
}
