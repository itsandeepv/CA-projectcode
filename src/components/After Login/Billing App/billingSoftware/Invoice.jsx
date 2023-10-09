import React from 'react';
import { Box, Heading, Input, Flex, Text, Select } from '@chakra-ui/react';

const Invoice = ({ formData , setFormData}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <Box p="2">
      <Heading size="md" mb="4">
        INVOICE
      </Heading>
      <Flex mb="2">
        <Text flex="0 0 120px">Invoice No:</Text>
        <Input name="invoiceNo" flex="1" ml="2" size="sm" onChange={handleInputChange} />
      </Flex>
      <Flex mb="2">
        <Text flex="0 0 120px">Date:</Text>
        <Input name="invoiceDate" type="date" flex="1" ml="2" size="sm" />
      </Flex>
      <Flex mb="2">
        <Text flex="0 0 120px">Payment Mode:</Text>
        <Select name="paymentMode" placeholder="Mode" size="sm" flex="1" onChange={handleInputChange} />
      </Flex>
      {/* <Flex mb="2">
        <Text flex="0 0 120px">Tax:</Text>
        <Input flex="1" size="sm" />
      </Flex> */}
      <Flex mb="2">
        <Text flex="0 0 120px">GST Number:</Text>
        <Input name="gstNo" flex="1" size="sm" onChange={handleInputChange} />
      </Flex>
      <Flex mb="2">
        <Text flex="0 0 120px">Due Date:</Text>
        <Input  name="dueDate" type="date" flex="1" ml="2" size="sm" onChange={handleInputChange} />
      </Flex>
    </Box>
  );
};

export default Invoice;