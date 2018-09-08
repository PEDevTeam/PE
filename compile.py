import os
import sys
import platform

arch = platform.architecture()[0]

if sys.platform == "linux" or sys.platform == "linux2":
    if arch == '64bit':
        os.system("./tweego/tweego-1.3.0-linux-x64 -o PE.html src")
    else:
        os.system("./tweego/tweego-1.3.0-linux-x86 -o PE.html src")
elif sys.platform == "darwin":
    if arch == '64bit':
        os.system("./tweego/tweego-1.3.0-macos-x64 -o PE.html src")
    else:
        os.system("./tweego/tweego-1.3.0-macos-x86 -o PE.html src")
elif sys.platform == "win32" or sys.platform == "cygwin":
    if arch == '64bit':
        os.system("./tweego/tweego-1.3.0-windows-x64.exe -o PE.html src")
    else:
        os.system("./tweego/tweego-1.3.0-windows-x86.exe -o PE.html src")
