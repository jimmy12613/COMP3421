import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useMemo } from "react";
import { Head } from '@inertiajs/react';
import { WatchLaterSharp } from '@mui/icons-material';

export default function Dashboard(props) {
    const [currentRoom, setCurrentRoom] = useState("");
    const [switchData, setSwitchData] = useState(true);

    const toggle = (e) => {
        // console.log("toggled");
        // console.log(switchData);
        if (!switchData) {
            document.getElementById("switchText").innerHTML = "Active Booking";
            document.getElementById("active").style.display = "block";
            document.getElementById("past").style.display = "none";
        } else {
            document.getElementById("switchText").innerHTML = "Past Booking";
            document.getElementById("active").style.display = "none";
            document.getElementById("past").style.display = "block";
        }
        setSwitchData(!switchData);
    };

    // console.log(props);
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="pt-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-xl font-semibold">
                                Valid Booking
                            </h2>

                            <div className="p-4">
                                <label className="relative inline-flex items-center cursor-pointer mb-5">
                                    <input
                                        type="checkbox"
                                        value=""
                                        className="sr-only peer"
                                        onClick={(e) => toggle(e)}
                                    ></input>
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
                                    <span
                                        id="switchText"
                                        className="ml-3 text-sm font-semibold text-gray-900 dark:text-gray-300"
                                    >
                                        Active Booking
                                    </span>
                                </label>

                                <div id="active" style={{ display: "block" }}>
                                    <table
                                        style={{
                                            columnWidth: "185px",
                                            width: "100%",
                                            paddingTop: "10px",
                                            boxShadow:
                                                "0px 0px 1px 0px #000000",
                                        }}
                                    >
                                        <thead>
                                            <tr>
                                                <th
                                                    style={{
                                                        textAlign: "center",
                                                        paddingTop: 15,
                                                        paddingBottom: 15,
                                                    }}
                                                >
                                                    Action
                                                </th>
                                                <th
                                                    style={{
                                                        textAlign: "center",
                                                        paddingTop: 15,
                                                        paddingBottom: 15,
                                                    }}
                                                >
                                                    Room Name
                                                </th>
                                                <th
                                                    style={{
                                                        textAlign: "center",
                                                        paddingTop: 15,
                                                        paddingBottom: 15,
                                                    }}
                                                >
                                                    Room Location
                                                </th>
                                                <th
                                                    style={{
                                                        textAlign: "center",
                                                        paddingTop: 15,
                                                        paddingBottom: 15,
                                                    }}
                                                >
                                                    Start
                                                </th>
                                                <th
                                                    style={{
                                                        textAlign: "center",
                                                        paddingTop: 15,
                                                        paddingBottom: 15,
                                                    }}
                                                >
                                                    End
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props.active.map((act) => (
                                                <tr key={act.id}>
                                                    <td
                                                        style={{
                                                            textAlign: "center",
                                                            paddingBottom: 15,
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent:
                                                                    "center",
                                                                fontSize:
                                                                    "0.9rem",
                                                            }}
                                                        >
                                                            <button
                                                                onClick={() => {
                                                                    confirm("Are you sure?")
                                                                        ? axios
                                                                              .delete(route("record.destroy",{id: act.id,}))
                                                                              .then((response) => {
                                                                                    // console.log(response);
                                                                                    try {
                                                                                        confirm(response.data["success"])
                                                                                            ? window.location.reload()
                                                                                            : window.location.reload();
                                                                                      } catch (error) {
                                                                                          window.alert("Error, please contact admin.");
                                                                                      }
                                                                                  })
                                                                              .catch((error) => {
                                                                                    console.log(error);
                                                                                })
                                                                        : "";
                                                                }}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td
                                                        style={{
                                                            textAlign: "center",
                                                            paddingBottom: 15,
                                                        }}
                                                    >
                                                        {act.name}
                                                    </td>
                                                    <td
                                                        style={{
                                                            textAlign: "center",
                                                            paddingBottom: 15,
                                                        }}
                                                    >
                                                        {act.location}
                                                    </td>
                                                    <td
                                                        style={{
                                                            textAlign: "center",
                                                            paddingBottom: 15,
                                                        }}
                                                    >
                                                        {act.timeFrom.slice(
                                                            0,
                                                            16
                                                        )}
                                                    </td>
                                                    <td
                                                        style={{
                                                            textAlign: "center",
                                                            paddingBottom: 15,
                                                        }}
                                                    >
                                                        {act.timeTo.slice(
                                                            0,
                                                            16
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div id="past" style={{ display: "none" }}>
                                    <table
                                        style={{
                                            columnWidth: "185px",
                                            width: "100%",
                                            paddingTop: "10px",
                                            boxShadow:
                                                "0px 0px 1px 0px #000000",
                                        }}
                                    >
                                        <thead>
                                            <tr>
                                                <th
                                                    style={{
                                                        textAlign: "center",
                                                        paddingTop: 15,
                                                        paddingBottom: 15,
                                                    }}
                                                >
                                                    Room Name
                                                </th>
                                                <th
                                                    style={{
                                                        textAlign: "center",
                                                        paddingTop: 15,
                                                        paddingBottom: 15,
                                                    }}
                                                >
                                                    Room Location
                                                </th>
                                                <th
                                                    style={{
                                                        textAlign: "center",
                                                        paddingTop: 15,
                                                        paddingBottom: 15,
                                                    }}
                                                >
                                                    Start
                                                </th>
                                                <th
                                                    style={{
                                                        textAlign: "center",
                                                        paddingTop: 15,
                                                        paddingBottom: 15,
                                                    }}
                                                >
                                                    End
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props.past.map((p) => (
                                                <tr key={p.id}>
                                                    <td
                                                        style={{
                                                            textAlign: "center",
                                                            paddingBottom: 15,
                                                        }}
                                                    >
                                                        {p.name}
                                                    </td>
                                                    <td
                                                        style={{
                                                            textAlign: "center",
                                                            paddingBottom: 15,
                                                        }}
                                                    >
                                                        {p.location}
                                                    </td>
                                                    <td
                                                        style={{
                                                            textAlign: "center",
                                                            paddingBottom: 15,
                                                        }}
                                                    >
                                                        {p.timeFrom.slice(
                                                            0,
                                                            16
                                                        )}
                                                    </td>
                                                    <td
                                                        style={{
                                                            textAlign: "center",
                                                            paddingBottom: 15,
                                                        }}
                                                    >
                                                        {p.timeTo.slice(0, 16)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-xl font-semibold">
                                Waitlisting Booking
                            </h2>
                            <div
                                id="waitlist"
                                className="p-4"
                                style={{ display: "block" }}
                            >
                                <table
                                    style={{
                                        columnWidth: "185px",
                                        width: "100%",
                                        paddingTop: "10px",
                                        boxShadow: "0px 0px 1px 0px #000000",
                                    }}
                                >
                                    <thead>
                                        <tr>
                                            <th
                                                style={{
                                                    textAlign: "center",
                                                    paddingTop: 15,
                                                    paddingBottom: 15,
                                                }}
                                            >
                                                Action
                                            </th>
                                            <th
                                                style={{
                                                    textAlign: "center",
                                                    paddingTop: 15,
                                                    paddingBottom: 15,
                                                }}
                                            >
                                                Room Name
                                            </th>
                                            <th
                                                style={{
                                                    textAlign: "center",
                                                    paddingTop: 15,
                                                    paddingBottom: 15,
                                                }}
                                            >
                                                Room Location
                                            </th>
                                            <th
                                                style={{
                                                    textAlign: "center",
                                                    paddingTop: 15,
                                                    paddingBottom: 15,
                                                }}
                                            >
                                                Start
                                            </th>
                                            <th
                                                style={{
                                                    textAlign: "center",
                                                    paddingTop: 15,
                                                    paddingBottom: 15,
                                                }}
                                            >
                                                End
                                            </th>
                                            <th
                                                style={{
                                                    textAlign: "center",
                                                    paddingTop: 15,
                                                    paddingBottom: 15,
                                                }}
                                            >
                                                Waitlist Position
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.waitlist.map((wl) => (
                                            <tr key={wl.id}>
                                                <td
                                                    style={{
                                                        textAlign: "center",
                                                        paddingBottom: 15,
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "center",
                                                            fontSize: "0.9rem",
                                                        }}
                                                    >
                                                        <button
                                                            onClick={() => {
                                                                confirm("Are you sure?")
                                                                    ? axios
                                                                        .delete(route("record.destroy",{id: wl.id,}))
                                                                        .then((response) => {
                                                                                // console.log(response);
                                                                                try {
                                                                                    confirm(response.data["success"])
                                                                                        ? window.location.reload()
                                                                                        : window.location.reload();
                                                                                } catch (error) {
                                                                                    window.alert("Error, please contact admin.");
                                                                                }
                                                                            })
                                                                        .catch((error) => {
                                                                            console.log(error);
                                                                        })
                                                                    : "";
                                                            }}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </td>
                                                <td
                                                    style={{
                                                        textAlign: "center",
                                                        paddingBottom: 15,
                                                    }}
                                                >
                                                    {wl.name}
                                                </td>
                                                <td
                                                    style={{
                                                        textAlign: "center",
                                                        paddingBottom: 15,
                                                    }}
                                                >
                                                    {wl.location}
                                                </td>
                                                <td
                                                    style={{
                                                        textAlign: "center",
                                                        paddingBottom: 15,
                                                    }}
                                                >
                                                    {wl.timeFrom.slice(0, 16)}
                                                </td>
                                                <td
                                                    style={{
                                                        textAlign: "center",
                                                        paddingBottom: 15,
                                                    }}
                                                >
                                                    {wl.timeTo.slice(0, 16)}
                                                </td>
                                                <td
                                                    style={{
                                                        textAlign: "center",
                                                        paddingBottom: 15,
                                                    }}
                                                >
                                                    {wl.status}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
