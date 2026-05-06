import re
import os

def update_tsx_file(tsx_path, module_path):
    # Read the CSS module to extract class names
    with open(module_path, 'r') as f:
        css_content = f.read()
        
    classes = set()
    for match in re.finditer(r'\.([a-zA-Z0-9_-]+)', css_content):
        cls = match.group(1)
        if cls not in ['container', 'open', 'best-value', 'active']:
            classes.add(cls)
            
    # Read the TSX file
    if not os.path.exists(tsx_path):
        print(f"File not found: {tsx_path}")
        return
        
    with open(tsx_path, 'r') as f:
        tsx_content = f.read()
        
    # Add import statement if missing
    # We need to account for depth of the file for relative imports
    depth = tsx_path.count('/') - module_path.count('/')
    rel_path = ""
    if "src/app/login" in tsx_path or "src/app/signup" in tsx_path:
        rel_path = "../auth/auth.module.css"
    elif "src/app/checkout" in tsx_path:
        rel_path = "./checkout.module.css"
        
    import_statement = f"import styles from '{rel_path}';\n"
    if "import styles from" not in tsx_content and rel_path:
        # insert after the last import
        last_import_idx = tsx_content.rfind('import ')
        if last_import_idx != -1:
            end_of_line = tsx_content.find('\n', last_import_idx)
            tsx_content = tsx_content[:end_of_line+1] + import_statement + tsx_content[end_of_line+1:]
        else:
            tsx_content = import_statement + tsx_content
            
    # Sort classes by length descending to prevent partial matches
    sorted_classes = sorted(list(classes), key=len, reverse=True)
    
    # Process the file line by line
    new_lines = []
    for line in tsx_content.split('\n'):
        # For className="class-name"
        for cls in sorted_classes:
            line = re.sub(rf'className="{cls}"', f'className={{styles[\'{cls}\']}}', line)
            
        # For className="class1 class2" -> className={`${styles['class1']} ${styles['class2']}`}
        # This is harder to regex safely, so we look for className="..."
        def repl(m):
            classes_str = m.group(1)
            parts = classes_str.split()
            new_parts = []
            has_replaced = False
            for p in parts:
                if p in sorted_classes:
                    new_parts.append(f"${{styles['{p}']}}")
                    has_replaced = True
                else:
                    new_parts.append(p)
            if has_replaced:
                return f'className={{`{" ".join(new_parts)}`}}'
            return m.group(0)
            
        line = re.sub(r'className="([^"]+)"', repl, line)
        
        # For template literals like className={`class1 ${variable}`}
        # We need to be careful here
        def repl_template(m):
            content = m.group(1)
            # Find all text parts that are not inside ${...}
            # This is complex, so let's just do a simple replace of exact whole words
            for cls in sorted_classes:
                # Replace if it's surrounded by spaces or quotes, and not part of a larger word
                content = re.sub(rf'(?<![a-zA-Z0-9_-]){cls}(?![a-zA-Z0-9_-])', f"${{styles['{cls}']}}", content)
            return f'className={{`{content}`}}'
            
        line = re.sub(r'className=\{`([^`]+)`\}', repl_template, line)
            
        new_lines.append(line)
        
    with open(tsx_path, 'w') as f:
        f.write('\n'.join(new_lines))
        
    print(f"Updated {tsx_path}")

update_tsx_file("src/app/login/page.tsx", "src/app/auth/auth.module.css")
update_tsx_file("src/app/signup/page.tsx", "src/app/auth/auth.module.css")
update_tsx_file("src/app/checkout/page.tsx", "src/app/checkout/checkout.module.css")
