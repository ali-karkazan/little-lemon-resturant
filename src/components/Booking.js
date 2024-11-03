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

import React, { useState, useRef } from 'react';

const Booking = ({ availableTimes, updateTimes, submitForm }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const timeRef = useRef(null); // Reference for the time dropdown

    // Handle date change, update available times, and focus on the time dropdown
    const handleDateChange = (event) => {
        const date = new Date(event.target.value);
        setSelectedDate(date);
        updateTimes(date); // Fetch available times for the selected date
        timeRef.current.focus(); // Auto-focus on time dropdown
    };

    // Handle time selection
    const handleTimeSelect = (event) => {
        setSelectedTime(event.target.value);
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = { date: selectedDate, time: selectedTime };

        try {
            // Call submitForm and wait for the response (if applicable)
            await submitForm(formData);

            // Show confirmation message after successful booking
            setConfirmationMessage(`Booking confirmed for ${selectedDate.toDateString()} at ${selectedTime}`);

            // Clear the selection fields after showing the message
            setSelectedTime('');
            setSelectedDate(new Date());

            // Hide confirmation message after 3 seconds
            setTimeout(() => setConfirmationMessage(''), 3000);
        } catch (error) {
            // Handle any errors from submitForm
            console.error("Error submitting booking:", error);
            // You can customize this further to display an error message to the user
        }
    };

    return (
        <header>
            <h2>Book a Time Slot</h2>
            <section>
                <form onSubmit={handleSubmit}>
                    <fieldset>
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
                            <select
                                ref={timeRef}
                                value={selectedTime}
                                onChange={handleTimeSelect}
                                required
                            >
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
                    </fieldset>
                </form>

                {/* Confirmation Message */}
                {confirmationMessage && (
                    <p style={{ color: 'green', marginTop: '10px' }}>{confirmationMessage}</p>
                )}
            </section>
        </header>
    );
};

export default Booking;