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

    def repl_single_class(m):
        cls = m.group(1)
        if cls in classes:
            return f"className={{styles['{cls}']}}"
        return m.group(0)

    # ONLY replace exact single class strings
    content = re.sub(r'className="([a-zA-Z0-9_-]+)"', repl_single_class, content)

    with open(filepath, 'w') as f: f.write(content)

process_file("src/app/services/prime/PrimePageClient.tsx", "src/app/services/prime/prime.module.css")
process_file("src/app/services/spotify/SpotifyPageClient.tsx", "src/app/services/spotify/spotify.module.css")
process_file("src/app/services/youtube/YoutubePageClient.tsx", "src/app/services/youtube/youtube.module.css")
process_file("src/app/services/hbo/HboPageClient.tsx", "src/app/services/hbo/hbo.module.css")
process_file("src/app/login/page.tsx", "src/app/auth/auth.module.css")
process_file("src/app/signup/page.tsx", "src/app/auth/auth.module.css")
process_file("src/app/checkout/page.tsx", "src/app/checkout/checkout.module.css")
