import './Loading.css';

export function Loading() {
  return (
    <>
      <div className="loading" role="status"></div>

      <span className="loading-text">Loading...</span>
    </>
  );
}
