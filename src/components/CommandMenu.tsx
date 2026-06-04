"use client";
import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { Search, Download, Sun, Moon, Briefcase, Mail, Code2, FolderOpen, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

export default function CommandMenu({ theme, onToggleTheme }: { theme: 'light' | 'dark', onToggleTheme: () => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    command();
    setOpen(false);
  };

  const handleNav = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4 backdrop-blur-md bg-dark-900/40" onClick={() => setOpen(false)}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl bg-white dark:bg-dark-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-dark-600 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        <Command className="w-full h-full flex flex-col" loop>
          <div className="flex items-center border-b border-gray-100 dark:border-dark-700 px-4 bg-gray-50/50 dark:bg-dark-800/50">
            <Search className="w-5 h-5 text-dark-400 dark:text-slate-500 mr-3 shrink-0" />
            <Command.Input 
              className="flex-1 bg-transparent py-4 outline-none text-dark-900 dark:text-white placeholder-dark-400 dark:placeholder-slate-500 text-sm sm:text-base font-medium border-0 focus:ring-0"
              placeholder="Type a command or search..."
            />
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-gray-200 dark:bg-dark-700 rounded-md text-[10px] font-semibold text-dark-500 dark:text-slate-400 border border-gray-300 dark:border-dark-600">ESC</kbd>
            </div>
          </div>

          <Command.List className="max-h-[300px] overflow-y-auto p-2 scroll-smooth bg-white dark:bg-dark-800">
            <Command.Empty className="py-6 text-center text-sm text-dark-500 dark:text-slate-400">No results found.</Command.Empty>
            
            <Command.Group heading="Navigation" className="text-xs font-semibold text-dark-400 dark:text-slate-500 px-2 py-2">
              <Command.Item onSelect={() => runCommand(() => handleNav('home'))} className="cmdk-item">
                <Code2 className="w-4 h-4 mr-3 text-primary-500" /> Home
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => handleNav('about'))} className="cmdk-item">
                <Search className="w-4 h-4 mr-3 text-cyan-500" /> About Me
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => handleNav('projects'))} className="cmdk-item">
                <FolderOpen className="w-4 h-4 mr-3 text-violet-500" /> Projects
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => handleNav('contact'))} className="cmdk-item">
                <Mail className="w-4 h-4 mr-3 text-emerald-500" /> Contact
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Actions" className="text-xs font-semibold text-dark-400 dark:text-slate-500 px-2 py-2 mt-2">
              <Command.Item onSelect={() => runCommand(() => { const a = document.createElement('a'); a.href = '/Yash_Saraf_ASE_Resume.pdf'; a.download = 'Yash_Saraf_ASE_Resume.pdf'; a.click(); })} className="cmdk-item">
                <Download className="w-4 h-4 mr-3" /> Download Resume
              </Command.Item>
              <Command.Item onSelect={() => runCommand(onToggleTheme)} className="cmdk-item">
                {theme === 'dark' ? <Sun className="w-4 h-4 mr-3 text-yellow-500" /> : <Moon className="w-4 h-4 mr-3 text-indigo-500" />} 
                Toggle {theme === 'dark' ? 'Light' : 'Dark'} Theme
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Socials" className="text-xs font-semibold text-dark-400 dark:text-slate-500 px-2 py-2 mt-2">
              <Command.Item onSelect={() => runCommand(() => window.open('https://github.com/heisenberg07-master', '_blank'))} className="cmdk-item">
                <FaGithub className="w-4 h-4 mr-3" /> GitHub Profile
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => window.open('https://www.linkedin.com/in/yash-saraf-5885791a6/', '_blank'))} className="cmdk-item">
                <FaLinkedin className="w-4 h-4 mr-3 text-blue-500" /> LinkedIn Profile
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
