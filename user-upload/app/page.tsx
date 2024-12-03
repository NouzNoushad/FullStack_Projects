'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getUsersAction } from "./actions/users/getUsersAction";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { PaginationComponent } from "@/components/pagination";
import { DeleteIcon, EditIcon } from "@/components/svgs/svgs";

export default function Home() {
    const { users, paginatedItems, totalPages, isLoading, error, handlePageChange, currentPage } = getUsersAction()

    if (isLoading) return <p className="h-[calc(100vh-10vh)] flex items-center justify-center">
        <Loader2 className="animate-spin" />
    </p>
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
                            <TableHead className="w-[100px]"></TableHead>
                            <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            paginatedItems && paginatedItems.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="text-[0.95rem]">{users && users.indexOf(user) + 1}</TableCell>
                                    <TableCell className="h-[60px] w-[100px]">
                                        {
                                            user.image ? <Image src={user.image.secureUrl} alt="" width={'80'} height={'80'} className="rounded-[50%] h-[60px] w-[60px] mx-auto" /> : <div className="rounded-[50%] h-[60px] w-[60px] bg-slate-300 mx-auto"></div>
                                        }
                                    </TableCell>
                                    <TableCell className="text-[0.95rem]">{user.name}</TableCell>
                                    <TableCell className="text-[0.95rem]">{user.email}</TableCell>
                                    <TableCell className="text-[0.95rem]">{user.phone}</TableCell>
                                    <TableCell className="text-[0.95rem]">{user.profession}</TableCell>
                                    <TableCell>
                                        <DeleteIcon className="size-5 mx-auto cursor-pointer" />
                                    </TableCell>
                                    <TableCell>
                                        <EditIcon className="size-5 mx-auto cursor-pointer" />
                                    </TableCell>
                                </TableRow>
                            ))
                        }

                    </TableBody>
                </Table>
                <div className="mt-10">
                    <PaginationComponent totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                </div>
            </div>
        </main>
    );
}
