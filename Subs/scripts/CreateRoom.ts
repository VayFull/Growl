class CreateRoom {
    constructor() {
        var window = document.getElementById('window');

        var button = document.getElementById('button');

        var span = document.getElementsByClassName("close")[0] as HTMLSpanElement;

        button.onclick = function () {
            window.style.display = "block";
        }

        span.onclick = function () {
            window.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == window) {
                window.style.display = "none";
            }
        }
    }

}
new CreateRoom();