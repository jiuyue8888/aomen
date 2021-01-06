<template>
	<div class="list">
		<div class="part1">
			<span class="curr">未使用</span>
			<span>已使用</span>
			<span>已過期</span>
		</div>
		<div class="noData">
			<img src="../../assets/list/none.png"/>
			<p>居然甚麼都沒有T^T <br>
			快去參與遊戲獲得更多獎品吧！</p>
		</div>
		<div class="part2">
			<div v-for="(item,id) in 6" class="card">
				<div class="top">
					<h5>AirPods Pro兌換券</h5>
					<span>XX盲盒</span>
				</div>
				<div class="down">
					<div class="left"><img src="../../assets/product/pro.png"></div>
					<div class="right">
						<p>獎品編號：9283774047575</p>
						<p>有效期至：2020-12-19 11:00</p>
						<b><img src="../../assets/list/btn.png"></b>
					</div>
				</div>
			</div>
		</div>
		<div class="part3">
			
		</div>
	</div>
</template>

<script>
export default {
	name: 'list',

	data() {
		return {};
	},
	created() {},
	methods: {
		
	},
	watch: {},

	mounted() {}
};
</script>

<style scoped lang="less">
	.noData{
		position: relative;
		width: 100%;
		height: calc(100vh - 350px);
		text-align: center;
		padding-top: 180px;
		box-sizing: border-box;
		font-size: 32px;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #794001;
		line-height: 60px;
		img{
			width: 128px;
			margin-bottom: 70px;
		}
	}
	.list{
		position: relative;
		width: 100%;
		box-sizing: border-box;
		padding: 25px;
		background: url(../../assets/home/bgb.png) no-repeat 0 0;
		background-size: 100%;
		.card{
			position: relative;
			width: 100%;
			box-sizing: border-box;
			padding: 0 35px;
			margin-bottom: 20px;
			background: url(../../assets/list/listbg.png) no-repeat 0 0;
			background-size: 100%;
		}
		.down{
			position: relative;
			width: 100%;
			
			padding: 30px 0;
			display: flex;
			
			align-items: center;
			
			font-size: 28px;
			font-family: SourceHanSansSC;
			font-weight: 400;
			color: #794001;
			line-height: 48px;
			b{
				position: absolute;
				right: 0;
				bottom: 30px;
				width: 205px;
			}
		}
		.right{
			
			height: 180px;
		}
		.left{
			width: 180px;
			height: 180px;
			box-sizing: border-box;
			padding: 20px;
			background: linear-gradient(123deg, rgba(222, 210, 111, 0.5), rgba(183, 218, 135, 0.5));
			border-radius: 10px;
			overflow: hidden;
			margin-right: 20px;
			img{
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		.top{
			position: relative;
			width: 100%;
			height: 90px;
			line-height: 90px;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			font-size: 32px;
			font-family: SourceHanSansSC;
			font-weight: 500;
			color: #A4451E;
			span{
				
				font-size: 28px;
				font-family: Adobe Heiti Std;
				font-weight: normal;
				color: #8F6E5D;
			}
		}
		.part1{
			position: relative;
			width: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;
			height: 90px;
			background: rgba(255, 255, 255, 0.4);
			box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.13), 0px 3px 0px 0px #FFFFFF;
			line-height: 90px;
			border-radius: 45px;
			box-sizing: border-box;
			margin-bottom: 25px;
			
			font-size: 34px;
			font-family: SourceHanSansSC;
			font-weight: 500;
			color: #753B30;
			
			opacity: 0.8;
			span{
				display: block;
				width: 230px;
				height: 90px;
				text-align: center;
			}
			.curr{
				width: 230px;
				height: 90px;
				background: #FFFFFF;
				box-shadow: 0px 8px 35px 0px rgba(0, 0, 0, 0.2);
				border-radius: 45px;
			}
		}
	}
</style>
