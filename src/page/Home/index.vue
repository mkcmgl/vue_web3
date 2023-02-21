<template>
  <div class="hello">
    <h3>搜索记录</h3>
    <el-row class="searchCondition1">
      <el-form label-position="right" label-width="120px" :model="queryParams" :rules="formRules" ref="form">
        <el-row>
          <el-col :span="12" :offset="1">
            <el-form-item label="区块号/区块哈希" prop="number">
              <el-input placeholder="请输入区块号/区块哈希" v-model="queryParams.number"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
          </el-col>
          <el-col :span="5" class="btnWarp">
            <el-button type="primary" icon="el-icon-search" @click="search" size="small">搜索</el-button>
            <el-button plain icon="el-icon-refresh-left" @click="reset" size="small">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <!-- <el-button type="primary">获取</el-button> -->

    <el-row class="tableBg1">
          <el-table stripe :data="blockData" v-loading="loading" v-if="!isSearch" style="width: 100%">
        <el-table-column prop="number" label="区块号" width="180">
        </el-table-column>
        <el-table-column prop="hash" label="Hash">
        </el-table-column>
        <el-table-column prop="miner" label="miner">
        </el-table-column>
        <el-table-column prop="gasUsed" label="gasUsed">
        </el-table-column>
        <el-table-column prop="timestamp" label="times">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span class="toOther" @click="goDetail(scope.row)">详情</span>
          </template>
        </el-table-column>
      </el-table>
 
        <el-table stripe :data="tableList" v-else  v-loading="loading" style="width: 100%">
        <el-table-column prop="number" label="区块号" width="180">
        </el-table-column>
        <el-table-column prop="hash" label="Hash">
        </el-table-column>
        <el-table-column prop="miner" label="miner">
        </el-table-column>
        <el-table-column prop="gasUsed" label="gasUsed">
        </el-table-column>
        <el-table-column prop="timestamp" label="times">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span class="toOther" @click="goDetail(scope.row)">详情</span>
          </template>
        </el-table-column>
      </el-table>
         </el-row>
</div>
</template>

<script>









