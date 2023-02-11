<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{ title }}</text>
		</view>
		<view>
			<div id="paypal-button"></div>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello'
		}
	},
	onLoad() {
	},
	async mounted() {
		console.log('..mounted..');
        const script = document.createElement('script');
        const clientId = 'abc123';
        script.src = "https://www.paypal.com/sdk/js?client-id=ATA4jIC3Gff3DiRU6G6bHnoIaStaQ1k42FIeohUnEQ9ntOWYwzzavddaa4t5VewXtyfVAUN2g7Hxk04h&components=buttons";
        script.addEventListener('load', this.paypalSetLoaded);
        document.body.appendChild(script);
	},
	methods: {
		paypalSetLoaded:function() {
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
		},
		
		paypalCreateOrder: function(data, actions) {
		    return actions.order.create({
		        purchase_units: [{
		            amount: {
		                currency_code: 'USD',
		                value: 10,
		            }
		        }],
		    });
		},
		
		paypalOnApprove: function(data, actions) {
		    return actions.order.capture().then(details => {
		        console.log(details);
		    });
		},
		doPay: function () {
			var orderInfo = {
			  "clientId": "AXQ09vCHKcXptyhI1EPORoLLcm88MJypSHyVSFaQyo3bTknPSvuLgVmvh0rkG2tat4L5_5LhBdznaZ7U",     //客户端id
			  "orderId": "123",       //订单id
			  "userAction": "paynow",  //  paynow/continue
			  "currency":"CAD",          // 币种  
			  "environment":"sandbox",   //运行环境 sandbox/live
			};
			uni.getProvider({
				service: 'payment',
				success: function (res) {
					console.log('..res.provider:' + JSON.stringify(res.provider));
					if (~res.provider.indexOf('paypal')) {
						uni.requestPayment({
							"provider": "paypal",
							"orderInfo": orderInfo,
							success: function (response) {
								console.log('success:' + JSON.parse(response.rawdata));
							},
							fail: function (err) {
								console.log('fail:' + JSON.stringify(err));
							}
						});
					} else {
						uni.showToast({
							title: '抱歉，当前您的系统暂不支持使用Paypal支付。',
							icon: 'none'
						})
					}
				}
			});
		}
	}
}
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
