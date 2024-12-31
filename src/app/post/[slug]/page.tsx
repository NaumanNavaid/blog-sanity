import { client } from '@/sanity/lib/client';
import React from 'react';


interface Author {
    name: string;
    currentslug: string;
    image: { asset: { url: string; }; };
}
interface Blog_post {
    [x: string]: any;
    title: string;
    image: { asset: { url: string; }; };
    author: Author;
    content: string;
    currentslug: string
}
 const getdata = async (slug: string) => {

    const query = `*[_type== "Blog_post" && slug.current=="${slug}"]  
    {
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
          }[0]`;

          const data: Blog_post = await client.fetch(query);
          return data
       }
 

const page = async ({ params }: { params: { slug: string } }) => {
   
    const data: Blog_post = await getdata(params.slug);
    console.log(data);




    return (
        <div>
      
            <h1>{data.title}</h1>
        </div>
    )
}

export default page