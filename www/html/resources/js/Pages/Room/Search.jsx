import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useState, useMemo } from "react";
import { Head, useForm } from "@inertiajs/react";
import MaterialReactTable from "material-react-table";
import { MenuItem, Dialog } from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function Search(props) {
    console.log(props)

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [currentRoom, setCurrentRoom] = useState("");
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
                setRoomDataSrc(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const remove = (e) => {
        e.preventDefault();
        axios
            .post(route("room.destroy"), currentRoom)
            .then((response) => {
                setShowDeleteDialog(false);
                window.alert("Room successfully deleted.");
            })
            .catch((error) => {
                console.log(error);
            });
    }

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

    const [roomDataSrc, setRoomDataSrc] = useState(props.roomDataSrc);
    const memRoomDataSrc = useMemo(() => roomDataSrc, [roomDataSrc]);

    //console.log(memRoomDataSrc);
    //console.log(roomColumns);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Room
                </h2>
            }
        >
            <Head title="Room" />

            <div className="pt-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-xl font-semibold">
                                Search Criteria
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
                                        <PrimaryButton
                                            type="button"
                                            onClick={() =>
                                                (window.location.href = route(
                                                    "room.detail",
                                                    -1
                                                ))
                                            }
                                        >
                                            Create
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-xl font-semibold">Result</h2>
                            <div id="grid" className="p-4">
                                    <CssBaseline />
                                    <MaterialReactTable
                                        columns={roomColumns}
                                        data={memRoomDataSrc}
                                        initialState={{
                                            showColumnFilters: true,
                                            density: "compact",
                                            sorting: [
                                                {
                                                    id: "name", //sort by age by default on page load
                                                    desc: false,
                                                },
                                            ],
                                        }}
                                        muiTableProps={{
                                            sx: {
                                                tableLayout: "auto",
                                            },
                                        }}
                                        enableColumnResizing
                                        enableRowActions
                                        renderRowActionMenuItems={({
                                            row,
                                            closeMenu,
                                        }) => [
                                            <MenuItem
                                                key={0}
                                                onClick={() => {
                                                    window.location.href =
                                                        route(
                                                            "room.detail",
                                                            row.original.roomId
                                                        );
                                                    closeMenu();
                                                }}
                                                sx={{ m: 0 }}
                                            >
                                                Detail
                                            </MenuItem>,
                                            <MenuItem
                                                key={1}
                                                onClick={() => {
                                                    confirm("Are you sure?")?
                                                        axios.delete(route("room.destroy", {id: row.original.roomId}))
                                                            .then((response) => {
                                                                console.log(response);
                                                                try {
                                                                    confirm(response.data['success'])?window.location.reload():window.location.reload();
                                                                } catch (error) {
                                                                    window.alert("Error")
                                                                }
                                                            })
                                                            .catch((error) => {
                                                                console.log(error);
                                                            })
                                                        :closeMenu();
                                                    closeMenu();
                                                }}
                                                sx={{ m: 0 }}
                                            >
                                                Delete
                                            </MenuItem>,
                                        ]}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Dialog
                onClose={() => setShowDeleteDialog(false)}
                open={showDeleteDialog}
                fullWidth={true}
            >
                <div style={{ padding: 25 }}>
                    <h3 className="text-2xl text-center font-medium mb-5">
                        Delete Room
                    </h3>
                    <h3 className="text-xl font-medium mb-3">
                        {"Are you sure you want to delete room " + currentRoom.name + "?"}
                    </h3>
                    
                </div>
                <div
                    style={{
                        display: "flex",
                        paddingRight: 25,
                        paddingBottom: 25,
                        justifyContent: "right",
                    }}
                >
                    <button
                        onClick={() => setShowDialog(false)}
                        className="mr-4 px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={(e) => remove(e)}
                        className="px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                    >
                        Confirm
                    </button>
                </div>
            </Dialog>
        </AuthenticatedLayout>
    );
}
