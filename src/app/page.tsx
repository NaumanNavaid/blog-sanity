import { client } from '@/sanity/lib/client';
import React from 'react'
import Image from 'next/image'

interface Author {
  name: string;
  slug: string;
  image: { asset: { url: string; }; };
}
interface Blog_post {
  title: string;
  image: { asset: { url: string; }; };
  author: Author;
  content: string;
}




const page = async () => {
  const query = `*[_type== "Blog_post"]{
      title,
       image {
         asset->{
           url
         }
       },
        content,
        slug,
   
     author ->{
     name,
         slug,
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
      <div className='flex flex-col gap-10'>

          {data.map((post: Blog_post, index) => (
            <div key={index} className="block p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <div className='flex flex-col gap-2'>

                <Image src={post.image.asset.url} alt={post.title} width={300} height={300} className="w-60 h-32 object-cover rounded"
                />
                <h2 className='font-bold'>{post.title}</h2>

                <div className='flex gap-2 '>
                  <div className="w-12 h-12 rounded-full overflow-hidden ">
                    <Image
                      src={post.author.image.asset.url}
                      alt={post.author.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full" />
                  </div>

                  <p className='mt-3'>{post.author.name}</p>
                </div>
              </div>
              <p>{post.content}</p>
            </div>

          ))}
        </div>


      </div>



    </div>
  )
}

export default page