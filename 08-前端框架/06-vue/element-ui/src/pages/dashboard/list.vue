<template>
    <div>
        <div class="top">
            <h2 class="title">
                <i class="title-icon title-icon-1"></i>进行中的赛事</h2>
            <div class="topbtn">
                <router-link class="btn-normal-l" :to="{path:'/add_match'}">+ 创建赛事</router-link>
            </div>
        </div>
        <div class="grid">
            <el-table :data="currentPMatchList">
                <el-table-column prop="sName" label="赛事名称" width="280">
                    <template scope="match">
                        <router-link :to="{path:'/match_list',query:{pid:match.row.id}}" @click.native="$store.commit('setPageTitle',match.row.sName);$store.commit('setMenuClass','pmatch-'+match.row.id);">{{match.row.sName}}</router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="matchId" label="赛事ID" width="260">
                </el-table-column>
                <el-table-column label="比赛时间" width="460">
                    <template scope="match">
                        {{match.row.stTime}}~{{match.row.etTime}}
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作">
                    <template scope="match">
                        <el-button type="warning" size="large" @click="deletePMatch(match.row)">删除</el-button>
                        <el-button type="primary" size="large" @click="editPMatch(match.row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- <div class="pagenav">
                <el-pagination layout="total,prev, pager, next" :total="totalGoingPPage" @current-change="onSelectPage">
                </el-pagination>
            </div> -->
    
        <div class="top">
            <h2 class="title">
                <i class="title-icon title-icon-2"></i>已结束母赛事</h2>
        </div>
        <div class="grid">
            <el-table :data="finishPMatchList">
                <el-table-column prop="sName" label="赛事名称" width="280">
                    <template scope="match">
                        <router-link :to="{path:'/match_list',query:{pid:match.row.id}}" @click.native="$store.commit('setPageTitle',match.row.sName);$store.commit('setMenuClass','pmatch-'+match.row.id);">{{match.row.sName}}</router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="matchId" label="赛事ID" width="260">
                </el-table-column>
                <el-table-column label="比赛时间" width="460">
                    <template scope="match">
                        {{match.row.stTime}}~{{match.row.etTime}}
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作">
                    <template scope="match">
                        <el-button type="primary" size="large" @click="editPMatch(match.row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- <div class="pagenav">
                <el-pagination layout="total,prev, pager, next" :total="totalFinishPPage" @current-change="onSelectPage">
                </el-pagination>
            </div> -->
        <!--已结束子赛事  -->
        <div class="top">
            <h2 class="title">
                <i class="title-icon title-icon-2"></i>已结束子赛事</h2>
        </div>
        <div class="grid">
            <el-table :data="finishCMatchList">
                <el-table-column prop="sName" label="赛事名称" width="280">
                </el-table-column>
                <el-table-column prop="sPName" label="归属母赛事" width="260">
                    <template scope="match">
                        <router-link :to="{path:'/match_list',query:{pid:match.row.pid}}" @click.native="$store.commit('setPageTitle',match.row.sPName);$store.commit('setMenuClass','pmatch-'+match.row.pid);">{{match.row.sPName}}</router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="matchId" label="赛事ID" width="260">
                </el-table-column>
                <el-table-column prop="matchTime" label="比赛时间" width="460">
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="match">
                        <el-button type="primary" size="large" @click="editCMatch(match.row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagenav">
            <el-pagination layout="total,prev, pager, next" :total="totalFinishCPage" @current-change="onSelectCMatchPage" :page-size="10">
            </el-pagination>
        </div>
        <!--已删除母赛事  -->
        <div class="top">
            <h2 class="title">
                <i class="title-icon title-icon-2"></i>已删除母赛事</h2>
        </div>
        <div class="grid">
            <el-table :data="deletePMatchList">
                <el-table-column prop="sName" label="赛事名称" width="280">
                    <template scope="match">
                        <router-link :to="{path:'/match_list',query:{pid:match.row.id}}" @click.native="$store.commit('setPageTitle',match.row.sName);$store.commit('setMenuClass','pmatch-'+match.row.id);">{{match.row.sName}}</router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="matchId" label="赛事ID" width="260">
                </el-table-column>
                <el-table-column label="比赛时间" width="460">
                    <template scope="match">
                        {{match.row.stTime}}~{{match.row.etTime}}
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作">
                    <template scope="match">
                        <el-button type="primary" size="large" @click="resumePMatch(match.row)">恢复</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- <div class="pagenav">
                <el-pagination layout="total,prev, pager, next" :total="totalDeletePPage" @current-change="onSelectPage">
                </el-pagination>
            </div> -->
        <!--已删除子赛事  -->
        <div class="top">
            <h2 class="title">
                <i class="title-icon title-icon-2"></i>已删除子赛事</h2>
        </div>
        <div class="grid">
            <el-table :data="deleteCMatchList">
                <el-table-column prop="sName" label="赛事名称" width="280">
                </el-table-column>
                <el-table-column prop="sPName" label="归属母赛事" width="260">
                    <template scope="match">
                        <router-link :to="{path:'/match_list',query:{pid:match.row.pid}}" @click.native="$store.commit('setPageTitle',match.row.sPName);$store.commit('setMenuClass','pmatch-'+match.row.pid);">{{match.row.sPName}}</router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="matchId" label="赛事ID" width="260">
                </el-table-column>
                <el-table-column prop="matchTime" label="比赛时间" width="460">
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="match">
                        <el-button type="primary" size="large" @click="resumeCMatch(match.row)">恢复</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
         <div class="pagenav">
                <el-pagination layout="total,prev, pager, next" :total="totalDeleteCPage" @current-change="onSelectDeleteCMatchPage">
                </el-pagination>
            </div> 
       <match-dialog :cid="currentCid" :isEdit="isEdit"></match-dialog>
    </div>
