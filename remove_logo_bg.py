from PIL import Image
import os

def remove_background(input_path, output_path):
    try:
        if not os.path.exists(input_path):
            print(f"Error: {input_path} not found")
            return

        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # Change white (or very near white) to transparent
            # item is (R, G, B, A)
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Successfully removed background and saved to {output_path}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    remove_background("public/logo.png", "public/logo-transparent.png")
