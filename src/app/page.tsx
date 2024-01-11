import React from 'react';
import { Avatar, Button, Card, Flex, Layout, Space } from 'antd';
import { AlignLeftOutlined, DownloadOutlined, FilterOutlined, MessageFilled, StarFilled } from '@ant-design/icons';
import { Content, Header } from 'antd/es/layout/layout'; // TODO: Extract from 'antd'
import BarChart from './components/BarChart';
import DonutChart from './components/DonutChart';
import styles from './page.module.css';

// TODO: move styles to css file
const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyItems: 'flex-start',
  textAlign: 'center',
  color: 'var(--primary-color)',
  fontWeight: 'bold',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#dcdcdc',
};

const Home = () => (
  <Layout className={styles.main}>
    <Header style={headerStyle}>
      <div>MSD Test Assignment</div>
    </Header>
    <Content style={{ padding: '0 48px' }}>
      <Flex justify='space-between' align='center'>
        <div>Statistics</div>
        <Flex gap='middle' style={{ margin: '16px 0' }}>
          <Button>
            <span>Export to PDF</span>
            <DownloadOutlined style={{ color: 'var(--primary-color)' }} />
          </Button>
          <Button>
            <span>Notes</span>
            <span style={{ color: 'var(--grey-color)' }}>(3)</span>
            <AlignLeftOutlined style={{ color: 'var(--primary-color)' }} />
          </Button>
          <Button>
            <span>Filter</span>
            <FilterOutlined style={{ color: 'var(--primary-color)' }} />
          </Button>
        </Flex>
      </Flex>
      <Flex gap='middle'>
        <Card
          style={{ width: '50%' }}
          // extra={<StarFilled />}  TODO: add favourite func
          title='Bar Chart'
          actions={[
            <Flex justify='space-between'>
              <Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel' />,
              <MessageFilled />
            </Flex>,
          ]}>
          <BarChart />
        </Card>
        <Card
          style={{ width: '50%' }}
          title='Donut Chart'
          actions={[
            <Flex justify='space-between'>
              <Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel' />,
              <MessageFilled />
            </Flex>,
          ]}>
          <DonutChart />
        </Card>
      </Flex>
      <Space />
    </Content>
  </Layout>
);

export default Home;