import Logo from "../assets/nav-logo.svg";
import MenuIcon from "../assets/menu-icon.svg";
import {motion } from "motion/react"
import { useState } from "react";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="w-full h-fit px-[16px] bg-white sm:px-8 ">
            <nav className="flex justify-between h-[56px] w-full items-center font-inter-extrabold text-blue-gray text-t-body-sm lg:text-d-body">
                <a href="/">
                    <img
                        width={118}
                        height={19}
                        className="lg:w-[169px] lg:h-[27.21px]"
                        src={Logo.src}
                    />
                </a>

                <img width={24} height={16} src={MenuIcon.src} className="sm:hidden" onClick={handleMenuClick} />

                <div className="hidden sm:flex gap-5">
                    <div className="flex flex-row gap-x-6 lg:gap-x-12 items-center justify-center">
                        <a href="/servicios">Servicios</a>
                        <a href="/trabajos">Nuestro trabajo</a>
                        <a href="/conocenos">Conócenos</a>
                        <a
                            href="/contacto"
                            className="lg:hidden border-2 px-4 py-1 rounded-2xl hover:bg-blue-gray hover:text-white transition-all duration-200"
                        >
                            Contacto
                        </a>
                    </div>
                </div>
                <a
                    href="/contacto"
                    className="hidden lg:block lg:border-2 px-4 py-1 rounded-2xl hover:bg-blue-gray hover:text-white transition-all duration-500"
                >
                    Contacto
                </a>
            </nav>
            {
                isOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 } } exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-12 gap-10 absolute top-[56px] left-0 sm:hidden bg-white p-4 z-10 color-blue-gray w-full font-inter-bold text-m-h4 rounded-b-xl">
                        <div className="w-full flex flex-col items-center justify-center gap-8">
                            <a href="/servicios">Servicios</a>
                            <span className=" w-[120px] border-black border"></span>

                        </div>
                        <div className="w-full flex flex-col items-center justify-center gap-8">
                            <a href="/trabajos">Nuestro trabajo</a>
                            <span className=" w-[120px] border-black border"></span>
                        </div>
                        <div className="w-full flex flex-col items-center justify-center gap-8">
                            <a href="/conocenos">Conócenos</a>
                            <span className=" w-[120px] border-black border-[.5px]"></span>
                        </div>
                        <a
                            href="/contacto"
                            className="py-1 px-3 bg-[#D8D8D8] rounded-sm border"
                        >
                            Contacto
                        </a>
                    </motion.div>
                )
            }
        </div>
    )
}

export default Nav;

