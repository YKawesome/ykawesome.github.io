import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { images } from "../../utils/preloadimages";
import { postsMeta } from "./posts/postsMeta";
import { Link } from "react-router-dom";

function Blog() {
    const posts = postsMeta;

    const allTags = useMemo(
        () =>
            Array.from(
                posts.reduce((set, p) => {
                    p.tags.forEach((t) => set.add(t));
                    return set;
                }, new Set())
            ).sort(),
        [posts]
    );

    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 6;

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return posts.filter((p) => {
            const matchesQuery = !q
                ? true
                : p.title.toLowerCase().includes(q) ||
                    p.excerpt.toLowerCase().includes(q) ||
                    p.tags.some((t) => t.toLowerCase().includes(q));
            const matchesTags = selected.length === 0 || selected.every((t) => p.tags.includes(t));
            return matchesQuery && matchesTags;
        });
    }, [posts, query, selected]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const pageItems = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filtered.slice(start, start + pageSize);
    }, [filtered, currentPage]);

    const toggleTag = (tag) => {
        setPage(1);
        setSelected((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const setPageSafe = (p) => setPage(Math.min(Math.max(1, p), totalPages));

    const heroImage = images["yousefbgcolonthree.png"] || images["herobg.png"];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-base-100 min-h-screen"
        >
            {/* Hero */}
            <div
                className="hero min-h-[40vh]"
                style={{ backgroundImage: heroImage ? `url(${heroImage})` : undefined }}
            >
                <div className="hero-overlay bg-opacity-70"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-2xl">
                        <h1 className="text-5xl md:text-6xl font-bold">Blog</h1>
                        <p className="mt-4 opacity-90">
                            Notes, write-ups, and dev logs from projects I did for fun :D
                        </p>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 -mt-10">
                <div className="glass bg-base-100/60 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6">
                    <div className="flex flex-col gap-4">
                        <div className="w-full">
                            <label className="input input-bordered flex items-center gap-2 w-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 opacity-70"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.5 3.75a6.75 6.75 0 1 0 3.862 12.285l4.451 4.452a.75.75 0 1 0 1.06-1.06l-4.451-4.452A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    className="grow w-full"
                                    placeholder="Search posts, tags, or text..."
                                    value={query}
                                    onChange={(e) => {
                                        setPage(1);
                                        setQuery(e.target.value);
                                    }}
                                />
                            </label>
                        </div>

                        <div className="flex flex-wrap gap-2 items-center">
                            <span className="text-sm opacity-70 mr-1">Tags:</span>
                            {allTags.map((tag) => {
                                const active = selected.includes(tag);
                                return (
                                    <button
                                        key={tag}
                                        className={`btn btn-sm ${
                                            active ? "btn-primary" : "btn-outline"
                                        }`}
                                        onClick={() => toggleTag(tag)}
                                    >
                                        {tag}
                                    </button>
                                );
                            })}
                            {selected.length > 0 && (
                                <button
                                    className="btn btn-sm btn-ghost ml-1"
                                    onClick={() => {
                                        setSelected([]);
                                        setPage(1);
                                    }}
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts grid */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
                {pageItems.length === 0 ? (
                    <div className="text-center py-16 opacity-70">No posts found.</div>
                ) : (
                    <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {pageItems.map((post) => {
                            const src = images[post.imageKey];
                            return (
                                <div key={post.id} className="card bg-base-100 shadow-xl overflow-hidden">
                                    {src ? (
                                        <figure className="max-h-40 overflow-hidden">
                                            <img src={src} alt={post.title} className="w-full object-cover" />
                                        </figure>
                                    ) : (
                                        <div className="h-40 w-full bg-base-200" />
                                    )}
                                    <div className="card-body">
                                        <div className="flex items-center justify-between gap-2">
                                            <h2 className="card-title text-base-content">{post.title}</h2>
                                            <span className="badge badge-ghost whitespace-nowrap">{post.date}</span>
                                        </div>
                                        <p className="opacity-80 text-sm">{post.excerpt}</p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {post.tags.map((t) => (
                                                <span key={t} className="badge badge-outline">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="card-actions justify-end mt-3">
                                            <Link className="btn btn-secondary btn-sm" to={`/blog/${post.slug}`}>
                                                Read more
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Pagination */}
                {filtered.length > pageSize && (
                    <div className="flex items-center justify-center mt-10">
                        <div className="join">
                            <button
                                className="btn btn-sm join-item"
                                onClick={() => setPageSafe(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                «
                            </button>
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    className={`btn btn-sm join-item ${
                                        currentPage === i + 1 ? "btn-primary" : ""
                                    }`}
                                    onClick={() => setPageSafe(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                className="btn btn-sm join-item"
                                onClick={() => setPageSafe(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                »
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default Blog;