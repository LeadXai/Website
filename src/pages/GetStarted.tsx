import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Bot } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FormData {
  full_name: string;
  business_email: string;
  company_name: string;
  service_needed: string;
  challenges: string;
  additional_info?: string;
}

export default function GetStarted() {
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const service = searchParams.get('service');
    if (service) {
      setValue('service_needed', service);
    }
  }, [location, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await supabase
        .from('demo_requests')
        .insert([{
          full_name: data.full_name,
          business_email: data.business_email,
          company_name: data.company_name,
          service_needed: data.service_needed,
          challenges: data.challenges,
          additional_info: data.additional_info
        }]);

      if (error) throw error;
      
      toast.success('Demo request submitted successfully!');
      navigate('/thank-you');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Bot className="w-10 h-10" />
          <h1 className="text-3xl font-inter font-bold">LeadXai: AI Automation</h1>
        </div>
        
        <div className="text-gray-400 mb-12">
          <h2 className="text-lg font-inter">
            Customer Service - Lead Generation - CRM Integration - Appointment Management
          </h2>
        </div>

        <div className="holographic-card p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  {...register('full_name', { required: 'Full name is required' })}
                  type="text"
                  id="full_name"
                  className="cyber-input w-full"
                  placeholder="John Doe"
                />
                {errors.full_name && (
                  <p className="text-red-400 text-sm mt-1">{errors.full_name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="business_email" className="block text-sm font-medium mb-2">
                  Business Email *
                </label>
                <input
                  {...register('business_email', {
                    required: 'Business email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  type="email"
                  id="business_email"
                  className="cyber-input w-full"
                  placeholder="john@company.com"
                />
                {errors.business_email && (
                  <p className="text-red-400 text-sm mt-1">{errors.business_email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="company_name" className="block text-sm font-medium mb-2">
                Company Name *
              </label>
              <input
                {...register('company_name', { required: 'Company name is required' })}
                type="text"
                id="company_name"
                className="cyber-input w-full"
                placeholder="Company Inc."
              />
              {errors.company_name && (
                <p className="text-red-400 text-sm mt-1">{errors.company_name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="service_needed" className="block text-sm font-medium mb-2">
                Service Needed *
              </label>
              <select
                {...register('service_needed', { required: 'Please select a service' })}
                id="service_needed"
                className="cyber-input w-full"
              >
                <option value="">Select a service</option>
                <option value="Customer Service Excellence">Customer Service Excellence</option>
                <option value="Lead Generation">Lead Generation</option>
                <option value="CRM Integration">CRM Integration</option>
                <option value="Appointment Management">Appointment Management</option>
              </select>
              {errors.service_needed && (
                <p className="text-red-400 text-sm mt-1">{errors.service_needed.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="challenges" className="block text-sm font-medium mb-2">
                What challenges are you looking to solve? *
              </label>
              <textarea
                {...register('challenges', { required: 'Please describe your challenges' })}
                id="challenges"
                rows={4}
                className="cyber-input w-full"
                placeholder="Describe your current challenges and goals..."
              />
              {errors.challenges && (
                <p className="text-red-400 text-sm mt-1">{errors.challenges.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="additional_info" className="block text-sm font-medium mb-2">
                Additional Information
              </label>
              <textarea
                {...register('additional_info')}
                id="additional_info"
                rows={4}
                className="cyber-input w-full"
                placeholder="Any additional information you'd like to share..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="cyber-button w-full"
            >
              {isSubmitting ? 'Submitting...' : 'Request Demo'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}