import React, { useState, useEffect, useRef } from "react";

function MonthPicker(props) {
    const months= [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const [monthSelected, setMonthSelected] = useState(new Date().getMonth());
    const [month, setMonth] = useState([]);
    const input = useRef();

    useEffect(() => {
        let monthList = [];
        for (let i = 0; i < months.length; i++) {
            monthList.push(
                <option value={i} key={i}>
                    {months[i]}
                </option>
            );
        }
        setMonth(monthList);
        if (props.isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <select
            ref={input}
            id={props.id}
            name={props.name}
            className={
                `border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ` +
                props.className
            }
            value={monthSelected}
            required={props.required}
            onChange={(e) => props.handleChange(e)}
        >
            {month}
        </select>
    );
}

export default MonthPicker;
