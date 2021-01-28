<template>
	<div id="app">
		<div v-show="show" class="back" @click="click">
			<img src="./assets/home/back.png">
		</div>
		<router-view />
		<div class="loading">
			<img src="./assets/home/logo.png" />
			<van-loading color="#4EB6A4" />
		</div>
		<div class="hezi">
			<img src="./assets/home/he.png" />
			<p>盲盒正在打開...</p>
		</div>
	</div>
</template>

<script>
	
	export default {
		name: 'App',
		data(){
			return {
				show:this.$route.path!='/',
			}
		},
		methods:{
			click(){
				if(this.$route.path=='/product'){
					this.$router.push('./list')
				}else{
					this.$router.push('./')
				}
				
			}
		},
		watch:{
		    $route:{
		      handler(val,oldval){
				  this.show = val.path!='/'
		        
		      },
		     
		    }
		  }
	}
</script>

<style>
	@import url("animate.css");
	.hezi{
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 100vh;
		color: #fff;
		text-align: center;
		background: rgba(0,0,0,0.6);
	}
	.hezi p{
		position: absolute;
		left: 0;
		top:45%;
		
		width: 100%;
		margin-top: 100px;
	}
	.hezi img{
		position: absolute;
		left: 50%;
		top:45%;
		
		width: 100px;
		margin-left: -50px;
		animation:bounce 1s ease both infinite;

	}
	@-webkit-keyframes bounce{
	0%,20%,50%,80%,100%{-webkit-transform:translateY(0)}
	40%{-webkit-transform:translateY(-30px)}
	60%{-webkit-transform:translateY(-15px)}
	}
	@-moz-keyframes bounce{
	0%,20%,50%,80%,100%{-moz-transform:translateY(0)}
	40%{-moz-transform:translateY(-30px)}
	60%{-moz-transform:translateY(-15px)}
	}
	.loading{
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 100vh;
		background: url(assets/list/lbg.png) no-repeat 0 0;
		background-size: 100%;
		
	}
	
	.loading img{
		position: absolute;
		left: 50%;
		top:50%;
		transform: translate(-50%,-50%);
		width: 160px;
	}
	
	.van-loading__spinner{
		
		width: 260px;
		height: 260px;
	}
	.van-loading{
		position: absolute;
		left: 50%;
		top:50%;
		transform: translate(-50%,-50%);
		width: 260px;
		height: 260px;
	}
	
	.van-loading__circular circle{
		stroke-width: 1;
	}
	* {
		padding: 0;
		margin: 0;
	}
	img{
		max-width: 100%;
		
		vertical-align: top;
	}
	li{
		list-style: none;
	}
	body{
	   
	    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}
	.animated {
		animation-duration: 0.5s;
	}
	.back{
		position: fixed;
		left: 20px;
		top:20px;
		z-index: 9;
		width: 80px;
	}
	.van-tab__text--ellipsis{
		display: block;
		width: 200px;
		height: 90px;
		line-height: 90px;
		text-align: center;
	}
	.van-tabs__nav--line11{
		height: 90px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.13), 0px 3px 0px 0px #FFFFFF;
		line-height: 90px;
		border-radius: 45px;
		box-sizing: border-box;
		margin-bottom: 25px;
	}
	.van-tabs__wrap{
		position: fixed;
		top: 20px;
		left: 1.4rem;
		
		width: 630px;
		height: 90px!important;
		line-height: 90px!important;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.13), 0px 3px 0px 0px #FFFFFF;
		border-radius: 45px;
		box-sizing: border-box;
		margin-bottom: 25px;
	}
	.van-tabs--line .van-tabs__wrap,
	.van-tabs,
	.van-tab{
		
		font-size: 34px;
				
		font-weight: 500;
		color: #753B30;
		z-index: 2;
	}
	.van-tab--active {
	    
	    color: #FF7814;
	   
	}
	.van-tabs__line {
	    position: absolute;
	    top: 0;
	    left: 0;
	    z-index: 0;
	    width: 230px;
	    height: 90px;
	    color: #FF7814;
	    background: #FFFFFF;
	    box-shadow: 0px 8px 35px 0px rgba(0, 0, 0, 0.2);
	    border-radius: 45px;
	}
	.van-swipe-item{
		border-radius: 30px 30px 0 0;
		overflow: hidden;
	}
	.van-tabs__nav{
		background: transparent;
	}
	.van-toast--html, .van-toast--text{
		padding: 60px 80px!important;
		font-size: 30px!important;
		line-height: 40px!important;
	}
	.van-field__body{
		height: 100%;
		font-size: 28px;
	}
	.van-key{
		height: 1rem;
	}
.van-swipe__indicator{
			width: 18px;
			height: 18px;
			opacity: 1;
			background-color: #fff!important;
		}
		.van-swipe__indicator:not(:last-child){
			margin-right: 14px;
		}
		.van-swipe__indicator--active{
			background-color: #FF812E!important;
		}
		.van-password-input{
			margin:70px auto 140px!important;
		}
		.van-password-input__security{
			height: 70px!important;
			justify-content: space-between;
		}
		.van-password-input__security li{
			flex: none;
			width: 70px;
			height: 70px;
			background: rgba(255, 255, 255, 0.5);
			border: 3px solid #BED887;
			border-radius: 10px;
		}
		.van-field__control{
			height: 100%!important;
			line-height: 1!important;
		}
	
	#app {
		
		font-size: 28px;
		font-family: Microsoft YaHei,Arial!important;
	}
	svg{
		max-width: 100%;
	}
	.html,.body{
		position: fixed;
		    top: 0;
		    left: 0;
		    width: 100%;
			height: 100vh;
			overflow-x: hidden;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
	}
	canvas{
		width: 100%!important;
	}
</style>
