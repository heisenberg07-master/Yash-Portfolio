const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'src/components');
const files = ['contact.tsx', 'footer.tsx', 'hero.tsx', 'projects.tsx'];

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace imports
  content = content.replace(/\bGithub,\s*/g, '');
  content = content.replace(/\bLinkedin,\s*/g, '');
  content = content.replace(/\bInstagram,\s*/g, '');
  content = content.replace(/(import .* from 'lucide-react';)/, "$1\nimport { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa6';");
  
  // Replace JSX tags
  content = content.replace(/<Github/g, '<FaGithub');
  content = content.replace(/<Linkedin/g, '<FaLinkedin');
  content = content.replace(/<Instagram/g, '<FaInstagram');
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Fixed ' + file);
}
