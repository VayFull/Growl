function GetHelloWorld() {
    let canvas = document.getElementById('canvas');
    let width = 1280;
    let height = 720;
    canvas.setAttribute('width', `${width}`);
    canvas.setAttribute('height', `${height}`);
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
}
//# sourceMappingURL=CreateBackground.js.map