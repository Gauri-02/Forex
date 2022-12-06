/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import FilterBar from './components/FilterBar';
import { useState } from 'react';
import { useEffect } from 'react';

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const highColor = useColorModeValue("brand.500", "green");
  const lowColor = useColorModeValue("brand.500", "red");


  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const [dates, setDates] = useState([])
  const [prices, setPrices] = useState([])

  const [aggregates, setAggregates] = useState({
    highest: 0,
    lowest: 0,
    avg: 0
  })

  useEffect(() => {
    console.log("In here: ", prices)
    if(prices.length > 0) {
      let max = 0, min = 99999
    let sum = 0
    for(let i = 0; i < prices.length; i++) {
      sum += parseFloat(prices[i][1])
      if(parseFloat(prices[i][1]) < min) {
        console.log("MIN: ", prices[i][1])
        min = prices[i][1]
      }
      if(parseFloat(prices[i][1]) > max) {
        console.log("MAX: ", prices[i][1])
        max = prices[i][1]
      }
    }
    console.log("SUM: ", sum)
    setAggregates({
      highest: max,
      lowest: min,
      avg: (sum/prices.length).toFixed(2)
    })
    }
  }, [prices])

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <FilterBar setDates={setDates} setPrices={setPrices} />
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'
        mt="20px">
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdBarChart} color={highColor} />
              }
            />
          }
          name='Highest'
          value={aggregates.highest > 0 ? aggregates.highest : "No Target Set"}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdBarChart} color={lowColor} />
              }
            />
          }
          name='Lowest'
          value={aggregates.lowest < 99999 ? aggregates.lowest : "No Target Set"}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name='Avg'
          value={aggregates.avg > 0 ? aggregates.avg : "No Target Set"}
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
        <TotalSpent prices={prices} dates={dates} />
        {/* <WeeklyRevenue /> */}
      </SimpleGrid>
      {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid> */}
      {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <Tasks />
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid>
      </SimpleGrid> */}
    </Box>
  );
}
