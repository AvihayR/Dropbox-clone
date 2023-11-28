import { db, storage } from '@/firebase'
import { addDoc, updateDoc } from 'firebase/firestore'
import { deleteDoc, query, orderBy, getDocs, collection, serverTimestamp, doc } from 'firebase/firestore'
import { deleteObject, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import type { UserResource } from '@clerk/types'


export const maxSize = 20971520

export async function uploadPost(user: UserResource, selectedFile: File) {
    const docRef = await addDoc(collection(db, "users", user.id, "files"), {
        userId: user?.id,
        filename: selectedFile?.name,
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

export async function getPosts(userId: string | null) {
    return getDocs(collection(db, 'users', userId!, 'files'))
}

export function getSortedPosts(userId: string | null, sort: 'asc' | 'desc') {
    return query(
        collection(db, 'users', userId!, 'files'),
        orderBy('timestamp', sort)
    )
}

export async function deletePost(userId: string, fileId: string) {
    const fileRef = ref(storage, `users/${userId}/files/${fileId}`)

    try {
        await deleteObject(fileRef)
        await deleteDoc(doc(db, 'users', userId, 'files', fileId))
        console.log('Deleted!')
    } catch (err) {
        console.log(err)
    }

}

export async function updatePost(userId: string, fileId: string, input: string) {
    await updateDoc(doc(db, 'users', userId, 'files', fileId), {
        filename: input
    })
}