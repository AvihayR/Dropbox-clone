"use client"

import { FileType } from "@/typings"
import { ColumnDef } from "@tanstack/react-table"
import prettyBytes from "pretty-bytes"
import { ReactNode } from "react"
import { FileIcon, defaultStyles } from 'react-file-icon'
import { PencilIcon } from 'lucide-react'
import { useAppStore } from "@/store/store"


export const columns: ColumnDef<FileType>[] = [

    {
        accessorKey: "type",
        header: "Type",
        cell: ({ renderValue, ...props }) => {
            const type = renderValue() as string
            const extension: string = type.split('/')[1]
            return (
                <div className="w-10">
                    <FileIcon
                        extension={extension}
                        labelColor={'#4FB6F4'}
                        // @ts-ignore
                        {...defaultStyles[extension]}
                    />
                </div>
            )
        }
    },
    {
        accessorKey: "filename",
        header: "Filename",
        cell: ({ renderValue, ...props }) => {
            return (
                <div
                    className="flex items-center gap-4 underline text-blue-500 hover:cursor-pointer"
                    onClick={() => { console.log('file name clicked.') }}
                >
                    <p className="filename">
                        {renderValue() as string}
                    </p>
                    <PencilIcon width={15} />
                </div>
            )
        }
    },
    {
        accessorKey: "timestamp",
        header: "Date Added",
        cell: ({ renderValue, ...props }) => {
            const date = renderValue() as Date

            return (
                <div className="date">
                    <p className="text-sm">{date.toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500">{date.toLocaleTimeString()}</p>
                </div>)
        }
    },
    {
        accessorKey: "size",
        header: "Size",
        cell: ({ renderValue, ...props }) => {
            return <span>{prettyBytes(renderValue() as number)}</span>
        }
    },
    {
        accessorKey: "downloadURL",
        header: "Link",
        cell: ({ renderValue, ...props }) => {
            return <a
                href={renderValue() as string}
                target="_blank"
                className="underline text-blue-500 hover:text-blue-600"
            >
                Download
            </a>
        }
    },
]
