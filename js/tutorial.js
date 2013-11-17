require([
    '$api/models',
    ], function(models) {

    function htmlEscape(str) {
        return String(str)
                .replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
    }

    function tabs() {
        var args = models.application.arguments;
        if (args) {
            var lastArg = args[args.length - 1];
            if (lastArg !== 'index' && lastArg !== 'tabs') {
                return;
           }
       }

        // compose file
        var file = args.length == 1 ? (args[0] + '.html') : '/tutorials/' + args.slice(0, args.length-1).join('/') + '.html';
        var xhr = new XMLHttpRequest();
        xhr.open('GET', file);
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4 || xhr.status != 200) return;

            var wrapper = document.getElementById('wrapper');
            wrapper.innerHTML = args[0] === 'index' ? '' : '<ul class="breadcrumb"><li><a href="spotify:app:api-tutorial:index">&laquo; Back to main page</a></li></ul>';
            if (args[0] === 'index') {
                var aux = document.createElement('div');
                aux.innerHTML = xhr.responseText;
                wrapper.innerHTML = aux.querySelector('#wrapper').innerHTML;
            } else {
                wrapper.innerHTML += xhr.responseText;
            }

            window.scrollTo(0, 0);
            var htmlSnippets = wrapper.querySelectorAll(".html-snippet");
            for (i = 0; i < htmlSnippets.length; i++) {
                container = htmlSnippets[i].getAttribute("data-container");
                if (container) {
                    document.getElementById(container).innerHTML = '<pre><code data-language="html">' + htmlEscape(htmlSnippets[i].innerHTML) + '</code></pre>';
                }
            }

            // search js snippets
            var scripts = wrapper.querySelectorAll("script");
            for (var i = 0; i < scripts.length; i++) {
                if (scripts[i].getAttribute('type') == 'script/snippet') {
                    var dataExecute = scripts[i].getAttribute('data-execute');
                    if (!dataExecute || dataExecute != 'no') {
                        eval(scripts[i].innerHTML);
                    }
                    var container = scripts[i].getAttribute("data-container");
                    if (container) {
                        document.getElementById(container).innerHTML = '<pre><code data-language="javascript">' + htmlEscape(scripts[i].innerHTML) + '</code></pre>';
                    }
                }
            }

            // search html snippets
            Rainbow.color();
        };
        xhr.send(null);
    }

    // When application has loaded, run pages function
    models.application.load('arguments').done(tabs);

    // When arguments change, run pages function
    models.application.addEventListener('arguments', tabs);
}); // require
