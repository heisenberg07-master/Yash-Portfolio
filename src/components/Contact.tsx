"use client";
import { useState, useRef, useEffect } from 'react';
import { Mail, Send, MapPin, Copy, Check, MessageCircle, Clock, Zap } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa6';

function useIntersection(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'yashsaraf2312@gmail.com',
    href: 'mailto:yashsaraf2312@gmail.com',
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-500/10',
    copyable: true,
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/yash-saraf-5885791a6',
    href: 'https://www.linkedin.com/in/yash-saraf-5885791a6/',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-600/10',
    copyable: false,
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: 'github.com/heisenberg07-master',
    href: 'https://github.com/heisenberg07-master',
    color: 'text-dark-800 dark:text-slate-200',
    bgColor: 'bg-gray-50 dark:bg-dark-600',
    copyable: false,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Pune, Maharashtra, India',
    href: 'https://maps.google.com/?q=Pune,India',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-500/10',
    copyable: false,
  },
];

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [focused, setFocused] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'YOUR_WEB3FORMS_KEY',
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'New message from Portfolio',
          message: formData.message,
          from_name: 'Portfolio Contact Form'
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        console.error('Web3Forms Error:', result);
        setStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 5000);
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-600 border transition-all duration-300 text-dark-900 dark:text-white placeholder-dark-300 dark:placeholder-slate-500 outline-none text-sm ${
      errors[field as keyof FormErrors]
        ? 'border-red-300 dark:border-red-500/50'
        : focused === field
          ? 'border-primary-400 dark:border-primary-500 bg-white dark:bg-dark-500 ring-2 ring-primary-500/20'
          : 'border-gray-200 dark:border-dark-500 hover:border-gray-300 dark:hover:border-dark-400'
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder="Your Name *"
            value={formData.name}
            onChange={e => { setFormData(d => ({ ...d, name: e.target.value })); setErrors(e => ({ ...e, name: undefined })); }}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused(null)}
            className={inputClass('name')}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder="Your Email *"
            value={formData.email}
            onChange={e => { setFormData(d => ({ ...d, email: e.target.value })); setErrors(e => ({ ...e, email: undefined })); }}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            className={inputClass('email')}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      <input
        type="text"
        placeholder="Subject (Optional)"
        value={formData.subject}
        onChange={e => setFormData(d => ({ ...d, subject: e.target.value }))}
        onFocus={() => setFocused('subject')}
        onBlur={() => setFocused(null)}
        className={inputClass('subject')}
      />

      <div>
        <textarea
          rows={5}
          placeholder="Your Message *"
          value={formData.message}
          onChange={e => { setFormData(d => ({ ...d, message: e.target.value })); setErrors(e => ({ ...e, message: undefined })); }}
          onFocus={() => setFocused('message')}
          onBlur={() => setFocused(null)}
          className={`${inputClass('message')} resize-none`}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.message ? <p className="text-red-500 text-xs">{errors.message}</p> : <span />}
          <span className="text-xs text-dark-300 dark:text-slate-500">{formData.message.length}/500</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'sending' || status === 'success'}
        className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed btn-primary"
      >
        {status === 'sending' ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : status === 'success' ? (
          <>
            <Check className="w-4 h-4" />
            Message Sent! I'll reply soon.
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async (e: React.MouseEvent) => {
    e.preventDefault();
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="w-7 h-7 rounded-lg flex items-center justify-center text-dark-400 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-600/10 transition-all duration-200"
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

export default function Contact() {
  const { ref, visible } = useIntersection(0.05);

  return (
    <section id="contact" className="section-padding bg-white dark:bg-dark-900">
      <div className="container-max" ref={ref}>
        {/* Header */}
        <div className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-600/10 border border-primary-200 dark:border-primary-600/30 text-primary-600 dark:text-primary-400 text-xs sm:text-sm font-medium mb-4">
            <MessageCircle className="w-4 h-4" />
            Contact
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-dark-900 dark:text-white">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-dark-400 dark:text-slate-400 mt-3 sm:mt-4 max-w-2xl mx-auto">
            Open to full-time roles, internships, collaborations, and conversations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
          {/* Left - Info */}
          <div className={`space-y-6 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            {/* Availability card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 to-violet-600 p-6 text-white shadow-xl shadow-primary-600/30">
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-white/5" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                  </span>
                  <span className="text-sm font-semibold text-green-300">Available for Work</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Hire Me</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Looking for a motivated MCA graduate who brings both technical depth and a growth mindset? Let's talk.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-medium">Full-time</span>
                  <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-medium">Internship</span>
                  <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-medium">Remote</span>
                  <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-medium">On-site</span>
                </div>
              </div>
            </div>

            {/* Response time */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30">
              <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">Quick Response</p>
                <p className="text-xs text-amber-600 dark:text-amber-400">I typically respond within 24 hours</p>
              </div>
              <Zap className="w-4 h-4 text-amber-500 ml-auto flex-shrink-0" />
            </div>

            {/* Contact methods */}
            <div className="space-y-3">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-100 dark:border-dark-600 hover:border-primary-200 dark:hover:border-primary-600/40 transition-all duration-300 hover:-translate-x-1 group"
                >
                  <div className={`w-10 h-10 rounded-xl ${method.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <method.icon className={`w-5 h-5 ${method.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-dark-400 dark:text-slate-500 font-medium">{method.label}</p>
                    <p className="text-sm font-semibold text-dark-800 dark:text-slate-200 truncate">{method.value}</p>
                  </div>
                  {method.copyable && <CopyButton value={method.value} />}
                </a>
              ))}
            </div>

            {/* Social quick links */}
            <div className="flex items-center gap-3">
              {[
                { icon: FaGithub, href: 'https://github.com/heisenberg07-master', label: 'GitHub' },
                { icon: FaLinkedin, href: 'https://www.linkedin.com/in/yash-saraf-5885791a6/', label: 'LinkedIn' },
                { icon: FaInstagram, href: 'https://www.instagram.com/yashsaraf0909?igsh=MTdjZDVrajl6b29tYw==', label: 'Instagram' },
                { icon: Mail, href: 'mailto:yashsaraf2312@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex-1 flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-100 dark:border-dark-600 hover:border-primary-200 dark:hover:border-primary-600/40 hover:-translate-y-1 transition-all duration-300 group"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-dark-500 dark:text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200" />
                  <span className="text-xs text-dark-400 dark:text-slate-500">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className={`transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="bg-gray-50/50 dark:bg-dark-800/50 rounded-2xl p-6 border border-gray-100 dark:border-dark-700">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-600 to-violet-600 flex items-center justify-center">
                  <Send className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-dark-900 dark:text-white text-sm">Send a Message</h3>
                  <p className="text-xs text-dark-400 dark:text-slate-500">I'd love to hear from you</p>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
