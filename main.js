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
    if (end === 'body') {
        clearInterval(inter);
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
        $('#' + y + '_' + x + '').attr('class', 'head');
        if (!food) {
            let body = [[], []];
            let data = document.getElementsByClassName('body');
            for (let loop = 0; loop < data.length; loop++) {
                body[0].push(Number(data[loop].innerText));
                body[1].push(data[loop].id);
            }
            $('#' + body[1][body[0].indexOf(Math.min(...body[0]))]).attr('class', 'default');
        } else {
            let cond = false;
            while (!cond) {
                let rand = {
                    'y' : Math.floor(Math.random() * 10),
                    'x' : Math.floor(Math.random() * 10)
                }
                let rnd = $('#' + rand.y + '_' + rand.x + '').attr('class');
                if (rnd === 'default') {
                    cond = true;
                    $('#' + rand.y + '_' + rand.x + '').attr('class', 'food');
                }
            }
        }
    }
}
function position (name) {
    let pos = $('.' + name).attr('id');
    return {
        'y' : Number(pos.slice(0, 1)),
        'x' : Number(pos.slice(2, 3))
    };
}