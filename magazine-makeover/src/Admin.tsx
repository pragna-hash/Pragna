import React, { useState } from 'react';

interface Article {
    id: number;
    title: string;
    category: string;
    author: string;
    date: string;
}

const Admin = () => {
    const [articles, setArticles] = useState<Article[]>([
        { id: 1, title: "Next-Gen AI: The Future is Here", category: "Technology", author: "Pragna Editor", date: "Dec 31, 2025" },
        { id: 2, title: "Traditional Weaves of India", category: "Ethnic", author: "Culture Desk", date: "Dec 30, 2025" },
        { id: 3, title: "Space Exploration Milestones", category: "Science", author: "Science Desk", date: "Dec 28, 2025" },
    ]);

    const [showForm, setShowForm] = useState(false);
    const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
    const [formData, setFormData] = useState({ title: '', category: '', author: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentArticle) {
            setArticles(articles.map(a => a.id === currentArticle.id ? { ...a, ...formData } : a));
        } else {
            const newArticle = { ...formData, id: Date.now(), date: new Date().toLocaleDateString() };
            setArticles([newArticle as Article, ...articles]);
        }
        closeModal();
    };

    const handleEdit = (article: Article) => {
        setCurrentArticle(article);
        setFormData({ title: article.title, category: article.category, author: article.author });
        setShowForm(true);
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure you want to delete this?")) {
            setArticles(articles.filter(a => a.id !== id));
        }
    };

    const closeModal = () => {
        setShowForm(false);
        setCurrentArticle(null);
        setFormData({ title: '', category: '', author: '' });
    };

    return (
        <div className="container-fluid py-4" style={{ background: '#f0f2f5', minHeight: '100vh', fontFamily: "'Poppins', sans-serif" }}>

            {/* --- Stylish Gradient Header --- */}
            <div className="p-5 mb-4 rounded-4 shadow-lg text-white" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <div className="row align-items-center">
                    <div className="col-md-8">
                        <h1 className="fw-bold display-5">Admin Command Center</h1>
                        <p className="lead opacity-75">Manage your magazine's heart and soul with ease.</p>
                    </div>
                    <div className="col-md-4 text-md-end">
                        <button className="btn btn-light btn-lg rounded-pill px-5 fw-bold shadow-sm text-primary" onClick={() => setShowForm(true)}>
                            <i className="bi bi-plus-lg me-2"></i> Create Article
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Quick Stats Cards --- */}
            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm rounded-4 p-3 border-start border-primary border-5">
                        <h6 className="text-muted text-uppercase small fw-bold">Total Articles</h6>
                        <h2 className="fw-bold mb-0">{articles.length}</h2>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm rounded-4 p-3 border-start border-success border-5">
                        <h6 className="text-muted text-uppercase small fw-bold">Live Content</h6>
                        <h2 className="fw-bold mb-0">Active</h2>
                    </div>
                </div>
            </div>

            {/* --- Modern Table Card --- */}
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th className="ps-4 py-3">ARTICLE TITLE</th>
                                <th>CATEGORY</th>
                                <th>AUTHOR</th>
                                <th>DATE</th>
                                <th className="text-end pe-4">ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {articles.map((article) => (
                                <tr key={article.id}>
                                    <td className="ps-4 py-3 fw-bold text-secondary">{article.title}</td>
                                    <td>
                                        <span className={`badge px-3 py-2 rounded-pill ${article.category === 'Technology' ? 'bg-primary' :
                                                article.category === 'Science' ? 'bg-info text-dark' : 'bg-warning text-dark'
                                            }`}>
                                            {article.category}
                                        </span>
                                    </td>
                                    <td className="text-muted"><i className="bi bi-person-circle me-1"></i> {article.author}</td>
                                    <td className="text-muted small">{article.date}</td>
                                    <td className="text-end pe-4">
                                        <button className="btn btn-sm btn-outline-primary rounded-circle me-2" onClick={() => handleEdit(article)}>
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                        <button className="btn btn-sm btn-outline-danger rounded-circle" onClick={() => handleDelete(article.id)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- Glassmorphism Modal --- */}
            {showForm && (
                <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 shadow-lg rounded-4 p-2">
                            <div className="modal-header border-0">
                                <h4 className="fw-bold text-primary">{currentArticle ? 'Update Article' : 'New Masterpiece'}</h4>
                                <button className="btn-close" onClick={closeModal}></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control rounded-3" id="t" placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                                        <label htmlFor="t">Article Title</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <select className="form-select rounded-3" id="c" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required>
                                            <option value="">Select Category</option>
                                            <option value="Technology">Technology</option>
                                            <option value="Science">Science</option>
                                            <option value="Ethnic">Ethnic</option>
                                        </select>
                                        <label htmlFor="c">Category</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control rounded-3" id="a" placeholder="Author" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} required />
                                        <label htmlFor="a">Author Name</label>
                                    </div>
                                </div>
                                <div className="modal-footer border-0">
                                    <button type="button" className="btn btn-light rounded-pill px-4" onClick={closeModal}>Cancel</button>
                                    <button type="submit" className="btn btn-primary rounded-pill px-4 shadow">
                                        {currentArticle ? 'Confirm Changes' : 'Publish Now'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;