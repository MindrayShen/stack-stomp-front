var app = new Vue({
    el: '#app',
    data: {
        socket: '',
        stompclient: '',
        input: '',
        sendInput:'',
        textarea1:'',
        raceId:'',
        userName:'',
    },
    mounted() {
        console.log('view mounted');
    },
    methods: {
        handleConnect() {
            console.log('connect click');

            // this.socket = new SockJS('http://localhost:8080/cjfstompsrv2');
            // this.stompclient = Stomp.over(this.socket);
            this.stompclient = Stomp.client(this.input);
            this.stompclient.connect({
                // Authorization:"Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImY1N2ZmY2NiLWFlNmYtNDBjNi05OWQ2LWVkMjdiYjRiZDk1ZSJ9.ILT6dN-2AZu9wGX8Wjv5gqbLX-pDp18pL3PiHTnaZCn-o9VVxrD_szJhMIT0LPTt92hglBtp-pFFvNKTJ7cR2w",
                name:this.userName,
            }, frame => {
                console.log(frame);
                this.stompclient.subscribe('/user/mytopic/greetings', function (data) {
                    console.log(data)
                    app.privateSend(data.body)
                });
                this.stompclient.subscribe('/myqueue/'+this.raceId, function (data) {
                    console.log(data)
                    app.publicSend(data.body)
                });
            });

        },
        handleSend() {
            console.log('send click');

            this.stompclient.send("/myapp/greeting", {}, this.sendInput);
        },
        handleSendQueue() {
            console.log('send click');

            this.stompclient.send("/myapp/queue/"+this.raceId, {}, this.sendInput);
        },
        handleDisconnect(){
            console.log('disconnect click');
            this.stompclient.disconnect();
        },
        privateSend(message){
            app.textarea1 += message + "\n"
            this.$notify.success({
                title: '这是一条私信',
                message: message,
                showClose: false
            });
        },
        publicSend(message){
            app.textarea1 += message + "\n"
            this.$notify.success({
                title: '这是一条比赛参与者消息',
                message: message,
                showClose: false
            });
        }
    }
})