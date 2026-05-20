import DOMPurify from 'isomorphic-dompurify';

export interface SanitizedHTML {
  html: string;
  isClean: boolean;
  removedElements: string[];
}

interface SanitizerConfig {
  ALLOWED_TAGS: string[];
  ALLOWED_ATTR: string[];
  ALLOW_DATA_ATTR: boolean;
}

const SANITIZER_CONFIG: SanitizerConfig = {
  ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 'blockquote'],
  ALLOWED_ATTR: ['href', 'target'],
  ALLOW_DATA_ATTR: false,
};

export const sanitizer = {
  sanitize(dirty: string): string {
    return DOMPurify.sanitize(dirty, {
      ALLOWED_TAGS: SANITIZER_CONFIG.ALLOWED_TAGS,
      ALLOWED_ATTR: SANITIZER_CONFIG.ALLOWED_ATTR,
      ALLOW_DATA_ATTR: SANITIZER_CONFIG.ALLOW_DATA_ATTR,
      ADD_ATTR: ['target'], // Allow target attribute specifically
    });
  },

  detectRemovedElements(dirty: string, clean: string): string[] {
    const removed: string[] = [];
    const tagRegex = /<([a-zA-Z0-9:-]+)/g;
    let match;
    const allowed = new Set(SANITIZER_CONFIG.ALLOWED_TAGS);
    
    while ((match = tagRegex.exec(dirty)) !== null) {
      const tag = match[1].toLowerCase();
      if (!allowed.has(tag) && !removed.includes(tag)) {
        removed.push(tag);
      }
    }
    return removed;
  },
  
  sanitizeAndParse(dirty: string): SanitizedHTML {
    const clean = this.sanitize(dirty);
    const removedElements = this.detectRemovedElements(dirty, clean);
    return {
      html: clean,
      isClean: removedElements.length === 0,
      removedElements,
    };
  },
  
  prettyPrint(html: SanitizedHTML): string {
    return html.html
      .replace(/>\s*</g, '>\n<')
      .split('\n')
      .map(line => line.trim())
      .join('\n');
  },
};
