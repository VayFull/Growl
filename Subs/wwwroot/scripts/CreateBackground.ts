function GetHelloWorld() {
    var image = new Image();
    image.useMap = "/images/black.png"
    var node = document.createElement("img");
    node.setAttribute("src", image.useMap);
    document.getElementById("picture").appendChild(node); 
}