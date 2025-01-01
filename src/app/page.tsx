import { client } from '@/sanity/lib/client';
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';

export const revalidate = 10

interface Author {
  name: string;
  currentslug: string;
  image: { asset: { url: string; }; };
}
export interface Blog_post {
  title: string;
  image: { asset: { url: string; }; };
  author: Author;
  content: string;
  currentslug: string;
}




const page = async () => {
  const query = `*[_type== "Blog_post"]  | order(_createdAt desc){
      title,
       image {
         asset->{
           url
         }
       },
        content,
        "currentslug" : slug.current,
   
     author ->{
     name,
         "currentslug" : slug.current,
           image {
         asset->{
           url
         }
       }
   
   }
        }`

  const data: Blog_post[] = await client.fetch(query);
  console.log(data);



  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div>
        <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
        <div className='grid grid-cols-2 gap-10'>

          {data.map((post: Blog_post, index) =>
            <div key={index} className="block  border rounded-lg hover:shadow-lg transition-shadow ">
              <div className='flex flex-col gap-2'>

                <Image src={post.image.asset.url} alt={post.title} width={600} height={600} className=" h-80 rounded"
                />
                <div className='px-6 pb-2'>
                  <h2 className='font-bold'>{post.title}</h2>

                  <div className='flex flex-col gap-2 '>
                    <div className='flex items-center gap-2'>
                      <div className="w-12 h-12 rounded-full overflow-hidden ">
                        <Image
                          src={post.author.image.asset.url}
                          alt={post.author.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full" />

                      </div>
                      <p className='text-sm'> By: {post.author.name}</p>
                    </div>
                    <Button asChild><a href={`/post/${post.currentslug}`}>Read More</a></Button>
                  </div>
                </div>

              </div>
            </div>

          )}
        </div>


      </div>



    </div>
  )
}

export default page