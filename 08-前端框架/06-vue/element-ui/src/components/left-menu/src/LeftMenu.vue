<template>
    <ul class="nav">
        <li class="nav-item">
            <router-link class="nav-lnk" :to="{path:'/'}">比赛</router-link>
            <ul class="nav-menu">
                <li :class="{current:$store.state.menuClass==('pmatch-'+menu.id)}" v-for="menu in menuList">
                    <a @click="viewMatchDetail(menu)">{{menu.sName}}</a>
                    <ul>
                        <li :class="{current:$store.state.menuClass==('cmatch-'+cmenu.id)}" v-for="cmenu in menu.cList">
                            <a @click="viewCMatchDetail(cmenu,menu)">{{cmenu.sName}}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
        <li class="nav-item">
            <a class="nav-lnk" href="javascript:;">地图、战队、选手资料</a>
            <ul class="nav-menu">
                <li :class="{current:$store.state.menuClass=='map'}">
                    <router-link :to="{path:'/map'}" @click.native="$store.commit('setMenuClass','map')">地图</router-link>
                </li>
                <li :class="{current:$store.state.menuClass=='team'}">
                    <router-link :to="{path:'/team'}"  @click.native="$store.commit('setMenuClass','team')">战队</router-link>
                </li>
                <li :class="{current:$store.state.menuClass=='player'}" >
                    <router-link :to="{path:'/player'}" @click.native="$store.commit('setMenuClass','player')">选手</router-link>
                </li>
            </ul>
        </li>
        <li class="nav-item">
            <a class="nav-lnk" href="javascript:;">战队、选手数据查询</a>
            <ul class="nav-menu">
                <li :class="{current:$store.state.menuClass=='query-team'}">
                    <router-link :to="{path:'/query/team'}" @click.native="$store.commit('setMenuClass','query-team')">战队</router-link>
                </li>
                <li :class="{current:$store.state.menuClass=='query-player'}">
                   <router-link :to="{path:'/query/player'}" @click.native="$store.commit('setMenuClass','query-player')">选手</router-link>
                </li>
            </ul>
        </li>

        <li class="nav-item">
            <a class="nav-lnk" href="javascript:;">吃鸡赛事配置</a>
            <ul class="nav-menu">
                <li :class="{current:$store.state.menuClass=='chicken-rule'}">
                    <router-link :to="{path:'/chicken/rule'}" @click.native="$store.commit('setMenuClass','chicken-rule')">规则</router-link>
                </li>
                <li :class="{current:$store.state.menuClass=='chicken-team'}">
                    <router-link :to="{path:'/chicken/team'}" @click.native="$store.commit('setMenuClass','chicken-team')">战队</router-link>
                </li>
                <li :class="{current:$store.state.menuClass=='chicken-player'}" >
                    <router-link :to="{path:'/chicken/player'}" @click.native="$store.commit('setMenuClass','chicken-player')">选手</router-link>
                </li>
                <li :class="{current:$store.state.menuClass=='chicken-match'}">
                    <router-link :to="{path:'/chicken/'}" @click.native="$store.commit('setMenuClass','chicken-match')">比赛</router-link>
                    <ul class="nav-menu">
                        <li :class="{current:$store.state.menuClass==('chicken-pmatch-'+menu.id)}" v-for="menu in chickenMenuList">
                            <a @click="viewChickenMatchDetail(menu)">{{menu.sName}}</a>
                            <ul>
                                <li :class="{current:$store.state.menuClass==('chicken-cmatch-'+cmenu.id)}" v-for="cmenu in menu.cList">
                                    <a @click="viewChickenCMatchDetail(cmenu,menu)">{{cmenu.sName}}</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li :class="{current:$store.state.menuClass=='chicken-query-list'}" >
                    <router-link :to="{path:'/chicken/query/list'}" @click.native="$store.commit('setMenuClass','chicken-query-list')">积分-团队</router-link>
                </li>
                <li :class="{current:$store.state.menuClass=='chicken-query-player'}" >
                    <router-link :to="{path:'/chicken/query/player'}" @click.native="$store.commit('setMenuClass','chicken-query-player')">积分-个人</router-link>
                </li>
            </ul>
        </li>
    </ul>
