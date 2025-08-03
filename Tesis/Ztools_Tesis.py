import os

def create_context_file(root_dir):
    """
    Creates a Context[number].txt file with the content of specified files.
    Prints the files found and not found, and the name of the saved context file.

    Args:
        root_dir: The root directory of the Django project.
    """

    files_to_grab = {

    "index.html": None,

    # Css
    "assets\\css\\app.css": None,
    "assets\\css\\bootstrap.css": None,

    #Images
#    "assets\\images\\base.py": None,  

    #JS
    "assets\\js\\app.min.js": None,  
    "assets\\js\\custom_dropdown.js": None,
    "assets\\js\\global.js": None,
    "assets\\js\\vendors.min.js": None,

    #PHP
#    "assets\\php\\base.py": None,  # General settings 
       
    
    }

    
    file_number = 1
    while os.path.exists(f"Context{file_number:04d}.txt"):
        file_number += 1
    context_file_name = f"Context{file_number:04d}.txt"

    files_found = []
    files_not_found = []

    with open(context_file_name, "w", encoding="utf-8") as outfile:
        for file_path in files_to_grab:
            full_path = os.path.join(root_dir, file_path)
            outfile.write(f"This is the content of {file_path}:\n\n")
            try:
                with open(full_path, "r", encoding="utf-8") as f:
                    outfile.write(f.read())
                    files_found.append(file_path)
            except FileNotFoundError:
                outfile.write(f"Warning: File not found: {full_path}\n")
                files_not_found.append(file_path)
            outfile.write("\n\n")

    print("Files found:")
    for file_path in files_found:
        print(f"  - {file_path}")

    print("\nFiles not found:")
    for file_path in files_not_found:
        print(f"  - {file_path}")

    print(f"\nContext file saved as: {context_file_name}")

if __name__ == "__main__":
    root_directory = r"C:\Projects\Tesis"
    create_context_file(root_directory)
