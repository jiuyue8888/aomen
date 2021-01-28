<template>
	<div>
		<div class="detail">
			<div class="part1">
				<div class="top">
					<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
						<van-swipe-item v-for="(item, id) in data.imgs" :key="id"><img :src="item" /></van-swipe-item>
					</van-swipe>
				</div>
				<div class="down">
					
					<p v-html="data.content"></p>
				</div>
			</div>
			<div class="part2">
				
				<p v-if="data.status==1">
					獎品編號：{{ data.couponno }}
					<br />
					有效期至：{{ data.exptime }}
				</p>
				<p v-if="data.status==0">
					獎品編號：{{ data.couponno }}
					<br />
					過期時間：{{ data.exptime }}
				</p>
				<p v-if="data.status==2">
					獎品編號：{{ data.couponno }}
					<br />
					使用時間：{{ data.pickuptime }}
				</p>
				
				
					<div v-if="data.status==1">
						<div class="addBtn" @click="addBtnClick" v-if="needfill==1">請填寫資料</div>
						<img src="../../assets/product/user.png"  v-else @click="useBtn" />
					</div>
					
					<img src="../../assets/detail/ygq.png" v-if="data.status==0"/>
					<img src="../../assets/product/ysy.png" v-if="data.status==2"/>
				
				
			</div>
		</div>
		<div class="pop pop1" v-if="pop1">
			<div :class="anShow ? 'pop_body animated fadeOutDown' : 'pop_body animated fadeInUp'">
				<img src="../../assets/task/close.png" class="close" @click="hide('pop1')" />
				<h3>請將此頁面展示給工作人員</h3>
				<div class="ewm"><img :src="popData.qrcodeurl" /></div>
				<p>禮品編碼：{{ couponno }}</p>
			</div>
		</div>
		<div class="pop pop2" v-if="pop2">
			<div :class="anShow ? 'pop_body animated fadeOutDown' : 'pop_body animated fadeInUp'">
				<img src="../../assets/task/close.png" class="close" @click="hide('pop2')" />
				<h3>請將此頁面展示給工作人員</h3>
				<van-password-input :value="value" :mask="false" :focused="showKeyboard" @focus="showKeyboard = true" />
				<van-number-keyboard v-model="value" :show="showKeyboard" @blur="showKeyboard = false" />
				<p>禮品編碼：{{ couponno }}</p>
			</div>
		</div>
		<div class="pop pop3" v-if="pop3">
			<div :class="anShow ? 'pop_body animated fadeOutDown' : 'pop_body animated fadeInUp'">
				<img src="../../assets/task/close.png" class="close" @click="hide('pop3')" />
				<h3>請填寫您的個人信息</h3>
				<div class="input">
					<div v-for="(item, id) in extraData">
						<div v-if="item.type == 'text'">
							<strong>
								<!--<i v-if="item.required == 1">*</i>-->
								
								{{ item.name }}
							</strong>
							<van-field v-model="formData[item.name]" :placeholder="item.content" />
						</div>
						<div v-if="item.type == 'number'">
							<strong>
								
								{{ item.name }}
							</strong>
							<van-field v-model="formData[item.name]" :placeholder="item.content" type="number" />
						</div>
						<div v-if="item.type == 'textarea'">
							<strong>
								
								{{ item.name }}
							</strong>
							<textarea :placeholder="item.content">{{ formData[item.name] }}</textarea>
						</div>
						<div v-if="item.type == 'date'">
							<strong>
								
								{{ item.name }}
							</strong>
							<div class="van-field">
								<div class="van-field__body"><input type="date" :value="formData[item.name]" @change="dateShow('date' + id)" /></div>
							</div>
						</div>
						<div v-if="item.type == 'time'">
							<strong>
								
								{{ item.name }}
							</strong>
							<div class="van-field">
								<div class="van-field__body"><input type="time" :value="formData[item.name]" /></div>
							</div>
						</div>
						<div v-if="item.type == 'option'">
							<strong>
								
								{{ item.name }}
							</strong>
							<div class="van-field">
								<div class="van-field__body">
									<select>
										<option v-for="(obj, id) in item.content.split('|')" :key="id">{{ obj }}</option>
									</select>
								</div>
							</div>
						</div>
					</div>

					<img src="../../assets/product/submit.png" @click="submit" />
				</div>
				<b>提交個人信息後，將有專人聯絡領獎</b>
			</div>
		</div>
	</div>
</template>

