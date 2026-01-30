
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Category } from '../types';
import BlogCard from '../components/BlogCard';

const BlogList: React.FC = () => {
  const { posts } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Tất cả'>('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Reset pagination when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'Tất cả' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const categories = ['Tất cả', ...Object.values(Category)];

  return (
    <div className="space-y-12 md:space-y-20 pt-32 pb-12 min-h-screen">
      <div className="space-y-4 text-center max-w-3xl mx-auto px-6 animate-fade-in">
        <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
          Thư viện <span className="text-brand-primary">NilSpace</span>
        </h1>
        <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 font-medium italic">
          Nơi lưu giữ các dự án tâm huyết, mã nguồn mở và cảm hứng thiết kế của tôi.
        </p>

        {/* Search Bar */}
        <div className="pt-8 max-w-lg mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative flex items-center bg-white dark:bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl">
            <svg className="w-5 h-5 text-slate-400 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              className="w-full bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder-slate-500 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-8 animate-slide-up">
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as any)}
              className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 border ${selectedCategory === cat
                ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-105'
                : 'border-white/10 bg-white/5 text-slate-700 dark:text-slate-300 hover:border-brand-primary hover:text-brand-primary hover:bg-white/10'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6 max-w-7xl mx-auto">
          {currentPosts.map((post, idx) => (
            <div key={post.id} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
              <BlogCard post={post} />
            </div>
          ))}
        </div>

        {/* Emtpy State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-32 space-y-6">
            <div className="text-8xl opacity-10 font-black">NULL</div>
            <p className="text-slate-700 dark:text-slate-300 font-medium italic">
              Không tìm thấy nội dung phù hợp. Hãy thử từ khóa khác nhé!
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 pt-10">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 disabled:opacity-30 hover:bg-white/10 transition-all"
            >
              <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${currentPage === i + 1
                    ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-110'
                    : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 disabled:opacity-30 hover:bg-white/10 transition-all"
            >
              <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
