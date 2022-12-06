import React from 'react'
import {
    Flex,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
    Text,
    Box,
    FormLabel,
    Button,
    Icon
  } from "@chakra-ui/react";
  // Custom components
  import Card from "components/card/Card.js";
import { Select } from 'chakra-react-select';
import { useEffect } from 'react';
import { onValue } from 'firebase/database';
import { ref } from 'firebase/database';
import { db } from 'utils/firebase';
import { useState } from 'react';
import { RangeDatepicker } from 'chakra-dayzed-datepicker';
import { MdChevronRight } from 'react-icons/md';
  // Custom icons



  
export default function FilterBar({setDates, setPrices, ...props}) {

    const { startContent, endContent, name, growth, value } = props;
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "secondaryGray.600";
    const [currencies, setCurrencies] = useState([])
    const [selectedFromCurrency, setSelectedFromCurrency] = useState("USD")
    const [selectedToCurrency, setSelectedToCurrency] = useState("USD")
    const [selectedDates, setSelectedDates] = useState([new Date(), new Date()])
    // const [dates, setDates] = useState([])
    // const [prices, setPrices] = useState([])

    const fetchData = () => {
        const from = selectedDates[0].getTime();
        const to = selectedDates[1].getTime()
        const fromC = "USD"
        const toC = selectedToCurrency
        onValue(ref(db, "(" + toC + ")"), snapshot => {
            console.log(snapshot.val())
            const filteredDs = []
            const filteredPs = []
            const snap = snapshot.val()
            for(let val in snap) {
                let d = parseInt(val)
                if(d >= from && d <= to) {
                    filteredDs.push(new Date(d))
                    filteredPs.push(parseInt(snap[val].price))
                }

            }
            setDates(filteredDs)
            setPrices(filteredPs)
            console.log(filteredDs)
            console.log(filteredPs)
        })

    }

    const fetchCurrencies = () => {
        onValue(ref(db, "currencies"), snapshot => {
            console.log(snapshot.val())
            let data = snapshot.val().map((val, idx) => {
                return {
                    label: val.slice(1, -1),
                    value: val.slice(1, -1)
                }
            })
            setCurrencies(data)
        })
    }

    useEffect(() => {
        
        fetchCurrencies()
    }, [])
  return (
    <Card py='15px'>
      <Flex
      justifyContent="space-between"
        >
            <Box w="100%" m="2px">
            <FormLabel
                    ms="4px"
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    display="flex"
                    style={{
                        cursor: "pointer"
                    }}
                >
                    From Currency: 
                </FormLabel>
        <Select
    tagVariant="solid"
    size='lg'
    defaultInputValue='USD'
    options={currencies}
    onChange={(newVal) => {
        setSelectedFromCurrency(newVal.value)
      }}
  />
  </Box>
  <Box w="100%" m="2px" >
  <FormLabel
                    ms="4px"
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    display="flex"
                    style={{
                        cursor: "pointer"
                    }}
                >
                    To Currency: 
                </FormLabel>
        <Select
    tagVariant="solid"
    size='lg'
    options={currencies}
    onChange={newVal => {
        setSelectedToCurrency(newVal.value)
    }}
  />

  
  </Box>

  <Box w="100%" ml="10px" m="4px" style={{justifyContent: "center", alignItems:"center"}}>
  <FormLabel
                    ms="4px"
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    display="flex"
                    style={{
                        cursor: "pointer"
                    }}
                >
                    Date Range:
                </FormLabel>

  <RangeDatepicker
    selectedDates={selectedDates}
    onDateChange={setSelectedDates}
    
  />

  
  </Box>
  <Box display="flex" ml="10px" mt="20px" alignItems="center" justifyContent="center">
    <Button onClick={fetchData}><Icon as={MdChevronRight} w='24px' h='24px' mt='4px' /></Button>
  </Box>
      </Flex>
    </Card>
  )
}
