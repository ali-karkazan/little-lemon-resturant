// import React from 'react'
// import BookingForm from './BookingForm';

// const Booking = (props) => {
//     return (
//         <BookingForm availableTimes={props.availableTimes}
//             dispatch={props.dispatch}
//             submitForm={props.submitForm} />
//     );
// };

// export default Booking;

import React, { useState } from 'react';

const Booking = ({ availableTimes, updateTimes, submitForm }) => {
    // State for selected date and selected time
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');

    // Handle date change and update available times
    const handleDateChange = (event) => {
        const date = new Date(event.target.value);
        setSelectedDate(date);
        updateTimes(date);  // Fetch available times for the selected date
    };

    // Handle time selection
    const handleTimeSelect = (event) => {
        setSelectedTime(event.target.value);
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = { date: selectedDate, time: selectedTime };
        submitForm(formData);
    };

    return (
        <div>
            <h2>Book a Time Slot</h2>
            <form onSubmit={handleSubmit}>
                {/* Date Picker */}
                <label>
                    Select Date:
                    <input
                        type="date"
                        value={selectedDate.toISOString().substring(0, 10)}
                        onChange={handleDateChange}
                    />
                </label>

                {/* Available Times Dropdown */}
                <label>
                    Select Time:
                    <select value={selectedTime} onChange={handleTimeSelect} required>
                        <option value="">--Choose a time--</option>
                        {availableTimes && availableTimes.length > 0 ? (
                            availableTimes.map((time, index) => (
                                <option key={index} value={time}>{time}</option>
                            ))
                        ) : (
                            <option disabled>No available times</option>
                        )}
                    </select>
                </label>

                {/* Submit Button */}
                <button className="btnReceive" type="submit" disabled={!selectedTime}>Book Now</button>
            </form>
        </div>
    );
};

export default Booking;