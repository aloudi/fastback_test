import { UserPost } from '@/types';
import { auth } from '@/config/auth';
import { GET_ALL_POSTS_API, GET_POST_API } from '@/constants';

export const getUserPosts = async (): Promise<UserPost[]> => {
  try {
    const session = await auth();
    const res = await fetch(
      `${process.env.BACKEND_API_URL}${GET_ALL_POSTS_API}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.backendTokens?.accessToken}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  } catch (error: any) {
    console.error('Error fetching posts', error?.message);
    throw new Error(error?.message);
  }
};

export const getPostById = async (postId: string): Promise<UserPost> => {
  try {
    const session = await auth();
    const res = await fetch(
      `${process.env.BACKEND_API_URL}${GET_POST_API}?postId=${postId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.backendTokens?.accessToken}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  } catch (error: any) {
    console.error(`Error fetching post id:${postId}`, error?.message);
    throw new Error(error.message);
  }
};
