import React, { Component } from 'react';
import { Row, Col } from 'antd';

class Rtsp extends Component {
    render() {
        return (
            <Row>
                <Col span={12}>
                    <object type='application/x-vlc-plugin' pluginspage="http://www.videolan.org/" id='vlc' events='false' width="720" height="410">
                        <param name='mrl' value='rtsp://admin:12345@192.168.10.235:554/h264/ch1/main/av_stream' />
                        <param name='volume' value='50' />
                        <param name='autoplay' value='true' />
                        <param name='loop' value='false' />
                        <param name='fullscreen' value='false' />
                        <param name='controls' value='false' />
                    </object>
                </Col>
                <Col span={12}>
                    <pre style={{ textAlign: "left" }}>
                        &lt;object type='application/x-vlc-plugin' pluginspage=&quot;http://www.videolan.org/&quot; id='vlc' events='false' width=&quot;720&quot; height=&quot;410&quot;&gt;<br />
                        &lt;param name='mrl' value='rtsp://admin:12345@192.168.10.235:554/h264/ch1/main/av_stream' /&gt;<br />
                        &lt;param name='volume' value='50' /&gt;<br />
                        &lt;param name='autoplay' value='true' /&gt;<br />
                        &lt;param name='loop' value='false' /&gt;<br />
                        &lt;param name='fullscreen' value='false' /&gt;<br />
                        &lt;param name='controls' value='false' /&gt;<br />
                        &lt;/object&gt;
                    </pre>
                </Col>
            </Row>
        );
    }
}

export default Rtsp;