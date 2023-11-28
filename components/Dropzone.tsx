'use client'
import { useUser } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import DropzoneCmp from 'react-dropzone'
import { uploadPost, maxSize } from '@/services/files.service'
import { db, storage } from '@/firebase'
import { addDoc, updateDoc } from 'firebase/firestore'
import { collection, serverTimestamp, doc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import toast from 'react-hot-toast'


function Dropzone() {
    const [loading, setLoading] = useState(false)
    const { isLoaded, isSignedIn, user } = useUser()

    const onDrop = (acceptedFiles: File[]) => {
        acceptedFiles.forEach(file => {
            const reader = new FileReader()

            reader.onabort = () => console.log('Filed reading was aborted')
            reader.onerror = () => console.log('Filed reading has failed')
            reader.onload = async () => {
                await onUploadPost(file)
            }
            reader.readAsArrayBuffer(file)
        })
    }

    const onUploadPost = async (selectedFile: File) => {
        if (loading) return
        if (!user) return

        setLoading(true)
        const toastId = toast.loading('Uploading..')

        uploadPost(user, selectedFile)

        toast.success('Uploaded file successfully!', {
            id: toastId
        })
        setLoading(false)
    }

    return (
        <DropzoneCmp
            minSize={0}
            maxSize={maxSize}
            onDrop={onDrop}
        >
            {({ getRootProps,
                getInputProps,
                isDragActive,
                isDragReject,
                fileRejections
            }) => {
                const isFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > maxSize
                return (
                    <section className='m-4'>
                        <div
                            {...getRootProps()}
                            className={cn('w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center',
                                isDragActive ? 'bg-[#035FFE] text-white animate-pulse' : 'bg-slate-100/50 dark:bg-slate-800/80 text-slate-400')}>
                            <input {...getInputProps()} />
                            {!isDragActive && 'Click here or drop a file to upload'}
                            {isDragActive && !isDragReject && 'Drop to upload this!'}
                            {isDragReject && 'File type not accepted, sorry!'}
                            {isFileTooLarge && (
                                <div className='large-file-txt text-danger mt-2'>
                                    File is too large.
                                </div>
                            )}
                        </div>
                    </section>
                )
            }}
        </DropzoneCmp>
    )
}

export default Dropzone
