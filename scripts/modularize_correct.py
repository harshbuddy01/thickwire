import re
import os

def process_module(name, start_marker, module_path, globals_path):
    with open(globals_path, 'r') as f:
        lines = f.readlines()
    
    start_idx = -1
    end_idx = -1
    for i, line in enumerate(lines):
        if start_marker in line:
            start_idx = i
            break
            
    if start_idx == -1:
        print(f"Could not find start marker: {start_marker}")
        return
        
    # Find the next block comment that starts with /* ───
    for i in range(start_idx + 1, len(lines)):
        if "/* ───" in lines[i]:
            end_idx = i
            break
            
    if end_idx == -1:
        end_idx = len(lines)
        
    css_block = lines[start_idx:end_idx]
    
    # Save to module.css
    with open(module_path, 'w') as f:
        f.writelines(css_block)
        
    print(f"Saved {len(css_block)} lines to {module_path}")
    
    # Remove from globals.css
    new_globals = lines[:start_idx] + lines[end_idx:]
    with open(globals_path, 'w') as f:
        f.writelines(new_globals)
        
    print(f"Removed from globals.css")

# Ensure directories exist
os.makedirs("src/app/services/prime", exist_ok=True)
os.makedirs("src/app/services/spotify", exist_ok=True)
os.makedirs("src/app/services/youtube", exist_ok=True)
os.makedirs("src/app/services/hbo", exist_ok=True)
os.makedirs("src/app/auth", exist_ok=True)
os.makedirs("src/app/checkout", exist_ok=True)

# Process modules
process_module("checkout", "/* ─── Premium Checkout UI", "src/app/checkout/checkout.module.css", "src/app/globals.css")
process_module("hbo", "/* ─── HBO PAGE EXACT", "src/app/services/hbo/hbo.module.css", "src/app/globals.css")
process_module("auth", "/* ─── Premium Authentication UI", "src/app/auth/auth.module.css", "src/app/globals.css")
process_module("prime", "/* ─── PRIME VIDEO PAGE EXACT", "src/app/services/prime/prime.module.css", "src/app/globals.css")
process_module("spotify", "/* ─── SPOTIFY PAGE EXACT", "src/app/services/spotify/spotify.module.css", "src/app/globals.css")
process_module("youtube", "/* ─── YOUTUBE PAGE EXACT", "src/app/services/youtube/youtube.module.css", "src/app/globals.css")
