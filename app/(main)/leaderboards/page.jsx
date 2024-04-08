import LeaderboardsList from '@/components/leaderboards-list';

export const metadata = {
  title: 'Leaderboards',
};

export default function Page() {
  return (
    <>
      <h1 className="font-extrabold text-3xl mb-6 mt-20">Leaderboards</h1>
      <LeaderboardsList />
    </>
  );
}
