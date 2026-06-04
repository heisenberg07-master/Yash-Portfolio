"use client";
import { Mail, Code2, ArrowUp, Heart } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa6';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { icon: FaGithub, href: 'https://github.com/heisenberg07-master', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/yash-saraf-5885791a6/', label: 'LinkedIn' },
  { icon: FaInstagram, href: 'https://www.instagram.com/yashsaraf0909?igsh=MTdjZDVrajl6b29tYw==', label: 'Instagram' },
  { icon: Mail, href: 'mailto:yashsaraf2312@gmail.com', label: 'Email' },
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-dark-900 text-slate-300 border-t border-dark-700">
      <div className="container-max py-12">
        <div className="grid lg:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-violet-600 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">
                Yash<span className="gradient-text">.</span>Saraf
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              MCA Graduate & Full Stack Developer. Passionate about building modern, scalable web applications
              and eager to contribute to exceptional engineering teams.
            </p>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-sm text-green-400 font-medium">Available for Work</span>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Navigation</h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-sm text-slate-400 hover:text-primary-400 transition-colors duration-200 py-1"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact + Social */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Connect</h4>
            <div className="space-y-3 mb-5">
              <a href="mailto:yashsaraf2312@gmail.com" className="flex items-center gap-2 text-sm text-slate-400 hover:text-primary-400 transition-colors duration-200">
                <Mail className="w-4 h-4" />
                yashsaraf2312@gmail.com
              </a>
              <p className="flex items-center gap-2 text-sm text-slate-400">
                <span className="text-primary-400">📍</span>
                Pune, Maharashtra, India
              </p>
            </div>
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-dark-700 border border-dark-600 flex items-center justify-center text-slate-400 hover:text-primary-400 hover:border-primary-600/50 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-dark-600 to-transparent mb-6" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 text-center">
            © {new Date().getFullYear()} Yash Saraf. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 flex items-center gap-1.5">
            Built with
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
            &amp; passion by{' '}
            <span className="gradient-text font-semibold">Yash Saraf</span>
          </p>
          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-xl bg-dark-700 border border-dark-600 flex items-center justify-center text-slate-400 hover:text-primary-400 hover:border-primary-600/50 hover:-translate-y-1 transition-all duration-300"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
