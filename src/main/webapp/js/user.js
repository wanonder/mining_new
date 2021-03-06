// JavaScript Document
//用户信息展示
function userInforShow(page){
	search_click=false;
	$.ajax({
		type:"get",
		url:"/user/selectAllUser",
		data:{
			start:(parseInt(10*page-10)),
			limit:10
		},
		dataType:"json",
		beforeSend : function(){
            begin();
        },
		success: function(msg){
			$('.infor_tab02 tr:not(:first)').html("");
			if( msg.status == "OK"){
				// alert("success");
				var items = msg.result.user ;
				var array_userRole=msg.result.userRole;
				var array_role=msg.result.role;
				var cookie_value1;
				var cookie_value2;
				var cookie_value3;
				var cookie_value4;
				var cookie_value5;
				var cookie_value6;
				var cookie_value7;
				$.each(items,function(idx,item) {
					// alert(msg.tagName);
					cookie_value1="'"+item.userName+"'";
					cookie_value2="'"+item.trueName+"'";
					cookie_value3="'"+item.telphone+"'";
					cookie_value4="'"+item.email+"'";
					cookie_value5="'"+getRoleName(item.userId,array_userRole,array_role)+"'";
					cookie_value6="'"+item.userId+"'";
					cookie_value7="'"+item.password+"'";
					row= '<tr><td width="66" height="30" align="center" bgcolor="#ffffff">'+((page-1)*10+idx+1)+'</td><td width="64" height="30" align="center" bgcolor="#ffffff">'+item.userName+'</td><td width="66" height="30" align="center" bgcolor="#ffffff">'+item.trueName+'</td><td width="67" height="30" align="center" bgcolor="#ffffff">'+getRoleName(item.userId,array_userRole,array_role)+'</td><td width="104" height="30" align="center" bgcolor="#ffffff">'+item.telphone+'</td><td width="157" height="30" align="center" bgcolor="#ffffff">'+item.email+'</td><td width="130" height="30" align="center" bgcolor="#ffffff"><img src="images/user_bj.png" onClick="setCookie('+cookie_value1+','+cookie_value2+','+cookie_value3+','+cookie_value4+','+cookie_value5+','+cookie_value6+','+cookie_value7+')" />&nbsp;&nbsp;&nbsp;<img src="images/user_del.png" class="delUser"  id="'+item.userId+'"  /></td></tr>'
					$('.infor_tab02').append(row);
				});
			}else{
				 alert(msg.result);
			}
		},
		complete : function() {
            stop();
        },
		error: function(){
            alert("数据请求失败");
        },
	})	
}
function initShowPage(currenPage){
    var listCount = 0;
    if("undefined" == typeof(currenPage) || null == currenPage){
        currenPage = 1;
    }
    $.ajax({
        type: "post",
        url: "/user/selectUserInfoCount",
		dataType:"json",
        success: function (msg) {
            if (msg.status == "OK") {
                // alert("success");
                listCount = msg.result;
                $("#page").initPage(listCount,currenPage,userInforShow);
            } else {
                alert(msg.result);
            }
        },
        error: function () {
            alert("数据请求失败");
        }})
}

initShowPage(1)

