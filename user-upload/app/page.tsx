'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getUsersAction } from "./actions/users/getUsersAction";
import Image from "next/image";

export default function Home() {
    const { users, isLoading, error } = getUsersAction()

    if (isLoading) return <p className="h-[calc(100vh-10vh)] flex items-center justify-center">Loading</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <main className="py-[5rem]">
            <div className="max-w-responsive">
                <Table className="w-full">
                    <TableHeader className="w-full bg-slate-800 h-[50px] hover:bg-slate-800 pointer-events-none">
                        <TableRow>
                            <TableHead className="text-white text-center">ID</TableHead>
                            <TableHead className="text-white text-center">Image</TableHead>
                            <TableHead className="text-white text-center">Name</TableHead>
                            <TableHead className="text-white text-center">Email</TableHead>
                            <TableHead className="text-white text-center">Phone</TableHead>
                            <TableHead className="text-white text-center">Profession</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="table-body-text">{users.indexOf(user) + 1}</TableCell>
                                    <TableCell className="h-[60px] w-[100px]">
                                        {
                                            user.image ? <Image src={user.image.secureUrl} alt="" width={'80'} height={'80'} className="rounded-[50%] h-[60px] w-[60px] mx-auto" /> : <div className="rounded-[50%] h-[60px] w-[60px] bg-slate-300 mx-auto"></div>
                                        }
                                    </TableCell>
                                    <TableCell className="table-body-text">{user.name}</TableCell>
                                    <TableCell className="table-body-text">{user.email}</TableCell>
                                    <TableCell className="table-body-text">{user.phone}</TableCell>
                                    <TableCell className="table-body-text">{user.profession}</TableCell>
                                </TableRow>
                            ))
                        }

                    </TableBody>
                </Table>
            </div>
        </main>
    );
}
