//import wx from 'weixin-js-sdk'
 import {getJssdkconfig} from '../serve/index.js';
export const shareTitle = '测试';
export const shareUrl = '测试连接';
export const shareImg = '测试图片';
export const shareDesc = '测试详情';
 
/**
 *分享
 * @param _this
 * @param shareTitle 标题
 * @param shareUrl 链接
 * @param shareImg 图片
 * @param shareDesc 描述 *  也可以传入对象 把这个demo变成一个公共方法，主要是便于回调分享成功的方法      例如   export const  option
 *///举例：


//end
const CommonShare = (type,_this, shareTitle, shareUrl, shareImg, shareDesc) => {
 let url = window.location.href.split('#')[0];
 let datao = {
  //url: encodeURIComponent(url)
 };

 getJssdkconfig(datao).then(res => { 
console.log(res)
  if (res.sign !=''){
   var data = res.data;
   wx.config({
    debug:false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: data.appid, // 必填，公众号的唯一标识
    timestamp: data.timestamp, // 必填，生成签名的时间戳
    nonceStr: data.noncestr, // 必填，生成签名的随机串
    signature: data.sign, // 必填，签名，见附录1
    jsApiList: [
		'updateAppMessageShareData', 
		'updateTimelineShareData', 
		'onMenuShareAppMessage', 
		'onMenuShareTimeline',
		'hideMenuItems'],
   });
   wx.ready(function () {
	   console.log('ready')
	   if(type=='app'){
		   wx.onMenuShareAppMessage({
		     title: shareTitle, // 分享标题
		     desc: shareDesc, // 分享描述
		     link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		     imgUrl: shareImg, // 分享图标
		     type: 'link', // 分享类型,music、video或link，不填默认为link
		     dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		     success: function () {
		       // 用户点击了分享后执行的回调函数
		       console.log("分享了onMenuShareAppMessage");
		     }
		   });
		   
		   
	   }else{
		   wx.onMenuShareTimeline({
		     title: shareTitle, // 分享标题
		     link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		     imgUrl: shareImg, // 分享图标
		     success: function () {
		       // 用户点击了分享后执行的回调函数
		       console.log("分享了onMenuShareTimeline");
		     }
		   })
		   
	   }
	   
	   
	   
	   
	   
	   
	   
	   wx.hideMenuItems({
	     menuList: ['menuItem:copyUrl','menuItem:originPage','menuItem:openWithQQBrowser'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
	   });
    });
  }
 }).catch(err => {
     alert(err)
     console.log('789',err)
 })
};
export default CommonShare;