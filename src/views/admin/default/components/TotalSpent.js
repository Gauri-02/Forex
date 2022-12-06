// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import LineChart from "components/charts/LineChart";
import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import { useEffect } from 'react';
import { useState } from 'react';
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "variables/charts";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";

export default function TotalSpent({prices, dates, ...props}) {
  const { ...rest } = props;
  const [priceData, setPriceData] = useState(lineChartDataTotalSpent([]))
  const [dateData, setDateData] = useState(lineChartOptionsTotalSpent([]))

  const [state, setState] = useState({
    selection: "one_year"
  })
  useEffect(() => {
    console.log("HIII: ",prices)
    setPriceData(lineChartDataTotalSpent(prices))
  }, [prices])

  useEffect(() => {
    console.log(dates)
    setDateData(lineChartOptionsTotalSpent(dates))
  }, [dates])

  useEffect(() => {
    console.log(priceData)
  }, [priceData])

  useEffect(() => {
    console.log(dateData)
  }, [dateData])

  const updateData = (timeline) => {
    setState({
      selection: timeline
    })
  
    switch (timeline) {
      case 'one_month':
        ApexCharts.exec(
          'area-datetime',
          'zoomX',
          new Date('28 Jan 2013').getTime(),
          new Date('27 Feb 2013').getTime()
        )
        ApexCharts.exec("")
        break
      case 'six_months':
        ApexCharts.exec(
          'area-datetime',
          'zoomX',
          new Date('27 Sep 2012').getTime(),
          new Date('27 Feb 2013').getTime()
        )
        break
      case 'one_year':
        ApexCharts.exec(
          'area-datetime',
          'zoomX',
          new Date('27 Feb 2012').getTime(),
          new Date('27 Feb 2013').getTime()
        )
        break
      case 'ytd':
        ApexCharts.exec(
          'area-datetime',
          'zoomX',
          new Date('01 Jan 2013').getTime(),
          new Date('27 Feb 2013').getTime()
        )
        break
      case 'all':
        ApexCharts.exec(
          'area-datetime',
          'zoomX',
          new Date('23 Jan 2012').getTime(),
          new Date('27 Feb 2013').getTime()
        )
        break
      default:
    }
  }

  const opts = {
    options: {
      chart: {
        id: 'area-datetime',
        type: 'area',
        height: 350,
        zoom: {
          autoScaleYaxis: true
        }
      },
      // grid: {
      //   row: {
      //     colors: ['#FFFF']
      //   },
      //   column: {
      //     colors: ['#FFFF']
      //   }
      // },
      noData: {
        text: "No Data"
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
        style: 'hollow',
      },
      xaxis: {
        type: 'datetime',
        // min: new Date('01 Mar 1999').getTime(),
        tickAmount: 6,
        labels: {
          style: {
            color: "#FFFFFF"
          }
        }
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy'
        }
      },
      // colors: ["#ffffff"],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        }
      },
    },
  
  
    selection: 'one_year',
  
  };


  // Chakra Color Mode

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  return (
    <Card
      justifyContent='center'
      align='center'
      direction='column'
      w='100%'
      mb='0px'
      {...rest}>
      <Flex w='100%' flexDirection={{ base: "column", lg: "row" }}>
        
        <Box minH='260px' minW='100%' mt='auto'>
          {prices.length > 0 && (
            <ReactApexChart options={opts.options} series={[{data: prices}]} type="area" height={350} />
          )}
          {prices.length == 0 && (
            <ReactApexChart options={opts.options} series={[{data: []}]} type="area" height={350} />
          )}
        </Box>
      </Flex>
    </Card>
  );
}
