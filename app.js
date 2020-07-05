$(function () {

    let paint = false;
    let paint_erase = "paint";
    let canvas = document.getElementById("paint");
    let ctx = canvas.getContext("2d");
    let container = $("#container");
    let mouse = {x:0, y:0};
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    if (localStorage.getItem("imgCanvas") != null){
        let img = new Image();
        img.onload =function () {
            ctx.drawImage(img, 0, 0 )
        }
        img.src = localStorage.getItem("imgCanvas")
    }

    container.mousedown(function (e) {
        paint = true;
        ctx.beginPath();

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;

        ctx.moveTo(mouse.x, mouse.y);
    })

    container.mousemove(function (e) {

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;

        if (paint == true){
            if(paint_erase == 'paint'){
                ctx.strokeStyle = $("#paintColor").val();
            }else{
                ctx.strokeStyle = "white"
            }

        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();

        }
    })

    container.mouseup(function () {
        paint = false
    })

    $("#erase").click(function () {
        if(paint_erase=='paint'){
            paint_erase = 'erase'
        }else {
            paint_erase = 'paint'
        }
        $(this).toggleClass("eraseMod")
    })

    $("#save").click(function () {
        if (typeof(localStorage) != null){
            localStorage.setItem('imgCanvas', canvas.toDataURL());
        }else{
            window.alert( 'У вашего браузера нет локального хранилища((')
        }
    })

    $("#reset").click(function () {
        ctx.clearRect(0, 0, 500, 400);
        paint_erase = 'paint';
        $("#erase").removeClass("eraseMod")
    })

    $("#paintColor").change(function () {
        $("#circle").css("background-color", $(this).val());
    })

    $("#slider").slider({
        min: 3,
        max: 30,
        slide:function (event, ui) {
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth = ui.value
        }
    });


})