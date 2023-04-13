import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useState } from "react";
import { Dialog } from "@mui/material";
import { Head, useForm } from "@inertiajs/react";

export default function Detail(props) {
    const [showDialog, setShowDialog] = useState(false);
    const [dialogMsg, setDialogMsg] = useState("");

    // console.log("First" + props.roomDataSrc);
    // console.log(props.roomDataSrc);
    // console.log(props);
    // console.log(props.roomDataSrc[0] ? "yes" : "no");

    const { data, setData, post, processing, recentlySuccessful } = useForm({
        name: props.roomDataSrc[0] ? props.roomDataSrc[0].name : "",
        location: props.roomDataSrc[0] ? props.roomDataSrc[0].location : "",
        capacity: props.roomDataSrc[0] ? props.roomDataSrc[0].capacity : "",
        num_computers: props.roomDataSrc[0] ? props.roomDataSrc[0].num_computers : "",
        num_projectors: props.roomDataSrc[0] ? props.roomDataSrc[0].num_projectors : "",
        num_microphones: props.roomDataSrc[0] ? props.roomDataSrc[0].num_microphones : "",
    });

    const submit = (e) => {
        e.preventDefault();
        if (props.id === "-1") {      // Create room
            axios
                .post(route("room.store"), data)
                .then((response) => {
                    // console.log(response.data);
                    if (response.data.success) {
                        window.alert("Room successfully created. Room Id is " + response.data.success + ".");
                    } else {
                        window.alert("Error, please contact admin.");
                    }
                    window.location.href = route("room.search");
                })
                .catch((error) => {
                    console.log(error);
                    if (response.data.error === 'Duplicate name') {
                        window.alert("Error, room with same name existed.");
                    } else if (response.data.error === 'Duplicate location') {
                        window.alert("Error, room with same location existed.");
                    } else {
                        window.alert("Error, please contact admin.");
                    }
                    window.location.href = route("room.search");
                });
        } else {
            //console.log("data here");
            //console.log(data);
            //console.log(props.roomDataSrc[0])
            axios
                .patch(route("room.update", {id: props.id}), data)
                .then((response) => {
                    // console.log(response);
                    if (response.data.error) {
                        setDialogMsg("Error, please contact admin.");
                        setShowDialog(true);
                    } else {
                        setDialogMsg("Room successfully updated.");
                        setShowDialog(true);
                    }
                    // window.location.href = route("room.search");
                })
                .catch((error) => {
                    console.log(error);
                    window.alert("Error, please contact admin.");
                    // window.location.href = route("room.search");
                });
        }
        
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Room Detail
                </h2>
            }
        >
            <Head title="RoomDetail" />

            <div className="pt-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-lg font-semibold">
                                {props.id == -1 ? "Create" : "Update"}
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
                                                for="location"
                                                value="Room location"
                                            />

                                            <TextInput
                                                id="location"
                                                className="mt-1 block w-full"
                                                value={data.location}
                                                handleChange={(e) =>
                                                    setData(
                                                        "location",
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
                                        <PrimaryButton
                                            type="button"
                                            onClick={(e) => submit(e) }
                                        >
                                            Confirm
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog
                onClose={() => setShowDialog(false)}
                open={showDialog}
                fullWidth={true}
            >
                <div style={{ padding: 25 }}>
                    <h3 className="text-2xl text-center font-medium mb-5">
                        Update Room
                    </h3>
                    <h3 className="text-xl font-medium mb-3">
                        {"Room updated."}
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
                        onClick={() => window.location.href = route("room.search")}
                        className="mr-4 px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                    >
                        Back
                    </button>
                    <button
                        onClick={(e) => {
                            setShowDialog(false);
                            location.reload();
                        }}
                        className="px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                    >
                        OK
                    </button>
                </div>
            </Dialog>
        </AuthenticatedLayout>
    );
}
