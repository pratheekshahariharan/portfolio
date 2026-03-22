import sys
import subprocess

try:
    import pypdf
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdf"])
    import pypdf

reader = pypdf.PdfReader(r"p:\Intern\ds\PRATHEEKSHA_H_RESUME.pdf")
text = ""
for page in reader.pages:
    text += page.extract_text() + "\n"
print("--- PDF CONTENT START ---")
print(text)
print("--- PDF CONTENT END ---")
