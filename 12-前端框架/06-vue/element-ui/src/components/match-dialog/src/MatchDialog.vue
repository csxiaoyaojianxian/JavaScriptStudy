<template>
    <div class="pop" id="dialogEditItem">
        <div class="pop-panel">
            <el-form :model="Match" label-width="100px" label-position="left">
                <el-form-item label="赛事名称：">
                    <el-input v-model="Match.sName" size="large"></el-input>
                </el-form-item>
                <el-form-item label="是否有图表：" label-width="120px" style="text-align:left">
                    <el-radio class="radio" v-model="Match.hasGraph" label="1">无</el-radio>
                    <el-radio class="radio" v-model="Match.hasGraph" label="2">有</el-radio>
                </el-form-item>
                <el-form-item label="比赛时间：">
                    <el-col :span="11">
                        <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" popper-class="date-picker" placeholder="选择日期" v-model="Match.stTime" style="width: 100%;" size="large" @change="pickSt"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" popper-class="date-picker" placeholder="选择时间" v-model="Match.etTime" style="width: 100%;" size="large" @change="pickEt"></el-date-picker>
                    </el-col>
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
    name: 'MatchDialog',
    props: ["cid", 'isEdit'],
    data() {
        return {
            Match: {
                id: '',
                pid: '',
                sName: '',
                stTime: '',
                etTime: '',
                hasGraph: 1
            },
        }
    },
    watch: {
        'cid': function () {
            if (this.isEdit) {
                this.loadCMatch()
            } else {
                this.Match.id = '';
                this.Match.pid = this.$route.query.pid;
                this.Match.sName = '';
                this.Match.stTime = '';
                this.Match.etTime = '';
                this.Match.hasGraph = 1;
            }
        }
    },
    methods: {
        pickSt: function (text) {
            this.Match.stTime = text;
        },
        pickEt: function (text) {
            this.Match.etTime = text;
        },
        loadCMatch: function () {
            this.$http.jsonp('https://apps.game.qq.com/cf/a20161220ms/cmatch.php?action=get_by_id', {
                params: {
                    id: this.cid
                }
            }).then(response => {
                let ret = response.data;
                if (ret.status == 0) {
                    this.Match = ret.data;
                    console.log(this.Match)
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
                this.$http.jsonp('https://apps.game.qq.com/cf/a20161220ms/cmatch.php?action=edit_cmatch', {
                    params: this.Match
                }).then(response => {
                    let ret = response.data;
                    if (ret.status == 0) {
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        });
                        this.$event.$emit('cMatchEdit');
                        this.$dialog.CloseDialog();
                    } else {
                        this.$message.error(ret.msg);
                    }

                }, error => {
                    this.$message.error('系统繁忙，请稍候再试！');
                })
            } else {
                this.Match.pid = this.$route.query.pid;
                this.$http.jsonp('https://apps.game.qq.com/cf/a20161220ms/cmatch.php?action=add_cmatch', {
                    params: this.Match
                }).then(response => {
                    let ret = response.data;
                    if (ret.status == 0) {
                        this.$message({
                            message: '新增成功',
                            type: 'success'
                        });
                        this.$event.$emit('cMatchEdit');
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
