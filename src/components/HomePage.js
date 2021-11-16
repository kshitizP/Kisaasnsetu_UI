import React from 'react';
import dummyImage1 from '../images/test3.png';
import dummyImage2 from '../images/test2.png';
import dummyImage3 from '../images/test.png';
import MessageForm from './subcomponents/MessageForm'
import '../styles/HomePage.css';
import { Link } from 'react-router-dom';

function HomePage(props) {
        return (
            <div>
                <div className="banner-wrapper">
                    <div className="intro-images">
                        <Link to='products'>
                            <img src={dummyImage1} className="banner-image"/>
                        </Link>
                    </div>
                    <div className="intro-images">
                        <img src={dummyImage2} className="banner-image"/>
                    </div>
                    <div className="intro-images">
                        <img src={dummyImage3} className="banner-image"/>
                    </div>
                </div>
                <MessageForm/>
            </div>

        );
}

export default HomePage;