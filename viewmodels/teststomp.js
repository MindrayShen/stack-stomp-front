var app = new Vue({
    el: '#app',
    data: {
        socket: '',
        stompclient: ''
    },
    mounted() {
        console.log('view mounted');
    },
    methods: {
        handleConnect() {
            console.log('connect click');

            this.socket = new SockJS('http://localhost:8080/cjfstompsrv2');
            this.stompclient = Stomp.over(this.socket);
            this.stompclient.connect({
                // Authorization:"Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImY1N2ZmY2NiLWFlNmYtNDBjNi05OWQ2LWVkMjdiYjRiZDk1ZSJ9.ILT6dN-2AZu9wGX8Wjv5gqbLX-pDp18pL3PiHTnaZCn-o9VVxrD_szJhMIT0LPTt92hglBtp-pFFvNKTJ7cR2w",
                name:"12345",
            }, frame => {
                console.log(frame);
                this.stompclient.subscribe('/user/mytopic/greetings', function (data) {
                    console.log(data)
                });
            });

        },
        handleSend() {
            console.log('send click');

            this.stompclient.send("/myapp/greeting", {}, 'hello websocket stomp');
        },
        handleDisconnect(){
            console.log('disconnect click');
            this.stompclient.disconnect();
        }
    }
})