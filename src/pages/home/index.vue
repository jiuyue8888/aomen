<template>
	<div class="home">
		<div class="head">
			<img src="../../assets/home/logo.png">
			
		</div>
		<div class="tips" @click="openUrl(html)"><img src="../../assets/home/w.png"></div>
		<div class="product">
			<div class="title"><img src="../../assets/home/font.png"></div>
			<div class="top">
				<div class="bg"><img src="../../assets/home/titlebg.png" /></div>
				<div class="left">
					<img src="../../assets/home/jb.png" class="jb">
					<span class="span">{{hahacoin}}</span>
					<div class="add animated pulse infinite" @click="taskShow=true"><img src="../../assets/home/add.png"></div>
				</div>
				<div class="right" @click="$router.push('./list')">
					<img src="../../assets/home/bb.png" class="">
					
				</div>
				
			</div>
			<div class="lists">
				<ul>
					<li v-for="(item,id) in list" @click="$router.push({path:'./detail',query:{id:item.id}})" :key="id">
						<img :src="item.icon">
						<p><span>{{item.name}}</span><b>{{item.price}}</b></p>
					</li>
					
				</ul>
			</div>
		</div>
		<div class="footer" @click="openUrl('https://www.macaotown.com')">
			澳門小鎮
			<br>數字化遊戲營銷服務平台	                            
		</div>
		<task v-if="taskShow" @hide="hide" @init="init"></task>
		<div class="pop" v-show="help">
			
			<div class="pop_body">
				<img src="../../assets/task/close.png" class="close" @click="help=false"/>
				
			</div>
		</div>
	</div>
</template>

<script>
	import task from '../task/index.vue';
	import {home,getToken,userinfo,getUserinfo,helpContent,helpUrl} from '../../serve/index.js';
	export default {
		name: 'index',
		components:{task},
		data() {
			return {
				taskShow:false,
				list:JSON.parse(localStorage.getItem('list'))||[],
				help:false,
				html:'',
				
				hahacoin:localStorage.getItem('hahacoin')||0
			}
		},
		created() {
			const that = this;
			const shareId=this.getQueryString('shareId');
			console.log('shareId',shareId)
			
			if(window.location.origin.indexOf('localhost')>=0){
				getToken()
				that.init()
			}else{
				const url = localStorage.getItem('env')=='test'?`https://api-dev.macaotown.com/wx/get_userinfo?recommendlid=${shareId}&backurl=/`:
				`https://api.macaotown.com/wx/get_userinfo?recommendlid=${shareId}&backurl=/`;
				if((shareId!=null || shareId!=undefined)&&localStorage.getItem('share')!=1){
					localStorage.setItem('token', 'Bearer '+that.getQueryString('auth_token'))
					localStorage.setItem('share', 1)
					window.location.href = url
				}
				
				if(localStorage.getItem('token')==undefined||localStorage.getItem('token')==null||localStorage.getItem('token')=='null'||
				localStorage.getItem('token')=='undefined'){
					localStorage.setItem('token', 'Bearer '+that.getQueryString('auth_token'))
					window.location.href = url
				}else{
					if(that.getQueryString('auth_token')!=null){
						localStorage.setItem('token', 'Bearer '+that.getQueryString('auth_token'))
					}
					that.init()
					
				}
			}
			
			home().then(res=>{
				this.list = res.data;
				localStorage.setItem('list', JSON.stringify(res.data));
			})
			
			helpUrl().then(res=>{
				this.html=res.data.url
			})
			
			
		},
		methods: {
			openUrl(url){
				window.open(url)
			},
			init(){
				userinfo({}).then(res=>{
					localStorage.setItem('hahacoin', res.data.hahacoin);
					localStorage.setItem('subscribe', res.data.subscribe);
					localStorage.setItem('nickname', res.data.nickname);
					localStorage.setItem('shareId', res.data.id);
					this.hahacoin = res.data.hahacoin
				})
			},
			getQueryString(name) {
			    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
			    var r = window.location.search.substr(1).match(reg);
			    if (r != null) {
			        return unescape(r[2]);
			    }
			    return null;
			},
			GetUrlParame(parameName) {
			    /// 获取地址栏指定参数的值
			    /// <param name="parameName">参数名</param>
			    // 获取url中跟在问号后面的部分
			    var parames = window.location.search
			    // 检测参数是否存在
			    if (parames.indexOf(parameName) > -1) {
			        var parameValue = ''
			        parameValue = parames.substring(parames.indexOf(parameName), parames.length)
			        // 检测后面是否还有参数
			        if (parameValue.indexOf('&') > -1) {
			            // 去除后面多余的参数, 得到最终 parameName=parameValue 形式的值
			            parameValue = parameValue.substring(0, parameValue.indexOf('&'))
			            // 去掉参数名, 得到最终纯值字符串
			            parameValue = parameValue.replace(parameName + '=', '')
			            return parameValue
			        }
			        return ''
			    }
			},
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
	.animated {
		animation-duration: 1s;
	}
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
			height: 90vh;
			left: 50%;
			top: 50%;
			overflow: auto;
			
			box-sizing: border-box;
			padding: 30px;
			transform: translate(-50%, -50%);
			background: #fff;
			border-radius: 24px;
			
			.close {
				position: absolute;
				top: 30px;
				right: 30px;
				width: 50px;
			}
			
		}
	
		}
	.home{
		position: relative;
		width: 100%;
		min-height: 100vh;
		background: url(https://img-cdn.macaotown.com/%E8%83%8C%E6%99%AF.jpg) no-repeat 0 0;
		background-size: 100% 100%;
		.head{
			position: relative;
			width: 502px;
			margin: 0 auto;
		}
		.right{
			position: absolute;
			top: 30px;
			right: 60px;
			width: 230px;
			height: 76px;
			
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
	
			font-weight: bold;
			font-style: italic;
			color: #fff;
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
				top:4px;
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
			top:40px;
			background: url(../../assets/home/bg.png) no-repeat 0 bottom;
			background-size: 100%;
		}
		.top{
			position: relative;
			top:-40px
		}
		.title{
			position: absolute;
			top:-94px;
			left: 50%;
			z-index: 3;
			width: 254px;
			transform: translate(-50%,0);
			margin: 0 auto;
		}
		.footer{
			text-align: center;
			padding: 35px 0 90px;
			font-size: 28px;
			
			font-weight: bold;
			color: #FFFFFF;
			line-height: 44px;
		}
		.lists{
			position: relative;
			
			width: 100%;
			box-sizing: border-box;
			padding: 0 45px 35px;
			
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
						width: 280px;
						height: 325px;
						margin: 15px 0 15px 40px;
						
					}
					p{
						position: relative;
						width: 100%;
						height: 70px;
						display: flex;
						justify-content: space-between;
						align-items: center;
						box-sizing: border-box;
						padding: 0 30px;
						
						font-size: 28px;
					
						font-weight: bold;
						color: #854A3E;
						line-height: 70px;
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
