import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 py-12 text-center">
        <div className="holographic-card p-8">
          <CheckCircle className="w-16 h-16 mx-auto mb-6 text-green-400" />
          <h1 className="text-3xl font-inter font-bold mb-4">Thank You!</h1>
          <p className="text-gray-400 mb-8">
            We've received your demo request and will be in touch shortly.
          </p>
          <button
            onClick={() => navigate('/')}
            className="cyber-button"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}