import { getUserPosts } from '@/actions';
import { PostDetails } from '@/components';
import { UserPost } from '@/types';
import { Metadata } from 'next';

export const generateMetadata = (): Metadata => ({
  title: `Dashboard`,
});

export default async function DashboardPage() {
  const posts = await getUserPosts();

  return (
    <>
      <h1 className='mb-2'>Dashboard</h1>
      <h2 className='mb-2'>User Posts</h2>
      <div className='flex flex-col gap-2'>
        {posts?.map((post: UserPost) => (
          <PostDetails key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
