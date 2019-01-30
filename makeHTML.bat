@echo off

pushd .\Images\ImagePacks
call RebuildImagePack.cmd
popd

:: [Game] Basic Compiler - Windows
:: Window will exit without keypress. Use for general compiling when no errors are present.

:: Run the appropriate compiler for the user's CPU architecture.
CALL "tweego\tweego-1.3.0-windows-x86.exe" -o "PE.html" "src"

popd
ECHO Done
