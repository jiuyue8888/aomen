<template>
	<div id="app">
		<div v-show="show" class="back" @click="$router.push('./')">
			<img src="./assets/home/back.png">
		</div>
		<router-view />
	</div>
</template>

<script>
	
	export default {
		name: 'App',
		data(){
			return {
				show:this.$route.path!='/'
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
		width: 230px;
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
		left: 50%;
		transform: translate(-50%,0);
		width: 700px;
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
	.van-tabs__nav{
		background: transparent;
	}
	.van-toast--html, .van-toast--text{
		padding: 60px 80px!important;
		font-size: 30px!important;
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
