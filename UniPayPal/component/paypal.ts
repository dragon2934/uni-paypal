export default class Shop extends Vue {

    public total = '10.0'; // Will be dynamic

    public mounted(): void {
		console.log('..mounted..');
        const script = document.createElement('script');
        const clientId = 'abc123';
        script.src = "https://www.paypal.com/sdk/js?client-id=ATA4jIC3Gff3DiRU6G6bHnoIaStaQ1k42FIeohUnEQ9ntOWYwzzavddaa4t5VewXtyfVAUN2g7Hxk04h&components=buttons";
        script.addEventListener('load', this.paypalSetLoaded);
        document.body.appendChild(script);
    }

    public paypalSetLoaded() {
		console.log('..mount paypal..');
        window.paypal
            .Buttons({
                style: {
                    color: 'blue',
                    shape: 'pill',
                },
                createOrder: this.paypalCreateOrder,
                onApprove: this.paypalOnApprove,
            })
            .render('#paypal-button');
    }

    public paypalCreateOrder(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.total,
                }
            }],
        });
    }

    public paypalOnApprove(data, actions) {
        return actions.order.capture().then(details => {
            console.log(details);
        });
    }
}