import {getList, remove, save,changeIsOnSale} from '@/api/shop/goods'
import {getApiUrl} from '@/utils/utils'

export default {
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined
      },
      total: 0,
      list: null,
      listLoading: true,
      selRow: {},
      apiUrl: getApiUrl()
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
      })
    },
    search() {
      this.fetchData()
    },
    reset() {
      this.listQuery.name = ''
      this.fetchData()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleClose() {

    },
    fetchNext() {
      this.listQuery.page = this.listQuery.page + 1
      this.fetchData()
    },
    fetchPrev() {
      this.listQuery.page = this.listQuery.page - 1
      this.fetchData()
    },
    fetchPage(page) {
      this.listQuery.page = page
      this.fetchData()
    },
    changeSize(limit) {
      this.listQuery.limit = limit
      this.fetchData()
    },
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.selRow = currentRow
    },
    checkSel() {
      if (this.selRow && this.selRow.id) {
        return true
      }
      this.$message({
        message: this.$t('common.mustSelectOne'),
        type: 'warning'
      })
      return false
    },
    add() {
      this.$router.push('goodsEdit')
    },
    edit() {
      if (this.checkSel()) {
        this.$router.push({path:'goodsEdit',query:{id:this.selRow.id}})
      }
    },
    changeIsOnSale(sel){
      console.log('id',sel.id)
      console.log('isOnSale',sel.isOnSale)
      changeIsOnSale(sel.id,sel.isOnSale).then( response =>{
        this.$message({
          message: this.$t('common.optionSuccess'),
          type: 'success'
        })
      })

    }

  }
}
