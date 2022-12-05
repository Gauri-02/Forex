import { Box, InputLeftElement, SimpleGrid } from "@chakra-ui/react";
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
import {
    collection,
    doc,
    getDocs,
    setDoc,
    writeBatch,
} from "firebase/firestore";
import React, { useMemo, useRef, useState } from "react";
import { MdFileUpload } from "react-icons/md";
import { db } from "utils/firebase";
import Papa, { parse } from "papaparse";

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
                const batch = writeBatch(db);
                for (let i = 0; i < parsedData.length; i++) {
                    if (parsedData[i]["Date"]) {
                        console.log(parsedData[i]);
                        var time = new Date(parsedData[i]["Date"])
                            .getTime()
                            .toString();
                        time = "t" + time;
                        console.log(time);
                        // const coll = collection(db, time);
                        batch.set(doc(db, time + "/data"), parsedData[i]);
                        console.log(parsedData[i]);
                        // for (const prop in parsedData[i]) {
                        //     if (prop !== "Date") {
                        //         batch.set(doc(db, time), {
                        //             price: parsedData[i][prop],
                        //         });
                        //     }
                        // }
                    }
                    // batch.set(doc(db, parsedData[i].))
                }
                await batch.commit();
                console.log("Saved Data");
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
                    display="flex"
                    ms="4px"
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    mb="8px"
                >
                    Name<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                    isRequired={true}
                    variant="auth"
                    fontSize="sm"
                    ms={{ base: "0px", md: "0px" }}
                    type="text"
                    placeholder="eg. jon doe"
                    mb="24px"
                    fontWeight="500"
                    size="lg"
                    onChange={(e) => {
                        setData({
                            ...data,
                            name: e.target.value,
                        });
                    }}
                    value={data.name}
                />

                <FormLabel
                    ms="4px"
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    display="flex"
                >
                    Image<Text color={brandStars}>*</Text>
                </FormLabel>

                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Icon as={MdFileUpload} />}
                    />
                    <input
                        type="file"
                        ref={inputRef}
                        style={{ display: "none" }}
                        onChange={handleFileInput}
                    ></input>
                    <Input
                        placeholder={"Firmware Image ..."}
                        variant="auth"
                        onClick={() => inputRef.current.click()}
                        value={data.image ? data.image.name : "Select File"}
                    />
                </InputGroup>

                <Button
                    fontSize="sm"
                    variant="brand"
                    fontWeight="500"
                    w="100%"
                    h="50"
                    mb="24px"
                    onClick={handleSubmit}
                >
                    Create
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
