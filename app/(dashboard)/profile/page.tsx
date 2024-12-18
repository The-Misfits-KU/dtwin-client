'use client';

import Cardd from '@/components/dashboard/cardd';
import Post from '@/components/dashboard/post';
import { useActiveAccount, useReadContract } from 'thirdweb/react';
import { contract } from '@/utils/contracts';
import { useUserContext } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const account = useActiveAccount();
  const { walletUser, isUserLoading } = useUserContext();
  const router = useRouter();

  const { data: posts, isPending: isPostsPending } = useReadContract({
    contract,
    method:
      'function getPostByUser(address _user) view returns ((string title, string body, string files, string featuredImage, address userId, uint256 id)[])',
    params: [account?.address as string],
  });

  return (
    <div className='col-span-8'>
      <div className='sticky top-0 p-4 text-black bg-white/80 backdrop-blur-md'>
        <h1 className='text-xl font-bold'>My Profile</h1>
      </div>
      {/* Posts */}
      <Cardd
        followerscount={walletUser?.followers.length}
        followingcount={walletUser?.following.length}
        handle={walletUser?.wallet}
        bio={walletUser?.bio}
        user={walletUser?.name}
        walletUser={walletUser}
      />
      <p className='flex mt-1 ml-4 text-xl text-black font-semiold'>Posts</p>

      <div>
        {posts?.map((post: any) => (
          <Post
            content={post.body}
            handle={walletUser?.userId}
            user={walletUser?.name}
          />
        ))}
      </div>
    </div>
  );
}
