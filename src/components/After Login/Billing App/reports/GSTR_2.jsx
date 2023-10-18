import React, { useState } from 'react'
import Company_name from '../Company_name/Company_name'
import Slidebar from '../Slidebar/Slidebar'
import { Box, Flex, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Button, Input, InputRightAddon, InputGroup, Select, Text } from '@chakra-ui/react'
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import GSTR2_b2b from "./GstR2_Reports/GSTR2_b2b";
import GSTR2_b2bur from "./GstR2_Reports/GSTR2_b2bur";
import GSTR2_cdnr from "./GstR2_Reports/GSTR2_cdnr";
import GSTR2_cdnur from "./GstR2_Reports/GSTR2_cdnur";
import GSTR2_exemp from "./GstR2_Reports/GSTR2_exemp";
import GSTR2_hsnsum from "./GstR2_Reports/GSTR2_hsnsum";
import GSTR2_impg from "./GstR2_Reports/GSTR2_impg";
import GSTR2_imps from "./GstR2_Reports/GSTR2_imps";
import GSTR2_itcr from "./GstR2_Reports/GSTR2_itcr";
import GSTR2_at from "./GstR2_Reports/GSTR2_at";

const Company = {
  name: "Company Name"
}
const tableData = [
  {
    gstIn_UIN_No: '1',
    receiverName: 'aa',
    invoiceDate: '20-08-2023',
    invoiceValue: 20,
    placeOfSupply: 'SAMSDDSN',
    reverseCharge: '10%',
    taxRate: '20%',
    invoiceType: 'XYZ',
    eCommerceGSTIN: 'SAMSDDSN',
    rate: 10,
    taxableValue: 100,
    cessAmount: 1020
  },
  {
    gstIn_UIN_No: '1',
    receiverName: 'aa',
    invoiceDate: '20-08-2023',
    invoiceValue: 20,
    placeOfSupply: 'SAMSDDSN',
    reverseCharge: '10%',
    taxRate: '20%',
    invoiceType: 'XYZ',
    eCommerceGSTIN: 'SAMSDDSN',
    rate: 10,
    taxableValue: 100,
    cessAmount: 1020
  },
  {
    gstIn_UIN_No: '1',
    receiverName: 'aa',
    invoiceDate: '20-08-2023',
    invoiceValue: 20,
    placeOfSupply: 'SAMSDDSN',
    reverseCharge: '10%',
    taxRate: '20%',
    invoiceType: 'XYZ',
    eCommerceGSTIN: 'SAMSDDSN',
    rate: 10,
    taxableValue: 100,
    cessAmount: 1020
  },

]

