import {packApiUrl} from "./common.js"
export function request(config={}){	
	let {
		url,
		data={},
		method="GET",
		header={}
	} = config
	
	url =packApiUrl(url);	
	
	return new Promise((resolve,reject)=>{		
		uni.request({
			url,
			data,
			method,
			header,
			success:res=>{				
				if(res.data.status==0){
					resolve(res.data.data)
				}else{
					uni.showToast({
						title:res.data.message,
						icon:"none"
					})
					reject(res.data.data)
				}							
				
			},
			fail:err=>{
				reject(err)
			}
		})
	})
}
