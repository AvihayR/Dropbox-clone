"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import { TrashIcon } from 'lucide-react'
import { useAppStore } from "@/store/store"
import { FileType } from "@/typings"
import { ReactNode } from "react"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const [
        setIsDeleteModalOpen,
        setFileId,
        setFilename,
        setIsRenameModalOpen]
        =
        useAppStore(state => [
            state.setIsDeleteModalOpen,
            state.setFileId,
            state.setFilename,
            state.setIsRenameModalOpen,
        ])


    const openDelteModal = (fileId: string) => {
        setFileId(fileId)
        setIsDeleteModalOpen(true)
        console.log(fileId)
    }

    const openRenameModal = (fileId: string, filename: string) => {
        setFileId(fileId)
        setFilename(filename)
        setIsRenameModalOpen(true)
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    (cell.column.id === 'filename') ?
                                        <TableCell
                                            key={cell.id}
                                            onClick={() => {
                                                openRenameModal(
                                                    (row.original as FileType).id,
                                                    (row.original as FileType).filename,
                                                )
                                            }}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                        :
                                        <TableCell
                                            key={cell.id}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>

                                ))}
                                <TableCell>
                                    <Button
                                        className="w-12 h-12"
                                        variant={'outline'}
                                        onClick={() => { openDelteModal((row.original as FileType).id) }}
                                    >
                                        <TrashIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No files to show.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>

            </Table>
        </div>
    )
}
