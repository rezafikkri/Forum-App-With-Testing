import Navbar from '@/components/navbar';

export default function SignedInLayout({ children }) {
  return (
    <>
      <header className="max-w-5xl mx-auto px-4 sm:px-8">
        <Navbar />
      </header>
      <main className="max-w-3xl mx-auto px-4 sm:px-8">
        {children}
      </main>
      <footer className="max-w-5xl mx-auto px-4 sm:px-8">
        <p className="mt-20 py-4 text-sm text-gray-500 text-end">Made by Reza Sariful Fikri</p>
      </footer>
    </>
  );
}
