const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'src/components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (!content.startsWith('"use client";')) {
    content = '"use client";\n' + content;
  }
  
  if (content.includes('lucide-react')) {
    let newContent = content;
    newContent = newContent.replace(/import\s+{([^}]+)}\s+from\s+['"]lucide-react['"];/, (match, p1) => {
      let imports = p1.split(',').map(s => s.trim());
      const removed = [];
      ['Github', 'Linkedin', 'Instagram'].forEach(icon => {
        if (imports.includes(icon)) {
          imports = imports.filter(i => i !== icon);
          removed.push(icon);
        }
      });
      if (removed.length > 0) {
        return `import { ${imports.join(', ')} } from 'lucide-react';\nimport { ${removed.map(i => 'Fa' + i).join(', ')} } from 'react-icons/fa6';`;
      }
      return match;
    });

    // Safely replace JSX and object literals
    newContent = newContent.replace(/<Github/g, '<FaGithub');
    newContent = newContent.replace(/<Linkedin/g, '<FaLinkedin');
    newContent = newContent.replace(/<Instagram/g, '<FaInstagram');
    newContent = newContent.replace(/\bicon:\s*Github\b/g, 'icon: FaGithub');
    newContent = newContent.replace(/\bicon:\s*Linkedin\b/g, 'icon: FaLinkedin');
    newContent = newContent.replace(/\bicon:\s*Instagram\b/g, 'icon: FaInstagram');

    content = newContent;
  }
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Processed ' + file);
}
