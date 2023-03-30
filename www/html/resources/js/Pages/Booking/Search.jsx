import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useState, useMemo } from "react";
import { Head, useForm } from "@inertiajs/react";
import MaterialReactTable from "material-react-table";
import { MenuItem } from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, IconButton } from '@mui/material';

import { Add } from "@mui/icons-material";


export default function Search(props) {
    const [roomAll, setRoomAll] = useState(props.roomDataSrc);
    const [roomBest, setRoomBest] = useState(props.roomDataSrc);
    const memRoomAll = useMemo(() => roomAll, [roomAll]);
    const memRoomBest = useMemo(() => roomBest, [roomBest]);

    const { data, setData, post, processing, recentlySuccessful } = useForm({
        name: "",
        capacity: "",
        num_computers: "",
        num_projectors: "",
        num_microphones: "",
    });

    const submit = (e) => {
        e.preventDefault();
        axios
            .post(route("room.searchList"), data)
            .then((response) => {
                setRoomAll(response.data);    // Set data here
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

    console.log(props)
    // console.log(memRoomDataSrc);
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

            <div className="pt-12 pl-12 pr-12" style={{"display": "none"}}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-xl font-semibold">Best Match</h2>
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
                                                onClick={() => {console.log(row.original.roomId)}}
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
        </AuthenticatedLayout>
    );
}

