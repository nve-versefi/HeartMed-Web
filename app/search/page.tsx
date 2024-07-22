import { GetServerSideProps } from 'next';
import Link from 'next/link';

interface SearchResult {
  _id: string;
  title: string;
  subcategory: string;
  objectives: string[];
}

interface SearchPageProps {
  results: SearchResult[];
  query: string;
}

const SearchPage: React.FC<SearchPageProps> = ({ results, query }) => {
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
                <a>{result.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { q } = context.query;
  
  if (!q) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${encodeURIComponent(q as string)}`);
  const results = await res.json();

  return {
    props: {
      results,
      query: q,
    },
  };
};

export default SearchPage;