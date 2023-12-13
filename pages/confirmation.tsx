import React, { useState } from "react";
import styles from "../styles/login.module.css";
import { MdEmail } from "react-icons/md";
import { BiSolidLock } from "react-icons/bi";
import Image from "next/image";
import "../app/(landing)/globals.css";
import Link from "next/link";
import { motion } from "framer-motion";
import Dog from "@/components/Dog";
// import ThemeButton from "@/components/Theme";
import Clear from "@/components/clear";
import { handleLog } from "../utils/API_Calls/login_api"
import { useRouter } from "next/router"
import { fetchAndDecodeHearts } from "@/utils/API_Calls/recievedHearts";
import { confirmationToPublish } from "@/utils/API_Calls/confirmation_api";

const ConfirmationPage: React.FC = () => {
    const [data, setData] = useState({ id: "", password: "" });

    const router = useRouter()

    const submit_yes = async () => {
        const isValid = await handleLog(data)
        if (isValid) {
            await confirmationToPublish();
        }
        else {
            alert("Invalid ID or password")
            // WRONG LOGIN CREDENTENTIALS
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        console.log(data);
    };

    return (
        <div>
            <Clear />
            <div className={styles["login-box"]}>
                <div className={styles["login-box2"]}>
                    <Dog />
                    <div className={styles["login-container"]}>
                        <h1 className={styles["login-title"]} style={{ color: "black" }}>Do you want to get matched?</h1>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className={styles["login-form-group"]}
                        >
                            <MdEmail size={18} />

                            <input
                                className={styles["login-input"]}
                                type="text"
                                name="id"
                                value={data.id}
                                onChange={handleSubmit}
                                required
                                placeholder="ID"
                            />
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className={styles["login-form-group"]}
                        >
                            <BiSolidLock size={18} />
                            <input
                                className={styles["login-input"]}
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={handleSubmit}
                                required
                                placeholder="Password"
                            />
                        </motion.div>
                        <div className={styles["login-bottom"]}>
                            
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={styles["login-submit-button"]}
                                onClick={submit_yes}
                                style={{ width: "80%", backgroundColor: "#d61174", color: "white", fontSize:"22px"}}
                            // style={{ color: "black" }}
                            >
                                YES
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Link href={"/register"}>NO</Link>
                            </motion.div>
                        </div>
                    </div>
                    {/* <Link href={'/'} className={styles["close-button"]}>
            &times;
          </Link> */}
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPage;