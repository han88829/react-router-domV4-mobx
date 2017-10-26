// 无法动态匹配面包屑，存储路由数据
const RouteData = [
    {
        name: "销售",
        path: "/nest/app/sales",
        key: "1",
        parentKey: "sub1",
        data: [
            { name: "销售", path: "/nest/app/sales" }
        ]
    },
    {
        name: "订单管理",
        path: "/nest/app/sales/order",
        key: "1",
        parentKey: "sub1",
        data: [
            { name: "销售", path: "/nest/app/sales" },
            { name: "订单管理", path: "/nest/app/sales/order" },
        ]
    },
    {
        name: "新建订单",
        path: "/nest/app/sales/ordernew",
        key: "1",
        parentKey: "sub1",
        data: [
            { name: "销售", path: "/nest/app/sales" },
            { name: "订单管理", path: "/nest/app/sales/order" },
            { name: "新建订单", path: "/nest/app/sales/ordernew" },
        ]
    },
    {
        name: "客户管理",
        path: "/nest/app/sales/client",
        key: "2",
        parentKey: "sub1",
        data: [
            { name: "销售", path: "/nest/app/sales" },
            { name: "客户管理", path: "/nest/app/sales/client" },
        ]
    },
    {
        name: "客户详情",
        path: "/nest/app/sales/clientdetail",
        key: "2",
        parentKey: "sub1",
        data: [
            { name: "销售", path: "/nest/app/sales" },
            { name: "客户管理", path: "/nest/app/sales/client" },
            { name: "客户详情", path: "/nest/app/sales/clientdetail" },
        ]
    },
    {
        name: "样品申请管理",
        path: "/nest/app/sales/sample",
        key: "3",
        parentKey: "sub1",
        data: [
            { name: "销售", path: "/nest/app/sales" },
            { name: "样品申请管理", path: "/nest/app/sales/sample" },
        ]
    },
    {
        name: "采购",
        path: "/nest/app/purchase",
        key: "4",
        parentKey: "sub2",
        data: [
            { name: "采购", path: "/nest/app/purchase" }
        ]
    },
    {
        name: "供应商管理",
        path: "/nest/app/purchase/supplier",
        key: "4",
        parentKey: "sub2",
        data: [
            { name: "采购", path: "/nest/app/purchase" },
            { name: "供应商管理", path: "/nest/app/purchase/supplier" }
        ]
    },
    {
        name: "首页",
        path: "/nest",
        key: "0",
        parentKey: "0",
        data: [
            { name: "首页", path: "/nest" }
        ]
    },
    {
        name: "库存查询",
        path: "/nest/app/product/stock",
        key: "6",
        parentKey: "sub3",
        data: [
            { name: "库存查询", path: "/nest/app/product/stock" }
        ]
    },
    {
        name: "SKU管理",
        path: "/nest/app/product/manage",
        key: "7",
        parentKey: "sub3",
        data: [
            { name: "SKU管理", path: "/nest/app/product/manage" }
        ]
    },
    {
        name: "警戒提醒",
        path: "/nest/app/product/alert",
        key: "8",
        parentKey: "sub3",
        data: [
            { name: "警戒提醒", path: "/nest/app/product/alert" }
        ]
    },
]

export default RouteData;