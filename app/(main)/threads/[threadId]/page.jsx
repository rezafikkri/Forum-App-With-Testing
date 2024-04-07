import ThreadCard from '@/components/thread-card';
import api from '@/lib/api';

// export async function generateStaticParams() {
//   const threads = await api.getAllThreads();

//   return threads.map((thread) => ({
//     threadId: thread.id,
//   }));
// }

export default function Page({ params }) {
  const { threadId } = params;
  
  return (
    <>
      <header className="mt-20 mb-9">
        <h1 className="font-extrabold text-3xl">Detail Thread</h1>
      </header>
      <ThreadCard id={threadId} />
    </>
  );
}
