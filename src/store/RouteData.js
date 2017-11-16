// 无法动态匹配面包屑，存储路由数据
const RouteData = [
    {
        name: "常用集合",
        path: "/mobx/app/user",
        key: "1",
        parentKey: "sub1",
        data: [
            { name: "常用集合", path: "/mobx/app/user" }
        ]
    },
    {
        name: "新建",
        path: "/mobx/app/newuser",
        key: "1",
        parentKey: "sub1",
        data: [
            { name: "常用集合", path: "/mobx/app/user" },
            { name: "新建", path: "/mobx/app/newuser" },
        ]
    },
    {
        name: "个人管理",
        path: "/mobx/app/useredit",
        key: "2",
        parentKey: "sub1",
        data: [
            { name: "常用集合", path: "/mobx/app/user" },
            { name: "个人管理", path: "/mobx/app/useredit" },
        ]
    },
    {
        name: "table",
        path: "/mobx/app/table",
        key: "7",
        parentKey: "sub1",
        data: [
            { name: "常用集合", path: "/mobx/app/user" },
            { name: "其他", path: "/mobx/app/table" },
        ]
    },
    {
        name: "其他",
        path: "/mobx/app/else",
        key: "3",
        parentKey: "sub1",
        data: [
            { name: "常用集合", path: "/mobx/app/user" },
            { name: "其他", path: "/mobx/app/else" },
        ]
    },
    {
        name: "第三方",
        path: "/mobx/app/group",
        key: "4",
        parentKey: "sub2",
        data: [
            { name: "第三方", path: "/mobx/app/group" },
        ]
    },
    {
        name: "RTSP",
        path: "/mobx/app/rtsp",
        key: "4",
        parentKey: "sub2",
        data: [
            { name: "第三方", path: "/mobx/app/group" },
            { name: "RTSP", path: "/mobx/app/rtsp" },
        ]
    },
    {
        name: "三级联动",
        path: "/mobx/app/area",
        key: "5",
        parentKey: "sub2",
        data: [
            { name: "第三方", path: "/mobx/app/group" },
            { name: "三级联动", path: "/mobx/app/area" },
        ]
    },
    {
        name: "首页",
        path: "/mobx",
        key: "0",
        parentKey: "0",
        data: [
            { name: "首页", path: "/mobx" }
        ]
    },
    {
        name: "测试",
        path: "/mobx/app/test",
        key: "6",
        parentKey: "",
        data: [
            { name: "首页", path: "/mobx" },
            { name: "测试", path: "/mobx/app/test" }
        ]
    },
]

export default RouteData;