<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools :is-root="true" :tree-node="company" @addDepts="addDepts"/>
        <el-tree :data="departs" :default-expand-all="true" :props="defaultProps">
          <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
          <tree-tools slot-scope="{ data }" :tree-node="data" @addDepts="addDepts" @delDepts="getDepartments"
                      @editDepts="editDepts"
          />
        </el-tree>
      </el-card>
    </div>
    <add-dept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments"/>
  </div>
</template>

<script>
import TreeTools from '@/views/departments/components/tree-tools'
import AddDept from '@/views/departments/components/add-dept'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'

export default {
  components: { TreeTools, AddDept },
  data() {
    return {
      company: {},
      departs: [],
      defaultProps: {
        label: 'name'
      },
      showDialog: false,
      node: {}
    }
  },
  created() {
    this.getDepartments() // 调用自身的方法
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      this.company = { id: '', name: result.companyName, manager: '负责人' }
      this.departs = tranListToTreeData(result.depts, '') // 需要将其转化成树形结构
    },
    addDepts(node) {
      this.showDialog = true // 显示弹层
      this.node = node
    },
    editDepts(node) {
      this.showDialog = true
      this.node = node
      this.$refs.addDept.getDepartDetail(node.id) // 父组件调用子组件的方法
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