function initSearchPage(currenPage){
    var listCount = 0;
    if("undefined" == typeof(currenPage) || null == currenPage){
        currenPage = 1;
    }
    var obj1 = $('#user_uname').val();
	var obj2 = $('#user_tname').val();
	var obj3 = $('#user_role').val();
	var obj4 = $('#user_tel').val();
	var obj5 = $('#user_email').val();
    $.ajax({
        type: "post",
        url: "/user/selectUserInfoCount",
        data:{
			userName:obj1,
			trueName:obj2,
			roleName:obj3,
			telphone:obj4,
			email:obj5
		},
        dataType: "json",
        success: function (msg) {
            if (msg.status == "OK") {
                // alert("success");
                listCount = msg.result;
                $("#page").initPage(listCount,currenPage,userInforSearch);
            } else {
                alert(msg.result);
            }
        },
        error: function () {
            alert("数据请求失败");
        }})
}
function getRoleName(userId,array_userRole,array_role){
	var name=null;
	try{
		$.each(array_userRole, function(i,item) {
			if(item.userId==userId){
				var roleId=item.roleId;
				// console.log(roleId);
				if(roleId>=0){
					name = getRoleNames(roleId,array_role);
				}else{
					throw new Error('getRoleName Error null');
				}
			}
		});
	}catch(e){
		// TODO handle the exception
	}
	return name;
}
function getRoleNames(id,array){
	var name;
	$.each(array, function(i,item) {
		// console.log(id+", "+item.roleId);
		if(item.roleId==id){
			// var name=item.roleName;
			name=item.roleName;
			// return item.roleName;
		}
	});
	// console.log(name);
	return name;
}
function setCookie(value1,value2,value3,value4,value5,value6,value7){
	// alert(name+value);
	var cookie_name1="userName";
	var cookie_name2="trueName";
	var cookie_name3="telphone";
	var cookie_name4="email";
	var cookie_name5="roleName";
	var cookie_name6="userId";
	var cookie_name7="passWord";
	var Days = 1; // 此 cookie 将被保存 1 天
	var exp　= new Date();
	exp.setTime(exp.getTime() +Days*24*60*60*1000);
	document.cookie = cookie_name1 +"="+ escape (value1) + ";expires=" + exp.toGMTString();
	document.cookie = cookie_name2 +"="+ escape (value2) + ";expires=" + exp.toGMTString();
	document.cookie = cookie_name3 +"="+ escape (value3) + ";expires=" + exp.toGMTString();
	document.cookie = cookie_name4 +"="+ escape (value4) + ";expires=" + exp.toGMTString();
	document.cookie = cookie_name5 +"="+ escape (value5) + ";expires=" + exp.toGMTString();
	document.cookie = cookie_name6 +"="+ escape (value6) + ";expires=" + exp.toGMTString();
	document.cookie = cookie_name7 +"="+ escape (value7) + ";expires=" + exp.toGMTString();
	window.location.href = "user_change.html";
}


/**
 * 根据页码加载数据
 * 
 * @param {整型}
 *            page 页码
 */
var search_click;
function setViewForPage(page){
		
	if(search_click){
		userInforSearch(page);
	}else{
		userInforShow(page);
	}
}

/**
 * 省略号点击
 */
function setPageChangeView(){
	var bt_name=parseInt($("#other").attr('name'))+3;
	updatePageValue(bt_name);
	setViewForPage(bt_name);
	setFirstSelected();
	updateNowPage(bt_name);
}
/**
 * 更新页码数据
 * 
 * @param {Object}
 *            base_num
 */
function updatePageValue(base_num){
	var p1=parseInt(base_num);
	var p2=parseInt(base_num)+1;
	var p3=parseInt(base_num)+2;
	$("#p_1").val(p1);
	$("#p_2").val(p2);
	$("#p_3").val(p3);
	$("#other").attr('name',p1);
}
/**
 * 页码点击
 * 
 * @param {Object}
 *            p_id 页码
 */
function pageNumClick(p_id){
	// background: #0e63ab;
    // color: #fff;
	var button=document.getElementById(p_id);
	var page=button.value;
	if(page!=undefined&&page.length>0){
		setViewForPage(page);
		updateNowPage(page);
		// $(this).addClass("cur").siblings().removeClass("cur");
		cleanAllSelected();
		button.style.background='#0e63ab';
		button.style.color='#FFFFFF';
	}
}
/**
 * 设置第一个页码按钮为选中状态
 */
function setFirstSelected(){
	cleanAllSelected();
	$("#p_1").css("background","#0e63ab");
	$("#p_1").css("color","#FFFFFF");
}
function setSecondSelected(){
	cleanAllSelected();
	$("#p_2").css("background","#0e63ab");
	$("#p_2").css("color","#FFFFFF");
}
function setThirdSelected(){
	cleanAllSelected();
	$("#p_3").css("background","#0e63ab");
	$("#p_3").css("color","#FFFFFF");
}
/**
 * 清除所有的选中状态
 */
function cleanAllSelected(){
	$("#p_1").css("background","#CCCCCC");
	$("#p_1").css("color","buttontext");
	$("#p_2").css("background","#CCCCCC");
	$("#p_2").css("color","buttontext");
	$("#p_3").css("background","#CCCCCC");
	$("#p_3").css("color","buttontext");
}
/**
 * 上一页，下一页点击
 * 
 * @param {Object}
 *            action -1上一页，1下一页
 */
function changPageOne(action){
	var now_page=parseInt($("#down_page").attr('name'));
	var page=now_page+action;
	if(page>0){
		updateAllStyleAndData(page,action);
	}
}
/**
 * 跳zhuan
 */
