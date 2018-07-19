<template>
    <div>
    
        <div class="top">
            <h2 class="title">
                <i class="title-icon title-icon-5"></i>赛果录入</h2>
            <div class="topbtn">
                <router-link class="btn-normal-l" :to="{path:'/add_fight',query:{pid:this.$route.query.pid,cid:this.$route.query.cid}}">+ 添加对局</router-link>
                <router-link class="btn-normal-l" :to="{path:'/map'}">+ 添加比赛地图</router-link>
                <router-link class="btn-normal-l" :to="{path:'/player'}">+ 添加选手信息</router-link>
                <router-link class="btn-normal-l" :to="{path:'/add_team'}">+ 添加战队信息</router-link>
            </div>
        </div>
        <div>
            <ul class="dt-hd">
                <li>
                    <b>小局序号：</b>
                    <el-select v-model="current.miniFightId" placeholder="选择小局号" @change="onMiniFightChange">
                        <el-option v-for="item in miniFightList" :key="item.miniFightNum" :label="item.miniFightNum" :value="item.miniFightNum">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <b>比赛地图：</b>
                    <input type="text" :value="current.mapName" disabled="true"/>
                </li>
                <li>
                    <b>获胜战队：</b>
                    <input type="text" :value="current.winTeamName" disabled="true"/>
                </li>
            </ul>
            <table class="dt-bd">
                <colgroup>
                    <col width="120" />
                </colgroup>
                <caption>
                    <b>{{teamA.name}}</b>战队数据</caption>
                <thead>
                    <tr>
                        <th>选手</th>
                        <th>MVP</th>
                        <th>击杀</th>
                        <th>爆头</th>
                        <th>死亡</th>
                        <th>狙杀</th>
                        <th>手枪</th>
                        <th>雷杀</th>
                        <th>刀杀</th>
                        <th>三杀</th>
                        <th>四杀</th>
                        <th>五杀</th>
                        <th>下包</th>
                        <th>拆包</th>
                    </tr>
                    <tr v-for="player in teamA.players">
                        <td>{{player.playerId}}</td>
                        <td>
                            <el-input v-model="player.result.mvp" placeholder="0"></el-input>
                        </td>
                        <td>
                            <el-input v-model="player.result.jisha" placeholder="0"></el-input>
                        </td>
                        <td>
                            <el-input v-model="player.result.baotou" placeholder="0"></el-input>
                        </td>
                        <td>
                            <el-input v-model="player.result.siwang" placeholder="0"></el-input>
                        </td>
                        <td>
                            <el-input v-model="player.result.jusha" placeholder="0"></el-input>
                        </td>
                        <td>
                            <el-input v-model="player.result.shouqiang" placeholder="0"></el-input>
                        </td>
                        <td>
                            <el-input v-model="player.result.leisha" placeholder="0"></el-input>
                        </td>
                        <td>
                            <el-input v-model="player.result.daosha" placeholder="0"></el-input>
                        </td>
                        <td>
                            <el-input v-model="player.result.sansha" placeholder="0"></el-input>
                        </td>
                        <td>
                            <el-input v-model="player.result.sisha" placeholder="0"></el-input>
                        </td>
                        <td>
                            <el-input v-model="player.result.wusha" placeholder="0"></el-input>
                        </td>
                        <td>
                            <el-input v-model="player.result.xiabao" placeholder="0"></el-input>
                        </td>
                        <td>
                            <el-input v-model="player.result.chaibao" placeholder="0"></el-input>
                        </td>
                    </tr>
                </thead>
            </table>
            <table class="dt-bd">
                <colgroup>
                    <col width="120" />
                </colgroup>
                <caption>
                    <b>{{teamB.name}}</b>战队数据
                </caption>
                <thead>
                    <tr>
                        <th>选手</th>
                        <th>MVP</th>
                        <th>击杀</th>
                        <th>爆头</th>
                        <th>死亡</th>
                        <th>狙杀</th>
                        <th>手枪</th>
                        <th>雷杀</th>
                        <th>刀杀</th>
                        <th>三杀</th>
                        <th>四杀</th>
                        <th>五杀</th>
                        <th>下包</th>
                        <th>拆包</th>
                    </tr>
                    <tr v-for="player in teamB.players">
                        <td>{{player.playerId}}</td>
                        <td>
                            <el-input v-model="player.result.mvp" placeholder="0"></el-input>
                        </td>
                        <td>
                            <el-input v-model="player.result.jisha" placeholder="0"></el-input>
                        </td>
                        <td>
                            <el-input v-model="player.result.baotou" placeholder="0"></el-input>
                        </td>
                        <td>
                            <el-input v-model="player.result.siwang" placeholder="0"></el-input>
                        </td>
                        <td>
                            <el-input v-model="player.result.jusha" placeholder="0"></el-input>
                        </td>
                        <td>
                            <el-input v-model="player.result.shouqiang" placeholder="0"></el-input>
                        </td>
                        <td>
                            <el-input v-model="player.result.leisha" placeholder="0"></el-input>
                        </td>
                        <td>
                            <el-input v-model="player.result.daosha" placeholder="0"></el-input>
                        </td>
                        <td>
                            <el-input v-model="player.result.sansha" placeholder="0"></el-input>
                        </td>
                        <td>
                            <el-input v-model="player.result.sisha" placeholder="0"></el-input>
                        </td>
                        <td>
                            <el-input v-model="player.result.wusha" placeholder="0"></el-input>
                        </td>
                        <td>
                            <el-input v-model="player.result.xiabao" placeholder="0"></el-input>
                        </td>
                        <td>
                            <el-input v-model="player.result.chaibao" placeholder="0"></el-input>
                        </td>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="submit">
            <a class="btn-normal-l" @click="submit" href="javascript:void(0);">完成</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MatchResult',
    data() {
        return {
            ResultList: [],
            current: {
                miniFightId: '',
                mapId: '',
                mapName: '',
                winTeamName: '',
                winTeamId:'',
                modeType: '',
            },//当前小局号
            miniFightList: [],//小局
            teamList: [],
            mapList: [],
            teamA: {name:'',players:[]},
            teamB: {name:'',players:[]}

        }
    },
    created: function () {
        this.loadFightInfo();
    },
    methods: {
        submit: function () {
            this.$http.post('https://apps.game.qq.com/cf/a20161220ms/result.php?action=add_result', {
                    pid: this.$route.query.pid,
                    cid: this.$route.query.cid,
                    fid: this.$route.query.fid,
                    miniFid: this.current.miniFightId,
                    mapId: this.current.mapId,
                    modeId: this.current.modeType,
                    winTeamId:this.current.winTeamId,
                    teamA: this.teamA,
                    teamB: this.teamB
            }, {
                    withCredentials: true
                }).then(response => {
                    let ret = response.data;
                    if (ret.status != 0) {
                        this.$message({
                            showClose: true,
                            message: ret.msg,
                            type: 'error'
                        });
                    } else {
                        this.$message({
                            message: '新增成功',
                            type: 'success'
                        });
                        // setTimeout(function () { location.reload() }, 500);
                    }
                })
        },
        onMiniFightChange: function (v) {
            let miniFightId = v;
            this.miniFightList.map(item => {
                if (item.miniFightNum == v) {
                    this.teamList.map(team => {
                        if (team.id == item.winTeam) {
                            this.current.winTeamName = team.sName;
                            this.current.winTeamId = team.id;
                        }
                    })
                    this.current.mapId = item.miniFightMapId;
                    this.mapList.map(m => {
                        if (m.id == this.current.mapId) {
                            this.current.mapName = m.mapName;
                            this.current.modeType = m.modeId;
                        }
                    })
                }
            })
            //加载数据
            this.loadResultInfo();
        },
        loadResultInfo: function () {
            this.$http.jsonp('https://apps.game.qq.com/cf/a20161220ms/result.php?action=get_result', {
                params: {
                    pid: this.$route.query.pid,
                    cid: this.$route.query.cid,
                    fid: this.$route.query.fid,
                    miniFid: this.current.miniFightId,
                    modeType: this.current.modeType
                }
            }).then(response => {
                let ret = response.data;
                if (ret.status != 0) {
                    this.$message({
                        showClose: true,
                        message: ret.msg,
                        type: 'error'
                    });
                } else {
                    this.teamA = ret.data.A;
                    this.teamB = ret.data.B;
                }
            })
        },
        loadFightInfo: function () {
            this.$http.jsonp('https://apps.game.qq.com/cf/a20161220ms/fight.php?action=page_info', {
                params: {
                    pid: this.$route.query.pid,
                    cid: this.$route.query.cid,
                    fid: this.$route.query.fid
                }
            }).then(response => {
                let ret = response.data;
                if (ret.status != 0) {
                    this.$message({
                        showClose: true,
                        message: ret.msg,
                        type: 'error'
                    });
                } else {
                    this.miniFightList = ret.data.fight.sMiniFightList || [];
                    if (this.miniFightList.length>0) {
                        this.current.miniFightId = this.miniFightList[0]['miniFightNum']
                    }
                    this.teamList = ret.data.teamList || [];
                    this.mapList = ret.data.mapList || [];
                }
            })
        }
    }
}
</script>

<style>

</style>
