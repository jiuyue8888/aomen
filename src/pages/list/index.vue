<template>
	<div class="list">
		<div >
		
			<van-tabs v-model="type" @change="getList(type)" :swipeable="true">
			  <van-tab v-for="(item,id) in nav" :title="item" :key='id'>
				  <div class="noData" v-if="data.length==0">
				  	<img src="../../assets/list/none.png"/>
				  	<p>居然甚麼都沒有T^T <br>
				  	快去參與遊戲獲得更多獎品吧！</p>
				  </div>
				  <div class="part2" v-else>
				  	<div v-for="(item,id) in data" class="card" :key="id" @click="$router.push({path:'./product',query:{couponno:item.couponno,id:item.mbid,type:0}})">
				  		<div class="top">
				  			<h5>{{item.name}}</h5>
				  			<span>{{item.mbname}}</span>
				  		</div>
				  		<div class="down">
				  			<div class="left"><img :src="item.icon"></div>
				  			<div class="right">
				  				<p>獎品編號：{{item.couponno}}</p>
				  				<p>有效期至：{{item.exptime}}</p>
				  				<b><img src="../../assets/list/btn.png"></b>
				  			</div>
				  		</div>
				  	</div>
				  </div>
			  </van-tab>
			</van-tabs>
			</div>
			<!--<span :class="type==id?'curr':''" v-for="(item,id) in nav" :key="id" @click="getList(id)">{{item}}</span>-->
		
		
		<div class="part3" v-show="false">
			<img src="../../assets/list/kv.png" />
		</div>
	</div>
</template>

<script>
	import {myList} from '../../serve/index.js';
export default {
	name: 'list',

	data() {
		return {
			type:0,
			nav:['未使用','已使用','已過期'],
			data:[]
		};
	},
	created() {
		this.getList(0)
	},
	methods: {
		getList(n){
			const that = this;
			this.type=n;
			myList({
				type:n
			}).then(res=>{
				that.data = res.data
			})
		}
	},
	watch: {},

	mounted() {}
};
</script>

<style scoped lang="less">
	.noData{
		position: relative;
		width: 100%;
		height: calc(100vh - 400px);
		text-align: center;
		padding-top: 180px;
		box-sizing: border-box;
		font-size: 32px;
		
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
		height: 100vh;
		overflow-x: hidden;
		overflow-y: auto;
		box-sizing: border-box;
		padding: 135px 25px 0;
		background: url(../../assets/list/lbg.png) no-repeat 0 0;
		background-size: 100% 100%;
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
		
			font-weight: 500;
			color: #A4451E;
			span{
				
				font-size: 28px;
	
				font-weight: normal;
				color: #8F6E5D;
			}
		}
		.part1{
			position: fixed;
			left: 25px;
			top: 25px;
			z-index: 8;
			width: 92%;
			display: flex;
			justify-content: space-around;
			align-items: center;
			
			
			
			
			opacity: 1;
			
			.curr{
				width: 230px;
				height: 90px;
				color: #FF7814;
				background: #FFFFFF;
				box-shadow: 0px 8px 35px 0px rgba(0, 0, 0, 0.2);
				border-radius: 45px;
			}
		}
	}
</style>
