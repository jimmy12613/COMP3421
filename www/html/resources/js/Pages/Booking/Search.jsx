import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useState, useMemo } from "react";
import { Head, useForm } from "@inertiajs/react";
import MaterialReactTable from "material-react-table";
import { Dialog } from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, IconButton } from '@mui/material';

import { Add, Create } from "@mui/icons-material";


export default function Search(props) {
    const [roomAll, setRoomAll] = useState(props.roomDataSrc);
    const [roomBest, setRoomBest] = useState(props.roomDataSrc[0]);
    const [currentRoom, setCurrentRoom] = useState("");
    const memRoomAll = useMemo(() => roomAll, [roomAll]);
    const memRoomBest = useMemo(() => roomBest, [roomBest]);
    const [showDialog, setShowDialog] = useState(false);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    console.log(props.auth.user.userId);
    console.log(props);
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        name: "",
        capacity: "",
        num_computers: "",
        num_projectors: "",
        num_microphones: "",
    });

    const submit = (e) => {
        e.preventDefault();
        //console.log(data)
        axios
            .post(route("room.searchList"), data)
            .then((response) => {
                setRoomBest(response.data[0]);    // Set data here
                //setRoomAll(response.data[1]);    // Set data here
                document.getElementById("best").style.display = "block";
            })
            .catch((error) => {
                console.log(error);
            });
        /*
        axios
            .post(route("record.searchList"), data)
            .then((response) => {
                setRoomBest(response.data[0]);    // Set data here
                setRoomAll(response.data[1]);    // Set data here
                document.getElementById("best").style.display = "block";

            })
            .catch((error) => {
                console.log(error);
            });
        */
    };

    const create = (e) => {
        e.preventDefault();
        if (start === "" || end === "") {
            window.alert("Please choose time!");
            return;
        } else if (start >= end) {
            window.alert("Invalid time! ");
            return;
        }
        
        const insertData = {
            'userId': props.auth.user.userId,
            'roomId': currentRoom.roomId,
            'timeFrom': start,
            'timeTo': end,
            'status': 0,
        }
        
        axios
            .post(route("record.store"), insertData)
            .then((response) => {
                console.log(response.data);    // Set data here
                if (response.data.success) {
                    setShowDialog(false);
                    window.alert("Booking confirmed! Your booking ID is " + response.data.success)
                } else {
                    setShowDialog(false);
                    window.alert("Errorrrrr ")
                }
                console.log(response.data);    // Set data here
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const roomColumns = useMemo(
        () => [
            {
                header: "Room Name",
                accessorKey: "name",
                muiTableHeadCellProps: {
                    align: "center",
                },
                muiTableBodyCellProps: {
                    align: "center",
                },
            },
            {
                header: "Room Location",
                accessorKey: "location",
                muiTableHeadCellProps: {
                    align: "center",
                },
                muiTableBodyCellProps: {
                    align: "center",
                },
            },
            {
                header: "Room Capacity",
                accessorKey: "capacity",
                filterVariant: "range",
                filterFn: "betweenInclusive",
                muiTableHeadCellProps: {
                    align: "center",
                },
                muiTableBodyCellProps: {
                    align: "center",
                },
            },
            {
                header: "No. of Computers",
                accessorKey: "num_computers",
                filterVariant: "range",
                filterFn: "betweenInclusive",
                muiTableHeadCellProps: {
                    align: "center",
                },
                muiTableBodyCellProps: {
                    align: "center",
                },
            },
            {
                header: "No. of Projectors",
                accessorKey: "num_projectors",
                filterVariant: "range",
                filterFn: "betweenInclusive",
                muiTableHeadCellProps: {
                    align: "center",
                },
                muiTableBodyCellProps: {
                    align: "center",
                },
            },
            {
                header: "No. of Microphones",
                accessorKey: "num_microphones",
                filterVariant: "range",
                filterFn: "betweenInclusive",
                muiTableHeadCellProps: {
                    align: "center",
                },
                muiTableBodyCellProps: {
                    align: "center",
                },
            },
        ],
        []
    );

    //console.log(props)
    console.log(props.roomDataSrc);
    console.log(roomBest);
    //console.log(roomColumns);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Booking
                </h2>
            }
        >
            <Head title="Booking" />

            <div className="pt-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-xl font-semibold">
                                Room Criteria
                            </h2>
                            <div className="p-4">
                                <form onSubmit={submit} className="space-y-6">
                                    <div className="grid grid-flow-row auto-rows-max grid-cols-3 gap-4">
                                        <div>
                                            <InputLabel
                                                for="name"
                                                value="Room name"
                                            />

                                            <TextInput
                                                id="name"
                                                className="mt-1 block w-full"
                                                value={data.name}
                                                handleChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                isFocused
                                            />
                                        </div>
                                        <div>
                                            <InputLabel
                                                for="capacity"
                                                value="Capacity"
                                            />

                                            <TextInput
                                                type="number"
                                                id="capacity"
                                                className="mt-1 block w-full"
                                                value={data.capacity}
                                                handleChange={(e) =>
                                                    setData(
                                                        "capacity",
                                                        e.target.value
                                                    )
                                                }
                                                isFocused
                                            />
                                        </div>
                                        <div className="col-start-1">
                                            <InputLabel
                                                for="num_computers"
                                                value="Number of computers"
                                            />

                                            <TextInput
                                                type="number"
                                                id="num_computers"
                                                className="mt-1 block w-full"
                                                value={data.num_computers}
                                                handleChange={(e) =>
                                                    setData(
                                                        "num_computers",
                                                        e.target.value
                                                    )
                                                }
                                                isFocused
                                            />
                                        </div>
                                        <div>
                                            <InputLabel
                                                for="num_projectors"
                                                value="Number of projectors"
                                            />

                                            <TextInput
                                                type="number"
                                                id="num_projectors"
                                                className="mt-1 block w-full"
                                                value={data.num_projectors}
                                                handleChange={(e) =>
                                                    setData(
                                                        "num_projectors",
                                                        e.target.value
                                                    )
                                                }
                                                isFocused
                                            />
                                        </div>
                                        <div>
                                            <InputLabel
                                                for="num_microphones"
                                                value="Number of microphones"
                                            />

                                            <TextInput
                                                type="number"
                                                id="num_microphones"
                                                className="mt-1 block w-full"
                                                value={data.num_microphones}
                                                handleChange={(e) =>
                                                    setData(
                                                        "num_microphones",
                                                        e.target.value
                                                    )
                                                }
                                                isFocused
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <PrimaryButton processing={processing}>
                                            Search
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-12 pl-12 pr-12" id="best" style={{"display": "none"}}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-xl font-semibold">Best Match</h2>
                            <div id="grid" className="p-4">
                                <CssBaseline />
                                <table style={{"columnWidth": "185px", "width": "100%", "boxShadow": "0px 0px 1px 0px #000000"}}>
                                    <thead>
                                        <tr>
                                            <th style={{"textAlign": "center", paddingTop: 15, paddingBottom: 15}}>Action</th>
                                            <th style={{"textAlign": "center", paddingTop: 15, paddingBottom: 15}}>Room Name</th>
                                            <th style={{"textAlign": "center", paddingTop: 15, paddingBottom: 15}}>Room Location</th>
                                            <th style={{"textAlign": "center", paddingTop: 15, paddingBottom: 15}}>Room Capacity</th>
                                            <th style={{"textAlign": "center", paddingTop: 15, paddingBottom: 15}}>No. of computers</th>
                                            <th style={{"textAlign": "center", paddingTop: 15, paddingBottom: 15}}>No. of projectors</th>
                                            <th style={{"textAlign": "center", paddingTop: 15, paddingBottom: 15}}>No. of microphones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{"textAlign": "center", paddingBottom: 15}}>
                                                <IconButton
                                                    color="black"
                                                    onClick={() => {
                                                        setCurrentRoom(roomBest);
                                                        console.log(roomBest[0]);
                                                        setShowDialog(true);
                                                    }}
                                                >
                                                    <Add />
                                                </IconButton>
                                            </td>
                                            <td style={{"textAlign": "center", paddingBottom: 15}}>{roomBest.name}</td>
                                            <td style={{"textAlign": "center", paddingBottom: 15}}>{roomBest.location}</td>
                                            <td style={{"textAlign": "center", paddingBottom: 15}}>{roomBest.capacity}</td>
                                            <td style={{"textAlign": "center", paddingBottom: 15}}>{roomBest.num_computers}</td>
                                            <td style={{"textAlign": "center", paddingBottom: 15}}>{roomBest.num_projectors}</td>
                                            <td style={{"textAlign": "center", paddingBottom: 15}}>{roomBest.num_microphones}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-xl font-semibold">All Matches</h2>
                            <div id="grid" className="p-4">
                                <CssBaseline />
                                <MaterialReactTable
                                    columns={roomColumns}
                                    data={memRoomAll}
                                    enableRowActions
                                    enableColumnResizing
                                    initialState={{
                                        showColumnFilters: true,
                                        density: "compact",
                                        sorting: [
                                            {
                                                id: "name", //sort by name by default on page load
                                                desc: false,
                                            },
                                        ],
                                    }}
                                    muiTableProps={{
                                        sx: {
                                            tableLayout: "auto",
                                        },
                                    }}

                                    renderRowActions={({ row, table }) => (
                                        <IconButton
                                            color="black"
                                            onClick={() => {
                                                setCurrentRoom(row.original);
                                                console.log(row.original);
                                                setShowDialog(true);
                                            }}
                                        >
                                            <Add />
                                        </IconButton>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog onClose={() => setShowDialog(false)} open={showDialog} fullWidth={true}>
                <div style={{ padding: 25 }}>
                    <h3 className="text-2xl text-center font-medium mb-5">Select Time</h3>
                    <h3 className="text-xl font-medium mb-3">{"Room: "+ currentRoom.name}</h3>
                    <InputLabel
                        for="start"
                        value="Start time"
                        className="text-lg"
                    />
                    <TextInput
                        id="start"
                        type="datetime-local"
                        className="mt-1 mb-3 w-full"
                        handleChange={(e) => {
                            console.log(e.target.value);
                            setStart(e.target.value);
                        }}
                        isFocused
                    />

                    <InputLabel
                        for="end"
                        value="End time"
                        className="text-lg"
                    />
                    <TextInput
                        id="end"
                        type="datetime-local"
                        className="mt-1 mb-0 w-full"
                        handleChange={(e) => {
                            console.log(e.target.value);
                            setEnd(e.target.value);
                        }}
                        isFocused
                    />
                </div>
                <div style={{ display: 'flex', paddingRight: 25, paddingBottom: 25, justifyContent: 'right' }}>
                    <button onClick={() => setShowDialog(false)} className="mr-4 px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                        Cancel
                    </button>
                    <button onClick={(e) => create(e)} className="px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                        Confirm
                    </button>
                </div>
            </Dialog>

        </AuthenticatedLayout >
    );
}

