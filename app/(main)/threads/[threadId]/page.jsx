import { cookies } from 'next/headers';
import Comments from '@/components/comments';
import ThreadCard from '@/components/thread-card';
import api from '@/lib/api';

// export async function generateStaticParams() {
//   const threads = await api.getAllThreads();

//   return threads.map((thread) => ({
//     threadId: thread.id,
//   }));
// }

export async function generateMetadata({ params }) {
  const { threadId } = params;
  const threads = await api.getDetailThread(threadId);

  return {
    title: threads.title,
  };
}

export default function Page({ params }) {
  const signIn = cookies().get('signIn')?.value;
  const { threadId } = params;

  return (
    <>
      <header className="mt-20 mb-9">
        <h1 className="font-extrabold text-3xl">Detail Thread</h1>
      </header>
      <ThreadCard threadId={threadId} />
      <Comments threadId={threadId} signIn={signIn} />
    </>
  );
}
