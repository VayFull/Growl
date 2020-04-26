class Growl {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private circles: Array<Circle>;

    constructor() {
        let canvas = document.getElementById('canvas') as HTMLCanvasElement;
        let ctx = canvas.getContext('2d');
        this.circles = new Array<Circle>();

        let frequent = 500; //частота появления в милисекундах
        let gameLenght = 10000 + frequent - 1; //время игры в милисекундах

        let width = 1500;
        let height = 900;

        canvas.setAttribute('width', `${width}`);
        canvas.setAttribute('height', `${height}`);

        let circlesArray = this.circles;

        canvas.addEventListener('click', function (event) {
            let x = event.pageX - canvas.offsetLeft;
            let y = event.pageY - canvas.offsetTop;

            circlesArray.forEach(function (value) {
                if (IsInside(value, x, y)) {
                    const index = circlesArray.indexOf(value, 0);
                    if (index > -1) {
                        circlesArray.splice(index, 1);
                    }

                    RemoveCircle(value);

                    let counterElement = document.getElementById('count') as HTMLParagraphElement;
                    let previous = Number.parseInt(counterElement.innerHTML);
                    counterElement.innerHTML = (previous + 1).toString();
                };
            });
        }, false);

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);

        setTimeout(function () {
            clearInterval(interval);
            GameOver();
        }, gameLenght);

        var interval = setInterval(this.CreateCircle, frequent, this.circles);
    }

    public CreateCircle(circles: Array<Circle>) {
        let canvas = document.getElementById('canvas') as HTMLCanvasElement;
        let ctx = canvas.getContext('2d');
        let radius = 25;

        let maxX = canvas.width - radius;
        let maxY = canvas.height - radius;

        let minX = 0 + radius;
        let minY = 0 + radius;

        let randX = Math.round(Math.random() * (maxX - minX) + minX);
        let randY = Math.round(Math.random() * (maxY - minY) + minY);

        let circle = new Circle(25, randX, randY);

        circles.push(circle);

        ctx.beginPath();
        ctx.arc(randX, randY, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'red';
        ctx.fill();
    }
}

class Circle {
    public radius: number;
    public xPos: number;
    public yPos: number;
    constructor(radius: number, xPos :number, yPos:number) {
        this.radius = radius;
        this.xPos = xPos;
        this.yPos = yPos;
    }
}

function IsInside(circle: Circle, xMousePos: number, yMousePos: number) {
    let dx = xMousePos - circle.xPos;
    let dy = yMousePos - circle.yPos;

    let r = Math.sqrt(dx * dx + dy * dy);

    if (r <= circle.radius) {
        return true;
    }
    else {
        return false;
    }
}

function GameOver() {
    let result = document.getElementById('count').innerHTML;
    alert(`Игра закончилась, ваш результат:${result}`);
}

function RemoveCircle(circle: Circle) {
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    let ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(circle.xPos, circle.yPos, circle.radius + 0.7, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'black';
    ctx.fill();
}

new Growl();