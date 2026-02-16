from PIL import Image
import os

def update_logo_colors(input_path):
    try:
        if not os.path.exists(input_path):
            print(f"Error: {input_path} not found")
            return

        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # Change black (or very dark gray) to white
            # item is (R, G, B, A)
            if item[0] < 60 and item[1] < 60 and item[2] < 60 and item[3] > 0:
                # Change to white but keep original alpha
                newData.append((255, 255, 255, item[3]))
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(input_path, "PNG")
        print(f"Successfully updated colors in {input_path}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    update_logo_colors("public/halal-logo-transparent.png")
