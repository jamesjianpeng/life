const FACTOR = '0.4'
const SPECS = '规格'
const NUMS = '数量'
const PRICE = '价格'
const NUMS_ALL = '总数'
const TOTAL_ALL = '总额'
/**
 * @description 计算板子总数
 * @param {*} specs 规格
 * @param {*} numbs 数量
 * @param {*} factor 因子
 */
const getTotal = (specs, nums, factor) => {
  return specs * nums * factor
}
/**
 * @description 柯里化函数
 * @param {*} factor
 */
const _computeTotal = (factor) => {
    return (specs, nums) => {
        return getTotal(specs, nums, factor)
    }
}

const computeTotal = _computeTotal(FACTOR)

const calculate = (list, options) => {
    list.map((item) => {
        const numsAll = computeTotal(item[SPECS], item[NUMS])
        item[NUMS_ALL] = Number(numsAll.toFixed(2))
        item[TOTAL_ALL] = Math.floor(item[NUMS_ALL] * options[PRICE])
        item[PRICE] = options[PRICE]
        return item
    })
    let total = 0
    console.table(list, [SPECS, NUMS, NUMS_ALL, PRICE, TOTAL_ALL])
    list.map((item) => {
        total += item[TOTAL_ALL]
    })
    console.log('合计：', total)

}
// 业务数据注入 start
const list = [
    { [SPECS]: 3.6, [NUMS]: 19 },
    { [SPECS]: 2.75, [NUMS]: 4 },
    { [SPECS]: 3.85, [NUMS]: 12 },
    { [SPECS]: 1.77, [NUMS]: 4 },
    { [SPECS]: 4.7, [NUMS]: 14 }
]
const options = {
    [PRICE]: 29
}
calculate(list, options)
// 业务数据注入 end
