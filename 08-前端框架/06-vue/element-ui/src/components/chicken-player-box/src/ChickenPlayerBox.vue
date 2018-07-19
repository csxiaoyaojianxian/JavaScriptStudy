<template>
    <div class="pop" id="playerChickenBoxItem">
        <div class="pop-panel">
            <el-transfer v-model="selectedIdList" :data="playerList" :titles="['所有选手','当前选手']"></el-transfer>
            <a class="btn-normal btn-normal submit-btn" @click="updatePlayer" href="javascript:void(0);">确认保存</a>
            <a class="btn-normal btn-gray submit-btn" href="javascript:closeDialog();">关闭窗口</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChickenPlayerBox',
    props: ["pid", "tid", "currentChickenPlayerIdList"],
    data() {
        return {
            playerList: [],
            selectedIdList: this.currentChickenPlayerIdList
        };
    },
    watch: {
        'currentChickenPlayerIdList': function () {
            this.selectedIdList = this.currentChickenPlayerIdList
        }
    },
    created: function () {
        this.loadAllPlayerList();
    },
    methods: {
        /**
         * 更新队员信息
         */
        updatePlayer: function () {
            this.$http.jsonp('https://apps.game.qq.com/cf/a20161220ms/chickenpmatch.php?action=update_player', {
                params: {
                    pid: this.pid,
                    teamId: this.tid,
                    playerIdList: this.selectedIdList.join(',')
                }
            }).then(response => {
                let ret = response.data;
                if (ret.status == 0) {
                    this.$message({ message: '修改成功', type: 'success' });
                    this.$dialog.CloseDialog();
                    this.$event.$emit('playerChickenChange');
                } else {
                    this.$message.error(ret.msg);
                }
            }, error => {
                this.$message.error('系统繁忙，请稍候再试！');
            })
        },
        loadAllPlayerList: function () {
            this.$http.jsonp('https://apps.game.qq.com/cf/a20161220ms/chickenplayer.php?action=get_all', {
                params: {
                    offset: this.offset,
                    count: 10
                }
            }).then(response => {
                let ret = response.data;
                if (ret.status == 0) {
                    let playerList = ret.data;
                    for (var k in playerList) {
                        let player = playerList[k];
                        this.playerList.push({
                            key: player.id,
                            label: player.playerId
                        })
                    }
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
.el-transfer-panel {
    text-align: left !important;
}

.submit-btn {
    margin-top: 10px;
}
</style>
