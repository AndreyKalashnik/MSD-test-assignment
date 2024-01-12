import React from 'react';
import { Avatar, Button, Card, Flex, Layout, Space } from 'antd';
import { AlignLeftOutlined, DownloadOutlined, FilterOutlined, MessageFilled, StarFilled } from '@ant-design/icons';
import { Content, Header } from 'antd/es/layout/layout'; // TODO: Extract from 'antd'
import BarChart from './components/BarChart';
import DonutChart from './components/DonutChart';

export default async function Home() {
  const dateToFetch = '2022-01-11';

  async function getChartData() {
    const jsonStructure = JSON.stringify({
      date: 'date',
      newCases: 'newCasesByPublishDate',
      areaName: 'areaName',
      newPeopleVaccinatedFirstDoseByPublishDate: 'newPeopleVaccinatedFirstDoseByPublishDate',
      newPeopleVaccinatedSecondDoseByPublishDate: 'newPeopleVaccinatedSecondDoseByPublishDate'
    });

    const apiUrl = `https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;date=${dateToFetch}&structure=${jsonStructure}`;

    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  }

  const chartData = await getChartData()

  return (
    <Layout>
      <Header className='brandedHeader'>
        <div>MSD Test Assignment</div>
      </Header>
      <Content className='brandedContent'>
        <Flex justify='space-between' align='center'>
          <div>Dashboard</div>
          <Flex gap='middle' style={{ margin: '1em 0' }}>
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
              <span className='filterIcon'>9</span>
              <FilterOutlined style={{ color: 'var(--primary-color)' }} />
            </Button>
          </Flex>
        </Flex>
        <Flex gap='middle'>
          <Card
            // extra={<StarFilled />}  TODO: add favourite func
            style={{ width: '50%' }}
            title={`Vaccination Status - ${dateToFetch}`}
            actions={[
              <Flex key='list-avatar-and-message-icons' justify='space-between' className='sectionFooter'>
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
              <Flex key='list-avatar-and-message-icons' justify='space-between' style={{ padding: '0 2em' }}>
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
