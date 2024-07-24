import { Metadata } from 'next';
import Link from 'next/link';

interface SearchResult {
  _id: string;
  title: string;
  subcategory: string;
  objectives: string[];
}

export async function generateMetadata({ searchParams }: { searchParams: { q: string } }): Promise<Metadata> {
  return {
    title: `Search Results for "${searchParams.q}"`,
  };
}

async function getSearchResults(query: string): Promise<SearchResult[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${encodeURIComponent(query)}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch search results');
  }
  return res.json();
}

export default async function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q;

  if (!query) {
    return { redirect: { destination: '/', permanent: false } };
  }

  const results = await getSearchResults(query);

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {results.map((result) => (
            <li key={result._id}>
              <Link href={`/${result.subcategory}/${result.objectives[0]}/${result.title}`}>
                {result.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
