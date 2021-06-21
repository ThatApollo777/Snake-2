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
    $('#1_1').html(1);
    $('#1_2').html(2);
    $(document).on('keydown', function (k) {
        if (press) {
            if (k.keyCode == keyCodes.left) {
                if (speed.x == 0) {
                    speed.x = -1;
                    speed.y = 0;
                    press = false;
                }
            }
            if (k.keyCode == keyCodes.up) {
                if (speed.y == 0) {
                    speed.x = 0;
                    speed.y = -1;
                    press = false;
                }
            }
            if (k.keyCode == keyCodes.right) {
                if (speed.x == 0) {
                    speed.x = 1;
                    speed.y = 0;
                    press = false;
                }
            }
            if (k.keyCode == keyCodes.down) {
                if (speed.y == 0) {
                    speed.x = 0;
                    speed.y = 1;
                    press = false;
                }
            }
        }
    })
});
let inter = setInterval(() => {
    press = true;
    extend(position('head').y + speed.y, position('head').x + speed.x)
}, 150);

function extend (y, x) {
    let end = $('#' + y + '_' + x + '').attr('class');
    let body = [[], []];
    let data = document.getElementsByClassName('body');
    for (let loop = 0; loop < data.length; loop++) {
        body[0].push(Number(data[loop].innerText));
        body[1].push(data[loop].id);
    }
    let tail = body[1][body[0].indexOf(Math.min(...body[0]))];
    let tailPos = {
        'y' : Number(tail.slice(0, 1)),
        'x' : Number(tail.slice(2, 3))
    };
    if (!tail.slice(0, 2).includes('_')) {
        tailPos.y = Number(tail.slice(0, 2));
        if (tail.length == 4) {
            tailPos.x = Number(tail.slice(3, 4));
        } else {
            tailPos.x = Number(tail.slice(3, 5));
        }
    } else if (tail.length == 4) {
        tailPos.x = Number(tail.slice(2, 4));
    }
    if ((end === 'body' || end === 'wall') && (y != tailPos.y || x != tailPos.x)) {
        clearInterval(inter);
        $('.body').css({
            'background-color': '#ff0000'
        });
        $('.head').css({
            'background-color': '#000000'
        });
        $('.food').css({
            'background-color': '#ffffff'
        });
        $('.wall').css({
            'background-color': '#ffffff'
        });
        $('.default').css({
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
                    'background-color': '#00ff00'
                });
                $('.wall').css({
                    'background-color': '#ffffff'
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
    if (!pos.slice(0, 2).includes('_')) {
        ret.y = Number(pos.slice(0, 2));
        if (pos.length == 4) {
            ret.x = Number(pos.slice(3, 4));
        } else {
            ret.x = Number(pos.slice(3, 5));
        }
    } else if (pos.length == 4) {
        ret.x = Number(pos.slice(2, 4));
    }
    return ret;
}