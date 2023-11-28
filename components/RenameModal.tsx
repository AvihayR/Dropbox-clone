'use client'
import { useAppStore } from "@/store/store"
import { useUser } from "@clerk/nextjs"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "./ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { updateDoc, doc } from "firebase/firestore"
import { db } from "@/firebase"

function RenameModal() {
    const { user } = useUser()
    const [input, setInput] = useState('')
    const [
        isRenameModalOpen,
        setIsRenameModalOpen,
        fileId,
        filename]
        =
        useAppStore(state => [
            state.isRenameModalOpen,
            state.setIsRenameModalOpen,
            state.fileId,
            state.filename,
        ])


    async function renameFile() {
        if (!user || !fileId) return
        await updateDoc(doc(db, 'users', user.id, 'files', fileId), {
            filename: input
        })
        setInput('')
        setIsRenameModalOpen(false)

    }

    return (
        <Dialog
            open={isRenameModalOpen}
            onOpenChange={(isOpen) => {
                setIsRenameModalOpen(isOpen)
            }}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Rename File</DialogTitle>
                </DialogHeader>
                <Input
                    id="link"
                    defaultValue={filename}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDownCapture={(e) => {
                        if (e.key === 'Enter') {
                            renameFile()
                        }
                    }}
                />
                <div className="btns-container flex space-x-2 py-3">
                    <Button
                        size="sm"
                        className="px-3 flex-1"
                        variant={"ghost"}
                        onClick={() => renameFile()}>
                        <span className="sr-only">Save</span>
                        <span>Save</span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default RenameModal