function changePage(){
	var page=$(".go_num").val();
	if(page!=undefined&&page.length>0){
		updateAllStyleAndData(page);
	}
}
function updateAllStyleAndData(page,action){
	updateNowPage(page);
	setViewForPage(page);
	if((page-1)%3==0){// 位置：第一个按钮 123 456 789
		setFirstSelected();
		if(action==1||action==undefined){// 点击下一页
			updatePageValue(page);
		}
	}else if(page%3==0){// 位置：第三个按钮
		setThirdSelected();
		if (action==-1||action==undefined) {// 点击上一页
			updatePageValue(page-2);
		}
	}else{// 位置：第二个按钮
		setSecondSelected();
		if(action==undefined){
			updatePageValue(page-1);
		}
	}
}
/**
 * 更新当前页码
 * 
 * @param {Object}
 *            page 当前页
 */
function updateNowPage(page){
	$("#down_page").attr('name',page);
}



// 信息搜索
function userInforSearch(page){
	search_click=true;
	var obj1 = $('#user_uname').val();
	var obj2 = $('#user_tname').val();
	var obj3 = $('#user_role').val();
	var obj4 = $('#user_tel').val();
	var obj5 = $('#user_email').val();
	console.log(obj1)
	setFirstSelected();
	$.ajax({
		type:"post",
		url:"/user/getUserInfoByPageLimit",
		data:{
			userName:obj1,
			trueName:obj2,
			roleName:obj3,
			telphone:obj4,
			email:obj5,
			page:10,
			row:(parseInt(10*page-10))
		},
		dataType:"json",
		beforeSend : function(){
            begin();
        },
		success: function(msg){
		    $('.infor_tab02 tr:not(:first)').html("");
			if( msg.status == "OK"){
				var items = msg.result.user ;
				var array_userRole=msg.result.userRole;
				var array_role=msg.result.role;
				var cookie_value1;
				var cookie_value2;
				var cookie_value3;
				var cookie_value4;
				var cookie_value5;
				var cookie_value6;
				var cookie_value7;
				$.each(items,function(idx,item) {
					// alert(msg.tagName);
					cookie_value1="'"+item.userName+"'";
					cookie_value2="'"+item.trueName+"'";
					cookie_value3="'"+item.telphone+"'";
					cookie_value4="'"+item.email+"'";
					cookie_value5="'"+getRoleName(item.userId,array_userRole,array_role)+"'";
					cookie_value6="'"+item.userId+"'";
					cookie_value7="'"+item.password+"'";
					row= '<tr><td width="66" height="30" align="center" bgcolor="#ffffff">'+((page-1)*10+idx+1)+'</td><td width="64" height="30" align="center" bgcolor="#ffffff">'+item.userName+'</td><td width="66" height="30" align="center" bgcolor="#ffffff">'+item.trueName+'</td><td width="67" height="30" align="center" bgcolor="#ffffff">'+getRoleName(item.userId,array_userRole,array_role)+'</td><td width="104" height="30" align="center" bgcolor="#ffffff">'+item.telphone+'</td><td width="157" height="30" align="center" bgcolor="#ffffff">'+item.email+'</td><td width="130" height="30" align="center" bgcolor="#ffffff"><img src="images/user_bj.png" onClick="setCookie('+cookie_value1+','+cookie_value2+','+cookie_value3+','+cookie_value4+','+cookie_value5+','+cookie_value6+','+cookie_value7+')" />&nbsp;&nbsp;&nbsp;<img src="images/user_del.png" class="delUser"  id="'+item.userId+'" /></td></tr>'
					$('.infor_tab02').append(row);
				});
			}else{
				 alert(msg.result);
			}
		},
		complete : function() {
            stop();
        },
		error: function(){
            alert("数据请求失败");
        },
	})	
}


