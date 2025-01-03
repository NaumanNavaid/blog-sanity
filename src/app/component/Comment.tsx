"use client"
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';

const Comment = () => {

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem("comments") || "[]");
    setComments(savedComments);
  }, []);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (comment.trim()) {
      const newComments = [...comments, comment];
      setComments(newComments);
      setComment(""); // Clear the input field
    }
  };

  const handleDelete = (index: number) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments); // Remove the comment from the state
  };

  return (
    <div className='flex flex-col gap-4 max-w-3xl mx-auto mt-10'>
      <h2 className='font-bold text-2xl'>Comment here</h2>

      <form onSubmit={handleSubmit} className='flex gap-2 flex-col'>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here"
          className='border border-gray-300 rounded-md p-2'
        />
        <Button type='submit' className='w-48'>
          Submit Comment
        </Button>
      </form>

      <div className='space-y-4'></div>

      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div key={index} className='p-4 border border-gray-300 rounded-lg'>
            <p>{comment}</p>
            <Button
              onClick={() => handleDelete(index)}
              className='mt-2 '
            >
              Delete
            </Button>
          </div>
        ))
      ) : (
        <p className='text-gray-600'>No comments. Be the first to comment!</p>
      )}
    </div>
  );
};

export default Comment;
