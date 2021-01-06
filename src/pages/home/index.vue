<template>
	<div class="home">
		<div class="head">
			<img src="../../assets/home/logo.png">
			
		</div>
		<div class="tips"><img src="../../assets/home/w.png"></div>
		<div class="product">
			<div class="title"><img src="../../assets/home/font.png"></div>
			<div class="top">
				<div class="bg"><img src="../../assets/home/titlebg.png" /></div>
				<div class="left">
					<img src="../../assets/home/jb.png" class="jb">
					<span>133</span>
					<div class="add animated pulse infinite" @click="taskShow=true"><img src="../../assets/home/add.png"></div>
				</div>
				<div class="right">
					<img src="../../assets/home/lw.png" class="lw">
					<span>我的獎品</span>
				</div>
				
			</div>
			<div class="lists">
				<ul>
					<li v-for="(item,id) in 4">
						<img src="../../assets/home/pic.png">
						<p><span>小鎮首發盲盒</span><b>50</b></p>
					</li>
					
				</ul>
			</div>
		</div>
		<div class="footer">
			澳门小镇     
			<br>数字化游戏营销服务平台			                            
		</div>
		<task v-if="taskShow" @hide="hide"></task>
	</div>
</template>

<script>
	import task from '../task/index.vue';
	export default {
		name: 'home',
		components:{task},
		data() {
			return {
				taskShow:false
				}
		},
		created() {
			
			
		},
		methods: {
			hide(){
				this.taskShow=false;
				
			}
			},
		watch: {
			
		},
		
		mounted() {
			
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.home{
		position: relative;
		width: 100%;
		background: url(../../assets/home/bgb.png) no-repeat 0 0;
		background-size: 100% 100%;
		.head{
			position: relative;
			width: 502px;
			margin: 0 auto;
		}
		.right{
			position: absolute;
			top: 40px;
			right: 60px;
			width: 220px;
			height: 50px;
			background: rgba(255, 255, 255, 0.3);
			border-radius: 25px;
			    box-shadow: inset 0 0 20px #fff;
			
			box-sizing: border-box;
			padding-left: 70px;
			font-size: 32px;
			font-family: SourceHanSansSC;
			font-weight: bold;
			
			color: #854A3E;
			line-height: 50px;
			
			-webkit-text-stroke: 1px #FFFFFF;
			text-stroke: 1px #FFFFFF;
			.lw{
				position: absolute;
				left: 0;
				top: 50%;
				width: 68px;
				height: 74px;
				margin-top: -37px;
			}
		}
		.left{
			position: absolute;
			top: 40px;
			left: 60px;
			width: 214px;
			height: 50px;
			    box-shadow: inset 0 0 20px #fff;
			background: rgba(255, 255, 255, 0.3);
			border-radius: 25px;
			box-sizing: border-box;
			padding-left: 70px;
			font-size: 32px;
			font-family: SourceHanSansSC;
			font-weight: bold;
			font-style: italic;
			color: #854A3E;
			line-height: 50px;
			
			.jb{
				position: absolute;
				left: 0;
				top: 50%;
				width: 66px;
				height: 66px;
				margin-top: -33px;
			}
			.add{
				position: absolute;
				top:5px;
				right:3px;
				width: 44px;
				height: 44px;
			}
		}
		.tips{
			position: absolute;
			right: 25px;
			top:33px;
			width: 58px;
		}
		.product{
			position: relative;
			width: 100%;
			
			background: url(../../assets/home/bg.png) no-repeat 0 0;
			background-size: 100%;
		}
		.title{
			position: absolute;
			top:-54px;
			left: 50%;
			width: 254px;
			transform: translate(-50%,0);
			margin: 0 auto;
		}
		.footer{
			text-align: center;
			padding: 35px 0 90px;
			font-size: 28px;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #FFFFFF;
			line-height: 44px;
		}
		.lists{
			position: relative;
			
			width: 100%;
			box-sizing: border-box;
			padding: 35px 45px;
			
			ul{
				position: relative;
				width: 100%;
				max-height: 1920px;
				overflow: auto;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				li{
					position: relative;
					width: 330px;
					height: 440px;
					margin-bottom: 40px;
					background: url(../../assets/home/listbg.png) no-repeat 0 bottom;
					background-size: 100%;
					img{
						display: block;
						width: 230px;
						margin: 0 auto 20px;
					}
					p{
						position: relative;
						width: 100%;
						height: 90px;
						display: flex;
						justify-content: space-between;
						align-items: center;
						box-sizing: border-box;
						padding: 0 30px;
						
						font-size: 28px;
						font-family: Source Han Sans CN;
						font-weight: bold;
						color: #854A3E;
						line-height: 90px;
					}
					span{
						
						    white-space: nowrap;
						    overflow: hidden;
							max-width: 6em;
					}
					b{
						position: relative;
						box-sizing: border-box;
						padding-left: 56px;
						
						font-size: 32px;
						font-family: SourceHanSansSC;
						font-weight: bold;
						color: #854A3E;
						background: url(../../assets/home/jb.png) no-repeat 0 50%;
						background-size: 51px;
						
					}
				}
			}
			
		}
		
	}
</style>
