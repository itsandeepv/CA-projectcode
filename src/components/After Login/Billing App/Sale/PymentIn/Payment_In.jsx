import React, { useState } from "react";
import {
  Box, Button, Flex, HStack, Image, Input, Select, Text, VStack, Wrap, Heading, List,
  ListItem,
  ListIcon,
  OrderedList,

  UnorderedList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  AspecTratio,
  useDisclosure,
  Table,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Thead,


} from '@chakra-ui/react'
import { Link } from "react-router-dom";
import Slidebar from '../../Slidebar/Slidebar';
import { deleteRequest, getRequest, postRequest } from "../../../../helpers/Services";
import { userDetails } from "../../../../../Redux/config/Commen";
import { toast } from "react-toastify";
import { useEffect } from "react";


const PaymentIn = () => {

  const SelectOptions = ["This Month", "This Quarter", "This Year"];


  const [selectedOption, setSelectedOption] = useState(SelectOptions[0]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const handlePrintButtonClick = () => {
    // Handle printing logic here
  };

  const handleExportToExcelButtonClick = () => {
    // Handle export to Excel logic here
  };

  ////



  const initialData = [{
    date: '2022-05-01',
    ref_no: '001',
    party_name: 'ABC Company',
    category_name: 'Furniture',
    type: 'Sale',
    total: 5000,
    recived: 2000,
    balance: 3000,
  }, { date: '2022-05-02', ref_no: '002', party_name: 'XYZ Company', category_name: 'ElecTronics', type: 'Purchase', total: 10000, recived: 5000, balance: 5000, },];


  const [data, seTdata] = useState(initialData);
  const fetchData = async () => {
    const res = await getRequest("/addPayment/payment", userDetails?.token)
    if (res.status == 200) {
      // console.log(res , "<<<");
      seTdata(res?.data?.paymentAll)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const [newRowData, setNewRowData] = useState({
    date: '2022-05-01',
    ref_no: '001',
    party_name: 'ABC Company',
    category_name: 'Furniture',
    type: 'Sale',
    total: 5000,
    recived: 2000,
    balance: 3000,
  });


  const handleChange = (event, index, field) => {
    const newData = [...data];
    newData[index][field] = event.target.value;
    seTdata(newData);

    const { name, value } = event.target;
    setNewRowData({ ...newRowData, [name]: value });

    console.log(newRowData, "<<<<");

  };

  const totalAmount = data.reduce((total, sale) => {
    return total + sale.total;
  }, 0);
  const handleDelete = async (index ,id) => {
    const res = await deleteRequest(`/addPayment/payment/${id}`,userDetails?.token)
    if(res?.status == 200){
      toast.success("Item delated success")
      const newData = [...data];
      newData.splice(index, 1);
      seTdata(newData);
    }

  };



  const handlePrint = (data) => {

  }
  const [searchTerm, setSearchTerm] = useState('');

  const handleChanges = (e) => {
    setSearchTerm(e.target.value);
  };



  const handleAddRow = async () => {
    const newRow = { id: data.lengTh + 1, date: '', ref_no: '', party_name: '', category_name: '', type: '', total: 0, recived: 0, balance: 0 };
    seTdata([...data, newRow]);
    const res = await postRequest("/addPayment/payment", newRowData, userDetails?.token)
    if (res.status == 200) {
      toast.success(res.data?.message)
    } else {
      toast.error("Internal server error !")
    }
    // console.log(res, "<<<<");

  };


  return (

    <>


      <Flex w="100%" >
        <Slidebar />
        <Box w="80%" m={"auto"} marginTop={"20px"}>
          <Heading> Payments </Heading>
          <HStack justifyContent={"space-between"} padding={"50px"} boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px">
            <HStack gap={"20px"} flexDirection={{ base: "column", md: "row", lg: "row" }}>
              <div>
                <Select fontSize="20px" id="select-option" value={selectedOption} onChange={handleOptionChange}>
                  {SelectOptions.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </div>
              <HStack flexDirection={{ base: "column", md: "row", lg: "row" }}>
                <Text bg={"gray.300"} h={"100%"} m={"auto"}>Between</Text>
                <div>
                  <label htmlFor="from-date">From:</label>
                  <input type="date" id="from-date" value={fromDate} onChange={handleFromDateChange} />
                </div>
                <div>
                  <label htmlFor="to-date">To:</label>
                  <input type="date" id="to-date" value={toDate} onChange={handleToDateChange} />
                </div>
              </HStack>
              <HStack>
                <Button onClick={handlePrintButtonClick}>
                  Print
                </Button>
                <Button onClick={handleExportToExcelButtonClick}>
                  Export to Excel
                </Button>
              </HStack>
            </HStack>

          </HStack>
          {/* table */}
          <Box margin={"10px"}>
            <Input type="text" placeholder="Search" onChange={handleChanges} mt='4' />
            <TableContainer width={{ base: "100%", md: "100%", lg: "100%", }} mt='4'>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Party Name</Th>
                    <Th>Category Name</Th>
                    <Th>Type</Th>
                    <Th>Date</Th>
                    <Th>Ref No.</Th>
                    <Th>recived</Th>
                    <Th>Balance</Th>
                    <Th>Total</Th>
                    <Th>Print</Th>
                    <Th>Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((item, index) => (
                    <Tr key={index}>
                      <Td>
                        <input
                          style={{ width: '100px' }}
                          type="text"
                          value={item.party_name}
                          name="party_name"
                          onChange={(event) => handleChange(event, index, 'party_name')}
                        />
                      </Td>
                      <Td>
                        <input
                          style={{ width: '100px' }}
                          type="text"
                          name="category_name"
                          value={item.category_name}
                          onChange={(event) => handleChange(event, index, 'category_name')}
                        />
                      </Td>
                      <Td>
                        <select
                          value={item.type}
                          name="type"
                          onChange={(event) => handleChange(event, index, 'type')}
                        >
                          <option value="Sale">Select</option>
                          <option value="Sale">Sale</option>
                          <option value="Purchase">Purchase</option>
                        </select>
                      </Td>
                      <Td>
                        <input
                          style={{ width: '110px' }}
                          type="date"
                          name="date"
                          value={item.date}
                          onChange={(event) => handleChange(event, index, 'date')}
                        />
                      </Td>
                      <Td>
                        <input
                          style={{ width: '80px' }}
                          type="number"
                          name="ref_no"
                          value={item.ref_no}
                          onChange={(event) => handleChange(event, index, 'ref_no')}
                        />
                      </Td>
                      <Td>
                        <input
                          style={{ width: '80px' }}
                          type="number"
                          name="recived"

                          value={item.recived}
                          onChange={(e) => handleChange(e, index, "recived")}
                        />
                      </Td>
                      <Td>
                        <input
                          style={{ width: '80px' }}
                          type="number"
                          name="balance"
                          value={item.balance}
                          onChange={(e) => handleChange(e, index, "balance")}
                        />
                      </Td>
                      <Td isNumber={true}>
                        <input
                          style={{ width: '80px' }}
                          type="number"
                          name="total"
                          value={item.total}
                          onChange={(e) => handleChange(e, index, "total")}
                        />
                      </Td>
                      <Td>
                        <Button fontSize={"10px"} bg={"blue.400"} onClick={() => handlePrint(item)}>Print</Button>
                      </Td>
                      <Td>
                        <Button fontSize={"10px"} bg={"red.500"} onClick={() => handleDelete(item , item?._id)}>Delete</Button>
                      </Td>


                    </Tr>))}
                  <Tr>
                    <Td >
                      <Button onClick={handleAddRow}>Add Row</Button>
                    </Td>

                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <Box>
              <p>Total Estimate Amount: ₹{totalAmount}</p>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export default PaymentIn





