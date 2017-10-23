// 无法动态匹配面包屑，存储路由数据
const RouteData = [
    {
        name: "销售",
        data: [
            { name: "销售", path: "/home/app/sales" }
        ]
    },
    {
        name: "订单管理",
        data: [
            { name: "销售", path: "/home/app/sales" },
            { name: "订单管理", path: "/home/app/sales/order" },
        ]
    },
    {
        name: "客户管理",
        data: [
            { name: "销售", path: "/home/app/sales" },
            { name: "客户管理", path: "/home/app/sales/client" },
        ]
    },
    {
        name: "样品申请管理",
        data: [
            { name: "销售", path: "/home/app/sales" },
            { name: "样品申请管理", path: "/home/app/sales/sample" },
        ]
    },
    {
        name: "采购",
        data: [
            { name: "采购", path: "/home/app/sales" }
        ]
    },
    {
        name: "首页",
        data: [
            { name: "首页", path: "/home" }
        ]
    },
]

export default RouteData;