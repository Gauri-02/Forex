import React from "react";

import { Icon } from "@chakra-ui/react";
import {
    MdHome,
    MdUpload,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import UploadData from "views/admin/UploadData";

const routes = [
    {
        name: "FOREX",
        layout: "/admin",
        path: "/default",
        icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
        component: MainDashboard,
    },
    {
        name: "Upload Data",
        layout: "/admin",
        path: "/upload",
        icon: <Icon as={MdUpload} width="20px" height="20px" color="inherit" />,
        component: UploadData,
    },
];

export default routes;
