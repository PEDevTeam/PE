@echo off

pushd .\Images\ImagePacks
call RebuildImagePack.cmd
popd

type .\src\javascript\imagePacks_template_start.jsstub > .\src\javascript\imagePacks.js
type .\Images\ImagePacks\ImagePack.json >> .\src\javascript\imagePacks.js
type .\src\javascript\imagePacks_template_end.jsstub >> .\src\javascript\imagePacks.js

:: [Game] Basic Compiler - Windows
:: Window will exit without keypress. Use for general compiling when no errors are present.

:: Run the appropriate compiler for the user's CPU architecture.
CALL "tweeGo\tweego_win86.exe" -o "PE.html" "src"

popd
ECHO Done