import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-paper flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-paper2 border-2 border-ink rounded-xl p-8 shadow-sketchy space-y-4">
        <span className="font-mono text-sm font-bold uppercase tracking-wider text-accentRed block">
          404 · Page Not Found
        </span>
        <h1 className="font-hand text-4xl font-bold text-ink">
          Lost in the Curriculum?
        </h1>
        <p className="font-sans text-sm text-ink/80 leading-relaxed">
          The requested syllabus unit or topic diagram does not exist. Return to the main notebook to resume your Semester I studies.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-block px-5 py-2.5 bg-paper border-2 border-ink rounded-lg font-hand text-lg font-bold text-ink hover:bg-gold/20 transition-colors shadow-sketch"
          >
            Back to Semester I Notebook
          </Link>
        </div>
      </div>
    </main>
  );
}
