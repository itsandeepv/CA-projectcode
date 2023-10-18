import { Box, Text, Flex, Link, Table, Thead, Tbody, Tr, Th, Td, Icon, TableContainer, TableCaption, Heading, Divider, Select, Input, Textarea, Button } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import Company_name from '../../Company_name/Company_name';
import Slidebar from '../../Slidebar/Slidebar';
import { useDispatch, useSelector } from 'react-redux';
import {
  postPurchaseOutAction
} from "../../../../../Redux/Purchaseout/purchaseout.action";

const AddPaymentOut = () => {
  const [rows, setRows] = useState([{ id: 1 }]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { firmId } = useSelector((store) => store.FirmRegistration);
  const dispatch = useDispatch();
  const Company = {
    name: "Company Name",
  };

  const initialFormData = {
    partyName: '',
    receiptNo: '',
    phoneNo: '',
    billNo: '',
    date: '',
    totalAmount: '',
    paidAmount: '',
    firmId: firmId,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 const submitInput = async() =>{
   await dispatch(postPurchaseOutAction(formData,token,firmId));
   setFormData(initialFormData);
 }
  return (
    <>
      <Company_name company_name={Company.name} />
      <Flex>
        <Slidebar />
        <Box bg="white" py="4" px="6" minH="80vh" flex="1" boxShadow="md">
          {/* top box */}
          <Flex margin='15px' justifyContent='space-between'
            p='4'
            boxShadow='rgba(149, 157, 165, 0.2) 0px 8px 24px'
          >
            <Heading size='md' color='gray.500'> Add Payment Out</Heading>
            <Flex>
              <Select
                rightIcon={<ChevronDownIcon />}
                placeholder='Reciept No.'
                size='sm'
                name="billNo"
                onChange={handleInputChange}
                value={formData.billNo}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </Select>
              <Input
                ml='4'
                type='date'
                placeholder='Select date'
                size='sm'
                name="date"
                value={formData.date} 
                onChange={handleInputChange}
              />
            </Flex>
          </Flex>

          {/* Mid */}
          <Box margin='15px' mt='4' p='4'
            boxShadow='rgba(149, 157, 165, 0.2) 0px 8px 24px'
          >
            <Flex justifyContent='space-between' mt='1'>
              <Flex justifyContent='center' width='40%'>
                <Text mr='4' textAlign='left' mt='1' fontWeight='semibold'> Party Name : </Text>
                <Input placeholder='Enter Party Name' size='sm' width='60%' name="partyName" value={formData.partyName} onChange={handleInputChange}/>
              </Flex>
              <Flex justifyContent='center' width='40%'>
                <Text mr='4' textAlign='left' mt='1' fontWeight='semibold'> Phone No : </Text>
                <Input placeholder='Enter Contact Number' size='sm'
                  type='number' width='60%' name="phoneNo" onChange={handleInputChange} value={formData.phoneNo}
                />
              </Flex>
            </Flex>
            <Flex justifyContent='space-between' mt='1'>
              <Flex justifyContent='center' width='40%'>
                <Text mr='4' textAlign='left' mt='1' fontWeight='semibold'> Paid Amount(₹) : </Text>
                <Input size='sm' width='40%' type='number' name="paidAmount" onChange={handleInputChange} value={formData.paidNumber}/>
              </Flex>
              <Flex justifyContent='center' width='40%'>
                <Text mr='4' textAlign='left' mt='1' fontWeight='semibold'> Total Amount(₹) : </Text>
                <Input size='sm'
                  type='number' width='40%' name="totalAmount" onChange={handleInputChange} value={formData.totalAmount}
                />
              </Flex>
            </Flex>
          </Box>
          {/* Buttons */}
          <Flex margin='30px'>
            <Button mr='4' size='md'>Save & New</Button>
            <Button mr='4' size='md' onClick={submitInput}>Save</Button>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}

export default AddPaymentOut;
