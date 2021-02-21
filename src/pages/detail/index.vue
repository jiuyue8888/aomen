<template>
	<div>
		<div class="detail">
			<div class="part1">
				<div class="top">
					<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
						<van-swipe-item v-for="(item, id) in data.imgs" :key="id"><img :src="item" style="border-radius: 0.4rem 0.4rem 0 0;" /></van-swipe-item>
					</van-swipe>
				</div>
				<div class="down"><p v-html="data.content"></p></div>
			</div>
			<div class="part2">
				<div class="top">
					<div class="left" @click="btnClick(data.price)">
						<img src="../../assets/detail/jb.png" />
						<span>{{ data.price }}</span>
					</div>
					<div class="right" @click="btnClick((data.price * 5 * data.x5_rebate) / 100)">
						<img src="../../assets/detail/jb.png" />
						<span>{{ (data.price * 5 * data.x5_rebate) / 100 }}</span>
						<i><img src="../../assets/detail/tip.png" /></i>
						<em>原價{{ data.price * 5 }}</em>
					</div>
				</div>
				<div class="down">
					您擁有 {{ num }}
					<img src="../../assets/detail/jb.png" />
				</div>
			</div>
		</div>
		<div class="pop pop1" v-show="pop1">
			<div class="pop_body">
				<img src="../../assets/task/close.png" class="close" @click="hide('pop1')" />
				<img src="../../assets/detail/tips.png" class="img" />
				<p>
					哎呀，哈哈幣唔夠喇
					<br />
					完成任務，獲得更多哈哈幣！
				</p>
				<b
					@click="
						taskShow = true;
						hide('pop1');
					"
				>
					<img src="../../assets/detail/go.png" />
				</b>
			</div>
		</div>
		<div class="pop pop2" v-show="pop2">
			<div class="pop_body">
				<img src="../../assets/detail/titlepop.png" class="title" />
				<img src="../../assets/detail/close.png" class="close" @click="hide('pop2')" />
				<div v-if="buyType == 1" class="bgimg">
					<div class="imgbg animated"><img src="../../assets/detail/guang.png" /></div>
					<img src="../../assets/detail/hh.png" class="pic animated bounceIn" v-if="popData.prizeid == 1" />
					<img :src="popData.icon" class="pic animated bounceIn" v-else />
					<b v-if="popData.prizeid == 1">
						<i>X</i>
						{{ popData.name.replace(/[^0-9]/gi, '') }}
					</b>
					<h3>{{ popData.name }}</h3>
					<p v-if="popData.prizeid == 1">離獎品更近一步啦！哈哈幣可用於購買盲盒喔！</p>
					<div class="btns" v-if="popData.prizeid > 2">
						<img src="../../assets/detail/detail.png" @click="$router.push({ path: './product', query: { couponno: popData.couponno } })" />
						<img src="../../assets/detail/again.png" @click="btnClick(data.price)" />
					</div>
					<div class="btns" v-else>
						<div class="btn" @click="$router.push('./')"><img src="../../assets/detail/qsc.png"></div>
						<img src="../../assets/detail/again.png" @click="btnClick(data.price)" />
					</div>
				</div>
				<div v-else>
					<div class="imgbg animated ntop"><img src="../../assets/detail/guang.png" /></div>
					<div class="popList">
						<div v-for="(item, id) in popData" :class="'animated bounceIn delay' + id">
							<img :src="item.icon" />
							{{ item.name }}
						</div>
					</div>
					<div class="btns">
						<img src="../../assets/detail/ck.png" @click="$router.push({ path: './list' })" />
						<img src="../../assets/detail/jx.png" @click="btnClick((data.price * 5 * data.x5_rebate) / 100)" />
					</div>
				</div>
			</div>
		</div>
		<task v-if="taskShow" @hide="hide('taskShow')" @init="getUser"></task>
	</div>
</template>

