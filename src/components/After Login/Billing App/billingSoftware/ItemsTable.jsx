import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';

const ItemsTable = () => {
  // Dummy data for demonstration
  const items = [
    {
      id: 1,
      name: 'Item 1',
      category: 'Category A',
      quantity: 2,
      price: 100,
      gst: 5,
      hsnCode: 'HSN456',
      totalPrice: 200,
    },
    {
      id: 2,
      name: 'Item 2',
      category: 'Category B',
      quantity: 3,
      price: 50,
      gst: 3,
      hsnCode: 'HSN012',
      totalPrice: 150,
    },
    // Add more items as needed
  ];

  return (
    <TableContainer bg='white'
      margin= '15px'
      border= '0.1px solid lightgray'
      boxShadow= 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
    >
      <Table variant="simple">
        <Thead>
        <Tr>
          <Th style={{ border: '1px solid lightgray' }}>Item ID</Th>
          <Th style={{ border: '1px solid lightgray' }}>Item Name</Th>
          <Th style={{ border: '1px solid lightgray' }}>Category</Th>
          <Th style={{ border: '1px solid lightgray' }}>Quantity</Th>
          <Th style={{ border: '1px solid lightgray' }}>Item Price</Th>
          <Th style={{ border: '1px solid lightgray' }}>GST</Th>
          <Th style={{ border: '1px solid lightgray' }}>HSN/SSN Code</Th>
          <Th style={{ border: '1px solid lightgray' }}>Total Price</Th>
        </Tr>
        </Thead>
        <Tbody>
        {items.map(item => (
          <Tr key={item.id} height='50px'>
            <Td style={{ border: '1px solid lightgray' }}>{item.id}</Td>
            <Td style={{ border: '1px solid lightgray' }}>{item.name}</Td>
            <Td style={{ border: '1px solid lightgray' }}>{item.category}</Td>
            <Td style={{ border: '1px solid lightgray' }}>{item.quantity}</Td>
            <Td style={{ border: '1px solid lightgray' }}>{item.price}</Td>
            <Td style={{ border: '1px solid lightgray' }}>{item.gst}%</Td>
            <Td style={{ border: '1px solid lightgray' }}>{item.hsnCode}</Td>
            <Td style={{ border: '1px solid lightgray' }}>{item.totalPrice}</Td>
          </Tr>
        ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ItemsTable;
