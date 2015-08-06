var List = require('term-list'),
    clear = require('cli-clear'),
    exec = require('child_process').exec,
    _ = require('underscore'),
    pj = require('prettyjson'),
    c = require('chalk');


module.exports = function(Options, _cb) {
    Options.list = Options.list || [{
        url: 'http://google.com',
        name: 'Google',
    }, {
        url: 'http://yahoo.com',
        name: 'Yahoo'
    }];

    clear();
    var list = new List({
        marker: '\033[36m› \033[0m',
        markerLength: 2
    });

    _.each(Options.list, function(o) {
        list.add(o.url, o.name);
    });

    list.start();
    /*
    setTimeout(function() {
        list.add('http://cuteoverload.com', 'Cute Overload');
        list.draw();
    }, 2000);

    setTimeout(function() {
        list.add('http://uglyoverload.com', 'Ugly Overload');
        list.draw();
    }, 4000);
    */


    list.on('keypress', function(key, item) {
        switch (key.name) {
            case 'return':
                if (Options.open)
                    exec('open ' + item);
                list.stop();
                console.log('opening %s', item);
                break;
            case 'backspace':
                list.remove(list.selected);
                break;
            case 'c':
                if (key.ctrl) {
                    list.stop();
                    process.exit();
                }
                break;
        }
    });

    list.on('empty', function() {
        list.stop();
    });

};