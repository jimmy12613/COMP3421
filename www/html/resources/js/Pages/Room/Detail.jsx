import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";

export default function Search(props) {
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
        axios
            .post(route("room.searchList"))
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
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
                                {/* Content */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
