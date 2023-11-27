import Dropzone from "@/components/Dropzone"
import TableWrapper from "@/components/TableWrapper"
import { getPosts } from "@/services/files.service"
import { FileType } from "@/typings"
import { auth } from "@clerk/nextjs"


async function Dashboard() {
    const { userId } = auth()

    const docsResults = await getPosts(userId)
    // console.log(docsResults.docs[0].data())

    const skeletonFiles: FileType[] = docsResults.docs.map(doc => ({
        id: doc.id,
        filename: doc.data().filename || doc.id,
        timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
        fullName: doc.data().fullName,
        downloadURL: doc.data().downloadURL,
        type: doc.data().type,
        size: doc.data().size,
    }))

    // console.log(docsResults.docs[0].data())
    // console.log(skeletonFiles)

    return (
        <div className="dashboard-container border-t">
            <Dropzone />

            <section className="table-container container space-y-5">
                <h2 className="font-bold">All Files</h2>
                <TableWrapper skeletonFiles={skeletonFiles} />
            </section>

        </div>
    )
}

export default Dashboard