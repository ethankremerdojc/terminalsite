import os, json

IGNORE_FILES_AND_DIRS = [
    ".git"
]

def build_tree(path):
    tree = {
        "name": os.path.basename(path),
        "type": "directory",
        "children": []
    }

    try:
        for entry in os.listdir(path):
            if entry in IGNORE_FILES_AND_DIRS:
                continue

            full_path = os.path.join(path, entry)

            if os.path.isdir(full_path):
                tree["children"].append(build_tree(full_path))

            else:
                file_data = {
                    "name": entry,
                    "type": "file",
                    "content": ""
                }

                with open(full_path, "r", encoding="utf-8") as f:
                    file_data["content"] = f.read()

                tree["children"].append(file_data)

    except Exception as e:
        tree["error"] = str(e)

    return tree

def export_directory_js(root_path, output_file):
    tree = build_tree(root_path)

    js_contents = (
        f"export const DRIVE = "
        + json.dumps(tree, indent=2, ensure_ascii=False)
        + ";\n"
    )

    with open(output_file, "w", encoding="utf-8") as f:
        f.write(js_contents)

if __name__ == "__main__":
    export_directory_js(
        "./", 
        "modules/terminals/drive.js"
    )
