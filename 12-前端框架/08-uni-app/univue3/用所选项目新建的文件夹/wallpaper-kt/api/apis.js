import {request} from "@/utils/request.js"

export function apiGetBanner(){
	return request({
		url:"/homeBanner"		
	})	
}

export function apiGetDayRandom(){
	return request({url:"/randomWall"})
}

export function apiGetNotice(data={}){
	return request({
		url:"/wallNewsList",
		data
	})
}


export function apiGetClassify(data={}){
	return request({
		url:"/classify",
		data
	})
}



export function apiGetClassList(data={}){
	return request({
		url:"/wallList",
		data
	})
}


export function apiGetSetupScore(data={}){
	return request({
		url:"/setupScore",
		data
	})
}


export function apiWriteDownload(data={}){
	return request({
		url:"/downloadWall",
		data
	})
}



export function apiDetailWall(data={}){
	return request({
		url:"/detailWall",
		data
	})
}


export function apiUserInfo(data={}){
	return request({
		url:"/userInfo",
		data
	})
}


export function apiGetHistoryList(data={}){
	return request({
		url:"/userWallList",
		data
	})
}



export function apiNoticeDetail(data={}){
	return request({
		url:"/wallNewsDetail",
		data
	})
}


export function apiSearchData(data={}){
	return request({
		url:"/searchWall",
		data
	})
}
