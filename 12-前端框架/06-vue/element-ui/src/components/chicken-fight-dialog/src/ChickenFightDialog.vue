<template>
    <div class="pop" id="dialogEditFight">
        <div class="pop-panel">
            <el-form :model="Fight" label-width="100px" label-position="left">
                <el-form-item label="赛事名称：">
                    <el-input v-model="Fight.sName" size="large"></el-input>
                </el-form-item>
                <el-form-item label="比赛时间：">
                    <el-col :span="11">
                        <el-date-picker type="datetime" popper-class="date-picker" placeholder="选择日期"  value-format="yyyy-MM-dd HH:mm:ss"  v-model="Fight.stTime" style="width: 100%;" size="large" @change="pickSt"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="选择规则" label-width="120px" style="text-align:left">
                    <el-radio class="radio" v-model="Fight.sRule" label="1">单排</el-radio>
                    <el-radio class="radio" v-model="Fight.sRule" label="2">双排</el-radio>
                    <el-radio class="radio" v-model="Fight.sRule" label="3">四排</el-radio>
                </el-form-item>
                <el-form-item label-width="80">
                    <a class="btn-gray" @click="saveOrUpdate()">保存</a>
                    <a class="btn-normal" href="javascript:closeDialog();">关闭</a>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChickenFightDialog',
    props: ["cid", 'isEdit', 'pid'],
    data() {
        return {
            Fight: {
                id: '',
                pid: '',
                cid: '',
                sName: '',
                stTime: '',
                sRule: '',
            },
        }
    },
    watch: {
        'cid': function () {
            if (this.isEdit) {
                this.loadFight()
            } else {
                this.Fight.id = '';
                this.Fight.pid = '';
                this.Fight.sName = '';
                this.Fight.stTime = '';
                this.Fight.sRule = '';
            }
        }
    },
    methods: {
        pickSt: function (text) {
            this.Fight.stTime = text;
        },
        loadFight: function () {
            this.$http.jsonp('https://apps.game.qq.com/cf/a20161220ms/chickenfight.php?action=get_by_id', {
                params: {
                    id: this.cid
                }
            }).then(response => {
                let ret = response.data;
                if (ret.status == 0) {
                    this.Fight = ret.data;
                    console.log(this.Fight)
                } else {
                    this.$message.error(ret.msg);
                }

            }, error => {
                this.$message.error('系统繁忙，请稍候再试！');
            })
        },
        /**
         * 新增或者是编辑
         */
        saveOrUpdate: function () {
            if (this.isEdit) {
                this.$http.jsonp('https://apps.game.qq.com/cf/a20161220ms/chickenfight.php?action=edit_fight', {
                    params: this.Fight
                }).then(response => {
                    let ret = response.data;
                    if (ret.status == 0) {
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        });
                        this.$event.$emit('chickenFightEdit');
                        this.$dialog.CloseDialog();
                    } else {
                        this.$message.error(ret.msg);
                    }

                }, error => {
                    this.$message.error('系统繁忙，请稍候再试！');
                })
            } else {
                this.Fight.pid = this.pid;
                this.Fight.cid = this.cid;
                this.$http.jsonp('https://apps.game.qq.com/cf/a20161220ms/chickenfight.php?action=add_fight', {
                    params: this.Fight
                }).then(response => {
                    let ret = response.data;
                    if (ret.status == 0) {
                        this.$message({
                            message: '新增成功',
                            type: 'success'
                        });
                        this.$event.$emit('chickenFightEdit');
                        this.$dialog.CloseDialog();
                    } else {
                        this.$message.error(ret.msg);
                    }

                }, error => {
                    this.$message.error('系统繁忙，请稍候再试！');
                })
            }
        }
    },
}
</script>

<style>
.el-picker-panel {
    z-index: 9999 !important;
}
</style>
