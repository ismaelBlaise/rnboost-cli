import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <article>
      <h1>Page not found</h1>
      <p className="lead">That route does not exist.</p>
      <Link to="/" className="btn btn-primary">
        Back to home
      </Link>
    </article>
  );
}
