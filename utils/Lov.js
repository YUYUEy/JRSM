/**
 * 数据字典类
 * 定义了ASP模块所有的数据字典key以及获取数据字典值的方法
 */
import http from '@/portal/utils/http'

class Lov {
  constructor() {
    // 数据字典KEY
    this.keys = {
      // 公共key
      status: 'MDM_ASP_STATUS',
      approvalStatus: 'MDM_ASP_APPROVE_STATUS',
      branchType: 'MDM_ASP_HQ_BRANCH',

      // 公司相关
      companyType: 'MDM_ASP_COMPANY_TYPE',
      entityType: 'MDM_ASP_ENTITY_TYPE',

      // 网点相关
      type: 'MDM_ASP_TYPE',
      transactionType: 'MDM_ASP_SP_TRANSACTION_TYPE',
      publishWebsite: 'MDM_ASP_PUBLISH_WEBSITE',

      // 地址相关
      addressUsage: 'MDM_ASP_ADDRESS_USAGE',

      // 联系人相关
      contactType: 'MDM_ASP_CONTACT_TYPE',
      phoneCountryCode: 'COM_PHONE_COUNTRY_CODE',

      // 金融相关
      bankAccountType: 'MDM_ASP_BANK_ACCOUNT_TYPE',
      paymentMode: 'MDM_ASP_COLLECT_PAYMENT_MODE',

      // 服务类型相关
      serviceBrand: 'MDM_ASP_SERVICE_BRAND',
      productLine: 'MDM_ASP_PRODUCT_LINE',
      serviceType: 'MDM_ASP_SERVICE_TYPE',

      // 员工相关
      role: 'MDM_ASP_ROLE'

    }
    // 数据字典值
    this.values = {
      // 共用值
      status: [],
      approvalStatus: [],
      currency: [],
      country: [],
      branchType: [],

      // 公司相关
      companyType: [],
      entityType: [],

      // 网点相关
      type: [],
      transactionType: [],
      publishWebsite: [],

      // 地址相关
      addressUsage: [],

      // 联系人相关
      contactType: [],
      phoneCountryCode: [],

      // 金融相关
      bankAccountType: [],
      paymentMode: [],

      // 服务类型相关
      serviceBrand: [],
      productLine: [],
      serviceType: [],

      // 员工相关
      roleType: []
    }
  }
}
const lov = new Lov()

export default {
  /**
   *
   * @param keys
   * @param _this
   * @returns {Promise<{}>}
   */
  async getLov(keys, _this) {
    const obj = {}
    const result = {}
    await keys.forEach(k => {
      if (lov.values[k]) {
        obj[k] = lov.keys[k]
      } else {
        result[k] = lov.values[k]
      }
    })

    const objKeys = Object.keys(obj)
    const objVal = Object.values(obj).join(',')
    await _this.$getLovValues(objVal).then(res => {
      objKeys.forEach(k => {
        lov.values[k] = res[lov.keys[k]]
        result[k] = lov.values[k]
      })
    })
    return result
  },
  async getTerritories() {
    if (lov.values.country) {
      await http({
        url: '/isc-admin/territory/query',
        method: 'POST'
      }).then(res => {
        lov.values.country = res
      })
    }
    return lov.values.country
  },
  async getCurrency() {
    if (lov.values.currency) {
      await http({
        url: '/isc-admin/currency/query',
        method: 'POST',
        data: { enabled: 'Y' }
      }).then(res => {
        lov.values.currency = res
      })
    }
    return lov.values.currency
  }
}
