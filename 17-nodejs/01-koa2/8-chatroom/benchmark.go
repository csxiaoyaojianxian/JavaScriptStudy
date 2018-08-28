package main

import (
	"flag"
	"log"
	"net/url"
	"os"
	"os/signal"
	"time"
    "fmt"
	"github.com/gorilla/websocket"
    "sync/atomic"
)

// websocket压测
// 需要 go get github.com/gorilla/websocket

var addr = flag.String("addr", "127.0.0.1:3000", "http service address")

func main() {
	flag.Parse()
	log.SetFlags(0)
    // c := make(chan type_name, 1)   //创建一个缓冲区大小为1的type_name型的channel
    interrupt := make(chan os.Signal, 1)
    // 
	signal.Notify(interrupt, os.Interrupt)
    // 拼接请求字符串
	u := url.URL{Scheme: "ws", Host: *addr, Path: ""}
	log.Printf("connecting to %s", u.String())
    
    n := 0
    // 当前连接数
    var nn int64 = 0
    // 每隔1s输出当前连接数
    go func() {
        log.SetFlags(log.Ldate | log.Ltime | log.Lmicroseconds)
        for {
            log.Println(atomic.LoadInt64(&nn))
            time.Sleep(1 * time.Second)
        }
    }()

    loop:
    for {

        // if n < 50000 {
        if n < 50000 {
        go func(u url.URL) {
            
            ticker := time.NewTicker(30 * time.Second)
            defer ticker.Stop()
            
            c, _, err := websocket.DefaultDialer.Dial(u.String(), nil)
            defer c.Close()
            
            if err != nil {
                log.Fatal("dial:", err)
                return
            }
            
            for {
                time.Sleep(1 * time.Second)
            }
        }(u)
        n++
        fmt.Printf("n=%d\n", n)
        }
        //time.Sleep(1 * time.Millisecond)
        select {
            case <- interrupt:
                log.Println("interrupt")
                break loop
            default:
        }
    }

    log.Println("done")
}
