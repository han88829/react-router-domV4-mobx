import React, { Component } from 'react';
import { Table, Icon, Row, Col } from 'antd';
import './table.css';

class TableLsit extends Component {
    render() {
        const data = [
            {
                sku: 1,
                name: 1,
                type: 1,
                fee: 1,
                children: [{ x1: 1, x2: 2, x3: 3 }, { x1: 1, x2: 2, x3: 3 }],
            },
            {
                sku: 1,
                name: 1,
                type: 1,
                fee: 1,
                children: [{ x1: 1, x2: 2, x3: 3 }],
            }, {
                sku: 1,
                name: 1,
                type: 1,
                fee: 1,
                children: [{ x1: 1, x2: 2, x3: 3 }, { x1: 1, x2: 2, x3: 3 }, { x1: 1, x2: 2, x3: 3 }, { x1: 1, x2: 2, x3: 3 }, { x1: 1, x2: 2, x3: 3 }, { x1: 1, x2: 2, x3: 3 }],
            }
        ]
        return (
            <div className="table">
                <Row className="tableTitle" type="flex" align="middle" >
                    <Col span={3}>SKU</Col>
                    <Col span={3}> 商品名称</Col>
                    <Col span={3}> 分类</Col>
                    <Col span={3} style={{ borderRight: "1px solid #dcdcdc", height: 35, lineHeight: "35px" }}> 金额</Col>
                    <Col span={3} > 包含单品</Col>
                    <Col span={3}>规格 </Col>
                    <Col span={3} >单品库存 </Col>
                    <Col span={3} style={{ borderLeft: "1px solid #dcdcdc", height: 35, lineHeight: "35px" }}>操作 </Col>
                </Row>
                <Row >
                    {data.map((x, i) => {
                        let height = x.children.length > 0 ? x.children.length * 35 : 35;
                        return (
                            <Row className="tableContent" type="flex" align="middle" key={i} >
                                <Col span={3} style={{ height: height, lineHeight: `${height}px` }}>SKU</Col>
                                <Col span={3} style={{ height: height, lineHeight: `${height}px` }}> 商品名称</Col>
                                <Col span={3} style={{ height: height, lineHeight: `${height}px` }}> 分类</Col>
                                <Col span={3} style={{ borderRight: "1px solid #dcdcdc", height: height, lineHeight: `${height}px` }}> 金额</Col>
                                <Col span={9} >
                                    {x.children.map((a, j) => {
                                        return (
                                            <Row type="flex" align="middle" key={j} style={{ height: 35, borderTop: j != 0 ? "1px solid #dcdcdc" : "" }}>
                                                <Col span={8}>1</Col>
                                                <Col span={8}>2</Col>
                                                <Col span={8}>3</Col>
                                            </Row>
                                        )
                                    })}
                                </Col>
                                <Col span={3} style={{ borderLeft: "1px solid #dcdcdc", height: height, lineHeight: `${height}px` }}>操作 </Col>
                            </Row>
                        )
                    })}
                </Row>

            </div >
        );
    }
}

export default TableLsit;