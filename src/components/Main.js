// import React, { useReducer } from 'react';
// import { Route, Routes, useNavigate } from 'react-router-dom';
// import Header from './Header';
// import Booking from './Booking';

// const Main = () => {

//     const seedRandom = function (seed) {
//         var m = 2 ** 35 - 31;
//         var a = 185852;
//         var s = seed % m;
//         return function () {
//             return (s = s * a % m) / m;
//         }
//     }

//     const fetchAPI = function (date) {
//         let result = [];
//         let random = seedRandom(date.getDate());
//         for (let i = 17; i <= 23; i++) {
//             if (random() < 0.5) {
//                 result.push(i + ':00');
//             }
//             if (random() > 0.5) {
//                 result.push(i + ':30')
//             }
//         }
//         return result;
//     }

//     const submitAPI = function (formData) {
//         return true;
//     }

//     const initialState = { availableTimes: fetchAPI(new Date()) };
//     const [state, dispatch] = useReducer(updateTimes, initialState);

//     function updateTimes(state, date) {
//         return { availableTimes: fetchAPI(new Date()) }
//     }

//     const navigate = useNavigate();
//     function submitForm(formData) {
//         if (submitAPI(formData)) {
//             navigate("/confirmed");
//         }
//     }
//     return (
//         <main>
//             <Routes>
//                 <Route path='/' element={<Header />} />
//                 <Route path='/Booking'
//                     element={<Booking availableTimes={state} dispatch={dispatch}
//                         submitForm={submitForm} />} />
//             </Routes>
//         </main>
//     );
// };

// export default Main;

import React, { useReducer } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import Booking from './Booking';

// Seeded random generator function
const seedRandom = (seed) => {
    const m = 2 ** 35 - 31;
    const a = 185852;
    let s = seed % m;
    return () => (s = (s * a) % m) / m;
};

// Mock API function to fetch available times for a given date
const fetchAPI = (date) => {
    const result = [];
    const random = seedRandom(date.getDate());
    for (let i = 17; i <= 23; i++) {
        if (random() < 0.5) result.push(`${i}:00`);
        if (random() > 0.5) result.push(`${i}:30`);
    }
    return result;
};

// Mock submit function that returns true on success
const submitAPI = (formData) => true;

// Reducer function to update available times based on a selected date
const updateTimes = (state, action) => {
    if (action.type === 'UPDATE_TIMES') {
        const newTimes = fetchAPI(action.payload.date);
        return { availableTimes: newTimes };
    }
    return state;
};

const Main = () => {
    // Initial state for reducer with current date's available times
    const initialState = { availableTimes: fetchAPI(new Date()) };
    const [state, dispatch] = useReducer(updateTimes, initialState);

    // Navigation function for form submission
    const navigate = useNavigate();
    const submitForm = (formData) => {
        if (submitAPI(formData)) {
            navigate('/confirmed');
        }
    };

    return (
        <main>
            <Routes>
                <Route path="/" element={<Header />} />
                <Route
                    path="/Booking"
                    element={
                        <Booking
                            availableTimes={state.availableTimes} // Pass the array directly
                            updateTimes={(date) => dispatch({ type: 'UPDATE_TIMES', payload: { date } })}
                            submitForm={submitForm}
                        />
                    }
                />
            </Routes>
        </main>
    );
};

export default Main;