<script>
import { Toast } from 'vant';
import { detail, myprizeDetail, prizeVerify, prizeVerifyDo,myprizeDetailFilldata } from '../../serve/index.js';
export default {
	name: 'list',

	data() {
		return {
			num: 100,
			pop1: false,
			pop2: false,
			pop3: false,
			anShow: false,
			value: '',
			formData: {},
			couponno: this.$route.query.couponno,
			tel: '',
			data: {},
			nameArr:[],
			showKeyboard: false,
			popData: {},
			needfill:0,
			extraData: {}
		};
	},
	created() {
		myprizeDetail({
			couponno: this.$route.query.couponno
		}).then(res => {
			this.data = res.data;
			if(res.data.hasfill==0){
				this.needfill = res.data.needfill
			}
			this.extraData = JSON.parse(res.data.extra);
		});
	},
	methods: {
		onConfirm() {},
		
		submit() {
			let n = 0;
			const that = this;
			this.nameArr.map(item=>{
				if(this.formData[item]==''){
					Toast('請填寫完整的信息喔');
				}else{
					n++
				}
			})
			if(n<this.nameArr.length){
				return
			}
			let arr = [];
			arr.push(this.formData)
			myprizeDetailFilldata({
				couponno: this.couponno,
				filldata: JSON.stringify(arr)
			}).then(res => {
				Toast(res.info);
				if (res.status == 1) {
					that.pop3 = false;
					that.needfill = 0
				}
			});
		},
		dateShow(type, e) {
			console.log(type);
			console.log(e);
			const data = this.formData;
			this.formData = Object.assign(data, {
				[type]: e
			});
		},
		hide(type) {
			const that = this;
			this.anShow = true;
			setTimeout(() => {
				that[type] = false;
				that.anShow = false;
				this.value = '';
			}, 500);
		},
		getTime() {},
		getDate() {
			var myDate = new Date();
			return myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
		},
		addBtnClick(){
			const that = this
			that.pop3 = true;
			let arr={};
			let name=[];
			that.extraData.map((item,id)=>{
				if(item.type=='date'){
					
					Object.assign(arr,{
						[item.name]:that.getDate()
					})
					
					return;
				}
				Object.assign(arr,{
					[item.name]:''
				})
				
				if(item.required==1){
					name.push(item.name)
				}
				
				
			})
			that.formData = arr;
			that.nameArr = name;
		},
		useBtn() {
			const that = this;
			prizeVerify({
				couponno: this.$route.query.couponno
			}).then(res => {
				
				if (res.status == 0) {
					Toast(res.info);
					return;
				}
				that.popData = res.data;
				if (res.data.pickuptype == 'scan') {
					that.pop1 = true;
					return;
				}
				if (res.data.pickuptype == 'passwd') {
					that.pop2 = true;
					/*
					that.pop3=true;
					that.extraData = JSON.parse(`[
						{"type":"text","name":"姓名","content":"请输入您的真实姓名","required":"1"},
						{"type":"textarea","name":"详细地址","content":"请输入您的真实姓名","required":"0"},
						{"type":"date","name":"日期","content":"请输入您的真实姓名","required":"0"},
						{"type":"time","name":" 时间","content":"请输入您的真实姓名","required":"0"},
						{"type":"option","name":" 选择","content":"选项1|选项2|选项3","required":"0"},
						{"type":"number","name":"电话","content":"请输入您的电话号码","required":"1"}]`)
						
						*/
					return;
				}
				if (res.data.pickuptype == 'fill'&&false) {
					that.pop3 = true;
					that.extraData = JSON.parse(res.data.extra);
					let arr={};
					let name=[];
					that.extraData.map((item,id)=>{
						if(item.type=='date'){
							
							Object.assign(arr,{
								[item.name]:that.getDate()
							})
							
							return;
						}
						Object.assign(arr,{
							[item.name]:''
						})
						
						if(item.required==1){
							name.push(item.name)
						}
						
						
					})
					that.formData = arr;
					that.nameArr = name;
					return;
				}
			});
		}
	},
	watch: {
		value(value) {
			//if (value.length === 6 &&value !== '123456') {
			//Toast('密碼輸入不正確,請再次確認');
			//} else {
			if (value.length === 6) {
				this.showKeyboard = false;
				prizeVerifyDo({
					couponno: this.couponno,
					passwd: value
				}).then(res => {
					//if (res.status == 0) {
						Toast(res.info);
						return;
					//}
				});
			}
			//}
		}
	},

	mounted() {}
};
</script>

