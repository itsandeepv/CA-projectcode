import React, { useState } from 'react';
import {
    Box, Button, Flex, HStack, Image, Input, Select, Text, VStack, Wrap, Heading, List,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Option,


} from '@chakra-ui/react'
import { Link } from "react-router-dom";
import Slidebar from '../../Slidebar/Slidebar';
import { deleteRequest, getRequest, postRequest } from '../../../../helpers/Services';
import { userDetails } from '../../../../../Redux/config/Commen';
import { toast } from 'react-toastify';
import { useEffect } from 'react';


const Oreder_Sale = () => {
    const clientsData = [
        { id: 1, name: "John Doe", phone: "123-456-7890" },
        { id: 2, name: "ane Doe", phone: "234-567-8901" },
        { id: 3, name: "Bob Smith", phone: "345-678-9012" },
        { id: 4, name: "ohn Doe", phone: "663-456-7890" },
        { id: 5, name: "Jane Doe", phone: "534-567-8901" },
        { id: 6, name: "ob Smith", phone: "945-678-9012" },
    ];

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedClient, setSelectedClient] = useState(null);
    const [referenceNumber, setReferenceNumber] = useState("");
    const [OrderDate, setOrderDate] = useState("");
    const [DueDate, setDueDate] = useState("");

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleClientSelect = (client) => {
        setSelectedClient(client);
    };

    const handleCalculatorClick = () => {
        // handle calculator button click
        window.open("calc.exe");
    };

    const filteredClients = clientsData.filter(
        (client) =>
            client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.phone.includes(searchQuery)
    );


    ////
    const [tableData, setTableData] = useState([
        { id: 1, item: 'Item 1', quantity: 1, per_unit_price: 10, tax: 10, amount: 11 },
    ]);

    const [newRowData, setNewRowData] = useState({
        id: userDetails?.userid,
        item: '',
        quantity: 0,
        per_unit_price: 0,
        tax: 0,
        amount: 0,
    });

    const handleTableInputChange = (event, index, key) => {
        const newData = [...tableData];
        newData[index][key] = event.target.value;
        setTableData(newData);
        setNewRowData({ ...newRowData, [key]: event.target.value });
    };

    const handleAddRow = () => {
        const newId = Math.max(...tableData.map((data) => data.id)) + 1;
        setTableData([...tableData, { ...newRowData, id: newId }]);
    };

    const handleDeleteRow = async (index, id) => {
        const res = await deleteRequest(`/addSaleOrder/saleOrder/${id}`, userDetails?.token)
        if (res?.status == 200) {
            toast.success("Item delated success")
            const newData = [...tableData];
            newData.splice(index, 1);
            setTableData(newData);
        } else {
            toast.error("Error occured")
        }
    };

    const handleSaveTableData = async () => {
        console.log(tableData);
        const res = await postRequest("/addSaleOrder/saleOrder", newRowData, userDetails?.token)
        // console.log(res, "<<<");
        if (res.status == 200) {
            toast.success(res.data?.message)
        } else {
            toast.error("Internal server error !")
        }
        // Perform save logic here
    };

    const calculateAmount = (quantity, per_unit_price, tax) => {
        const amount = quantity * per_unit_price;
        const taxAmount = (tax / 100) * amount;
        return amount + taxAmount;
    };
    const calop = () => {
        window.href = ("%WINDOWS%\system32\calc.exe");
    }
    const calculateTotalOreder_SaleAmount = () => {
        const Oreder_SaleAmounts = tableData.map((row) => {
            const amount = row.quantity * row.per_unit_price;
            const taxAmount = (row.tax / 100) * amount;
            return amount + taxAmount;
        });
        const totalOreder_SaleAmount = Oreder_SaleAmounts.reduce((total, amount) => total + amount, 0);
        return totalOreder_SaleAmount;
    };



    const fetchData = async () => {
        const res = await getRequest("/addSaleOrder/saleOrder", userDetails?.token)
        if (res.status == 200) {
            console.log(res, "<<</addSaleOrder/saleOrder");
            setTableData(res?.data?.saleOrderAll)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])


    return (

        <>


            <Flex  >
                <Slidebar />
                <Box width={"80%"} padding="10px" m={"auto"} marginTop={"20px"}>
                    <h1>Sale Order Page</h1>
                    <Flex justifyContent={"space-between"} flexDirection={{
                        base: "column",
                        md: "row",
                        lg: "row"
                    }}>

                        <Box >
                            <div>

                                <Input
                                    type="text"
                                    id="searchQuery"
                                    placeholder='Search by name or phone number'
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <h2>Client List</h2>
                            <VStack h={"130px"} overflow={"scroll"} p={"5px"} scroll={{

                            }} >

                                {filteredClients.map((client) => (
                                    <Box key={client.id} onClick={() => handleClientSelect(client)}
                                        style={{
                                            border: "1px solid black",
                                            boxShadow: "2px black",
                                            padding: "5px",
                                            width: "90%",
                                            borderRadius: "10px"
                                        }}
                                    >
                                        <Text>
                                            {client.id} <br /> {client.name} <br /> {client.phone}
                                        </Text>
                                    </Box>
                                ))}
                            </VStack>

                        </Box>

                        <Box>
                            <h2>Selected Client</h2>
                            {selectedClient ? (
                                <div>
                                    <p>id: {selectedClient.id}</p>
                                    <p>Name: {selectedClient.name}</p>
                                    <p>Phone: {selectedClient.phone}</p>
                                </div>
                            ) : (
                                <p>No client selected.</p>
                            )}
                        </Box>
                        <Box>
                            <Box p="5px" borderRadius={"20px"} border="1px solid black">
                                <label htmlFor="referenceNumber">Order Number: </label>
                                <input
                                    type="text"
                                    id="referenceNumber"
                                    value={referenceNumber}
                                    p="2px" borderRadius={"20px"}
                                    onChange={(e) => setReferenceNumber(e.target.value)}
                                />
                            </Box>
                            <div>
                                <label htmlFor="OrderDate">Order Date:</label>
                                <input
                                    type="date"
                                    id="OrderDate"
                                    value={OrderDate}
                                    onChange={(e) => setOrderDate(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="DueDate">Due Date:</label>
                                <input
                                    type="date"
                                    id="DueDate"
                                    value={DueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                />
                            </div>
                        </Box>
                    </Flex>

                    {/* {table} */}

                    <Box width="100%" height="">


                        <h2>Items</h2>
                        <TableContainer width="100%" margin={"auto"}>
                            <Table >
                                <Thead>
                                    <Tr>
                                        <Th>Item No</Th>
                                        <Th>Item</Th>
                                        <Th>Quantity</Th>
                                        <Th>Per Unit Price</Th>
                                        <Th>Tax %</Th>
                                        <Th>Amount</Th>
                                        <Th>Delete</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {tableData.map((data, index) => (
                                        <Tr key={data._id}>
                                            <Td>{index + 1}</Td>
                                            <Td>
                                                <input type="text" placeholder='Item Name' value={data.item} onChange={(e) => handleTableInputChange(e, index, 'item')} />
                                            </Td>
                                            <Td>
                                                <input type="number" placeholder='quantity' value={data.quantity} onChange={(e) => handleTableInputChange(e, index, 'quantity')} />
                                            </Td>
                                            <Td>
                                                <input type="number" placeholder='unit price' value={data.per_unit_price} onChange={(e) => handleTableInputChange(e, index, 'per_unit_price')} />
                                            </Td>
                                            <Td>
                                                <input type="number" placeholder='Tax Rate' value={data.tax} onChange={(e) => handleTableInputChange(e, index, 'tax')} />
                                            </Td>
                                            <Td> {calculateAmount(Number(data?.quantity), Number(data?.per_unit_price), Number(data?.tax))}</Td>
                                            <Td>
                                                <button onClick={() => handleDeleteRow(index, data?._id)}>Delete</button>
                                            </Td>
                                        </Tr>

                                    ))}
                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                        <Td>
                                            <Button onClick={handleAddRow}>Add Row +</Button>
                                        </Td>
                                        <Td colSpan="6"></Td>


                                    </Tr>

                                </Tfoot>

                            </Table>
                        </TableContainer>
                        <Box m={"10px"}>
                            <Text fontSize={"15px"} fontWeight={"bold"}>Total Oreder_Sale Amount: ₹{calculateTotalOreder_SaleAmount()}

                            </Text>
                        </Box>
                        <Select m={"10px"} w={"90%"}>
                            <option value="Cash">Cash</option>
                            <option value="Credit Card/Debit Card">Credit/Debit Card</option>
                            <option value="UPI">UPI</option>
                        </Select>
                        <Box margin="10px" p={"20px"}>
                            <Button width="100%" onClick={handleSaveTableData} bg={"gold"}>Save</Button>
                        </Box>
                    </Box>
                </Box>






            </Flex>

        </>
    )
}


export default Oreder_Sale