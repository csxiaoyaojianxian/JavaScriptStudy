<template>
    <div>
        <div class="top">
            <h2 class="title">
                <i class="title-icon title-icon-3"></i>
                <span class="cNameTitle">{{$store.state.pageTitle}}</span>
            </h2>
            <div class="topbtn">
                <router-link class="btn-normal-l addFightBtn" href="javascript:void(0)" :to="{path:'add_fight',query:{pid:this.$route.query.pid,cid:this.$route.query.id}}">+ 添加对局</router-link>
            </div>
        </div>
        <div class="grid">
            <el-table :data="fightList" style="width:100%">
                <el-table-column prop="stTime" label="比赛时间" width="300">
                </el-table-column>
                <el-table-column prop="teamAName" label="战队A" width="150">
                </el-table-column>
                <el-table-column prop="teamBName" label="战队B" width="150">
                </el-table-column>
                <el-table-column prop="sMatchStatus" label="比赛状态" width="150">
                </el-table-column>
                <el-table-column prop="sMatchStatus" label="比分">
                    <template scope="match">
                        {{match.row.matchScoreA}}:{{match.row.matchScoreB}}
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作" width="580">
                    <template scope="match">
                        <el-button type="primary" size="large" @click="deleteFight(match.row)">删除</el-button>
                        <el-button type="primary" size="large" @click="viewFight(match.row)">查看</el-button>
                        <el-button type="warning" size="large" @click="editFight(match.row)">修改状态</el-button>
                        <el-button type="warning" size="large" @click="addMatchResult(match.row)" :disabled="match.row.matchStatus!=2">录入赛果</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
       <div class="pagenav">
             <el-pagination layout="total,prev, pager, next" :total="totalPage" @current-change="onSelectCMatchPage">
            </el-pagination>
        </div>
        <div class="pop" id="dialogUpdate">
            <h2 class="pop-tit">修改状态</h2>
            <div class="pop-panel">
                <div class="status">
                    <ul class="status-check clearfix">
                        <el-radio class="radio" v-model="fight.matchStatus" label="0">未开始</el-radio>
                        <el-radio class="radio" v-model="fight.matchStatus" label="1">进行中</el-radio>
                        <el-radio class="radio" v-model="fight.matchStatus" label="2">已结束</el-radio>
                    </ul>
                    <div class="status-score clearfix">
                        <strong class="status-score-t">总比分</strong>
                        <div class="status-score-input">
                            <span>战队A：</span>
                            <el-input placeholder="战队A比分" v-model="fight.scoreA" :disabled="fight.matchStatus!=2">
                            </el-input>
                        </div>
                        <div class="status-score-input">
                            <span>战队B：</span>
                            <el-input placeholder="战队B比分" v-model="fight.scoreB" :disabled="fight.matchStatus!=2">
                            </el-input>
                        </div>
                    </div>
                </div>
                <div class="pop-btn">
                    <a class="btn-normal" @click="editFightStatus" href="javascript:void(0);">完成</a>
                    <a class="btn-gray" href="javascript:closeDialog();">取消</a>
                </div>
            </div>
            <a class="pop-close" href="javascript:closeDialog();">&times;</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChildMatchList',
    data() {
        return {
            api: {
                getFightListAPI: 'https://apps.game.qq.com/cf/a20161220ms/fight.php?action=get_flist&'
            },
            fightList: [],
            totalPage: 1,
            cMatchOffset:1,
            fight: {
                matchStatus: '',
                scoreA: '',
                scoreA: '',
                fid: ''
            }
        }
    },
    created: function () {

        this.loadFightList();
    },
    watch: {
        "$route": "loadFightList"
    },
    methods: {
        deleteFight: function (fight) {
            this.$confirm('是否确认删除对局信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.jsonp('https://apps.game.qq.com/cf/a20161220ms/fight.php?action=delete_fight', {
                    params: {
                        id: fight.id
                    }
                }).then(response => {
                    let ret = response.data;
                    if (ret.status == 0) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.loadFightList();
                    } else {
                        this.$message.error(ret.msg);
                    }

                }, error => {
                    this.$message.error('系统繁忙，请稍候再试！');
                })
            })
        },
        editFightStatus: function () {
            this.$http.jsonp('https://apps.game.qq.com/cf/a20161220ms/fight.php?action=edit_fight_score', {
                params: this.fight
            }).then(response => {
                let ret = response.data;
                if (ret.status != 0) {
                    this.$message({
                        showClose: true,
                        message: ret.msg,
                        type: 'error'
                    });
                } else {
                    this.$dialog.CloseDialog();
                    this.loadFightList();
                }
            })
        },
        editFight: function (fight) {
            this.fight.fid = fight.id;
            this.fight.matchStatus = fight.matchStatus;
            this.fight.scoreA = fight.matchScoreA;
            this.fight.scoreB = fight.matchScoreB;
            console.log(this.fight);
            this.$dialog.TGDialogS('dialogUpdate');
        },
        deleteFight: function (fight) {
            this.$confirm('是否确认删除对局信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.jsonp('https://apps.game.qq.com/cf/a20161220ms/fight.php?action=delete_fight', {
                    params: {
                        id: fight.id
                    }
                }).then(response => {
                    let ret = response.data;
                    if (ret.status == 0) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.loadFightList();
                    } else {
                        this.$message.error(ret.msg);
                    }

                }, error => {
                    this.$message.error('系统繁忙，请稍候再试！');
                })
            })
        },
        viewFight: function (fight) {
            let pid = this.$route.query.pid;
            let cid = this.$route.query.id;
            this.$router.push('/edit_fight?fid=' + fight.id + '&pid=' + pid + '&cid=' + cid);
        },
        addMatchResult: function (match) {
            if (match.matchStatus!=2) {
                this.$message.error('对局暂未结束，不能录入赛果！');
                return;
            }
            this.$router.push('/match_result?cid=' + this.$route.query.id + '&pid=' + this.$route.query.pid+'&fid='+match.id);
        },
        onSelectCMatchPage:function(page){
            this.cMatchOffset = page;
            this.loadFightList();
        },
        loadFightList: function () {
            this.$http.jsonp(this.api.getFightListAPI, {
                params: {
                    pid: this.$route.query.pid,
                    cid: this.$route.query.id,
                    offset: this.cMatchOffset,
                    count: 10
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
                    this.fightList = ret.data.list;
                    this.totalPage = ret.data.total;
                }
            })
        }
    }
}
</script>

<style>
.el-input {
    display: inline !important;
}
</style>
