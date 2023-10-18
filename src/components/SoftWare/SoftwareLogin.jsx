import React, { useState } from 'react';
import { Box, Button, VStack, Heading, Input, FormControl, FormLabel, Checkbox, Link, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import b2b2 from '../assets/b2b2.svg';
import { useNavigate } from 'react-router-dom';
import Navbar_AL from '../Navbar_AL';

const SoftwareLogin = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [isModalOpen, setIsModalOpen] = useState(false); // State for the modal
    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const LogInHandle = () => {
        if (!form.email || !form.password) {
            return alert('Please Fill All the fields');
        }
        // Simulate successful login
        navigate('/homeDash'); // Navigate on success
    }

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            <Navbar_AL/>
            <Box bgImage={b2b2} style={{
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "scroll",
                backgroundSize: "cover",
                boxSizing: "border-box",
                margin: "auto",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <VStack
                    bg={useColorModeValue('white', 'gray.700')}
                    rounded={'lg'}
                    boxShadow={'outline'}
                    p={8}
                    width={{ base: "80%", md: "50%", lg: "50%" }}>
                    <Heading color={"white"}>Software Login</Heading>
                    <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" name="email" value={form.email} onChange={handleChange} required />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input type="password" name="password" value={form.password} onChange={handleChange} required />
                    </FormControl>
                    <Checkbox>Remember me</Checkbox>
                    <Link color={'blue.400'}>Forgot password?</Link>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{ bg: 'blue.500' }}
                        onClick={LogInHandle}>
                        Sign In
                    </Button>
                    <Link color={'blue.400'} href="/AddCompanyForm">Don't have an account? Sign Up</Link>
                    <Button
                        mt={4}
                        colorScheme="green"
                        onClick={openModal}>
                        Start for Free (14-day trial)
                    </Button>
                </VStack>

                {/* Modal for Free Trial */}
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Start your 14-day Free Trial</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {/* Add your signup form components here */}
                            {/* Example: */}
                            {/* <Input placeholder="Name" mb={3} />
                            <Input placeholder="Email" mb={3} />
                            <Input placeholder="Password" type="password" mb={3} /> */}
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="green" onClick={closeModal}>Start Trial</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </>
    )
}

export default SoftwareLogin;
