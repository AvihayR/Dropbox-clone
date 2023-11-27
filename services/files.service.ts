import { db, storage } from '@/firebase'
import { addDoc, updateDoc } from 'firebase/firestore'
import { collection, serverTimestamp, doc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import type { UserResource } from '@clerk/types'

export const maxSize = 20971520

export async function uploadPost(user: UserResource, selectedFile: File) {
    const docRef = await addDoc(collection(db, "users", user.id, "files"), {
        userId: user?.id,
        filemame: selectedFile?.name,
        fullName: user.fullName,
        profileImg: user.imageUrl,
        timestamp: serverTimestamp(),
        type: selectedFile.type,
        size: selectedFile.size
    })

    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`)

    uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef)
        await updateDoc(doc(db, 'users', user.id, 'files', docRef.id), {
            downloadURL: downloadURL
        })
    })
}