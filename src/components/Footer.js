import { svgFacebook, svgInsta } from './subcomponents/commons';
function Footer(props) {
    return (
        <div className="footer_container">
            <div className="footer__content light_font">
                <div className="footer_items">
                    <div className="footer__contentLeft">
                        <h2 className="Heading u-h4 Base-text light_font">Help</h2>
                        <ul>
                            <li className="u-h4 padded_listItem">Contact Us & FAQs</li>
                            <li className="u-h4 padded_listItem">Shipping and Returns</li>
                            <li className="u-h4 padded_listItem">Terms</li>
                            <li className="u-h4 padded_listItem">Privacy</li>
                        </ul>
                    </div>
                </div>
                <div className="footer_items">
                    <div className="footer__contentMiddle">
                        <h2 className="Heading u-h4 Base-text light_font">More</h2>
                        <ul>
                            <li className="u-h4 padded_listItem">About Us</li>
                            <li className="u-h4 padded_listItem">Careers</li>
                        </ul>
                    </div>
                </div>
                <div className="footer_items">
                    <div className="footer__contentRight">
                        <h2 className="Heading u-h4 Base-text light_font">Let's Connect</h2>
                        <div>
                            <a className="social_link" href="https://instagram.com"><span style={{padding: '12px'}}>{svgInsta()}</span></a>
                            <a className="social_link" href="https://facebook.com"><span style={{padding: '12px'}}>{svgFacebook()}</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;