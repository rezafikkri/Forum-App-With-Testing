import Navbar from '@/components/navbar';

export default function SignedInLayout({ children }) {
  return (
    <>
      <header className="max-w-5xl mx-auto px-4 sm:px-8">
        <Navbar />
      </header>
      <main className="max-w-4xl mx-auto px-4 sm:px-8">
        {children}
      </main>
      <footer className="max-w-5xl mx-auto px-4 sm:px-8" />
    </>
  );
}