<script>
import task from '../task/index.vue';
import { Toast } from 'vant';
import { detail, mysteryBuyone, mysteryBuyfive, myprizeDetail, openMystery, userinfo, addHahacoin } from '../../serve/index.js';
export default {
	name: 'list',
	components: { task },
	data() {
		return {
			num: Number(localStorage.getItem('hahacoin')), //哈哈币
			pop1: false, //哈哈比不足弹窗
			pop2: false, //中奖弹窗
			taskShow: false, //任务弹窗
			data: {}, //盲盒详情数据
			popData: {}, //中奖弹窗数据
			buyType: 1,
			lock: true,
			id: this.$route.query.id,
			couponno: this.$route.query.type && this.$route.query.type == 0 ? this.$route.query.couponno : this.$route.query.id,
			type: this.$route.query.type
		};
	},
	mounted() {
		//addHahacoin({amount:1000})
		this.getList();
		this.getUser();
	},
	methods: {
		getList() {
			detail({
				mbid: this.$route.query.id
			}).then(res => {
				this.data = res.data;
			});
		},
		getUser() {
			userinfo({}).then(res => {
				localStorage.setItem('hahacoin', res.data.hahacoin);
				this.num = res.data.hahacoin;
			});
		},
		init() {},
		btnClick(n) {
			const that = this;
			this.pop2 = false;
			if (!that.lock) {
				return;
			}
			that.lock = false;
			if (n - this.num > 0) {
				this.pop1 = true;
				that.lock = true;
			} else {
				if (n != that.data.price) {
					mysteryBuyfive({
						mbid: that.$route.query.id
					}).then(res => {
						setTimeout(() => {
							document.getElementsByClassName('hezi')[0].style.display = 'none';
							that.getUser();
							that.lock = true;
							if (res.info == 'success') {
								that.pop2 = true;
								that.popData = res.data;

								that.buyType = 5;
							} else {
								Toast(res.info);
							}
						}, 2000);
					});
				} else {
					mysteryBuyone({
						mbid: that.$route.query.id
					}).then(res => {
						setTimeout(() => {
							document.getElementsByClassName('hezi')[0].style.display = 'none';
							that.getUser();
							that.lock = true;
							if (res.info == 'success') {
								that.pop2 = true;
								that.popData = res.data;
								that.buyType = 1;
							} else {
								Toast(res.info);
							}
						}, 2000);
					});
				}
			}
		},
		hide(type) {
			this[type] = false;
		}
	},
	watch: {}
};
</script>

