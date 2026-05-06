import re
import os

def process_file(filepath, module_name):
    if not os.path.exists(filepath): return
    with open(filepath, 'r') as f: content = f.read()
    
    with open(module_name, 'r') as f: css = f.read()
    classes = set(m.group(1) for m in re.finditer(r'\.([a-zA-Z0-9_-]+)', css))
    classes = {c for c in classes if c not in ['container', 'open', 'best-value', 'active', 'current', 'error']}
    
    rel = f"./{os.path.basename(module_name)}"
    if "auth" in filepath or "login" in filepath or "signup" in filepath: rel = "../auth/auth.module.css"
    if "checkout" in filepath: rel = "./checkout.module.css"
    if "import styles" not in content:
        last = content.rfind('import ')
        if last != -1:
            eol = content.find('\n', last)
            content = content[:eol+1] + f"import styles from '{rel}';\n" + content[eol+1:]
        else:
            content = f"import styles from '{rel}';\n" + content

    def repl_classname_str(m):
        cls_str = m.group(1)
        parts = cls_str.split()
        new_parts = []
        replaced = False
        for p in parts:
            if p in classes:
                new_parts.append(f"${{styles['{p}']}}")
                replaced = True
            else:
                new_parts.append(p)
        if replaced:
            if len(new_parts) == 1 and new_parts[0].startswith('${'):
                return f"className={new_parts[0][2:-1]}"
            return f"className={{`{' '.join(new_parts)}`}}"
        return m.group(0)

    def repl_classname_tpl(m):
        cls_str = m.group(1)
        for c in sorted(list(classes), key=len, reverse=True):
            cls_str = re.sub(rf'(?<![a-zA-Z0-9_-]){c}(?![a-zA-Z0-9_-])', f"${{styles['{c}']}}", cls_str)
        return f"className={{`{cls_str}`}}"

    content = re.sub(r'className="([^"]+)"', repl_classname_str, content)
    content = re.sub(r'className=\{`([^`]+)`\}', repl_classname_tpl, content)

    with open(filepath, 'w') as f: f.write(content)

process_file("src/app/services/prime/PrimePageClient.tsx", "src/app/services/prime/prime.module.css")
process_file("src/app/services/spotify/SpotifyPageClient.tsx", "src/app/services/spotify/spotify.module.css")
process_file("src/app/services/youtube/YoutubePageClient.tsx", "src/app/services/youtube/youtube.module.css")
process_file("src/app/services/hbo/HboPageClient.tsx", "src/app/services/hbo/hbo.module.css")
process_file("src/app/login/page.tsx", "src/app/auth/auth.module.css")
process_file("src/app/signup/page.tsx", "src/app/auth/auth.module.css")
process_file("src/app/checkout/page.tsx", "src/app/checkout/checkout.module.css")
