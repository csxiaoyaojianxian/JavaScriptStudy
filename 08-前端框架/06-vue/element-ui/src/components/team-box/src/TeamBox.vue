<template>
    <div>
        <ul class="form-pick">
            <li v-for="team in SelectedTeamList">{{team.sShortName}}
                <a data-id="team.id" class="delSelectedTeam" @click="deleteTeam(team.id)">x</a>
            </li>
        </ul>
    
        <div class="pop" id="dialogPickTeam">
            <h2 class="pop-tit">选择战队</h2>
            <div class="pop-panel">
                <ul class="pick clearfix" style="height: 200px;overflow-y: scroll">
                    <li v-for="team in TeamList">
                        <input type="checkbox" :value="team.id" @change="onChange" :checked="team.isChecked">
                        <span>{{team.sShortName}}</span>
                    </li>
                </ul>
                <div class="pop-btn">
                    <a class="btn-normal addTeamBtn" href="javascript:closeDialog();">完成</a>
                </div>
            </div>
            <a class="pop-close" href="javascript:closeDialog();">&times;</a>
        </div>
    
    </div>
</template>

<script>
export default {
    name: 'TeamBox',
    props: ['SelectedTeamIdList'],
    data() {
        return {
            SelectedTeamList: [],
            TeamList:[]
        }

    },
    watch: {
        'TeamList': function () {
            this.SelectedTeamList = [];
            this.TeamList.map(item => {
                if (this.SelectedTeamIdList.indexOf(item.id) != -1) {
                    item.isChecked = true;
                    this.SelectedTeamList.push(item);
                } else {
                    item.isChecked = false;
                }
            })
        },
        'SelectedTeamIdList': function () {
            this.SelectedTeamList = [];
            this.TeamList.map(item => {
                if (this.SelectedTeamIdList.indexOf(item.id) != -1) {
                    item.isChecked = true;
                    this.SelectedTeamList.push(item);
                } else {
                    item.isChecked = false;
                }
            })
        }
    },
    created: function () {
        this.getAllTeamList();
    },
    methods: {
        getAllTeamList: function (context) {
            this.$http.jsonp('https://apps.game.qq.com/cf/a20161220ms/team.php?action=get_all').then(response => {
                let ret = response.data;
                if (ret.status == 0) {
                    this.TeamList = ret.data;
                } else {
                    this.$message.error(ret.msg);
                }
            }, error => {
                this.$message.error('系统繁忙，请稍候再试！');
            })
        },
        deleteTeam: function (id) {
            this.$event.$emit('deleteTeam', id);
        },
        onChange: function (e) {
            let target = e.target;
            let isChecked = target.checked;
            if (isChecked) {
                let id = target.value;
                console.log('add=',id);
                this.$event.$emit('addTeam', id);
            } else {
                let id = target.value;
                console.log('del=',id);
                this.$event.$emit('deleteTeam', id);
            }
            return true;
        }
    }
}
</script>

<style>

</style>
