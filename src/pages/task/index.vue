<template>
	<div>
		<div :class="show ? 'task animated fadeOutDown' : 'task animated fadeInUp'">
			<div class="close" @click="close"><img src="../../assets/task/close.png" /></div>
			<h3>獲取哈哈幣任務</h3>
			<dl>
				<dt><img src="../../assets/task/wx.png" /></dt>
				<dd>
					<h5>關注「澳門小鎮」公眾號</h5>
					<span>
						<strong><em></em></strong>
						<i>0/1</i>
					</span>
					<p>
						獲得：
						<img src="../../assets/detail/jb.png" />
						+30
					</p>
					<b @click="gz"><img src="../../assets/task/gz.png" /></b>
				</dd>
			</dl>
			<dl>
				<dt><img src="../../assets/task/people.png" /></dt>
				<dd>
					<h5>邀請好友關注「澳門小鎮」</h5>
					<span>
						<strong><em></em></strong>
						<i>0/3</i>
					</span>
					<p>
						獲得：
						<img src="../../assets/detail/jb.png" />
						+10
					</p>
					<b>
						<h4 class="animated fadeInUp1 infinite">上限3個</h4>
						<img src="../../assets/task/yq.png" />
					</b>
				</dd>
			</dl>
		</div>
		<div class="pop" v-show="ewm">
			<div class="pop_body">
				<img class="close" @click="ewm=false;close()" src="../../assets/task/close.png" />
				<img class="logo" src="../../assets/home/logo.png" />
				<img class="ewm" src="../../assets/task/ewm.png" />
				<span>关注「澳门小镇」开盲盒，得大奖</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'task',
	props:['hide'],
	data() {
		return {
			show: false,
			ewm: false
		};
	},
	created() {},
	methods: {
		close() {
			const that = this;
			this.show = true;
			setTimeout(()=>{
				that.$emit('hide')
			},1000)
		},
		gz() {
			this.show = true;
			const that = this;
			var ua = navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				//ios的ua中无miniProgram，但都有MicroMessenger（表示是微信浏览器）
				window.wx.miniProgram.getEnv(res => {
					if (res.miniprogram) {
						//alert('在小程序里');
					} else {
						//alert('不在小程序');
						that.ewm = true;
					}
				});
			} else {
				//alert('不在微信');
			}
		}
	},
	watch: {},

	mounted() {}
};
</script>

<style scoped lang="less">
.pop {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
	width: 100%;
	height: 100vh;
	background: rgba(0, 0, 0, 0.7);
	.pop_body {
		position: absolute;
		width: 640px;
		left: 50%;
		top: 50%;
		text-align: center;

		font-size: 28px;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #3d6c64;
		line-height: 44px;
		box-sizing: border-box;
		padding: 26px 80px 50px;
		transform: translate(-50%, -50%);
		background: #fff;
		border-radius: 24px;
		span {
			margin-top: 20px;
		}
		.close{
			position: absolute;
			top:30px;
			right: 30px;
			width: 50px;
		}
		.logo{
			width: 360px;
			margin: 0 auto;
		}
	}
}
.task {
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 55;
	width: 100%;

	box-sizing: border-box;
	padding: 90px 35px 50px;
	background: #edecec;
	border-radius: 32px 32px 0px 0px;
	.close {
		position: absolute;
		top: 36px;
		right: 36px;
		width: 50px;
		height: 50px;
	}
	h3 {
		text-align: center;
		font-size: 36px;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #794001;
		margin-bottom: 60px;
		line-height: 36px;
	}
	dl {
		position: relative;
		width: 100%;
		display: flex;
		align-items: center;
		margin-bottom: 30px;
		box-sizing: border-box;
		padding: 30px 34px;
		background: #ffffff;
		border-radius: 16px;
		dt {
			width: 112px;
			margin-right: 20px;
		}
		h4 {
			position: absolute;
			top: -40px;

			transform: translate3d(-50%, 0, 0);
			width: 118px;
			height: 40px;

			font-size: 24px;
			font-family: Source Han Sans CN;
			font-weight: 500;
			color: #ffffff;
			line-height: 40px;
			background: #ff3c3c;
			border-radius: 20px;
			text-align: center;
			&::after {
				position: absolute;
				left: 50%;
				bottom: -8px;
				content: '';
				transform: translate(-50%, 0);
				border-top: 10px solid #ff3c3c;
				border-left: 10px solid transparent;
				border-right: 10px solid transparent;
			}
		}
		strong {
			width: 240px;
			height: 20px;
			margin-right: 20px;
			background: #e9e9e9;
			border-radius: 10px;
			overflow: hidden;
		}
		span {
			display: flex;
			align-items: center;
		}
		em {
			display: block;
			width: 50%;
			height: 20px;
			background: #ff822f;
		}
		i {
			font-style: normal;

			font-size: 24px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #999999;

			line-height: 60px;
		}
		h5 {
			font-size: 28px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #666666;
			line-height: 36px;
		}
		b {
			position: absolute;
			right: 30px;
			top: 50%;
			width: 140px;
			transform: translate(0, -50%);
		}
		b.done {
			width: 170px;
		}
		p {
			display: flex;
			align-items: center;

			font-size: 24px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #999999;
			line-height: 36px;
			img {
				width: 32px;
			}
		}
	}
}
</style>
