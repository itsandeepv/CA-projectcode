import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Select,
  Text,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,

} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import edit from "../../../assets/edit.svg";
import search3 from "../../../assets/search3.png";
import ylogo from "../../../assets/ylogo.jpg";
import search2 from "../../../assets/search2.png";
import user from "../../../assets/user.svg";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../../firebase";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getFirmData, setFirmId, setFirmName } from "../../../../Redux/Firm/Firm.Action";
import { FaUser, FaUserCircle } from "react-icons/fa";


const FYData = [
  {
    year: '2023-24'
  },
  {
    year: '2022-23'
  },
  {
    year: '2021-22'
  },
  {
    year: '2020-21'
  }
]

const Company_name = (ppx) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isShown, setIsShown] = useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [companyName, setCompanyName] = useState('');
  const [companylog, setCompanyLogo] = useState('');

  const handleClick = (event) => {
    setIsShown((current) => !current);
  };

  const [moreDetails, setMoreDetails] = useState(false);

  const [images, setImages] = useState([]);

  const [imageURL, setImageURL] = useState("");

  const [form, setForm] = useState({
    companyLogo: "",
    companyName: "",
    gstinNumber: "",
    email: "",
    phoneNumber: "",
    signature: "",
    state: "",
    businessAddress: "",
    businessCategory: "",
    businessType: "",
    businessRegistrationType: "",
    businessDescription: "",
  });

  const dispatch = useDispatch();
  const { get_firm_data, firmId, firmName } = useSelector(
    (store) => store.FirmRegistration
  );

  const handleImages = () => {
    let count = 0;

    for (let i = 0; i < images.length; i++) {
      const storageRef = ref(storage, `/files/${images[i].name}`);
      const uploadTask = uploadBytesResumable(storageRef, images[i]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (err) => console.log(err),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            count++;

            if (count == images.length) {
              setImageURL(url);
            }
          });
        }
      );
    }
  };


  const handleChange = (e) => {
    const { value } = e.target;
    const selectedFirm = get_firm_data.find((firm) => firm._id === value);
    const selectedCompanyName = selectedFirm ? selectedFirm.companyName : "";
    const companyLogo = selectedFirm ? selectedFirm.companyLogo : "";
    setCompanyLogo(selectedFirm ? selectedFirm.companyLogo:"")
    setCompanyName(selectedCompanyName) // update heading
    setForm({ ...form, companyName: selectedCompanyName });

    dispatch(setFirmId(value));
    dispatch(setFirmName(selectedCompanyName));
  };


  useEffect(() => {
    handleImages();
  }, [images]);

  const userDetails = JSON.parse(sessionStorage.getItem("companyDetails")) ? JSON.parse(sessionStorage.getItem("companyDetails")) : null

  useEffect(() => {
    dispatch(getFirmData(userDetails?.token));
  }, [firmId]);
  
  
  useEffect(() => {
    setTimeout(() => {
      if (get_firm_data?.length > 0) {
        const selectedFirm = get_firm_data[0];
        const selectedCompanyName = selectedFirm ? selectedFirm.companyName : "";
        setCompanyLogo(selectedFirm ? selectedFirm.companyLogo:"")
        setCompanyName(selectedCompanyName) // update heading
        setForm({ ...form, companyName: selectedCompanyName });  
        dispatch(setFirmId(get_firm_data[0]?._id));
        dispatch(setFirmName(selectedCompanyName));
      }
      dispatch(getFirmData(userDetails?.token));
    }, 1000);
  }, [get_firm_data?.length])

  return (
    <>
      {" "}
      <Box
      // position={"sticky"} top="132px" zIndex={"10000"}
      >
        <Flex
          gap={"20px"}
          justifyContent={"right"}
          height={"60px"}
          p={"10px"}
          bg={"white"}
        >
          <Link to={""}>
            <Button bg={"green.500"} color={"white"}>
              <Text
                fontSize={{ base: "10px", md: "12px", lg: "15px" }}
                color={"gray.900"}
                fontWeight={"bold"}
                m={"auto"}
              >
                {" "}
                ADD SALE +{" "}
              </Text>
            </Button>
          </Link>
          <Link to={""}>
            <Button bg={"blue.500"} color={"white"}>
              <Text
                fontSize={{ base: "10px", md: "12px", lg: "15px" }}
                color={"gray.900"}
                fontWeight={"bold"}
                m={"auto"}
              >
                ADD PURCHASE +
              </Text>
            </Button>
          </Link>
          {/* <Link to="/Inventiry_Home">
                    <Button bg={"blue.500"} color={"white"}><Text fontSize={{ base: "8px", md: "12px", lg: "15px" }}
                        color={"black"} fontWeight={"bold"} m={"auto"}>ADD INVOICE +</Text></Button>
                </Link> */}
        </Flex>
        <Flex
          margin={"auto"}
          textAlign={"center"}
          backgroundColor="rgb(255,185,29)"
          color={"white"}
          paddingX={"10px"}
          alignItems={"center"}
          boxShadow="rgba(3, 102, 214, 0.3) 0px 0px 0px 3px"
          pt='1.5'
        >
          <HStack style={{ margin: "10px" }} height="100%">
            {/* <Input type="search" placeholder="search" value={""} onChange={""} marginRight={"10px"} /> */}
            {/* <Button style={{ backgroundColor: "orange" }} onClick={() => ""}>Search</Button> */}
            <Image
              src={search2}
              width="25px"
              height="25px"
              borderRadius={"50%"}
              onClick={handleClick}
            ></Image>
          </HStack>

          <Heading
            fontSize={{ base: "12px", md: "14px", lg: "20px" }}
            margin={"auto"}
            cursor={"pointer"}
            onClick={onOpen}
            alignItems='center'
          >
            <Flex pt='1'>
              <Image
                src={ companylog ? companylog :ylogo}
                width="28px"
                height="28px"
                borderRadius={"50%"}
              />
              <Text ml='4' color='whiteAlpha.900' fontSize='24px'>{companyName}</Text>
            </Flex>
          </Heading>
          <HStack>
            {/* <HStack justifySelf={"end"} cursor={"pointer"} onClick={onOpen}>
              <Image
                src={edit}
                backgroundColor={"white"}
                width="20px"
                padding='4px'
                borderRadius={"50%"}
              ></Image>
              <Text
                color={"white"}
                display={{ lg: "flex", md: "flex", base: "none" }}
              >
                Edit
              </Text>
            </HStack> */}
            <Link to={"/Profile"}>
              <Flex justifySelf={"end"} cursor={"pointer"} alignItems='center' mr='4'>
                <FaUserCircle size='24px' title="Profile" />
                {/* <Text
                  color={"white"}
                  display={{ lg: "flex", md: "flex", base: "none" }}
                  ml='2'
                  pt='3'
                  fontSize='md'
                >
                  Profile
                </Text> */}
              </Flex>
            </Link>
          </HStack>
        </Flex>
        {/* Search bar */}

        {isShown && (
          <HStack
            height="100%"
            position="relative"
            background={"blackAlpha.800"}
            padding={"20px"}
            color={"white"}
          >
            <Input
              type="search"
              placeholder="search"
              marginRight={"10px"}
              backgroundColor="rgb(255,185,29)"
            />
            {/* <Button style={{ backgroundColor: "orange" }} onClick={() => ""}>Search</Button> */}
            <Image
              src={search3}
              width="30px"
              height="30px"
              borderRadius={"10px"}
              backgroundColor={"orange"}
            ></Image>
          </HStack>
        )}

        {/* edit company */}

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent maxW="800px">
            <ModalHeader
              style={{
                marginTop: "70px",
              }}
            >
              Edit Company
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={10}>
              <Box></Box>
              <Flex alignItems='center' gap='20px'>
                <Select placeholder="Select your company" onChange={handleChange}>
                  {get_firm_data?.map((el) => (
                    <option value={el._id} name={el.companyName}>{el.companyName}</option>
                  ))}
                  {console.log('firm data', get_firm_data)}
                </Select>
                <Select placeholder="Select financial year"
                // onChange={handleChange}
                >
                  {FYData?.map((FY) => (
                    <option>{FY.year}</option>
                  ))}
                </Select>
              </Flex>
              <Link to={"/AddCompanyForm"} mt='2'>
                <Button m={"10px auto"} bg={"orange.300"}>
                  Add New Company +
                </Button>
              </Link>
            </ModalBody>

            <ModalFooter>
              <Flex justifyContent={"space-between"}>
                <Box>
                  <Button onClick={onClose}>Done</Button>
                </Box>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default Company_name;
