import {request} from "@/utils/request.js"

export function apiNbaData(){
	return request({
		url:"/api/match/playerranking/match/NBA/tabId/60"		
	})	
}