const temp = {
  number:'',


}
const Web3 = require('web3')
const web3 = new Web3('http://10.221.19.216:22000');
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      account: '',
      blockData: [],
        tableList: [],
      isSearch: false,
      queryParams: Object.assign({}, temp),
      formRules: {
        number: [{
          max: 100,
          message: "长度最大100位",
          trigger: "blur",
        }
        ],
        hash: [{
          max: 100,
          message: "长度最大100位",
          trigger: "blur",
        }]
      },
      loading:false,
    }
  },
    created() {
    this.getweb3()
  },
  methods: {
    getweb3() {

        console.log(`output->this.$web3`,this.$web3)
      //返回节点所控制的账户列表。
      web3.eth.getAccounts().then(res => {
        console.log(res);
        this.account = res[0];
        console.log(`output->web3.eth.getAccounts()`, this.account)
      });
      //返回当前区块号
      web3.eth.getBlockNumber().then(console.log);
      //返回地址在指定区块的余额。
      console.log(`output->this.account`, this.account)
      web3.eth.getBalance('0x4A2980EDF26655177E8025A91355F4E2C6af8C27').then(console.log)
      //返回与区块号或区块哈希匹配的区块。
      web3.eth.getBlock(3150)
        .then(res => {
          console.log(res)
          this.blockData.push(res)
        });

    },
     search() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.getList()
        }
      })
    },
    blockList(val) { 
      web3.eth.getBlock(val)
        .then(res => {
         
          this.blockData.push(res)
            this.tableList[0] = res
          console.log(`output->this.tableList`,this.tableList)
          this.isSearch = true
        });
    },
      //获取数据
    getList() {
      this.loading = true;
        
      console.log(`output->this.queryParams`,this.queryParams)
        this.blockList(this.queryParams.number)
      
        this.loading = false
          
          
         
     
    },
    goDetail(item) { 
      this.$router.push({
        path: '/detail',
        query: {
          data:item.number
        }
      })
    },
      reset() { 
             this.$refs.form.clearValidate()
            this.queryParams = Object.assign({}, temp)
    this.isSearch = false

      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.btnWarp {
  display: flex;
  justify-content: right;
  padding-right: 30px;
}

.searchCondition {
  width: 100%;
  // height: 175px;
  // background: #ffffff;
}

.searchCondition1 {
  width: 100%;
  height: 110px;
  background: #ffffff;
  padding-top: 40px;
}

.tableBg {
  margin-top: 195px;
  width: 100%;
  min-height: 60vh;
  background: #ffffff;
}

.tableBg1 {
  margin-top: 20px;
  width: 100%;
  min-height: 60vh;
  background: #ffffff;
}

.pagination {
  height: 40px;
  background: #ffffff;
}

.detailContent {
  font-size: 15px;
}

.formTitle {
  height: 20px;
  font-size: 14px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 20px;
}

.formContent {
  height: 20px;
  font-size: 14px;
  font-family: PingFang SC-Bold, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 20px;
}

.resultContent {
  width: 95%;
  height: 180px;
  background: #FFFFFF;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  margin: 10px auto;
  padding: 15px 0 0 25px;
}

.resultContent1 {
  width: 95%;
  height: 100px;
  background: #FFFFFF;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  margin: 10px auto;
  padding: 15px 0 0 25px;
}

.templateDetailTable {
  width: 95%;
  min-height: 180px;
  background: #FFFFFF;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  margin: 10px auto;
  padding: 15px 15px 5px 25px;
}

.resgitAddBg {
  width: 95%;
  min-height: 60vh;
  background: #FFFFFF;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  margin: 10px auto;
  padding: 15px 0 0 25px;
}

.contentTitle {
  height: 22px;
  font-size: 16px;
  font-family: PingFang SC-Heavy, PingFang SC;
  font-weight: 800;
  color: #333333;
  line-height: 22px;
  margin: 0 0;
}

.lastRouter {
  cursor: pointer;
}

.currentRouter {
  margin-left: 10px;
  font-weight: normal;
  color: #666666;
}

.title {
  height: 30px;
  font-size: 22px;
  font-family: PingFang SC-Bold, PingFang SC;
  font-weight: bold;
  color: #333333;
  line-height: 0px;
  text-align: left;
  margin-top: 20px;
}

.emptyWord {
  font-size: 18px;
  font-family: PingFang SC-常规体, PingFang SC;
  font-weight: normal;
  color: #333333;
}

p {
  margin: 0 0;
}

h3 {
  margin: 0 0;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.resultWarp {
  width: 95%;
  height: 250px;
  background: #FFFFFF;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  margin: 50px auto 20px;
  overflow: hidden;

  .authResultImg {
    width: 80px;
    height: 80px;
    display: block;
    margin: 46px auto 21px;

  }

  .authResultText1 {
    font-size: 24px;
    font-family: PingFang SC-常规体, PingFang SC;
    font-weight: normal;
    color: rgb(72, 140, 233);
    line-height: 24px;
    text-align: center;
    margin: 0 0;
  }

  .authResultText2 {
    margin-top: 20px;
    height: 20px;
    font-size: 14px;
    font-family: PingFang SC-常规体, PingFang SC;
    font-weight: normal;
    color: rgb(72, 140, 233);
    ;
    line-height: 20px;
    margin: 7px auto 0;
    text-align: center;
    cursor: pointer;
  }
}

.contentTitle {
  height: 22px;
  font-size: 16px;
  font-family: PingFang SC-Heavy, PingFang SC;
  font-weight: 800;
  color: #333333;
  line-height: 22px;
  margin: 0 0;
}

.toOther {
  cursor: pointer;
  color: #2F88FF;
}

.toOther:hover {
  color: #559EFF;
}</style>

