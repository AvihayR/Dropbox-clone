import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'


export default function Home() {
  return (
    <main className=''>
      <article className='hero flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800'>
        <div className='heading-container p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y5'>
          <h1 className='heading text-5xl font-bold pb-5'>
            Welcome to Dropbox.
            <br />
            Storing everything for you and you business needs. All in one place
          </h1>
          <p className='pb-20'>
            Collaborate seamlessly and deliver work faster from anywhere with Dropbox. Securely store your content, edit PDFs, share videos, sign documents and track file engagement—without leaving Dropbox.
          </p>
          <Link href='/dashboard' className='flex cursor-pointer bg-blue-500 p-5 w-fit'>
            Try it for free!
            <ArrowRight className='ml-10' />
          </Link>
        </div>
        <div className='video-container bg-[#1E1919] dark:bg-slate-800 h-full p-10'>
          <video autoPlay loop muted className='rounded-lg'>
            <source
              src='https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4'
              type='video/mp4'
            />
            Your browser does not support this video tag
          </video>
        </div>
      </article>

      <p className='text-center font-bold text-xl pt-5'>Disclaimer</p>
      <p className='text-center font-light p-2'>
        This app is made for educational purposes only.
        I do not own or affiliate  with Dropbox or/and any of its subsidiaries in any form.
        All copyrights belong to Dropbox.
      </p>
    </main>
  )
}
