'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getUsersAction } from "./actions/users/getUsersAction";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { PaginationComponent } from "@/components/pagination";
import { DeleteIcon, EditIcon, SearchIcon } from "@/components/svgs/svgs";
import { LIMIT } from "@/lib/constants";
import { NavbarAction } from "./actions/navbarAction";
import Link from "next/link";

export default function Home() {
    const { paginatedItems, totalPages, isLoading, error, handlePageChange, currentPage, deleteId, handleDeleteUser, isDeleting } = getUsersAction()
    const { isLoggedIn } = NavbarAction()

    if (isLoading) return <p className="h-[calc(100vh-10vh)] flex items-center justify-center">
        <Loader2 className="animate-spin" />
    </p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <main className="py-[5rem]">
            <div className="max-w-responsive">
                <div className="flex flex-row items-center justify-center mb-4">
                    <div className="md:w-[500px] w-full border-2 border-slate-800 flex flex-row items-center px-3 py-3 rounded-md">
                        <input type="text" placeholder="Search..." className="grow outline-none"/>
                        <SearchIcon className="size-5"/>
                    </div>
                </div>
                <Table className="w-full">
                    <TableHeader className="w-full bg-slate-800 h-[50px] hover:bg-slate-800 pointer-events-none">
                        <TableRow>
                            <TableHead className="text-white text-center">ID</TableHead>
                            <TableHead className="text-white text-center">Image</TableHead>
                            <TableHead className="text-white text-center">Name</TableHead>
                            <TableHead className="text-white text-center">Email</TableHead>
                            <TableHead className="text-white text-center">Phone</TableHead>
                            <TableHead className="text-white text-center">Profession</TableHead>
                            {
                                isLoggedIn ? (
                                    <>
                                        <TableHead className="w-[100px]"></TableHead>
                                        <TableHead className="w-[100px]"></TableHead>
                                    </>
                                ) : null
                            }

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            paginatedItems && paginatedItems.map((user, index) => (
                                <TableRow key={user.id}>
                                    <TableCell className="text-[0.95rem]">{LIMIT * (currentPage - 1) + index + 1}</TableCell>
                                    <TableCell className="h-[60px] w-[100px]">
                                        {
                                            user.image && typeof user.image !== 'string' ? <Image src={user.image.secureUrl} alt="" priority width={'80'} height={'80'} className="rounded-[50%] h-[60px] w-[60px] mx-auto" /> : <div className="rounded-[50%] h-[60px] w-[60px] bg-slate-300 mx-auto"></div>
                                        }
                                    </TableCell>
                                    <TableCell className="text-[0.95rem]">{user.name}</TableCell>
                                    <TableCell className="text-[0.95rem]">{user.email}</TableCell>
                                    <TableCell className="text-[0.95rem]">{user.phone}</TableCell>
                                    <TableCell className="text-[0.95rem]">{user.profession}</TableCell>
                                    {
                                        isLoggedIn ? (
                                            <>
                                                <TableCell onClick={() => handleDeleteUser(user?.id ?? "")}>
                                                    {isDeleting && deleteId == user.id ? <Loader2 className="animate-spin mx-auto" /> : <DeleteIcon className="size-5 mx-auto cursor-pointer" />}
                                                </TableCell>
                                                <TableCell>
                                                    <Link href={`/users/add?id=${user.id}`}>
                                                        <EditIcon className="size-5 mx-auto cursor-pointer" />
                                                    </Link>
                                                </TableCell>
                                            </>
                                        ) : null
                                    }

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