<style scoped lang="less">
.delay0 {
}
.delay1 {
	animation-delay: 0.3s;
}
.delay2 {
	animation-delay: 0.6s;
}
.delay3 {
	animation-delay: 0.9s;
}
.delay4 {
	animation-delay: 1.2s;
}
.pop {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 101vh;
	z-index: 99;
	background: rgba(0, 0, 0, 0.9);
	.pop_body {
		width: 100%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	.close {
		position: absolute;
		right: 0.4rem;
		top: -0.5rem;
		width: 0.8rem;
	}
	.imgbg {
		position: absolute;
		top: -160px;
		left: 0;
		z-index: -1;
		width: 100%;
		opacity: 0.5;
		animation: rotate 6s infinite linear;
	}
	.ntop {
		top: 160px;
	}
	.bgimg {
		position: relative;
		width: 100%;

		i {
			font-size: 38px;
			font-style: normal;
		}
		b {
			position: absolute;
			left: 0;
			top: 380px;
			text-align: center;
			display: block;
			width: 100%;
			font-size: 48px;
			font-weight: 800;
			color: #ffffff;
			line-height: 40px;
			text-shadow: 0px 5px 10px rgba(0, 0, 0, 0.27);
		}
	}
}
@keyframes rotate {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
@-webkit-keyframes rotate {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
.pop1 {
	.pop_body {
		width: 560px;
		box-sizing: border-box;
		padding: 50px 40px;
		background: #ffffff;
		border-radius: 16px;
	}
	.close {
		position: absolute;
		top: 20px;
		right: 20px;
		width: 48px;
	}
	.img {
		display: block;
		width: 128px;
		margin: 0 auto;
	}
	b {
		display: block;
		width: 232px;
		margin: 0 auto;
	}
	p {
		width: 100%;
		text-align: center;
		margin: 36px 0;

		font-size: 28px;

		font-weight: 400;
		color: #666666;
		line-height: 48px;
	}
}
.pop2 {
	text-align: center;
	.title {
		display: block;
		width: 452px;
		margin: 0 auto;
	}
	.pic {
		display: block;
		width: 460px;
		margin: 0 auto;
	}
	.btns {
		position: relative;
		width: 580px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		img {
			width: 232px;
		}
		.big {
			width: 290px;
		}
	}
	.btn {
		width: 270px;
		height: 100px;
		margin: 0 auto;
		text-align: center;
		line-height: 90px;
		color: #fff;
		font-size: 32px;
		
	}
	h3 {
		font-size: 40px;

		font-weight: 500;
		color: #ffffff;
		line-height: 40px;
		margin: 60px 0;
	}
	p {
		width: 590px;
		margin: 0 auto;
		font-size: 28px;

		font-weight: 500;
		color: #ffffff;
		height: 160px;
		text-align: left;
	}
}
.popList {
	width: 100%;
	box-sizing: border-box;
	padding: 40px 50px 90px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	text-align: center;
	color: #fff;
	line-height: 30px;
	img {
		width: 200px;
		height: 200px;
		object-fit: cover;
		margin-bottom: 30px;
	}
	div {
		width: 200px;
		margin-bottom: 40px;
		margin-right: 0.15rem;
	}
}
.detail {
	position: relative;
	width: 100%;
	height: 100vh;
	overflow: auto;
	box-sizing: border-box;
	padding: 20px 20px 200px;
	background: url(../../assets/list/lbg.png) no-repeat 0 0;
	background-size: 100% 100%;
	.part1 {
		position: relative;
		width: 700px;
		margin: 0 auto;

		background: url(../../assets/detail/bg.png) no-repeat 0 0;
		background-size: 100%;
		.my-swipe {
			overflow: hidden;
			-webkit-transform: rotate(0deg);
			border-radius: 30px 30px 0 0;
		}
		.top {
			position: relative;
			width: 700px;
			height: 600px;
			margin-top: 22px;
			overflow: hidden;
			border-radius: 30px 30px 0 0;

			img {
				display: block;
				width: 700px;
				border-radius: 30px 30px 0 0;
				height: 600px;
			}
		}
		.down {
			position: relative;
			top: 0;
			width: 700px;
			background: #fff;
			box-sizing: border-box;
			border-radius: 0;
			overflow: hidden;
			box-shadow: 0px 8px 35px 0px rgba(0, 0, 0, 0.2);

			h3 {
				margin-bottom: 30px;
				font-size: 44px;

				font-weight: bold;
				color: #a4451e;
				line-height: 36px;
				text-align: center;
			}
			p {
				position: relative;
				width: 100%;

				box-sizing: border-box;

				font-size: 24px;

				font-weight: 500;
				color: #794001;
				line-height: 40px;
				background: linear-gradient(123deg, rgba(222, 210, 111, 0.2), rgba(183, 218, 135, 0.2));
			}
		}
	}

	.part2 {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 9;
		width: 100%;
		height: 200px;
		text-align: center;
		background: #ffffff;
		box-shadow: 0px 8px 35px 0px rgba(0, 0, 0, 0.2), 0px 3px 0px 0px #ffffff;
		border-radius: 30px 30px 0 0;
		.top {
			position: relative;
			width: 100%;
			box-sizing: border-box;
			padding: 17px 65px 15px;
			display: flex;
			color: #fff;
			justify-content: space-between;
			align-items: center;

			font-size: 36px;

			font-weight: 500;
			color: #ffffff;

			img {
				width: 40px;
				margin-right: 10px;
			}
		}
		.left {
			position: relative;
			width: 268px;
			height: 108px;
			box-sizing: border-box;
			padding-left: 117px;
			display: flex;
			align-items: center;
			background: url(../../assets/detail/p1.png) no-repeat 0 0;
			background-size: 100%;
		}
		.right {
			position: relative;
			width: 288px;
			height: 108px;
			box-sizing: border-box;
			padding-left: 117px;
			padding-bottom: 20px;
			display: flex;
			align-items: center;
			background: url(../../assets/detail/p2.png) no-repeat 0 0;
			background-size: 100%;
			i {
				position: absolute;
				top: -29px;
				right: -20px;
				width: 96px;
				img {
					width: 100%;
				}
			}
			em {
				position: absolute;
				left: 50%;
				bottom: 10px;
				font-style: normal;
				font-size: 22px;

				font-weight: 400;
				text-decoration: line-through;
				color: #ffffff;
				line-height: 36px;
			}
		}
		.down {
			position: relative;
			display: inline-block;
			padding: 3px 10px;

			font-size: 28px;

			font-weight: 500;
			color: #794001;
			line-height: 40px;
			background: #f2e3d2;
			border-radius: 20px;
			.parent {
				display: flex;
				justify-content: center;
				text-align: center;
			}

			img {
				width: 32px;
				height: 32px;
			}
		}
	}
}
</style>
