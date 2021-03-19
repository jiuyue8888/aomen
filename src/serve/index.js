/*
API文档： http://www.docway.net/project/1bEeRH0f2m0/1bEk4q8RT1c

蓝湖链接：https://lanhuapp.com/url/2XspO-e84bt

用户端-测试环境
http://h5.dev.macaotown.com
用户端-正式环境
https://h5.macaotown.com
上传前端zip档方式：
测试环境：https://h5-dev.macaotown.com/up.php
正式环境：https://h5.macaotown.com/up.php


蓝湖链接：https://lanhuapp.com/url/2XspO-e84bt
*/

import axios from 'axios';
const local = window.location.host;
const dev = 'http://api.mtown.me';
const test = 'http://api.dev.macaotown.com';
const pro = 'http://api.macaotown.com';
const testUrl = '/api';
const serve = axios.create({
	baseURL:'/api'
})

axios.interceptors.request.use(config => {
	// 在发送请求之前做些什么
	console.log('config----',config)
	if(config.url.indexOf('mystery_buyfive')>=0 || config.url.indexOf('mystery_buyone')>=0){
		document.getElementsByClassName('hezi')[0].style.display='block';
	}else{
		document.getElementsByClassName('loading')[0].style.display='block';
		document.getElementsByClassName('loading')[0].style.opacity='0';
		setTimeout(()=>{document.getElementsByClassName('loading')[0].style.opacity='1'},1000)
	}
	
	
	return config;
}, error => {
	// 对请求错误做些什么
	return Promise.reject(error);
});

const formObj = (params) => {
	var formData = new FormData();
	for (let k in params) {
		formData.append(k, params[k]);
	}
	return formData
}
const postForm = (url, data) => {
	
	return axios({
		url: `${testUrl}${url}`,
		method: 'post',
		
		data: data,
		headers: {
			'Content-Type': "application/x-www-form-urlencoded",
			'Authorization': localStorage.getItem('token')
		}
	}).then(res => {
		document.getElementsByClassName('loading')[0].style.display='none'
		return res.data
	});
};

const getForm = (url, data,call) => {
	
	return axios({
		url: `${testUrl}${url}`,
		method: 'get',
		
		params: data,
		headers: {
			'Content-Type': "application/json;charset=utf-8",
			'Authorization': localStorage.getItem('token')
		}
	}).then(res => {
		if(res.data.status==0){
			
		}
		call&&call(res.data)
		
		if(url.indexOf('mystery_buyfive')>=0 || url.indexOf('mystery_buyone')>=0){

		}else{
			document.getElementsByClassName('loading')[0].style.display='none';
			return res.data
		}
		return res.data
	});
};

export const home = (data) => getForm('/mysteryboxmall/home', data);

export const detail = (data) => getForm('/mysteryboxmall/detail', data);
export const myprizeDetail = (data) => getForm('/mysteryboxmall/myprize_detail', data);
export const mysteryBuyone = (data) => getForm('/mysteryboxmall/mystery_buyone', data);
export const mysteryBuyfive = (data) => getForm('/mysteryboxmall/mystery_buyfive', data);
export const prizeVerify = (data) => getForm('/mysteryboxmall/prize_verify', data);
export const myList = (data) => getForm('/mysteryboxmall/my_prize_list', data);
export const openMystery = (data) => getForm('/mysteryboxmall/open_mystery', data);
export const userinfo = (data) => getForm('/leaguer/userinfo', data,(res)=>{
	if(res.status==0){
		localStorage.setItem('token', 'null')
		window.location.href = './'
		
	}
});
export const getUserinfo = (data) => getForm('/wx/get_userinfo', data);

export const addHahacoin = (data) => getForm('/index/add_hahacoin', data);
export const getTaskList = (data) => getForm('/leaguer/get_task_list', data);
export const helpContent = (data) => getForm('/mysteryboxmall/help_content', data);
export const helpUrl = (data) => getForm('/mysteryboxmall/help_page', data);
export const getQrcode = (data) => getForm('/wx/get_mp_qrcode?extra='+localStorage.getItem('shareId'), data);
export const pickupTaskprize = (data) => getForm('/leaguer/pickup_taskprize', data);
export const prizeVerifyDo = (data) => postForm('/mysteryboxmall/prize_verify_do', data);
export const getJssdkconfig = (data) => postForm('/wx/get_jssdkconfig?url='+window.location.href.split('#')[0], data);
export const myprizeDetailFilldata = (data) => postForm('/mysteryboxmall/myprize_detail_filldata', data);
export const getToken = () =>{
	axios({
		url: `${testUrl}/index/jwt`,
		method: 'get',
		headers: {
			'Content-Type': "application/json;charset=utf-8",
		}
	}).then(res => {
		localStorage.setItem('token', 'Bearer '+res.data.data.auth_token);
	});
}

export const dotaskClick = (url) => getForm(url,{});