const GSTR_2 = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchData, setSearchData] = useState(tableData);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setSearchData(tableData.filter((data) =>
      data.name.toLowerCase().includes(searchQuery.toLowerCase())
    ))
  }

  const handleRowClick = (reportNo) => {
    navigate('/individual-report')
  }

  const [currentScreen, setCurrentScreen] = useState(null);

  const handleOpenScreen = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <>

      <Box Flex='1' padding='15px'
      >
        {/* <Heading size='md' mt='2'>GSTR2 Reports</Heading> */}
        <Flex alignItems='right' position='absolute' right="230" top="140">
          <Button fontSize={"10px"} bg={"blue.400"} marginLeft="10px">Print</Button>
          <Button fontSize={"10px"} bg={"blue.400"} marginLeft="10px">Excel</Button>
        </Flex>
        <Box p={4}>
          <Button onClick={() => handleOpenScreen("screen1")} mb={2} mr={2}>
            GSTR2 B2B
          </Button>
          <Button onClick={() => handleOpenScreen("screen2")} mb={2} mr={2}>
            GSTR2 B2BUR
          </Button>
          <Button onClick={() => handleOpenScreen("screen3")} mb={2} mr={2}>
            GSTR2 IMPS
          </Button>
          <Button onClick={() => handleOpenScreen("screen4")} mb={2} mr={2}>
            GSTR2 IMPG
          </Button>
          <Button onClick={() => handleOpenScreen("screen5")} mb={2} mr={2}>
            GSTR2 CDNR
          </Button>
          <Button onClick={() => handleOpenScreen("screen6")} mb={2} mr={2}>
            GSTR2 CDNUR
          </Button>
          <Button onClick={() => handleOpenScreen("screen7")} mb={2} mr={2}>
            GSTR2 AT
          </Button>
          <Button onClick={() => handleOpenScreen("screen8")} mb={2} mr={2}>
            GSTR2 EXEMP
          </Button>
          <Button onClick={() => handleOpenScreen("screen9")} mb={2} mr={2}>
            GSTR2 ITCR
          </Button>
          <Button onClick={() => handleOpenScreen("screen10")} mb={2} mr={2}>
            GSTR2 HSNSUM
          </Button>
          {currentScreen === null && <GSTR2_b2b />}
          {currentScreen === "screen1" && <GSTR2_b2b />}
          {currentScreen === "screen2" && <GSTR2_b2bur />}
          {currentScreen === "screen3" && <GSTR2_imps />}
          {currentScreen === "screen4" && <GSTR2_impg />}
          {currentScreen === "screen5" && <GSTR2_cdnr />}
          {currentScreen === "screen6" && <GSTR2_cdnur />}
          {currentScreen === "screen7" && <GSTR2_at />}
          {currentScreen === "screen8" && <GSTR2_exemp />}
          {currentScreen === "screen9" && <GSTR2_itcr />}
          {currentScreen === "screen10" && <GSTR2_hsnsum />}
        </Box>
        {/* <Flex justifyContent='space-between' alignItems='center'
          margin='30px'
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <Flex>
            <Input type='date' size='sm' mr='2' />
            <Text size='lg' mr='2'>to</Text>
            <Input type='date' size='sm' mr='4' />
          </Flex>
          <InputGroup mt='-2'>
            <Input
              placeholder="search..."
              value={searchQuery}
              onChange={handleSearch}
              size='sm'
              width='60%'

            />
            <InputRightAddon size='sm' outline='none' height='32px' mr='-10'>
              <SearchIcon color='black' />
            </InputRightAddon>
          </InputGroup>
        </Flex>
        <TableContainer m='2' margin='15px'
          border='0.1px solid lightgray'
          boxShadow='rgba(149, 157, 165, 0.2) 0px 8px 24px'
          width="1000px"
        >
          <Table>
            <Thead>
              <Tr>

                <Th style={{ border: '1px solid gray' }}>GSTIN/UIN of Recipient</Th>
                <Th style={{ border: '1px solid gray' }}>Invoice date</Th>
                <Th style={{ border: '1px solid gray' }}>Invoice Value</Th>
                <Th style={{ border: '1px solid gray' }}>Place Of Supply</Th>
                <Th style={{ border: '1px solid gray' }}>Reverse Charge</Th>
                <Th style={{ border: '1px solid gray' }}>Invoice Type</Th>
                <Th style={{ border: '1px solid gray' }}>Rate</Th>
                <Th style={{ border: '1px solid gray' }}>Taxable Value</Th>
                <Th style={{ border: '1px solid gray' }}>Integrated Tax Paid</Th>
                <Th style={{ border: '1px solid gray' }}>Central Tax Paid</Th>
                <Th style={{ border: '1px solid gray' }}>State/UT Tax Paid</Th>
                <Th style={{ border: '1px solid gray' }}>Cess Tax Paid</Th>
                <Th style={{ border: '1px solid gray' }}>Eligibility For ITC</Th>
                <Th style={{ border: '1px solid gray' }}>Availed ITC Integrated Tax</Th>
                <Th style={{ border: '1px solid gray' }}>Availed ITC Central Tax</Th>
                <Th style={{ border: '1px solid gray' }}>Availed ITC State/UT Tax</Th>
                <Th style={{ border: '1px solid gray' }}>Availed ITC State/UT Tax</Th>


              </Tr>
            </Thead>
            <Tbody>
              {tableData?.map((data) => (
                <Tr onClick={() => handleRowClick(data.reportNo)} style={{ cursor: 'pointer' }}
                >
                  <Td style={{ border: '1px solid gray' }}>{data.gstIn_UIN_No}</Td>
                  <Td style={{ border: '1px solid gray' }}>{data.receiverName}</Td>
                  <Td style={{ border: '1px solid gray' }}>{data.invoiceDate}</Td>
                  <Td style={{ border: '1px solid gray' }}>{data.invoiceValue} </Td>
                  <Td style={{ border: '1px solid gray' }}>{data.placeOfSupply}</Td>
                  <Td style={{ border: '1px solid gray' }}>{data.reverseCharge}</Td>
                  <Td style={{ border: '1px solid gray' }}>{data.taxRate}</Td>
                  <Td style={{ border: '1px solid gray' }}>{data.invoiceType}</Td>
                  <Td style={{ border: '1px solid gray' }}>{data.eCommerceGSTIN}</Td>
                  <Td style={{ border: '1px solid gray' }}>{data.rate}</Td>
                  <Td style={{ border: '1px solid gray' }}>{data.taxableValue}</Td>
                  <Td style={{ border: '1px solid gray' }}>{data.cessAmount}</Td>
                  <Td style={{ border: '1px solid gray' }}>{data.invoiceType}</Td>
                  <Td style={{ border: '1px solid gray' }}>{data.invoiceType}</Td>
                  <Td style={{ border: '1px solid gray' }}>{data.invoiceType}</Td>
                  <Td style={{ border: '1px solid gray' }}>{data.invoiceType}</Td>
                  <Td style={{ border: '1px solid gray' }}>{data.invoiceType}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer> */}
      </Box>
    </>
  )
}

export default GSTR_2