// 用户添加
function userInforAdd(){
	window.location.href = "user_add.html";
}
function addUser(){
	if(!$("#passWord").val().match(/^[\w]{6,30}$/)){
		$("#warnPassword").html("密码必须介于6-30位之间"); 
		$("#passWord").focus(); 
		return false; 
	} 
	if(!$("#userTel").val().match(/^(1[3-8][0-9]{9})$/)){
		$("#warnTel").html("电话号码必须为11位！"); 
		$("#userTel").focus(); 
		return false; 
	} 
	// /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
	if (!$("#userEmail").val().match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) { 
		// alert("邮箱格式不正确");
		$("#warnEmail").html("邮箱必须符合邮箱规范！"); 
		$("#userEmail").focus(); 
		return false; 
	}
	
	var name = $("#userName").val().replace(' ','');
	if(name===undefined||name==''){
        alert('请输入正确信息');
        return;
    }
	var trueName = $("#trueName").val().replace(' ','');
	if(trueName===undefined||trueName==''){
        alert('请输入正确信息');
        return;
    }
	var rolename = $("#select_roleName option:selected").val();
	console.log(rolename);
	if(rolename == undefined || rolename == '请选择角色'){
		alert('请选择角色');
        return;
	}
	$.ajax({
		type:"post",
		url:"/user/insertUserInfo",
		data:{
			userName:$("#userName").val(),
			trueName:$("#trueName").val(),
			password:$("#passWord").val(),
			telphone:$("#userTel").val(),
			email:$("#userEmail").val(),
			roleName:rolename
		},
		dataType:"json",
		beforeSend : function(){
            begin();
        },
		success: function(msg){
			console.log(msg);
			if( msg.status == "OK"){
			    window.location.href="/user_infor.html"
			}else{
				alert(msg.result);
			}
		},
		complete : function() {
            stop();
        },
		error: function(msg){
            alert(msg);
        },
	})	
}
function clearUserInfor(){
	$("#userName").val('');
	$("#trueName").val('');
	$("#passWord").val('');
	$("#userTel").val('');
	$("#userEmail").val('');
	$("#select_roleName option:selected").val('请选择角色');
}

// 用户编辑
function getCookie(name) {
	
	console.log(document.cookie);
	var arr =document.cookie.match(new RegExp("(^|)"+name+"=([^;]*)(;|$)"));
	if(arr !=null) 
		return unescape(arr[2]); 
	return null;
}

function userInforChange(){
	if(!$("#new_telphone_type").val().match(/^(1[3-8][0-9]{9})$/)){
		$("#tel_warn").html("电话号码必须为11位！"); 
		$("#new_telphone_type").focus(); 
		return false; 
	} 
	// /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
	if (!$("#new_email_type").val().match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) { 
		// alert("邮箱格式不正确");
		$("#email_warn").html("邮箱必须符合邮箱规范！"); 
		$("#new_email_type").focus(); 
		return false; 
	}
	
	var newRole=getCookie("roleName");
	var newId=getCookie("userId");
	var newPassword=getCookie("passWord");
	var rolename = $("#select_roleName option:selected").val();
	console.log(rolename);
	if(rolename == undefined || rolename == '请选择角色'){
		alert('请选择角色');
        return;
	}
	$.ajax({
		type:"post",
		url:"/user/updateUserInfo",
		data:{
			userId:newId,
			userName:$("#new_user_type").val(),
			trueName:$("#new_true_type").val(),
			password:$("#new_user_type").val(),
			telphone:$("#new_telphone_type").val(),
			email:$("#new_email_type").val(),
			roleName:rolename
		},
		dataType:"json",
		beforeSend : function(){
            begin();
        },
		success: function(msg){
			console.log(msg);
			if( msg.status == "OK"){
				//alert(msg.result);
				window.location.href="/user_infor.html"
			}else{
				alert(msg.result);
			}
		},
		complete : function() {
            stop();
        },
		error: function(msg){
            alert(msg.result);
        },
	})	
}
function clearChangeInfor(){
	$("#new_user_type").val('');
	$("#new_true_type").val('');
	$("#new_telphone_type").val('');
	$("#new_email_type").val('');
	$("#select_roleName option:selected").val('请选择角色');
}

//获取当前用户ID
function CurrentUserId() {
	var userId = null;
    $.ajax({
        url : "/getCurrentUserId",
        type : "post",
        data : "",
        async: false,//同步  
        success : function(msg) {
            if (msg.status == 'OK') {
                userId = msg.result;
            }
        },
        error : function(msg) {
            alert(msg);
        }
    });
    return userId;
    //window.onload = user();
 }

// 用户删除
$(function(){
	$(".infor_tab02").on("click",".delUser",function(){
		var user_id = $(this).attr("id");
//		console.log(user_id);
		var currentUserId = CurrentUserId();
		console.log(currentUserId);
		if(user_id == currentUserId){
			alert('对不起，不能删除当前登录用户');
		}else{
			userInforDel(user_id);
		}
		
	})
})

//从数据库删除用户
function userInforDel(user_id){
	$.ajax({
		type:"post",
		url:"/user/deleteUserInfoById",
		data:{
			userId:user_id,
		} ,
		dataType:"json",
		success:function(msg){
			// alert("lll");
			console.log(msg);
			if(msg.status=="OK"){
				window.location.href="/user_infor.html";
			}else{
				alert(msg.result);
			}

		} ,
		error: function(){
            alert("数据请求失败");
        },
	});
}
