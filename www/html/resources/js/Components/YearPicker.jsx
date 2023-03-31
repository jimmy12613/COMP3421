import React, { useEffect, useRef, useState } from "react";

function YearPicker(props) {
    const [year, setYear] = useState([]);
    const year_start = 1940;
    const year_end = new Date().getFullYear();
    const input = useRef();

    useEffect(() => {
        let yearList = [];
        for (let i = year_end; i >= year_start; i--) {
            yearList.push(
                <option value={i} key={i}>
                    {i}
                </option>
            );
        }
        setYear(yearList);
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
            value={props.defaultValue}
            required={props.required}
            onChange={(e) => props.handleChange(e)}
        >
            {year}
        </select>
    );
}

export default YearPicker;