<style scoped lang="less">
.pop {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100vh;
	z-index: 99;
	text-align: center;
	background: rgba(0, 0, 0, 0.8);
	.pop_body {
		width: 100%;
		height: 940px;
		overflow: auto;
		position: absolute;
		left: 0;
		bottom: 0;
		box-sizing: border-box;
		padding: 95px 95px 129px;
		background: #ffffff;
		border-radius: 32px 32px 0px 0px;
	}
	.close {
		position: absolute;
		top: 30px;
		right: 30px;
		width: 50px;
	}
	h3 {
		font-size: 36px;

		font-weight: 500;
		color: #794001;
		line-height: 36px;
	}
	p {
		font-size: 28px;

		font-weight: 500;
		color: #ff7814;
		line-height: 36px;
	}
	b {
		font-size: 28px;
	
		font-weight: 800;
		color: #794001;
		line-height: 36px;
	}
}
.pop1 {
	.ewm {
		width: 550px;
		height: 550px;
		margin: 45px auto;
		background: rgba(255, 255, 255, 0.5);
		border: 3px solid #bed887;
		border-radius: 30px;
		box-sizing: border-box;
		padding: 25px;
	}
}
.pop3 {
	.input {
		position: relative;
		width: 100%;

		margin: 70px 0;
		text-align: left;

		font-size: 32px;
		
		font-weight: 500;
		color: #333;
		line-height: 36px;
		strong {
			color: #ff7814;
			margin-bottom: 20px;
			i {
				color: #f00;
			}
		}
		textarea {
			display: block;
			width: 100%;
			outline: none;
			margin: 20px 0 30px;
			color: #333;
			box-sizing: border-box;
			padding: 20px;
			background: rgba(255, 255, 255, 0.5);
			border: 3px solid #bed887;
			border-radius: 10px;
		}
		select,
		input {
			font-size: 28px;
			width: 100%;
			height: 100%;
			box-sizing: border-box;

			padding: 0 20px;
			border: none;
			outline: none;
			background: transparent;
		}
		.floatInout {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 9;
		}
		.inputShow {
			display: none;
			position: relative;
			display: block;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			padding: 20px;
			line-height: 40px;
		}
		.van-field__body {
			position: relative;
		}
		.van-field {
			margin: 20px 0 30px;
			height: 90px;
			box-sizing: border-box;
			line-height: 100%;
			background: rgba(255, 255, 255, 0.5);
			border: 3px solid #bed887;
			border-radius: 10px;
		}
	}
}
.detail {
	position: relative;
	width: 100%;
	min-height: 100vh;
	box-sizing: border-box;
	padding: 20px;
	background: url(../../assets/list/lbg.png) no-repeat 0 0;
	background-size: 100% 100%;
	.addBtn{
		position: relative;
		width: 229px;
		height: 88px;
		text-align: center;
		line-height: 80px;
		font-size: 34px;
		font-weight: 400;
		color: #FFFFFF;
		
		text-shadow: 0px 0px 6px rgba(74, 40, 24, 0.35);
		background: url(../../assets/detail/addbtn.png) no-repeat 0 0;
		background-size: 100%;
	}
	.part1 {
		position: relative;
		width: 700px;
		background: url(../../assets/detail/bg.png) no-repeat 0 0;
		background-size: 100% 750px;
		.top {
			position: relative;
			width: 700px;
			height: 700px;
			margin-top: 22px;
			overflow: hidden;
			border-radius:30px 30px 0 0;
			
		
			img {
				display: block;
				width: 700px;
				
				height: 700px;
				
				
			}
		}
		.down {
			position: relative;
			top: 0;
			width:700px;
			background: #fff;
			box-sizing: border-box;
			
			border-radius: 0 0 30px 30px;
			
			box-shadow: 0px 8px 35px 0px rgba(0, 0, 0, 0.2), 0px 3px 0px 0px #ffffff;

			h3 {
				margin-bottom: 30px;
				font-size: 44px;
	
				font-weight: bold;
				color: #a4451e;
				line-height: 36px;
				text-align: left;
			}
			p {
				position: relative;
				width: 100%;

				overflow: auto;
				box-sizing: border-box;
				padding: 26px 26px 140px;
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
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 160px;
		box-sizing: border-box;
		padding: 0 40px;
		background: #ffffff;
		box-shadow: 0px 8px 35px 0px rgba(0, 0, 0, 0.2), 0px 3px 0px 0px #ffffff;
		border-radius: 30px 30px 0 0;
		p {
			font-size: 28px;

			font-weight: 400;
			color: #794001;
			line-height: 48px;
		}
		img {
			width: 204px;
		}
	}
}
</style>