</template>
<script>
export default {
    name: "LeftMenu",
    data() {
        return {
            api: {
                loadMenuAPI: 'https://apps.game.qq.com/cf/a20161220ms/pmatch.php?action=get_cate',
                loadChickenMenuAPI: 'https://apps.game.qq.com/cf/a20161220ms/chickenpmatch.php?action=get_cate'
            },
            pid:'',
            menuList: [],
            currentMatch: '',
            
            chickenpid:'',
            chickenMenuList:[],
            currentChickenMatch:'',
        }
    },
    created: function () {
        this.loadMenu();
        this.loadChickenMenu();
        this.$event.$on('editMatch', text => {
            this.currentMatch = text
        })
    },
    methods: {
        viewMatchDetail: function (pdata) {
            this.$router.push('/match_list?pid=' + pdata.id);
            this.currentMatch.pName = pdata.sName;
            this.currentMatch.cName = '';
            this.pid = pdata.id;
            this.loadMenu();
            this.$store.commit('setPageTitle',this.currentMatch.pName);
            this.$store.commit('setMenuClass','pmatch-'+pdata.id);
            
        },
        viewCMatchDetail: function (cdata, pdata) {
            this.currentMatch.pName = pdata.sName;
            this.currentMatch.cName = cdata.sName;
            this.pid = pdata.id
            
            this.$router.push('/child_match?pid=' + cdata.pid + '&id=' + cdata.id);
            this.$store.commit('setPageTitle',this.currentMatch.pName+'-'+this.currentMatch.cName);
            this.$store.commit('setMenuClass','cmatch-'+cdata.id);
        },
        viewChickenMatchDetail: function (pdata) {
            this.$router.push('/chicken_match_list?pid=' + pdata.id);
            this.currentChickenMatch.pName = pdata.sName;
            this.currentChickenMatch.cName = '';
            this.chickenpid = pdata.id;
            this.loadChickenMenu();
            this.$store.commit('setPageTitle',this.currentChickenMatch.pName);
            this.$store.commit('setMenuClass','chicken-pmatch-'+pdata.id);
            
        },
        viewChickenCMatchDetail: function (cdata, pdata) {
            this.currentChickenMatch.pName = pdata.sName;
            this.currentChickenMatch.cName = cdata.sName;
            this.chickenpid = pdata.id
            
            this.$router.push('/chicken_child_match?pid=' + cdata.pid + '&id=' + cdata.id);
            this.$store.commit('setPageTitle',this.currentChickenMatch.pName+'-'+this.currentChickenMatch.cName);
            this.$store.commit('setMenuClass','chicken-cmatch-'+cdata.id);
        },
        loadMenu: function () {
            this.$http.jsonp(this.api.loadMenuAPI,{
                params:{
                    pid:this.pid
                }
            }).then(response => {
                let ret = response.data;
                this.menuList = ret.data.data;
                this.currentMatch = ret.data.selected;
                if (this.currentMatch!=null) {
                    this.$store.commit('setPageTitle',this.currentMatch.pName);
                }
                
            })
        },
        loadChickenMenu: function () {
            this.$http.jsonp(this.api.loadChickenMenuAPI,{
                params:{
                    chickenpid:this.chickenpid
                }
            }).then(response => {
                let ret = response.data;
                this.chickenMenuList = ret.data.data;
                this.currentChickenMatch = ret.data.selected;
                if (this.currentChickenMatch!=null) {
                    this.$store.commit('setPageTitle',this.currentChickenMatch.pName);
                }
                
            })
        }
    }
}
</script>

<style>
.el-message{
    z-index: 9999 !important;
}
</style>
