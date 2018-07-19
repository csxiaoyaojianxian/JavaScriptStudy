<template>
    <div class="pop pop-s" id="dialogAddMap">
        <div class="pop-panel">
            <div class="form">
                <el-form :model="MapInfo" label-width="120px" label-position="left">
                    <el-form-item label="比赛地图：" prop="mapName" :rules="{required:true,message:'地图名称（模式名称）不能为空',trigger: 'blur'}">
                        <el-input v-model="MapInfo.mapName" size="large"></el-input>
                    </el-form-item>
                    <el-form-item label="比赛模式：">
                        <el-select v-model="MapInfo.modeId" placeholder="请选择模式">
                            <el-option v-for="mode in ModeList" :key="mode.id" :label="mode.name" :value="mode.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="pop-btn">
                    <a class="btn-normal-l" @click="updateOrSave" href="javascript:void(0);">完成</a>
                    <a class="btn-gray-l" href="javascript:closeDialog();">关闭</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MapDialog',
    props: ["isEdit", "Info"],
    data() {
        return {
            MapInfo: {
                id: '',
                mapName: '',
                modeId: '',
                modeName: '',
            },
            ModeList: [{
                id: "1",
                name: '爆破模式'
            }, {
                id: "2",
                name: '团队竞技'
            }]
        }
    },
    watch: {
        "Info": function () {
            this.MapInfo = this.Info;
        }
    },
    created: function () {
        this.MapInfo = this.Info;
    },
    methods: {
        updateOrSave: function () {
            this.ModeList.map((mode) => {
                if (mode.id == this.MapInfo.modeId) {
                    this.MapInfo.modeName = mode.name;
                }
            });
            if (this.isEdit) {
                this.$http.jsonp('https://apps.game.qq.com/cf/a20161220ms/map.php?action=edit_map', {
                    params: this.MapInfo
                }).then(response => {
                    let ret = response.data;
                    if (ret.status == 0) {
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        });
                        this.$event.$emit('cMapEdit');
                        this.$dialog.CloseDialog();
                    } else {
                        this.$message.error(ret.msg);
                    }

                }, error => {
                    this.$message.error('系统繁忙，请稍候再试！');
                })
            } else {
                this.$http.jsonp('https://apps.game.qq.com/cf/a20161220ms/map.php?action=add_map', {
                    params: this.MapInfo
                }).then(response => {
                    let ret = response.data;
                    if (ret.status == 0) {
                        this.$message({
                            message: '新增成功',
                            type: 'success'
                        });
                        this.$event.$emit('cMapEdit');
                        this.$dialog.CloseDialog();
                    } else {
                        this.$message.error(ret.msg);
                    }

                }, error => {
                    this.$message.error('系统繁忙，请稍候再试！');
                })
            }
        }
    }
}
</script>

<style>
#dialogAddMap .el-input__inner {
    width: 200px !important;
    height: 40px !important;
    font-size: 16px !important;
    background: none !important;
    border: 1px solid #cfd0d7 !important;
}

.el-select-dropdown {
    z-index: 9999 !important;
}
</style>
