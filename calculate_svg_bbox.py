import re
import xml.etree.ElementTree as ET

svg_path = 'c:\\Users\\darul\\OneDrive\\Desktop\\restaurant\\naseeb\\public\\logo-amp.svg'

def calculate_bbox():
    try:
        tree = ET.parse(svg_path)
        root = tree.getroot()
        
        # Namespace handling
        ns = {'svg': 'http://www.w3.org/2000/svg'}
        
        # There is a main group with transform
        # <g transform="matrix(1, 0, 0, 1, 46, 162)">
        # We need to find this offset.
        
        # Since parsing transforms manually is annoying, let's just look for the main group 
        # and assume the structure from the viewed file.
        # But to be robust, let's just traverse all paths and finding their min/max
        # adjusting for parent transforms is hard without a full library.
        
        # Looking at previous file view:
        # <g transform="matrix(1, 0, 0, 1, 46, 162)">
        #   ... all the content seems to be in here ...
        
        # We will assume a global offset of (46, 162) for all paths found.
        global_offset_x = 46.0
        global_offset_y = 162.0
        
        min_x, min_y = float('inf'), float('inf')
        max_x, max_y = float('-inf'), float('-inf')
        
        paths = []
        # Find all paths
        for elem in root.iter():
            if 'path' in elem.tag:
                d = elem.get('d')
                if d:
                    paths.append(d)
        
        print(f"Found {len(paths)} paths.")
        
        # Regex to find numbers
        # This is a heuristic. It assumes absolute coordinates mainly.
        # If relative coordinates are used (lower case commands), this will be wrong.
        # But the snippet showed Uppercase M, L, C.
        
        for d in paths:
            # Basic parsing: find all numbers. 
            # In SVG paths, numbers are usually coords.
            # This is rough but likely sufficient for finding the extremes if assumption holds.
            # Note: A command like 'h 10' is relative. 'H 10' is absolute.
            # We hope for absolute.
            
            # Extract all numbers
            numbers = [float(n) for n in re.findall(r"[-+]?\d*\.\d+|[-+]?\d+", d)]
            
            # Since we can't context-free know which is X and which is Y without parsing commands,
            # We will try to parse commands a bit better?
            # Or just assume pairs? No, H and V commands exist.
            
            # Let's try basic command parsing.
            tokens = re.findall(r"([a-zA-Z])|([-+]?\d*\.\d+|[-+]?\d+)", d)
            
            current_x, current_y = 0, 0
            
            # Flatten tokens
            flat_tokens = []
            for t in tokens:
                if t[0]: flat_tokens.append(t[0])
                else: flat_tokens.append(float(t[1]))
            
            # Iterate
            i = 0
            while i < len(flat_tokens):
                cmd = flat_tokens[i]
                if isinstance(cmd, str):
                    i += 1
                    # Basic absolute commands
                    if cmd == 'M' or cmd == 'L' or cmd == 'C' or cmd == 'Q' or cmd == 'S' or cmd == 'T':
                        # These usually take pairs.
                        # We just consume until next command
                        while i < len(flat_tokens) and isinstance(flat_tokens[i], float):
                            # It's an x, next is y (roughly)
                            # Actually, for poly-bezier it can be x1 y1 x2 y2 x y etc.
                            # Just treating all numbers as coords might be safer if we just track min/max
                            # BUT we need to know if it's x or y to just pick min_x vs min_y?
                            # Not strictly, but X usually comes before Y.
                            
                            # Let's just dump all numbers and check min/max... 
                            # But max_y might be mistaken for max_x if bounds are weird.
                            # However, we mostly want the bounding rect.
                            
                            # Let's just collect all numbers.
                            # Then split into even/odd indices? 
                            # M x y L x y ...
                            # For cubic bezier: C x1 y1 x2 y2 x y
                            # Always pairs.
                            # H x (1 arg)
                            # V y (1 arg)
                            # A rx ry x-axis-rotation large-arc-flag sweep-flag x y (7 args)
                            
                            # If we just treat all as candidate coords, we might get it right except for flags/rotations.
                            # Flags are 0 or 1. Rotations are degrees.
                            # It's risky.
                            
                            pass 
                            i += 1 # dummy advance
                    
                    # If we don't parse, let's look at the data again.
                    # The sample had M, L, C.
                    # d="M 44.08 214.11 L 200.31 214.11 ..."
                    
        # Improved Strategy:
        # Since we just want to remove "extra page", finding the rough min/max of ALL numbers might perform okay if we assume the logo is somewhat centered or distinct.
        # But let's try to be slightly smarter: calculate separate X and Y lists.
        # Most commands (M, L, C, S, Q, T) use point pairs.
        # H uses x, V uses y.
        # A uses 7 args, last two are x, y.
        
        all_x = []
        all_y = []
        
        for d in paths:
            # Heuristic parser
            # We will assume well-formed space separated or similar
            # Split by command letters
            parts = re.split(r'([a-zA-Z])', d)
            # parts will be ['', 'M', ' 10 20 ', 'L', ' 30 40' ...]
            
            idx = 0
            while idx < len(parts):
                token = parts[idx].strip()
                if not token: 
                    idx += 1
                    continue
                
                if len(token) == 1 and token.isalpha():
                    cmd = token
                    args_str = parts[idx+1] if idx+1 < len(parts) else ""
                    # find numbers
                    args = [float(n) for n in re.findall(r"[-+]?\d*\.\d+|[-+]?\d+", args_str)]
                    
                    if cmd.upper() in ['M', 'L', 'C', 'S', 'Q', 'T']:
                        # Pairs of (x, y)
                        for k in range(0, len(args), 2):
                            if k+1 < len(args):
                                all_x.append(args[k])
                                all_y.append(args[k+1])
                    elif cmd.upper() == 'H':
                        all_x.extend(args)
                    elif cmd.upper() == 'V':
                        all_y.extend(args)
                    elif cmd.upper() == 'Z':
                        pass
                    elif cmd.upper() == 'A':
                        # 7 arguments: rx ry rot large sweep x y
                        # We care about last 2 (x, y). 
                        # We disregard the arc bulge for bbox (safe approximation for "close fit")
                        for k in range(0, len(args), 7):
                            if k+6 < len(args):
                                all_x.append(args[k+5])
                                all_y.append(args[k+6])
                    
                    idx += 2
                else:
                    idx += 1

        if not all_x or not all_y:
            print("No coords found")
            return

        lx = min(all_x)
        rx = max(all_x)
        ty = min(all_y)
        by = max(all_y)
        
        # Check against global clip path/viewbox?
        # The file has clipPaths.
        # But we want the visual bounding box.
        # The transform is translate(46, 162).
        
        final_x = lx + global_offset_x
        final_y = ty + global_offset_y
        final_w = rx - lx
        final_h = by - ty
        
        final_rx = final_x + final_w
        final_by = final_y + final_h
        
        result = f"{final_x} {final_y} {final_w} {final_h}"
        with open('bbox.txt', 'w') as f:
            f.write(result)
        
        print(f"BBox Local: {lx}, {ty}, {rx}, {by}")
        print(f"BBox Global: {final_x}, {final_y}, {final_w}, {final_h}")
        print(f"Suggested ViewBox: {result}")

    except Exception as e:
        print(e)
        with open('bbox.txt', 'w') as f:
            f.write("ERROR")

if __name__ == "__main__":
    calculate_bbox()
