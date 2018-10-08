<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="apple-touch-icon" href="apple-touch-icon.png">

        <link rel="stylesheet" href="css/normalize.min.css">
        <link rel="stylesheet" href="css/main.css">

        <script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.15.0/lodash.js"></script>
        <script src="js/ripple-1.0.1.js"></script>

    </head>
    <body>
        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <div class="header-container">
            <header class="wrapper clearfix">
                <h1 class="title">Initializr</h1>
                <nav>
                    <ul>
                        <li><a href="#">nav ul li a</a></li>
                        <li><a href="#">nav ul li a</a></li>
                        <li><a href="#">nav ul li a</a></li>
                    </ul>
                </nav>
            </header>
        </div>

        <div class="main-container">
            <div class="main wrapper clearfix">
                <article>
                    <header>
                        <h1>Title</h1>
                    </header>
                    <section id="content">
                        <p>Lorem ipsum dolor sit amet</p>
                    </section>
                </article>

                <aside>
                    <h3>aside</h3>
                    <p>Lorem ipsum dolor sit amet</p>
                </aside>

            </div> <!-- #main -->
        </div> <!-- #main-container -->

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.2.min.js"><\/script>')</script>

        <script src="js/main.js"></script>

        <script>
            content = document.getElementById('content');
            //var api_live = new ripple.RippleAPI({server:'wss://s1.ripple.com/'});
            var api = new ripple.RippleAPI({server:'wss://s.altnet.rippletest.net:51233'});
            //const address_live = 'r4uVzD6VUUrmmatWe3k7YsV3vvNfmNnpvi';
            const address = 'r47esrFFUpDuDFfMNyKVvtg3B3kUxSeCj';

            // api connect
            api.connect().then(function() {
              return api.getServerInfo();
            }).then(function(server_info) {
              console.log(server_info);
            }).then(function() {
              return api.getAccountInfo(address);
            }).then(function(account_info) {
                console.log(account_info);
            }).then(function() {

                // api request subscribe
                api.request('subscribe', {
                    accounts: [ address ]
                }).then(response => {
                    console.log('SUBSCRIBE');
                    console.log(response);
                    if (response.status === 'success') {
                        console.log('Successfully subscribed')
                    }
                }).catch(error => {
                    console.log(error);
                });

                // api request ledger
                api.request('ledger', {
                    ledger_index: 'validated'
                }).then(response => {
                    console.log('LEDGER');
                    console.log(response);
                    if (response.status === 'success') {
                        console.log(JSON.stringify(response, null, 2));
                    }
                }).catch(error => {
                    console.log(error);
                });

                // 'transaction' can be replaced with the relevant `type` from the table above
                api.connection.on('transaction', (event) => {
                    console.log('TRANSACTION');
                    // Do something useful with `event`
                    console.log(JSON.stringify(event, null, 2))
                });

            }).catch(console.error);


            api.on('error', (errorCode, errorMessage) => {
                console.log(errorCode + ': ' + errorMessage);
            });
            api.on('connected', () => {
              console.log('CONNECTED');
            });
            api.on('disconnected', (code) => {
              // code - [close code](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent) sent by the server
              // will be 1000 if this was normal closure
              console.log('DISCONNECTED, code:', code);
            });


        </script>

    </body>
</html>
