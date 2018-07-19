<template>
    <div>
        <div class="top">
            <h2 class="title">
                <i class="title-icon title-icon-3"></i>
                <span class="pNameTitle">{{$store.state.pageTitle}}</span>
            </h2>
            <div class="topbtn">
                <router-link class="btn-normal-l doEditPMatchBtn" :to="{name:'MatchEdit',query:{pid:this.$route.query.pid}}">修改母赛事</router-link>
                <a class="btn-normal-l" @click="addCMatch">+ 添加子赛事</a>
            </div>
        </div>
        <div class="grid">
            <el-table :data="matchList">
                <el-table-column prop="sName" label="赛事名称" width="280">
                </el-table-column>
                <el-table-column label="比赛时间" width="480">
                    <template scope="match">
                        {{match.row.stTime}}~{{match.row.etTime}}
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作">
                    <template scope="match">
                        <el-button type="warning" size="large" @click="deleteCMatch(match.row)">删除</el-button>
                        <el-button type="primary" size="large" @click="editCMatch(match.row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagenav">
             <el-pagination layout="total,prev, pager, next" :total="totalCMatch" @current-change="onSelectCMatchPage">
            </el-pagination>
        </div>
    
        <div class="grid">
            <el-table :data="teamList">
                <el-table-column prop="sName" label="队伍名称" width="280">
                </el-table-column>
                <el-table-column label="参赛选手" width="480">
                    <template scope="team">
                        <span v-for="p in team.row.player">{{p.playerName}}&nbsp&nbsp</span> 
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作">
                    <template scope="team">
                        <el-button type="warning" size="large" @click="deleteTeam(team.row)">删除</el-button>
                        <el-button type="primary" size="large" @click="editTeam(team.row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <player-box :pid="this.$route.query.pid" :tid="tid" :currentPlayerIdList="currentPlayerIdList"></player-box>
        <match-dialog :cid="currentCid" :isEdit="isEdit"></match-dialog>
    </div>
</template>

<script>
export default {

    name: 'MatchList',
    data() {
        return {
            api: {
                getAllCMatchListAPI: 'https://apps.game.qq.com/cf/a20161220ms/cmatch.php?action=get_clist&matchType=4',
                getAllTeamListAPI:'https://apps.game.qq.com/cf/a20161220ms/pmatch.php?action=get_team_list'
            },
            matchList: [],
            teamList:[],
            totalCMatch: 1,
            cMatchOffset: 1,
            currentCid: '',
            isEdit: false,
            tid:'',//当前操作的teamid
            currentPlayerIdList:[]
        }
    },
    created: function () {
        this.loadAllMatchList();
        this.loadTeamList();
        this.$event.$on('cMatchEdit', () => {
            this.loadAllMatchList();
        })
        this.$event.$on('playerChange',()=>{
            this.loadTeamList();
        })
    },
    watch: {
        '$route': function () {
            this.loadAllMatchList();
            this.loadTeamList();
        }
    },
    methods: {
        onSelectCMatchPage:function(page){
            this.cMatchOffset = page;
            this.loadAllMatchList();
        },
        deleteTeam:function(team){
            this.$confirm('是否确认删除队伍【' + team.sName + '】?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.jsonp('https://apps.game.qq.com/cf/a20161220ms/pmatch.php?action=delete_team', {
                    params: {
                        pid: team.pid,
                        teamId:team.teamId
                    }
                }).then(response => {
                    let ret = response.data;
                    if (ret.status == 0) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.loadTeamList();
                    } else {
                        this.$message.error(ret.msg);
                    }

                }, error => {
                    this.$message.error('系统繁忙，请稍候再试！');
                })
            })
        },
        editTeam:function(team){
            this.currentPlayerIdList = [];
            this.tid = team.teamId;
            team.player.map(p=>{
                this.currentPlayerIdList.push(p.id)
            })
            this.$dialog.TGDialogS('playerBoxItem');
        },
        addCMatch: function () {
            this.currentCid = '';
            this.isEdit = false;
            this.$dialog.TGDialogS('dialogEditItem')
        },
        editCMatch: function (row) {
            this.currentCid = row.id;
            this.isEdit = true;
            this.$dialog.TGDialogS('dialogEditItem')
        },
        deleteCMatch: function (row) {
            this.$confirm('是否确认删除赛事【' + row.sName + '】?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.jsonp('https://apps.game.qq.com/cf/a20161220ms/cmatch.php?action=delete_cmatch', {
                    params: {
                        id: row.id
                    }
                }).then(response => {
                    let ret = response.data;
                    if (ret.status == 0) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.loadAllMatchList();
                    } else {
                        this.$message.error(ret.msg);
                    }

                }, error => {
                    this.$message.error('系统繁忙，请稍候再试！');
                })
            })
        },
        loadAllMatchList: function () {
            this.$http.jsonp(this.api.getAllCMatchListAPI, {
                params: {
                    pid: this.$route.query.pid,
                    offset: this.cMatchOffset,
                    count: 10
                }
            }).then(response => {
                let ret = response.data;
                if (ret.status == 0) {
                    this.matchList = ret.data.list;
                    this.totalCMatch = ret.data.total;
                } else {
                    this.$message.error(ret.msg);
                }

            }, error => {
                this.$message.error('系统繁忙，请稍候再试！');
            })
        },
        loadTeamList: function () {
            this.$http.jsonp(this.api.getAllTeamListAPI, {
                params: {
                    pid: this.$route.query.pid
                }
            }).then(response => {
                let ret = response.data;
                if (ret.status == 0) {
                    this.teamList = ret.data;
                } else {
                    this.$message.error(ret.msg);
                }

            }, error => {
                this.$message.error('系统繁忙，请稍候再试！');
            })
        }
    }
}
</script>

<style>

</style>
