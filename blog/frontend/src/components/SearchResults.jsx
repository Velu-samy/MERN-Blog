import React from "react";
import { useLocation, Link } from "react-router-dom";

function SearchResults({ blogs }) {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Search Results for: "{searchQuery}"</h1>
      {filteredBlogs.length ? (
        filteredBlogs.map((blog) => (
          <div key={blog.id} className="mb-4 p-5 border border-gray-300">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p>{blog.summary}</p>
            <Link to={`/blog/${blog.id}`} className="text-blue-500">Read More</Link>
          </div>
        ))
      ) : (
        <p>No blogs found for "{searchQuery}".</p>
      )}
    </div>
  );
}

export default SearchResults;