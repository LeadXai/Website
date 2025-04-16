import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bot, ChevronRight, Sparkles, Users, MessageSquare, Calendar, ArrowLeft, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export default function HomePage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleServiceClick = (service: string) => {
    navigate(`/get-started?service=${encodeURIComponent(service)}`);
  };

  const handleEmailSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('email_subscriptions')
        .insert([{ email }]);

      if (error) throw error;
      
      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing:', error);
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Spline Animation Background */}
      <spline-viewer url="https://prod.spline.design/VSt093oMMO1q3lxf/scene.splinecode"></spline-viewer>

      <div className="content-wrapper">
        {/* Navigation */}
        <nav className="relative z-10 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Link to="/" className="cyber-button p-2">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <div className="flex items-center">
                  <Bot className="h-8 w-8 text-white" />
                  <span className="ml-2 text-xl font-bold text-white font-orbitron">LeadXai</span>
                </div>
              </div>
              <div>
                <Link
                  to="/get-started"
                  className="cyber-button"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative">
          <div className="relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-orbitron mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                  AI Automation from the Future
                </h1>
                <p className="text-xl text-gray-400 mb-8 font-exo max-w-2xl mx-auto">
                  Experience futuristic AI chat agents, lead generation, and seamless CRM integrations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/get-started"
                    className="cyber-button inline-flex items-center justify-center"
                  >
                    Request a Demo <ChevronRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <button 
                onClick={() => handleServiceClick('Customer Service Excellence')}
                className="holographic-card p-6 text-left transition-transform hover:scale-105"
              >
                <MessageSquare className="h-8 w-8 mb-4 text-white/80" />
                <h3 className="text-xl font-bold mb-3 font-orbitron">Customer Service</h3>
                <p className="text-gray-400">AI-powered support that delivers exceptional customer experiences 24/7.</p>
              </button>
              
              <button 
                onClick={() => handleServiceClick('Lead Generation')}
                className="holographic-card p-6 text-left transition-transform hover:scale-105"
              >
                <Users className="h-8 w-8 mb-4 text-white/80" />
                <h3 className="text-xl font-bold mb-3 font-orbitron">Lead Generation</h3>
                <p className="text-gray-400">Intelligent lead capture and qualification to boost your sales pipeline.</p>
              </button>
              
              <button 
                onClick={() => handleServiceClick('CRM Integration')}
                className="holographic-card p-6 text-left transition-transform hover:scale-105"
              >
                <Sparkles className="h-8 w-8 mb-4 text-white/80" />
                <h3 className="text-xl font-bold mb-3 font-orbitron">CRM Integration</h3>
                <p className="text-gray-400">Seamless integration with your existing CRM for enhanced workflow.</p>
              </button>
              
              <button 
                onClick={() => handleServiceClick('Appointment Management')}
                className="holographic-card p-6 text-left transition-transform hover:scale-105"
              >
                <Calendar className="h-8 w-8 mb-4 text-white/80" />
                <h3 className="text-xl font-bold mb-3 font-orbitron">Appointment Management</h3>
                <p className="text-gray-400">Automated scheduling and reminder system for improved efficiency.</p>
              </button>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="relative py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="holographic-card p-8">
              <div className="max-w-2xl mx-auto text-center">
                <Mail className="h-12 w-12 mx-auto mb-4 text-white/80" />
                <h2 className="text-2xl font-bold mb-4 font-orbitron">Stay Updated</h2>
                <p className="text-gray-400 mb-6">Subscribe to our newsletter for the latest AI automation insights.</p>
                <form onSubmit={handleEmailSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="cyber-input flex-1"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cyber-button whitespace-nowrap"
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}