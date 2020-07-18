saveFile.onclick = function(){
	var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
	FileSaver.saveAs(blob, "hello world.txt");
}