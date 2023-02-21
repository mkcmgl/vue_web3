<template>
    <div>
        <div class="contactInfo">
            <el-button type="primary" @click="toHome">首页</el-button>
            <el-descriptions class="margin-top" title="区块信息"  :column="1"  border>
                <el-descriptions-item label="区块号"> {{ blockData.number }}</el-descriptions-item>
                <el-descriptions-item label="区块hash">{{ blockData.hash }}</el-descriptions-item>
                <el-descriptions-item label="父区块hash" >{{blockData.parentHash}}</el-descriptions-item>
                <el-descriptions-item label="工作量证明哈希值">
                   {{ blockData.nonce }}
                </el-descriptions-item>
                <el-descriptions-item label="trie根hash">{{blockData.transactionsRoot}}</el-descriptions-item>
      <el-descriptions-item label="miner">{{ blockData.miner }}</el-descriptions-item>
       <el-descriptions-item label="难度">{{ blockData.difficulty }}</el-descriptions-item>
        <!-- <el-descriptions-item label="补充数据字段">{{ blockData.extraData }}</el-descriptions-item> -->
         <el-descriptions-item label="字节数大小">{{ blockData.size }}</el-descriptions-item>
          <el-descriptions-item label="最大gas消耗">{{ blockData.gasLimit }}</el-descriptions-item>
           <el-descriptions-item label="gas消耗总量">{{ blockData.gasUsed }}</el-descriptions-item>
            <el-descriptions-item label="时间戳">{{ blockData.timestamp }}</el-descriptions-item>
            </el-descriptions>
        </div>

</div>
</template>

<script>














const Web3 = require('web3')
const web3 = new Web3('http://10.221.19.216:22000');
export default {
    name: 'Web3Index',

    data() {
        return {
            number: '',
            blockData: {}
        };
    },
    created() {
        if (this.$route.query) {
            this.number = this.$route.query.data
            this.blockList(this.number)
        }
    },
    mounted() {

    },

    methods: {
        blockList(val) {
            web3.eth.getBlock(val)
                .then(res => {
                    this.blockData = res
                });
        },
        toHome() { 
            this.$router.push({
                path: '/home',
                query: ''
            })
        }
    },
};
</script>

<style lang="scss" scoped></style>