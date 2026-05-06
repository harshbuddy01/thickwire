import os

def update_tsx_file(tsx_path, module_path):
    with open(module_path, 'r') as f:
        css_content = f.read()
        
    # Extract unique classes
    import re
    classes = set()
    for match in re.finditer(r'\.([a-zA-Z0-9_-]+)', css_content):
        cls = match.group(1)
        if cls not in ['container', 'open', 'best-value', 'active', 'current']:
            classes.add(cls)
            
    if not os.path.exists(tsx_path):
        return
        
    with open(tsx_path, 'r') as f:
        tsx_content = f.read()
        
    rel_path = f"./{os.path.basename(module_path)}"
    if "src/app/login" in tsx_path or "src/app/signup" in tsx_path:
        rel_path = "../auth/auth.module.css"
        
    import_statement = f"import styles from '{rel_path}';\n"
    if "import styles" not in tsx_content:
        last_import_idx = tsx_content.rfind('import ')
        if last_import_idx != -1:
            end_of_line = tsx_content.find('\n', last_import_idx)
            tsx_content = tsx_content[:end_of_line+1] + import_statement + tsx_content[end_of_line+1:]
        else:
            tsx_content = import_statement + tsx_content
            
    sorted_classes = sorted(list(classes), key=len, reverse=True)
    
    for cls in sorted_classes:
        # Replace exact match: className="cls" -> className={styles['cls']}
        tsx_content = tsx_content.replace(f'className="{cls}"', f"className={{styles['{cls}']}}")
        
        # Replace start of string: className="cls something" -> className={`${styles['cls']} something`}
        # Actually, it's safer to just handle specific cases we saw.
        # But let's just do exact string replacements for the template literal cases:
        tsx_content = tsx_content.replace(f'`{cls} ', f"`${{styles['{cls}']}} ")
        tsx_content = tsx_content.replace(f' {cls}`', f" ${{styles['{cls}']}}`")
        tsx_content = tsx_content.replace(f' {cls} ', f" ${{styles['{cls}']}} ")
        
        # specific for object keys like { card: 'cls' } or something
        # we skip for now, unless needed
        
    # For multiple classes like className="cls1 cls2" -> className={`${styles['cls1']} ${styles['cls2']}`}
    # We will just do a simple pass to find any remaining `className=".*"` and process it safely
    
    lines = tsx_content.split('\n')
    new_lines = []
    for line in lines:
        if 'className="' in line:
            # find all className="..."
            for m in re.finditer(r'className="([^"]+)"', line):
                original = m.group(1)
                parts = original.split()
                has_replacement = False
                new_parts = []
                for p in parts:
                    if p in classes:
                        new_parts.append(f"${{styles['{p}']}}")
                        has_replacement = True
                    else:
                        new_parts.append(p)
                if has_replacement:
                    new_val = f"`{' '.join(new_parts)}`"
                    line = line.replace(f'className="{original}"', f'className={{{new_val}}}')
        new_lines.append(line)
        
    tsx_content = '\n'.join(new_lines)
        
    with open(tsx_path, 'w') as f:
        f.write(tsx_content)
        
    print(f"Updated {tsx_path}")

update_tsx_file("src/app/services/prime/PrimePageClient.tsx", "src/app/services/prime/prime.module.css")
update_tsx_file("src/app/services/spotify/SpotifyPageClient.tsx", "src/app/services/spotify/spotify.module.css")
update_tsx_file("src/app/services/youtube/YoutubePageClient.tsx", "src/app/services/youtube/youtube.module.css")
update_tsx_file("src/app/services/hbo/HboPageClient.tsx", "src/app/services/hbo/hbo.module.css")
update_tsx_file("src/app/login/page.tsx", "src/app/auth/auth.module.css")
update_tsx_file("src/app/signup/page.tsx", "src/app/auth/auth.module.css")
update_tsx_file("src/app/checkout/page.tsx", "src/app/checkout/checkout.module.css")
