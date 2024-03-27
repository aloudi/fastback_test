import { Metadata } from 'next';
import { getPostById, getUserPosts } from '@/actions';
import { PostDetails } from '@/components';

type Props = {
  params: {
    postId: string;
  };
};

export const generateMetadata = ({ params: { postId } }: Props): Metadata => ({
  title: `Post details`,
});

export default async function ItemDetails({ params: { postId } }: Props) {
  const post = await getPostById(postId);

  return (
    <div>
      <PostDetails post={post} disableLink />
    </div>
  );
}
