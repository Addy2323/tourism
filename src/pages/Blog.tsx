import React, { useState, useEffect } from 'react';
import { Calendar, User, Clock, ArrowRight, Search, Tag, CheckCircle, AlertCircle, X } from 'lucide-react';

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [flashMessage, setFlashMessage] = useState<{type: 'success' | 'error' | 'info', message: string} | null>(null);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  const featuredPost = {
    id: 1,
    title: "The Ultimate Guide to Witnessing the Great Migration",
    excerpt: "Everything you need to know about timing, locations, and what to expect during one of nature's most spectacular events.",
    image: "https://images.pexels.com/photos/1670732/pexels-photo-1670732.jpeg?auto=compress&cs=tinysrgb&w=1200",
    author: "David Mwangi",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Wildlife"
  };

  const blogPosts = [
    {
      id: 2,
      title: "Climbing Kilimanjaro: A Beginner's Complete Guide",
      excerpt: "From choosing the right route to packing essentials, here's everything first-time climbers need to know.",
      image: "https://media.istockphoto.com/id/2165088270/photo/young-african-elephant-in-front-of-kilimanjaro-mountain-in-amboseli-national-park-kenya.webp?a=1&b=1&s=612x612&w=0&k=20&c=H9QholIkG3QBt8HcSvj8V0LVZbnZTLHXZJDdZ9s15HM=",
      author: "James Mollel",
      date: "March 10, 2024",
      readTime: "12 min read",
      category: "Adventure"
    },
    {
      id: 3,
      title: "Zanzibar's Hidden Gems: Beyond Stone Town",
      excerpt: "Discover the secret beaches, local markets, and cultural experiences that most tourists miss.",
      image: "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=600",
      author: "Grace Mushi",
      date: "March 8, 2024",
      readTime: "6 min read",
      category: "Culture"
    },
    {
      id: 4,
      title: "Best Time to Visit Tanzania: A Month-by-Month Guide",
      excerpt: "Plan your perfect trip with our comprehensive guide to Tanzania's seasons and weather patterns.",
      image: "https://media.gettyimages.com/id/1186537386/photo/paradise-of-ngorongoro-crater.jpg?s=612x612&w=0&k=20&c=Hwz0QCuaxTC0SYB6dtB1f5utCV8cAfnpXFJCqEHUrBg=",
      author: "Sarah Kimani",
      date: "March 5, 2024",
      readTime: "10 min read",
      category: "Travel Tips"
    },
    {
      id: 5,
      title: "Maasai Culture: Traditions in the Modern World",
      excerpt: "Learn about the rich traditions of the Maasai people and how they're adapting to contemporary life.",
      image: "https://images.pexels.com/photos/6492400/pexels-photo-6492400.jpeg?auto=compress&cs=tinysrgb&w=600",
      author: "Grace Mushi",
      date: "March 1, 2024",
      readTime: "7 min read",
      category: "Culture"
    },
    {
      id: 6,
      title: "Photography Tips for Your Tanzania Safari",
      excerpt: "Capture stunning wildlife photos with these expert tips from professional safari photographers.",
      image: "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=600",
      author: "David Mwangi",
      date: "February 28, 2024",
      readTime: "9 min read",
      category: "Photography"
    },
    {
      id: 7,
      title: "Sustainable Tourism: How Your Visit Helps Tanzania",
      excerpt: "Discover how responsible tourism is making a positive impact on conservation and local communities.",
      image: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600",
      author: "Sarah Kimani",
      date: "February 25, 2024",
      readTime: "5 min read",
      category: "Conservation"
    }
  ];

  const categories = ["All", "Wildlife", "Adventure", "Culture", "Travel Tips", "Photography", "Conservation"];

  // Flash message handler
  const showFlashMessage = (type: 'success' | 'error' | 'info', message: string) => {
    setFlashMessage({ type, message });
    setTimeout(() => setFlashMessage(null), 5000);
  };

  // Search and filter functionality
  useEffect(() => {
    let filtered = blogPosts;

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    setFilteredPosts(filtered);

    // Show search results feedback
    if (searchTerm.trim() && filtered.length === 0) {
      showFlashMessage('info', `🔍 No articles found for "${searchTerm}". Try different keywords or browse our categories!`);
    } else if (searchTerm.trim() && filtered.length > 0) {
      showFlashMessage('success', `✨ Found ${filtered.length} article${filtered.length === 1 ? '' : 's'} matching "${searchTerm}"!`);
    }
  }, [searchTerm, selectedCategory]);

  // Initialize filtered posts
  useEffect(() => {
    setFilteredPosts(blogPosts);
  }, []);

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Clear search-related errors
    if (formErrors.search) {
      setFormErrors(prev => ({ ...prev, search: '' }));
    }
  };

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    
    if (category === 'All') {
      showFlashMessage('info', '📚 Showing all articles - explore our complete collection of travel stories!');
    } else {
      const categoryCount = blogPosts.filter(post => post.category === category).length;
      showFlashMessage('success', `🎯 Filtered to ${category} - found ${categoryCount} amazing article${categoryCount === 1 ? '' : 's'}!`);
    }
  };

  // Newsletter validation
  const validateNewsletterEmail = (email: string) => {
    const errors: {[key: string]: string} = {};
    
    if (!email.trim()) {
      errors.newsletter = '📧 Please enter your email to stay updated with our latest travel stories!';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.newsletter = '📧 Please enter a valid email address (e.g., traveler@example.com)';
    } else if (email.length > 100) {
      errors.newsletter = '📧 Email address is too long. Please use a shorter email address.';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle newsletter signup
  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateNewsletterEmail(newsletterEmail)) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        showFlashMessage('success', `🎉 Welcome aboard, fellow traveler! You're now subscribed to our newsletter with ${newsletterEmail}. Get ready for amazing travel insights!`);
        setNewsletterEmail('');
      }, 1500);
    } else {
      showFlashMessage('error', '⚠️ Please enter a valid email address to join our travel community!');
    }
  };

  // Handle newsletter email change
  const handleNewsletterEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewsletterEmail(value);
    
    // Clear errors as user types
    if (formErrors.newsletter) {
      setFormErrors(prev => ({ ...prev, newsletter: '' }));
    }
  };

  // Handle load more articles
  const handleLoadMore = () => {
    setIsLoading(true);
    showFlashMessage('info', '📖 Loading more amazing travel stories for you...');
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      showFlashMessage('success', '✨ More incredible travel stories loaded! Keep exploring our adventures!');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-emerald-600 to-emerald-800 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            Travel <span className="text-amber-400">Stories & Tips</span>
          </h1>
          <p className="text-xl">Insights, guides, and inspiration for your Tanzania adventure</p>
        </div>
      </section>

      {/* Flash Message */}
      {flashMessage && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className={`p-4 rounded-lg flex items-center space-x-3 ${
            flashMessage.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
            flashMessage.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
            'bg-blue-100 text-blue-800 border border-blue-200'
          }`}>
            {flashMessage.type === 'success' ? <CheckCircle className="w-5 h-5" /> : 
             flashMessage.type === 'error' ? <AlertCircle className="w-5 h-5" /> : 
             <AlertCircle className="w-5 h-5" />}
            <span className="font-medium flex-1">{flashMessage.message}</span>
            <button 
              onClick={() => setFlashMessage(null)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
              />
              {formErrors.search && (
                <div className="text-red-600 text-sm mt-2">{formErrors.search}</div>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-emerald-500 text-white border-emerald-500'
                      : 'border-gray-300 text-gray-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center mb-4">
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium ml-2">
                    {featuredPost.category}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-emerald-600 transition-colors duration-300">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors duration-200">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Articles Found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm ? `No articles match "${searchTerm}"` : `No articles in ${selectedCategory} category`}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  showFlashMessage('info', '🔄 Filters cleared! Showing all our amazing travel stories again.');
                }}
                className="bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-emerald-600 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{post.date}</span>
                      <button 
                        onClick={() => showFlashMessage('info', `📖 Opening "${post.title}" - get ready for an amazing read!`)}
                        className="flex items-center space-x-1 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors duration-200"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get the latest travel tips, destination guides, and exclusive offers delivered to your inbox
          </p>
          <form onSubmit={handleNewsletterSignup} className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={handleNewsletterEmailChange}
                className="flex-1 px-4 py-3 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                disabled={isLoading}
              />
              <button 
                type="submit"
                disabled={isLoading}
                className={`px-6 py-3 rounded-r-xl font-semibold transition-all duration-200 ${
                  isLoading 
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                    : 'bg-amber-500 text-white hover:bg-amber-600 transform hover:scale-105'
                }`}
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            {formErrors.newsletter && (
              <div className="text-red-200 text-sm mt-2 bg-red-500/20 p-2 rounded-lg">
                {formErrors.newsletter}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Load More */}
      <section className="py-12">
        <div className="text-center">
          <button 
            onClick={handleLoadMore}
            disabled={isLoading}
            className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 ${
              isLoading
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 transform hover:scale-105'
            }`}
          >
            {isLoading ? 'Loading More...' : 'Load More Articles'}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Blog;