<?php
error_reporting(E_ALL ^ E_NOTICE);
ob_implicit_flush();

$sk=new Sock('127.0.0.1',8000);
$sk->run();
class Sock{
	public $sockets;
	public $users;
	public $master;
	
	private $sda=array();//已接收的数据
	private $slen=array();//数据总长度
	private $sjen=array();//接收数据的长度
	private $ar=array();//加密key
	private $n=array();
	
	public function __construct($address, $port){
		$this->master=$this->WebSocket($address, $port);
		$this->sockets=array($this->master);
	}
	
	
	function run(){
		while(true){
			$changes=$this->sockets;
			$write=NULL;
			$except=NULL;
			socket_select($changes,$write,$except,NULL);
			foreach($changes as $sock){
				if($sock==$this->master){
					$client=socket_accept($this->master);
					$key=uniqid();
					$this->sockets[]=$client;
					$this->users[$key]=array(
						'socket'=>$client,
						'shou'=>false
					);
				}else{
					$len=0;
					$buffer='';
					do{
						$l=socket_recv($sock,$buf,1000,0);
						$len+=$l;
						$buffer.=$buf;
					}while($l==1000);
					$k=$this->search($sock);
					if($len<7){
						$this->send2($k);
						continue;
					}
					if(!$this->users[$k]['shou']){
						$this->woshou($k,$buffer);
					}else{
						$buffer = $this->uncode($buffer,$k);
						if($buffer==false){
							continue;
						}
						$this->send($k,$buffer);
					}
				}
			}
			
		}
		
	}
	
	function close($k){
		socket_close($this->users[$k]['socket']);
		unset($this->users[$k]);
		$this->sockets=array($this->master);
		foreach($this->users as $v){
			$this->sockets[]=$v['socket'];
		}
		$this->e("key:$k close");
	}
	
	function search($sock){
		foreach ($this->users as $k=>$v){
			if($sock==$v['socket'])
			return $k;
		}
		return false;
	}
	
	function WebSocket($address,$port){
		$server = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
		socket_set_option($server, SOL_SOCKET, SO_REUSEADDR, 1);
		socket_bind($server, $address, $port);
		socket_listen($server);
		$this->e('Server Started : '.date('Y-m-d H:i:s'));
		$this->e('Listening on   : '.$address.' port '.$port);
		return $server;
	}
	
	
	function woshou($k,$buffer){
		$buf  = substr($buffer,strpos($buffer,'Sec-WebSocket-Key:')+18);
		$key  = trim(substr($buf,0,strpos($buf,"\r\n")));
	
		$new_key = base64_encode(sha1($key."258EAFA5-E914-47DA-95CA-C5AB0DC85B11",true));
		
		$new_message = "HTTP/1.1 101 Switching Protocols\r\n";
		$new_message .= "Upgrade: websocket\r\n";
		$new_message .= "Sec-WebSocket-Version: 13\r\n";
		$new_message .= "Connection: Upgrade\r\n";
		$new_message .= "Sec-WebSocket-Accept: " . $new_key . "\r\n\r\n";
		
		socket_write($this->users[$k]['socket'],$new_message,strlen($new_message));
		$this->users[$k]['shou']=true;
		return true;
		
	}
	
