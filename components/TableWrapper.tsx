'use client'

import { FileType } from '@/typings'
import { Button } from './ui/button'
import { DataTable } from './Table'
import { columns } from './TableColumns'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { getSortedPosts } from '@/services/files.service'
import { Skeleton } from "@/components/ui/skeleton"


export function TableWrapper({ skeletonFiles }: { skeletonFiles: FileType[] }) {
    const { user } = useUser()
    const [initialFiles, setInitialFiles] = useState<FileType[]>([])
    const [sort, setSort] = useState<"desc" | "asc">("desc")

    const [docs, loading, error] = useCollection(
        user &&
        getSortedPosts(user.id, sort)
    )


    useEffect(() => {
        if (!docs) return

        const files: FileType[] = docs.docs.map(doc => ({
            id: doc.id,
            filename: doc.data().filename || doc.id,
            timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
            fullName: doc.data().fullName,
            downloadURL: doc.data().downloadURL,
            type: doc.data().type,
            size: doc.data().size,
        }))

        setInitialFiles(files)
    }, [docs])


    if (docs?.docs.length === undefined) {
        return (
            <div className='skeleton-container flex flex-col space-y-5 pb-10'>
                <Button variant={'outline'} className='ml-auto w-36 h-10 mb-5'>
                    <Skeleton className='h-5 w-full' />
                </Button>

                <div className="skeleton-container border rounded-lg">
                    <div className='t-head-skeleton border-b h-12'></div>
                    {skeletonFiles.map(file => (
                        <div key={file.id} className='flex items-center space-x-4 p-5 w-full'>
                            <Skeleton className='rounded h-12 w-12' />
                            <Skeleton className='rounded h-12 w-full' />
                        </div>
                    ))}
                    {skeletonFiles.length === 0 &&
                        <div className='flex items-center space-x-4 p-5 w-full'>
                            <Skeleton className='rounded h-12 w-12' />
                            <Skeleton className='rounded h-12 w-full' />
                        </div>
                    }
                </div>
            </div>
        )
    }

    return (
        <div className='table-wrapper flex flex-col space-y-5 pb-10'>
            <Button
                onClick={() => { setSort(sort === 'desc' ? 'asc' : 'desc') }}
                variant={'outline'}
                className='ml-auto w-fit'

            >Sort by: {sort === 'desc' ? 'Newest' : 'Oldest'}</Button>
            <DataTable columns={columns} data={initialFiles} />
        </div>
    )
}

export default TableWrapper