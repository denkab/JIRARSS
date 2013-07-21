function tryLoadFile(fileInput) {
    console.log("Invoked 'tryLoadFile'");
    if (fileInput.files[0])
    {
        console.log("There is a file to load");
        var reader = new FileReader();

        reader.onload = (function(theFile) {
            return function(e) {
                console.log("Invoked FileReader.onload()");
                var parser = new DOMParser();
                var doc = parser.parseFromString(
                        e.target.result.toString(), "text/xml");
                console.log("Read a file " + theFile,
                    "parsed into " + doc);

                processXml(doc);

                return;
            };
        })(fileInput.files[0]);

        // Read in the image file as a data URL.
        reader.readAsText(fileInput.files[0]);
    }

    return;
}

function processXml(xml)
{
    var roots = xml.getElementsByTagName("entry");
    console.log("top-level entries " + roots, "of size " + roots.length,
        "roots unempty: " + (roots != null));

    if (roots)
    {
        console.log("about to enter loop");
        for (var i = 0; i < roots.length; i++)
        {
            console.log("entered loop");
            author = roots[i].getElementsByTagName("author")[0];
            console.log("author: " + author);
            name = author.getElementsByTagName("name")[0].childNodes[0].nodeValue;
            profile = author.getElementsByTagName("uri")[0].childNodes[0].nodeValue;
            console.log("name: " + name, "profile: " + profile);
            action = roots[i].getElementsByTagName("category")[0].
                attributes.getNamedItem("term").nodeValue;
            console.log("action: "+ action);
        }
    }

    return;
}