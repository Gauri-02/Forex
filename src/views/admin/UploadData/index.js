import { Box, CircularProgress, CircularProgressLabel, InputLeftElement, propNames, SimpleGrid } from "@chakra-ui/react";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Icon,
    Input,
    InputGroup,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo, useRef, useState } from "react";
import { MdFileUpload } from "react-icons/md";
import { db } from "utils/firebase";
import Papa, { parse } from "papaparse";
import { ref, set } from "firebase/database";
import { toast, ToastContainer } from 'react-toastify';

const allowedExtensions = ["csv"];

const UploadFileForm = () => {
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const inputRef = useRef();
    const [data, setData] = useState({
        file: null,
    });

    const [currencyData, setCurrencyData] = useState([]);
    const textColor = useColorModeValue("navy.700", "white");
    const [isUploading, setIsUploading] = useState(false);
    const [currentProgress, setCurrentProgress] = useState(0)

    const handleSubmit = async () => {
        try {
            if (!data.file) {
                alert("No File Present");
            }

            const reader = new FileReader();
            reader.onload = async ({ target }) => {
                setIsUploading(true);
                const csv = Papa.parse(target.result, { header: true });
                const parsedData = csv?.data;
                console.log(parsedData);
                const columns = Object.keys(parsedData[0]);
                console.log(columns);
                // const batch = writeBatch(db);
                const obj = {}
                const totalRecords = parsedData.length * 51;
                let done = 0;
                setCurrentProgress(0)
                let promises = []
                let currencies = new Set()
                for (let i = 0; i < parsedData.length; i++) {
                    if (parsedData[i]["Date"]) {
                        var time = new Date(parsedData[i]["Date"])
                            .getTime()
                            .toString();
                        for (const prop in parsedData[i]) {
                            let temp = prop
                            temp = temp.trim()
                            let newProp = temp.split(" ").pop();
                            newProp.slice(1, -1)
                            if (newProp && newProp !== "Date") {
                                try{
                                    if(parsedData[i][prop]) {
                                        currencies.add(newProp)
                                        promises.push(set(ref(db, newProp + "/" + time), {
                                            price: parsedData[i][prop]
                                        }))
                                        // .then(val => {
                                        //     done += 1;
                                        //     setCurrentProgress(Math.round((done/totalRecords)*100))
                                        // })
                                        // .catch(err => {
                                        //     console.log(err)
                                        // })
                                    }
                                    else {
                                        done += 1
                                    }
                                }
                                catch(err) {
                                    console.log("ERRRR")
                                    console.log(err)
                                }
                            }
                            else {
                                done += 1;
                            }
                        }
                    }
                    else {
                        console.log("No Date")
                    }
                    // batch.set(doc(db, parsedData[i].))
                }
                await set(ref(db, "currencies" ), Array.from(currencies))
                Promise.all(promises).then(() => {
                    console.log("Uploaded")
                    setIsUploading(false)
                    toast.success('🦄 Uploaded', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        });
                        setData({
                            file: null
                        })
                })
                // await batch.commit();
                // console.log("Saved Data");
                // setCurrentProgress(100)
            };
            reader.readAsText(data.file);

            // const col = collection(db, "test");
            // await setDoc(doc(db, "test", "HOLA"), { name: "Yash" });
            // console.log("Inserted");
            // const snapshots = await getDocs(col);
        } catch (err) {
            console.log(err);
        }
    };

    const handleFileInput = (e) => {
        // Check if user has entered the file

        if (e.target.files.length) {
            const inputFile = e.target.files[0];

            // Check the file extensions, if it not
            // included in the allowed extensions
            // we show the error
            const fileExtension = inputFile?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                alert("Invalid File Type");
                return;
            }
            setData({
                ...data,
                file: inputFile,
            });
        }
    };

    return (
        <Flex
            zIndex="2"
            direction="column"
            w={{ base: "100%", md: "420px" }}
            maxW="100%"
            background="transparent"
            borderRadius="15px"
            mx={{ base: "auto", lg: "unset" }}
            me="auto"
            mb={{ base: "20px", md: "auto" }}
        >
            <FormControl>

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
                    Image<Text color={brandStars}>*</Text>
                </FormLabel>

                <InputGroup
                >
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Icon as={MdFileUpload} />}
                        cursor="pointer"
                    />
                    <input
                        type="file"
                        ref={inputRef}
                        style={{ display: "none", cursor: "pointer" }}
                        onChange={handleFileInput}
                    ></input>
                    <Input
                        placeholder={"Firmware Image ..."}
                        variant="auth"
                        onClick={() => inputRef.current.click()}
                        value={data.file ? data.file.name : "Select File"}
                        cursor="pointer"
                    />
                </InputGroup>

                <Button
                    fontSize="sm"
                    variant="brand"
                    fontWeight="500"
                    w="100%"
                    h="50"
                    mb="24px"
                    mt="20px"
                    onClick={handleSubmit}
                    // disabled={isUploading}
                >
                    {isUploading ? (
                        <CircularProgress isIndeterminate color='green.300' />
                    ) : "Create"}
                </Button>
            </FormControl>
        </Flex>
    );
};

export default function UploadData() {
    // Chakra Color Mode
    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <SimpleGrid
                mb="20px"
                columns={{ sm: 2, md: 2 }}
                spacing={{ base: "20px", xl: "20px" }}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <UploadFileForm />
            </SimpleGrid>
        </Box>
    );
}
