
import React from "react";
import NavBar from "../../layouts/NavBar";
import Banner from "../../layouts/Banner";
import Apropos from "../../layouts/Apropos";
import HomeWork from "./HomeWork";
import Footer from "../../layouts/Footer";


const Home = () => {
    return(
        <div>
             <NavBar />
             <Banner />
             <Apropos />
             <HomeWork />
             <Footer />
     
        </div>
    )
}
export default Home ;