	function uncode($str,$key){
		$mask = array();  
		$data = '';  
		$msg = unpack('H*',$str);
		$head = substr($msg[1],0,2);  
		if ($head == '81' && !isset($this->slen[$key])) {  
			$len=substr($msg[1],2,2);
			$len=hexdec($len);
			if(substr($msg[1],2,2)=='fe'){
				$len=substr($msg[1],4,4);
				$len=hexdec($len);
				$msg[1]=substr($msg[1],4);
			}else if(substr($msg[1],2,2)=='ff'){
				$len=substr($msg[1],4,16);
				$len=hexdec($len);
				$msg[1]=substr($msg[1],16);
			}
			$mask[] = hexdec(substr($msg[1],4,2));  
			$mask[] = hexdec(substr($msg[1],6,2));  
			$mask[] = hexdec(substr($msg[1],8,2));  
			$mask[] = hexdec(substr($msg[1],10,2));
			$s = 12;
			$n=0;
		}else if($this->slen[$key] > 0){
			$len=$this->slen[$key];
			$mask=$this->ar[$key];
			$n=$this->n[$key];
			$s = 0;
		}
		
		$e = strlen($msg[1])-2;
		for ($i=$s; $i<= $e; $i+= 2) {  
			$data .= chr($mask[$n%4]^hexdec(substr($msg[1],$i,2)));  
			$n++;  
		}  
		$dlen=strlen($data);
		
		if($len > 255 && $len > $dlen+intval($this->sjen[$key])){
			$this->ar[$key]=$mask;
			$this->slen[$key]=$len;
			$this->sjen[$key]=$dlen+intval($this->sjen[$key]);
			$this->sda[$key]=$this->sda[$key].$data;
			$this->n[$key]=$n;
			return false;
		}else{
			unset($this->ar[$key],$this->slen[$key],$this->sjen[$key],$this->n[$key]);
			$data=$this->sda[$key].$data;
			unset($this->sda[$key]);
			return $data;
		}
		
	}
	
	
	function code($msg){
		$frame = array();  
		$frame[0] = '81';  
		$len = strlen($msg);
		if($len < 126){
			$frame[1] = $len<16?'0'.dechex($len):dechex($len);
		}else if($len < 65025){
			$s=dechex($len);
			$frame[1]='7e'.str_repeat('0',4-strlen($s)).$s;
		}else{
			$s=dechex($len);
			$frame[1]='7f'.str_repeat('0',16-strlen($s)).$s;
		}
		$frame[2] = $this->ord_hex($msg);  
		$data = implode('',$frame);  
		return pack("H*", $data);  
	}
	
	function ord_hex($data)  {  
		$msg = '';  
		$l = strlen($data);  
		for ($i= 0; $i<$l; $i++) {  
			$msg .= dechex(ord($data{$i}));  
		}  
		return $msg;  
	}
	
	//用户加入
	function send($k,$msg){
		parse_str($msg,$g);
		$ar=array();
		if($g['type']=='add'){
			$this->users[$k]['name']=$g['ming'];
			$ar['type']='add';
			$ar['name']=$g['ming'];
			$key='all';
		}else{
			$ar['nrong']=$g['nr'];
			$key=$g['key'];
		}
		$this->send1($k,$ar,$key);
	}
	
	function getusers(){
		$ar=array();
		foreach($this->users as $k=>$v){
			$ar[]=array('code'=>$k,'name'=>$v['name']);
		}
		return $ar;
	}
	
	//$k 发信息人的code $key接受人的 code
	function send1($k,$ar,$key='all'){
		$ar['code1']=$key;
		$ar['code']=$k;
		$ar['time']=date('m-d H:i:s');
		$str = $this->code(json_encode($ar));
		if($key=='all'){
			$users=$this->users;
			if($ar['type']=='add'){
				$ar['type']='madd';
				$ar['users']=$this->getusers();
				$str1 = $this->code(json_encode($ar));
				socket_write($users[$k]['socket'],$str1,strlen($str1));
				unset($users[$k]);
			}
			foreach($users as $v){
				socket_write($v['socket'],$str,strlen($str));
			}
		}else{
			socket_write($this->users[$k]['socket'],$str,strlen($str));
			socket_write($this->users[$key]['socket'],$str,strlen($str));
		}
	}
	
	//用户退出
	function send2($k){
		$this->close($k);
		$ar['type']='rmove';
		$ar['nrong']=$k;
		$this->send1(false,$ar,'all');
	}
	
	function e($str){
		//$path=dirname(__FILE__).'/log.txt';
		$str=$str."\n";
		//error_log($str,3,$path);
		echo iconv('utf-8','gbk//IGNORE',$str);
	}
}
?>
