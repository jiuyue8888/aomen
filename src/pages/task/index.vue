<template>
	<div>
		<div class="pop">
			<div :class="show ? 'task animated fadeOutDown' : 'task animated fadeInUp'">
				<div class="close" @click="close"><img src="../../assets/task/close.png" /></div>
				<h3>獲取哈哈幣任務</h3>

				<dl v-for="(item, id) in data">
					<dt><img :src="item.icon" /></dt>
					<dd>
						<h5>{{ item.name }}</h5>
						<span>
							<strong><em :style="`width:${(item.nowfinish / item.targetfinish) * 100}%`"></em></strong>
							<i>{{ item.nowfinish }}/{{ item.targetfinish }}</i>
						</span>
						<p>
							獲得：
							<img src="../../assets/detail/jb.png" />
							+{{ item.prizeremark }}
						</p>
						<b @click="dotask(item.taskid, item.status)" :class="item.status > 1 ? 'curr' : ''">
							<h4 class="animated fadeInUp1 infinite" v-show="item.taskid == 2">上限3個</h4>
							{{ item.btn_name }}
						</b>
					</dd>
				</dl>
			</div>
		</div>
		<div class="pop" v-show="ewm">
			<div class="pop_body">
				<img
					class="close"
					@click="
						ewm = false;
						close();
					"
					src="../../assets/task/close.png"
				/>
				<img class="logo" src="../../assets/home/logo.png" />
				<img class="ewm" src="../../assets/task/ewm.png" />
				<span>关注「澳门小镇」开盲盒，得大奖</span>
			</div>
		</div>

		<div class="pop" v-show="share">
			<div class="top canvas" ref="box">
				<img src="../../assets/home/load.png" />
				<div class="user">
					<img src="../../assets/task/ewm.png" ref="img"/>
					<p>
						{{ nickname }}
						<br />
						邀請您一起關注
						<br />
						一探究竟
					</p>
				</div>
			</div>

			<div class="down" v-if="wxShow">
				<img src="../../assets/task/close.png" class="close" @click="closeWx"/>
				<p>分享到</p>
				<div>
					<span>
						<img src="../../assets/task/pyq.png" @click="shareAction('line')"/>
						微信朋友圈
					</span>
					<span>
						<img src="../../assets/task/wxicon.png" @click="shareAction('app')" />
						微信好友
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getTaskList, pickupTaskprize } from '../../serve/index.js';
import CommonShare from '../../unitls/index.js';
import html2canvas from 'html2canvas';
import { Toast } from 'vant';
export default {
	name: 'task',
	props: ['hide'],
	data() {
		return {
			show: false,
			ewm: false,
			share: false,
			data: [],
			wxShow:false,
			imgShare:'',
			subscribe: localStorage.getItem('subscribe'),
			nickname: localStorage.getItem('nickname')
		};
	},
	created() {
		this.init();
	},
	methods: {
		init() {
			getTaskList({}).then(res => {
				this.data = res.data;
			});
		},
		closeWx(){
			this.wxShow=false;
			this.share=false;
			
		},
		shareAction(type){
			
			CommonShare(type,this,'shareTitle','shareUrl',this.imgShare,'shareDesc')
		},
		showShare() {
			const that = this;
			const w = that.$refs.box.clientWidth;
			const h = that.$refs.box.clientHeight;
			html2canvas(that.$refs.box, {
				width: w, //画布的宽度，即生成图片的宽度
				height: h, //画布的宽度，同上
				dpi: window.devicePixelRatio * 2, // 对应屏幕的dpi，适配高清屏，解决canvas模糊问题
				scale: 1, // 缩放
				useCORS: true
			}).then(function(canvas) {
				that.imgShare = canvas.toDataURL();
				
				//console.log(canvas.toDataURL()); //将canvas转为base64图片
			}).catch(res=>{
				console.log(res)
			});
			console.log(that.imgShare )
			that.wxShow=true
		},
		close() {
			const that = this;
			this.show = true;
			setTimeout(() => {
				that.$emit('hide');
			}, 500);
		},
		dotask(id, status) {
			const that = this
			if (status == 1) {
				pickupTaskprize({ taskid: id }).then(res => {
					
						Toast(res.info)
					
					
					that.init();
				});
				return;
			}
			if (status == 0) {
				switch (id) {
					case '1':
						that.gz();
						break;
					case '2':
						that.share = true;
						
						setTimeout(() => {
							that.showShare();
						}, 200);

						break;
				}
				return;
			}
		},
		gz() {
			this.show = true;
			const that = this;
			var ua = navigator.userAgent.toLowerCase();
			
			if(that.data.method=="directpage"){
				window.location.href=that.data.directurl
			}else{
				that.ewm = true;
			}
			/*
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				//ios的ua中无miniProgram，但都有MicroMessenger（表示是微信浏览器）
				window.wx.miniProgram.getEnv(res => {
					if (res.miniprogram) {
						//alert('在小程序里');
						window.location.href='https://mp.weixin.qq.com/s/ju5XJhF5piCZw85JBzp6hw'
					} else {
						//alert('不在小程序');
						that.ewm = true;
					}
				});
			} else {
				//alert('不在微信');
			}*/
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
		.close {
			position: absolute;
			top: 30px;
			right: 30px;
			width: 50px;
		}
		.logo {
			width: 360px;
			margin: 0 auto;
		}
	}

	.top {
		position: absolute;
		top: 40px;
		left: 50%;
		width: 600px;
		margin-left: -300px;
		border-radius: 30px;
		overflow: hidden;
		.user {
			position: absolute;
			left: 50%;
			bottom: 200px;
			width: 360px;
			margin-left: -150px;
			display: flex;
			color: #794001;
			align-items: center;
			img {
				width: 100px;
				margin-right: 20px;
			}
		}
	}
	.down {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		box-sizing: border-box;
		padding-top: 30px;
		text-align: center;
		font-size: 36px;

		font-weight: 500;
		color: #666666;
		line-height: 44px;
		height: 280px;
		background: #ffffff;
		border-radius: 24px 24px 0px 0px;
		.close {
			position: absolute;
			top: 30px;
			right: 30px;
			width: 50px;
		}
		p {
			margin-bottom: 20px;
		}
		div {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;

			font-size: 28px;
			span {
				display: block;
				text-align: center;
				margin: 0 20px;
			}
			img {
				width: 96px;
				height: 96px;
				display: block;
				margin: 0 auto 15px;
			}
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
	padding: 90px 35px 0px;

	background: linear-gradient(180deg, #ebe3cb 1%, #e0efc9 100%);
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
			left: 50%;
			margin-left: -59px;
			width: 118px;
			height: 40px;

			font-size: 24px;

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
			height: 20px;
			background: #ff822f;
		}
		i {
			font-style: normal;

			font-size: 30px;

			font-weight: 400;
			color: #999999;

			line-height: 60px;
		}
		h5 {
			font-size: 28px;

			font-weight: 400;
			color: #666666;
			line-height: 36px;
		}
		b {
			position: absolute;
			right: 30px;
			top: 50%;
			width: 140px;
			height: 80px;
			line-height: 70px;
			color: #fff;
			text-align: center;
			transform: translate(0, -50%);
			background: url(../../assets/task/huang.png) no-repeat 0 0;
			background-size: 100% 100%;
		}
		b.curr {
			background: url(../../assets/task/hui.png) no-repeat 0 0;
			background-size: 100% 100%;
		}
		b.done {
			width: 170px;
		}
		p {
			display: flex;
			align-items: center;

			font-size: 30px;

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
