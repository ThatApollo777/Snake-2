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
let count = 23, eaten = 1;
const FN = 5, FA = 1, FD = 0.1, WN = 10, WA = 2, WM = 0.2;
let loop, rand;

$(document).ready(function () {
    for (loop = 1; loop < (count + 1); loop++) {
        $('#1_' + loop).html(loop);
        $('#1_' + loop).attr('class', 'body');
    }
    $('#1_' + (count + 1)).attr('class', 'head');
    let n = $(".default").length;
    for (loop = 0; loop < FN; loop++) {
        rand = Math.floor(Math.random() * n);
        $(".default").eq(rand).attr('class', 'food');
        n--;
    }
    for (loop = 0; loop < WN; loop++) {
        rand = Math.floor(Math.random() * n);
        $(".default").eq(rand).attr('class', 'wall');
        n--;
    }
    $(document).on('keydown', function (k) {
        if (k.keyCode == keyCodes.left) {
            move(-1, 0);
        }
        if (k.keyCode == keyCodes.up) {
            move(0, -1);
        }
        if (k.keyCode == keyCodes.right) {
            move(1, 0);
        }
        if (k.keyCode == keyCodes.down) {
            move(0, 1);
        }
    })
});
let inter = setInterval(() => {extend(position('head').y + speed.y, position('head').x + speed.x)}, 150);

function extend (y, x) {
    let end = $('#' + y + '_' + x + '').attr('class');
    let tail = position('tail');
    if ((end === 'body' || end === 'wall') && (y != tail.y || x != tail.x)) {
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
            'background-color': '#000000'
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
            $('#' + tail.y + '_' + tail.x).attr('class', 'default');
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
                for (loop = 0; loop < FA; loop++) {
                    if ((FD * eaten) % 1 != 0 || eaten >= 50) {
                        rand = Math.floor(Math.random() * n);
                        $(".default").eq(rand).attr('class', 'food');
                        n--;
                    }
                }
                for (loop = 0; loop < (WA + WM * eaten); loop++) {
                    rand = Math.floor(Math.random() * n);
                    $(".default").eq(rand).attr('class', 'wall');
                    n--;
                }
                eaten++;
            }
        }
        $('#' + y + '_' + x + '').attr('class', 'head');
    }
}

function position (name) {
    let pos;
    let ret = {
        'y'  : 0,
        'x'  : 0
    }
    if (name == 'tail') {
        let body = [[], []];
        let data = document.getElementsByClassName('body');
        for (let loop = 0; loop < data.length; loop++) {
            body[0].push(Number(data[loop].innerText));
            body[1].push(data[loop].id);
        }
        pos = body[1][body[0].indexOf(Math.min(...body[0]))];
    } else {
        pos = $('.' + name).attr('id');
    }
    ret.y = Number(pos.slice(0, 1));
    ret.x = Number(pos.slice(2, 3));
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

function move(x, y) {
    let head = position('head');
    let next = $('#' + (head.y + y) + '_' + (head.x + x) + '').attr('class');
    let nextId = $('#' + (head.y + y) + '_' + (head.x + x) + '').attr('id');
    let tailId = position('tail').y + '_' + position('tail').x;
    if (((x == 0 && speed.y == 0) || (y == 0 && speed.x == 0)) && (next == 'default' || next == 'food' || nextId == tailId)) {
        speed.x = x;
        speed.y = y;
    }
}

//test