// 无法动态匹配面包屑，存储路由数据
const RouteData = [
    {
        name: "个人",
        path: "/home/app/user",
        key: "1",
        parentKey: "sub1",
        data: [
            { name: "个人", path: "/home/app/user" }
        ]
    },
    {
        name: "新建",
        path: "/home/app/newuser",
        key: "1",
        parentKey: "sub1",
        data: [
            { name: "个人", path: "/home/app/user" },
            { name: "新建", path: "/home/app/newuser" },
        ]
    },
    {
        name: "个人管理",
        path: "/home/app/useredit",
        key: "2",
        parentKey: "sub1",
        data: [
            { name: "个人", path: "/home/app/user" },
            { name: "个人管理", path: "/home/app/useredit" },
        ]
    },
    {
        name: "其他",
        path: "/home/app/else",
        key: "3",
        parentKey: "sub1",
        data: [
            { name: "个人", path: "/home/app/user" },
            { name: "其他", path: "/home/app/else" },
        ]
    },
    {
        name: "部门",
        path: "/home/app/group",
        key: "4",
        parentKey: "sub2",
        data: [
            { name: "部门", path: "/home/app/group" },
        ]
    },
    {
        name: "三级联动",
        path: "/home/app/area",
        key: "5",
        parentKey: "sub2",
        data: [
            { name: "部门", path: "/home/app/group" },
            { name: "三级联动", path: "/home/app/area" },
        ]
    },
    {
        name: "首页",
        path: "/home",
        key: "0",
        parentKey: "0",
        data: [
            { name: "首页", path: "/home" }
        ]
    },
]

export default RouteData;