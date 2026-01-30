import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const SearchOverlay: React.FC = () => {
    const { posts } = useApp();
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            setQuery('');
        }
    }, [isOpen]);

    const filteredPosts = query.trim() === '' ? [] : posts.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        post.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)} />

            <div className="relative w-full max-w-2xl bg-[#0f1014] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-in flex flex-col">
                <div className="flex items-center px-4 border-b border-white/10">
                    <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input
                        ref={inputRef}
                        type="text"
                        className="w-full bg-transparent border-none text-white px-4 py-4 focus:ring-0 placeholder-slate-500"
                        placeholder="Tìm kiếm bài viết, thẻ, chủ đề..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={() => setIsOpen(false)} className="px-2 py-1 text-xs font-mono text-slate-500 border border-white/10 rounded">ESC</button>
                </div>

                <div className="max-h-[60vh] overflow-y-auto">
                    {filteredPosts.length > 0 ? (
                        <div className="p-2 space-y-1">
                            <h4 className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Kết quả tìm kiếm</h4>
                            {filteredPosts.map(post => (
                                <Link
                                    key={post.id}
                                    to={`/post/${post.id}`}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                                >
                                    <img src={post.imageUrl} alt={post.title} className="w-12 h-8 object-cover rounded shadow-sm opacity-80 group-hover:opacity-100" />
                                    <div className="flex-1 min-w-0">
                                        <h5 className="text-sm font-bold text-slate-200 group-hover:text-brand-primary truncate">{post.title}</h5>
                                        <div className="flex gap-2 text-[10px] text-slate-500">
                                            <span>{new Date(post.date).toLocaleDateString()}</span>
                                            <span>•</span>
                                            <span>{post.category}</span>
                                        </div>
                                    </div>
                                    <svg className="w-4 h-4 text-slate-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </Link>
                            ))}
                        </div>
                    ) : query.trim() !== '' ? (
                        <div className="p-8 text-center text-slate-500 text-sm">
                            Không tìm thấy kết quả nào cho "{query}"
                        </div>
                    ) : (
                        <div className="p-8 text-center">
                            <p className="text-slate-500 text-sm font-medium">Nhập từ khóa để tìm kiếm...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchOverlay;