</template>

<script>
export default {
    name: 'Index',
    data() {
        return {
            api: {
                getAllCurrentPMatchListAPI: 'https://apps.game.qq.com/cf/a20161220ms/pmatch.php?action=get_plist&matchType=1&subType=1',
                getAllFinishPMatchListAPI: 'https://apps.game.qq.com/cf/a20161220ms/pmatch.php?action=get_plist&matchType=2&subType=1',
                getAllFinishCMatchListAPI: 'https://apps.game.qq.com/cf/a20161220ms/pmatch.php?action=get_plist&matchType=2&subType=2',
                getAllDeletePMatchListAPI: 'https://apps.game.qq.com/cf/a20161220ms/pmatch.php?action=get_plist&matchType=3&subType=1',
                getAllDeleteCMatchListAPI: 'https://apps.game.qq.com/cf/a20161220ms/pmatch.php?action=get_plist&matchType=3&subType=2',
                deletePMatchAPI: 'https://apps.game.qq.com/cf/a20161220ms/pmatch.php?action=delete_pmatch',
                resumePMatchAPI: 'https://apps.game.qq.com/cf/a20161220ms/pmatch.php?action=resume_pmatch',
                resumeCMatchAPI: 'https://apps.game.qq.com/cf/a20161220ms/cmatch.php?action=resume_cmatch',
            },
            currentPMatchList: [],
            finishPMatchList: [],
            finishCMatchList: [],
            deletePMatchList: [],
            deleteCMatchList: [],
            currentPOffset: 1,
            finishPOffset: 1,
            finishCOffset: 1,
            deletePOffset: 1,
            deleteCOffset: 1,
            count: 10,
            totalFinishPPage: 1,
            totalGoingPPage: 1,
            totalFinishCPage: 1,
            totalDeletePPage: 1,
            totalDeleteCPage: 1,
            currentCid: '',
            isEdit: false,
        }
    },
    created: function () {
        this.loadOnGoingPMatch();
        this.loadFinishPMatch();
        this.loadFinishCMatch();
        this.loadDeletePMatch();
        this.loadDeleteCMatch();
    },
    methods: {
        onSelectDeleteCMatchPage:function(v){
            this.deleteCOffset = v;
            this.loadDeleteCMatch();
        },
        //修改子赛事
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
        editCMatch: function (row) {
            this.currentCid = row.id;
            this.isEdit = true;
            this.$dialog.TGDialogS('dialogEditItem');
            this.$event.$on('cMatchEdit',()=>{
                this.loadFinishCMatch();
            })
        },
        onSelectCMatchPage: function (page) {
            this.finishCOffset = page;
            this.loadFinishCMatch();
        },
        /**
         * 删除母赛事
         */
        deletePMatch: function (match) {
            this.$confirm('是否确认删除赛事【' + match.sName + '】?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.jsonp(this.api.deletePMatchAPI, {
                    params: {
                        id: match.id
                    }
                }).then(response => {
                    let ret = response.data;
                    if (ret.status == 0) {
                        this.loadOnGoingPMatch();
                        this.loadDeletePMatch();
                    } else {
                        this.$message.error(ret.msg);
                    }

                }, error => {
                    this.$message.error('系统繁忙，请稍候再试！');
                })
            })
        },
        editPMatch: function (match) {
            this.$router.push('/match_edit?pid=' + match.id);
        },
        resumePMatch: function (match) {
            this.$http.jsonp(this.api.resumePMatchAPI, {
                params: {
                    id: match.id
                }
            }).then(response => {
                let ret = response.data;
                if (ret.status == 0) {
                    this.loadOnGoingPMatch();
                    this.loadFinishPMatch();
                    this.loadDeletePMatch();
                } else {
                    this.$message.error(ret.msg);
                }

            }, error => {
                this.$message.error('系统繁忙，请稍候再试！');
            })
        },
        resumeCMatch: function (match) {
            this.$http.jsonp(this.api.resumeCMatchAPI, {
                params: {
                    id: match.id
                }
            }).then(response => {
                let ret = response.data;
                if (ret.status == 0) {
                    this.loadDeleteCMatch();
                    this.loadFinishCMatch();
                } else {
                    this.$message.error(ret.msg);
                }

            }, error => {
                this.$message.error('系统繁忙，请稍候再试！');
            })
        },
        /**
         进行中的母赛事
         */
        loadOnGoingPMatch: function () {
            this.$http.jsonp(this.api.getAllCurrentPMatchListAPI, {
                params: {
                    offset: this.currentPOffset,
                    count: this.count
                }
            }).then(response => {
                let ret = response.data;
                if (ret.status == 0) {
                    this.currentPMatchList = ret.data.list;
                    this.totalGoingPPage = ret.data.total;
                } else {
                    this.$message.error(ret.msg);
                }

            }, error => {
                this.$message.error('系统繁忙，请稍候再试！');
            })
        },
        loadFinishPMatch: function () {
            this.$http.jsonp(this.api.getAllFinishPMatchListAPI, {
                params: {
                    offset: this.finishPOffset,
                    count: this.count
                }
            }).then(response => {
                let ret = response.data;
                if (ret.status == 0) {
                    this.finishPMatchList = ret.data.list;
                    this.totalFinishPPage = ret.data.total;
                } else {
                    this.$message.error(ret.msg);
                }

            }, error => {
                this.$message.error('系统繁忙，请稍候再试！');
            })
        },
        loadFinishCMatch: function () {
            this.$http.jsonp(this.api.getAllFinishCMatchListAPI, {
                params: {
                    offset: this.finishCOffset,
                    count: this.count
                }
            }).then(response => {
                let ret = response.data;
                if (ret.status == 0) {
                    this.finishCMatchList = ret.data.list;
                    this.totalFinishCPage = ret.data.total;
                } else {
                    this.$message.error(ret.msg);
                }

            }, error => {
                this.$message.error('系统繁忙，请稍候再试！');
            })
        },
        loadDeletePMatch: function () {
            this.$http.jsonp(this.api.getAllDeletePMatchListAPI, {
                params: {
                    offset: this.deletePOffset,
                    count: this.count
                }
            }).then(response => {
                let ret = response.data;
                if (ret.status == 0) {
                    this.deletePMatchList = ret.data.list;
                    this.totalDeletePPage = ret.data.total;
                } else {
                    this.$message.error(ret.msg);
                }

            }, error => {
                this.$message.error('系统繁忙，请稍候再试！');
            })
        },
        loadDeleteCMatch: function () {
            this.$http.jsonp(this.api.getAllDeleteCMatchListAPI, {
                params: {
                    offset: this.deleteCOffset,
                    count: this.count
                }
            }).then(response => {
                let ret = response.data;
                if (ret.status == 0) {
                    this.deleteCMatchList = ret.data.list;
                    this.totalDeleteCPage = ret.data.total;
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
