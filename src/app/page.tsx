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


export default async function Home() {

  const dateToFetch = '2022-01-11';

  async function getChartData() {
    const jsonStructure = JSON.stringify({ date: "date", newCases: "newCasesByPublishDate", areaName: "areaName", femaleCases: "femaleCases" });
    const apiUrl = `https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;date=${dateToFetch}&structure=${jsonStructure}`;
    console.log(apiUrl);
    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return res.json()
  }

  const chartData = await getChartData()

  return (
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
            // extra={<StarFilled />}  TODO: add favourite func
            style={{ width: '50%' }}
            title='Bar Chart'
            actions={[
              <Flex justify='space-between'>
                <Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel' />,
                <MessageFilled />
              </Flex>,
            ]}>
            <BarChart data={chartData.data} />
          </Card>
          <Card
            style={{ width: '50%' }}
            title={`Cases by country - ${dateToFetch}`}
            actions={[
              <Flex justify='space-between'>
                <Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel' />,
                <MessageFilled />
              </Flex>,
            ]}>
            <DonutChart data={chartData.data} />
          </Card>
        </Flex>
        <Space />
      </Content>
    </Layout>
  )
};
