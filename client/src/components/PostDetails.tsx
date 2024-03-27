import { UserPost } from '@/types';
import { NavLink } from '@/components';
import { postRoute } from '@/constants';

type Props = {
  post: UserPost;
  disableLink?: boolean;
};

export const PostDetails = ({ post, disableLink }: Props) => (
  <div className='min-w-md overflow-hidden rounded-md bg-white shadow-md'>
    <div className='border-b-2 border-b-gray-200 px-6 py-2'>
      {disableLink ? (
        <h2 className='text-xl font-bold text-gray-800'>{post.title}</h2>
      ) : (
        <NavLink
          href={`${postRoute}/${post.id}`}
          className='text-xl font-bold text-gray-800'
        >
          {post.title}
        </NavLink>
      )}
    </div>
    <div className='px-6 py-6'>
      <p className='text-gray-700'>{post.text}</p>
    </div>
  </div>
);
