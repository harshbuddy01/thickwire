import re
import os

def update_tsx_file(tsx_path, module_path):
    with open(module_path, 'r') as f:
        css_content = f.read()
        
    classes = set()
    for match in re.finditer(r'\.([a-zA-Z0-9_-]+)', css_content):
        cls = match.group(1)
        if cls not in ['container', 'open', 'best-value', 'active', 'current']:
            classes.add(cls)
            
    if not os.path.exists(tsx_path):
        return
        
    with open(tsx_path, 'r') as f:
        tsx_content = f.read()
        
    depth = tsx_path.count('/') - module_path.count('/')
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
            
    def replace_classname(match):
        classes_str = match.group(1)
        parts = classes_str.split()
        new_parts = []
        has_replaced = False
        for p in parts:
            if p in classes:
                new_parts.append(f"${{styles['{p}']}}")
                has_replaced = True
            else:
                new_parts.append(p)
        if has_replaced:
            if len(new_parts) == 1 and new_parts[0].startswith('${') and new_parts[0].endswith('}'):
                return f"className={new_parts[0][2:-1]}"
            return f"className={{`{' '.join(new_parts)}`}}"
        return match.group(0)

    # Replace standard className="a b"
    tsx_content = re.sub(r'className="([^"]+)"', replace_classname, tsx_content)
    
    # Replace template literals className={`a b ${var}`}
    # We do a pass over the content of the backticks
    def replace_template(match):
        content = match.group(1)
        # Regex to find words that are NOT inside ${} block
        # Simple trick: just split by spaces and check if word is in classes,
        # but don't touch words that contain $ or { or }
        parts = content.split()
        new_parts = []
        for p in parts:
            clean_p = p.strip("`'")
            if clean_p in classes and '$' not in p and '{' not in p:
                new_parts.append(f"${{styles['{clean_p}']}}")
            else:
                new_parts.append(p)
        return f"className={{`{' '.join(new_parts)}`}}"
        
    tsx_content = re.sub(r'className=\{`([^`]+)`\}', replace_template, tsx_content)
    
    # Custom replace for single variables used in object schemas like { card: 'card-red' }
    def replace_obj_value(match):
        val = match.group(1)
        if val in classes:
            return f"styles['{val}']"
        return match.group(0)
    
    tsx_content = re.sub(r"'([a-zA-Z0-9_-]+)'", replace_obj_value, tsx_content)
    
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
