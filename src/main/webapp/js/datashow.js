// JavaScript Document
//3.1任务详情展示
function analysisUrl(parm) {
	var reg = new RegExp("(^|&)" + parm + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	return unescape(r[2]);
}
issueType = "";
function dataShow() {
	var issueId = getCookie("issueId");
	issueType = analysisUrl("issueType");
	if (issueType == "extensive") {
		showExtensiveIssueDetails(issueId);
	} else if (issueType == "standard") {
		showStandardIssueDetails(issueId);
	} else if (issueType == "core") {
		showCoreIssueDetails(issueId);
	} else {
		alert("error:dataShow.js-->dataShow()")
	}
}
dataShow();

function showExtensiveIssueDetails(issueId) {
	$.ajax({
		type : "post",
		url : "/file/queryIssueFiles",
		data : {
			issueId : issueId
		},
		dataType : "json",
		beforeSend : function() {
			begin();
		},
		success : function(msg) {
			if (msg.status == "OK") {
				var items = msg.result.issue;
				$('.issueName').text("任务名称：" + items.issueName);
				showIssueType();
				var tabs = msg.result.list;
				$('.up_list tr:not(:first)').html("");
				$.each(tabs, function(i, item) {
					row = '<tr><td height="40" align="center" valign="middle">' + (i + 1) + '</td><td align="center" valign="middle">' + item.fileName + '</td><td align="center" valign="middle">'
						+ item.creator + '</td><td align="center" valign="middle">' + new Date(item.uploadTime.time).format('yyyy-MM-dd hh:mm:ss')
						+ '</td><td align="center" valign="middle"><img src="images/julei.png" class="btn_sc" onClick=clusterSingleFile("' + item.fileId + '") />'
						+ '<img src="images/xiazai.png" class="btn_sc" onclick=downloadExtFile("' + item.fileId + '","' + item.fileName + '") /><img class="btn_jl" src="images/delete.png" id="'
						+ item.fileId + '" onclick="bind()" /></td></tr>'
					$('.up_list').append(row);
				});
			} else {
				alert(msg.result);
			}

		},
		complete : function() {
			stop();
		},
		error : function() {
			alert("error:datashow.js-->showExtensiveIssueDetails(issueId)")
		}
	});
}

function showStandardIssueDetails(issueId) {
	changeStyle();
	$.ajax({
		type : "post",
		url : "/standardResult/queryStandardResults",
		data : {
			issueId : issueId
		},
		dataType : "json",
		beforeSend : function() {
			begin();
		},
		success : function(msg) {
			changeStyle();
			if (msg.status == "OK") {
				var items = msg.result.issue;
				$('.issueName').text("任务名称：" + items.issueName);
				showIssueType();
				var stdResList = msg.result.stdResList;
				$('.up_list tr:not(:first)').html("");
				$.each(stdResList, function(i, item) {
					var stdResId = "'" + item.stdRid + "'";
					row = '<tr><td height="40" align="center" valign="middle">' + (i + 1) + '</td><td align="center" valign="middle">' + item.resName + '</td><td align="center" valign="middle">'
						+ item.creator + '</td><td align="center" valign="middle">' + new Date(item.createTime.time).format('yyyy-MM-dd hh:mm:ss')
						+ '</td><td align="center" valign="middle"><img src="images/xiazai.png" class="btn_sc" onclick=downloadStdRes(' + stdResId
						+ ') /><img class="btn_sc" src="images/schxsj.png" onclick=schxsj('+ stdResId
						+ ') /><img class="btn_sc" src="images/delete.png" onclick=deleteStandardResult(' + stdResId + ') /></td></tr>'
					$('.up_list').append(row);
				});

			} else {
				changeStyle();
				alert("查询失败");
			}

		},
		complete : function() {
			stop();
		},
		error : function() {
			changeStyle();
			alert("error:datashow.js-->showExtensiveIssueDetails(issueId)")
		}
	});
}

function showCoreIssueDetails(issueId) {
	changeStyle();
	$.ajax({
		type : "post",
		url : "/coreResult/queryCoreResults",
		data : {
			issueId : issueId
		},
		dataType : "json",
		beforeSend : function() {
			begin();
		},
		success : function(msg) {
			changeStyle();
			if (msg.status == "OK") {
				var items = msg.result.issue;
				$('.issueName').text("任务名称：" + items.issueName);
				showIssueType();
				var coreResList = msg.result.coreResList;
				$('.up_list tr:not(:first)').html("");
				$.each(coreResList, function(i, item) {
					var coreResId = "'" + item.coreRid + "'";
					row = '<tr><td height="40" align="center" valign="middle">' + (i + 1) + '</td><td align="center" valign="middle">' + item.resName + '</td><td align="center" valign="middle">'
						+ item.creator + '</td><td align="center" valign="middle">' + new Date(item.createTime.time).format('yyyy-MM-dd hh:mm:ss')
						+ '</td><td align="center" valign="middle"><img src="images/xiazai.png" class="btn_sc" onclick=downloadCoreRes(' + coreResId
						+ ') /><img class="btn_sc" src="images/chakan.png" onclick=alert("查看") /><img class="btn_sc" src="images/delete.png" onclick=deleteCoreResult(' + coreResId + ') /></td></tr>'
					$('.up_list').append(row);
				});

			} else {
				changeStyle();
				alert("查询失败");
			}

		},
		complete : function() {
			stop();
		},
		error : function() {
			changeStyle();
			alert("error:datashow.js-->showExtensiveIssueDetails(issueId)")
		}
	});
}

function downloadExtFile(fileId, fileName) {
	var form = $('<form method="POST" action="/file/downloadExtFile">');
	form.append($('<input type="hidden" name="fileId" value="' + fileId + '"/>'));
	form.append($('<input type="hidden" name="fileName" value="' + fileName + '"/>'));
	$('body').append(form);
	form.submit(); // 自动提交
}

function deleteStandardResult(stdResId) {
	$.ajax({
		type : "post",
		url : "/standardResult/delete",
		data : {
			stdResId : stdResId
		},
		dataType : "json",
		success : function(msg) {
			if (msg.status == "OK") {
				showStandardIssueDetails(msg.result.issueId);
			} else {
				alert(msg.result);
			}
		},
		complete : function() {
			stop();
		},
		error : function() {
			alert("数据请求失败");
		}
	})
}

function deleteCoreResult(coreResId) {
	$.ajax({
		type : "post",
		url : "/coreResult/delete",
		data : {
			coreResId : coreResId
		},
		dataType : "json",
		success : function(msg) {
			if (msg.status == "OK") {
				showCoreIssueDetails(msg.result.issueId);
			} else {
				alert(msg.result);
			}
		},
		complete : function() {
			stop();
		},
		error : function() {
			alert("数据请求失败");
		}
	})
}

function downloadStdRes(stdResId) {
	var form = $('<form method="POST" action="/standardResult/download">');
	form.append($('<input type="hidden" name="stdResId" value="' + stdResId + '"/>'));
	$('body').append(form);
	form.submit(); // 自动提交
}

function downloadCoreRes(coreResId) {
	var form = $('<form method="POST" action="/coreResult/download">');
	form.append($('<input type="hidden" name="coreResId" value="' + coreResId + '"/>'));
	$('body').append(form);
	form.submit(); // 自动提交
}

function changeStyle() {
	$('.his_result').hide();
	$('.sur_result').hide();
	$('.up_del').hide();
	// 隐藏上传文件框框
	$('.ckht_list li:eq(2)').hide();
	$('.up_list_wrap').height(200);
	var titleTr = $('.up_list tr:eq(0)');
	var titleTds = titleTr.children();
	titleTds.eq(0).text("序号");
	titleTds.eq(1).text("数据结果名");
	titleTds.eq(1).css("color", "white");
	titleTds.eq(2).text("创建人");
	titleTds.eq(3).text("创建时间");
	titleTds.eq(4).text("操作");
}

function showIssueType() {
	if (issueType == "extensive") {
		$("span#issueType").text("(泛数据)");
		$("span#fhtag").children(".tag1").text("准数据");
		$("span#fhtag").children(".tag2").text("核心数据");
	} else if (issueType == "standard") {
		$("span#issueType").text("(准数据)");
		$("span#fhtag").children(".tag1").text("泛数据");
		$("span#fhtag").children(".tag2").text("核心数据");
	} else if (issueType == "core") {
		$("span#issueType").text("(核心数据)");
		$("span#fhtag").children(".tag1").text("泛数据");
		$("span#fhtag").children(".tag2").text("准数据");
	} else {
		$("span#issueType").text("error");
	}
}

function localRefresh() {
	var newId = getCookie("issueId");
	if (issueType == "extensive") {
		showExtensiveIssueDetails(newId);
	} else if (issueType == "standard") {
		showStandardIssueDetails(newId);
	} else if (issueType == "core") {

	} else {
		alert("error:datashow.js-->localRefresh()")
	}
}

function getCookie(name) {
	var arr = document.cookie.match(new RegExp("(^|)" + name + "=([^;]*)(;|$)"));
	if (arr != null)
		return unescape(arr[2]);
	return null;
}

function clusterSingleFile(id) {
	$.ajax({
		type : "post",
		url : "/issue/miningSingleFile",
		data : {
			fileId : id
		},
		dataType : "json",
		beforeSend : function() {
			begin();
		},
		success : function(msg) {
			console.log(msg);
			if (msg.status == "OK") {
				window.location.href = "history.html";
			} else {
				alert(msg.result);
			}
		},
		error : function() {
			alert("请求失败");
		},
		complete : function() {
			stop();
		}
	})
}

function bind() {
	$(".up_list tr").unbind('click').on("click", ".btn_jl", function() {
		var file_id = $(this).attr("id");
		$.ajax({
			type : "post",
			url : "/file/deleteFileById",
			data : {
				fileid : file_id
			},
			dataType : "json",
			success : function(msg) {
				if (msg.status == "OK") {
					localRefresh();
				} else {
					alert(msg.result);
				}
			},
			error : function() {
				alert("数据请求失败");
			}
		})
	})
}