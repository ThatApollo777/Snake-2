'use strict'
const keyCodes = {
    'left' : 37,
    'up'   : 38,
    'right': 39,
    'down' : 40
};
let speed = {
    'x' : 1,
    'y' : 0
}
let count = 2;
let press = true;

$(document).ready(function () {
    $('#0_0').html(1);
    $('#0_1').html(2);
    $(document).on('keydown', function (k) {
        if (press) {
            if (k.keyCode == keyCodes.left) {
                if (speed.x !== 1) {
                    speed.x = -1;
                    speed.y = 0;
                }
            }
            if (k.keyCode == keyCodes.up) {
                if (speed.y !== 1) {
                    speed.x = 0;
                    speed.y = -1;
                }
            }
            if (k.keyCode == keyCodes.right) {
                if (speed.x !== -1) {
                    speed.x = 1;
                    speed.y = 0;
                }
            }
            if (k.keyCode == keyCodes.down) {
                if (speed.y !== -1) {
                    speed.x = 0;
                    speed.y = 1;
                }
            }
            press = false;
        }
    })
});
let inter = setInterval(() => {
    press = true;
    extend(position('head').y + speed.y, position('head').x + speed.x)
}, 250);

function convert (no) {
    if (no === -1) {
        return 9;
    } else if (no === 10) {
        return 0;
    } else {
        return no;
    }
}
function extend (y0, x0) {
    let y = convert(y0);
    let x = convert(x0);
    let end = $('#' + y + '_' + x + '').attr('class');
    let body = [[], []];
    let data = document.getElementsByClassName('body');
    for (let loop = 0; loop < data.length; loop++) {
        body[0].push(Number(data[loop].innerText));
        body[1].push(data[loop].id);
    }
    let tail = body[1][body[0].indexOf(Math.min(...body[0]))];
    if (end === 'body' && (y != Number(tail.slice(0, 1)) || x != Number(tail.slice(2, 3)))) {
        clearInterval(inter);
        $('.body').css({
            'color': '#ff0000',
            'background-color': '#ff0000'
        });
        $('.head').css({
            'color': '#000000',
            'background-color': '#000000'
        });
        $('.food').css({
            'color': '#ffffff',
            'background-color': '#ffffff'
        });
        $('.default').css({
            'color': '#ffffff',
            'background-color': '#ffffff'
        });
    } else {
        let food = false;
        let status = $('#' + y + '_' + x + '').attr('class');
        if (status === 'food') {
            food = true;
        }
        count++;
        let pos = position('head');
        $('.head').attr('class', 'body');
        $('#' + pos.y + '_' + pos.x + '').html(count);
        if (!food) {
            $('#' + tail).attr('class', 'default');
        } else {
            let n = $(".default").length;
            if (n == 0) {
                $('.body').css({
                    'color': '#00ff00',
                    'background-color': '#00ff00'
                });
                clearInterval(inter);
            } else {
                let rand = Math.floor(Math.random() * n);
                $(".default").eq(rand).attr('class', 'food');
            }
        }
        $('#' + y + '_' + x + '').attr('class', 'head');
    }
}
function position (name) {
    let pos = $('.' + name).attr('id');
    let ret = {
        'y' : Number(pos.slice(0, 1)),
        'x' : Number(pos.slice(2, 3))
    };
    return ret;
}