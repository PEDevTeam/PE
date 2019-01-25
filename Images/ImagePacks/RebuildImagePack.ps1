add-type -AssemblyName System.Drawing

class ImageFile {
    [string]$fileName
    [int32]$height
    [int32]$width

    ImageFile([string] $newFileName, [int32]$newHeight, [int32]$newWidth){
        $this.fileName = $newFileName
        $this.height = $newHeight
        $this.width = $newWidth
    }
}

class ImagePack {
    [string]$name
    [string]$path
    [System.Collections.Generic.List[ImageFile]]$files

    ImagePack(){
        $this.files = New-Object System.Collections.Generic.List[ImageFile]
    }
}

class ImagePacks {
    [System.Collections.Generic.List[ImagePack]]$ImagePacks

    ImagePacks(){
        $this.ImagePacks = New-Object System.Collections.Generic.List[ImagePack]
    }
}

$ImagePacks = [ImagePacks]::new()

Get-ChildItem -Path . -Directory -Recurse |  ForEach-Object {
    $ImagePack = [ImagePack]::new()

    $pwdir = Get-Location
    $ImagePackPath = $_.fullname.replace($pwdir, "")
    $ImagePackPath = $ImagePackPath.replace("\", "/")
    $ImagePackPath = $ImagePackPath.Substring(1, $ImagePackPath.Length - 1)
    $ImagePack.path = $ImagePackPath
    $ImagePack.name = $ImagePackPath

    $ImagePackNameFile = $_.fullname + "\name.txt"
    if (Test-Path -path $ImagePackNameFile){
        $ImagePackName = Get-Content $ImagePackNameFile -First 1
        $ImagePack.name = $ImagePackName
    }

    $_.GetFiles() | ForEach-Object {
        if(!($_.name -eq "name.txt")){
            $img = New-Object System.Drawing.Bitmap $_.fullname
            $ImagePack.files.add([ImageFile]::new($_.name, $img.Height, $img.Width))
        }
    }

    $Imagepacks.ImagePacks.add($ImagePack)
}

ConvertTo-Json -InputObject $ImagePacks -Depth 4 | Out-File -filepath .\ImagePack.Json