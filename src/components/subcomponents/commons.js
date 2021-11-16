import Loader from 'react-loader-spinner';

function LoadingSpinner(props) {
    return props.loading && 
        <div>
            <div className="loadingSpinner">
                <Loader type="Circles" color="green"/>
            </div>
        </div>
}

const svgDecrease = () => {
    return (
        <svg className="Icon Icon--minus" role="presentation" viewBox="0 0 16 2">
            <path d="M1,1 L15,1" stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="square"></path>
        </svg>
    );
};

const svgIncrease = () => {
    return (
        <svg className="Icon Icon--plus" role="presentation" viewBox="0 0 16 16">
            <g stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="square">
                <path d="M8,1 L8,15"></path>
                <path d="M1,8 L15,8"></path>
            </g>
        </svg>
    );
}

const svgHamburger = () => {
    return (
        <svg viewBox="0 0 100 100">
            <path strokeWidth="2" className="line line1" stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="square" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
            <path strokeWidth="2" className="line line2" stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="square" d="M 20,50 H 80" />
            <path strokeWidth="2" className="line line3" stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="square" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
        </svg>
    );
}

const svgSearch = () => {
    return (
        <svg role="presentation" viewBox="0 0 21 21">
            <g transform="translate(1 1)" stroke="currentColor" strokeWidth="2" fill="none" fillRule="evenodd" strokeLinecap="square">
                <path d="M18 18l-5.7096-5.7096"></path>
                <circle cx="7.2" cy="7.2" r="7.2"></circle>
            </g>
        </svg>
    );
}

const svgJhola = () => {
    return (
    <svg role="presentation" viewBox="0 0 19 23">
      <path d="M0 22.985V5.995L2 6v.03l17-.014v16.968H0zm17-15H2v13h15v-13zm-5-2.882c0-2.04-.493-3.203-2.5-3.203-2 0-2.5 1.164-2.5 3.203v.912H5V4.647C5 1.19 7.274 0 9.5 0 11.517 0 14 1.354 14 4.647v1.368h-2v-.912z" fill="currentColor"></path>
    </svg>
    );
}

const svgInsta = () => {
    return (
        <svg className="social_icons" role="presentation" viewBox="0 0 32 32">
            <path d="M15.994 2.886c4.273 0 4.775.019 6.464.095 1.562.07 2.406.33 2.971.552.749.292 1.283.635 1.841 1.194s.908 1.092 1.194 1.841c.216.565.483 1.41.552 2.971.076 1.689.095 2.19.095 6.464s-.019 4.775-.095 6.464c-.07 1.562-.33 2.406-.552 2.971-.292.749-.635 1.283-1.194 1.841s-1.092.908-1.841 1.194c-.565.216-1.41.483-2.971.552-1.689.076-2.19.095-6.464.095s-4.775-.019-6.464-.095c-1.562-.07-2.406-.33-2.971-.552-.749-.292-1.283-.635-1.841-1.194s-.908-1.092-1.194-1.841c-.216-.565-.483-1.41-.552-2.971-.076-1.689-.095-2.19-.095-6.464s.019-4.775.095-6.464c.07-1.562.33-2.406.552-2.971.292-.749.635-1.283 1.194-1.841s1.092-.908 1.841-1.194c.565-.216 1.41-.483 2.971-.552 1.689-.083 2.19-.095 6.464-.095zm0-2.883c-4.343 0-4.889.019-6.597.095-1.702.076-2.864.349-3.879.743-1.054.406-1.943.959-2.832 1.848S1.251 4.473.838 5.521C.444 6.537.171 7.699.095 9.407.019 11.109 0 11.655 0 15.997s.019 4.889.095 6.597c.076 1.702.349 2.864.743 3.886.406 1.054.959 1.943 1.848 2.832s1.784 1.435 2.832 1.848c1.016.394 2.178.667 3.886.743s2.248.095 6.597.095 4.889-.019 6.597-.095c1.702-.076 2.864-.349 3.886-.743 1.054-.406 1.943-.959 2.832-1.848s1.435-1.784 1.848-2.832c.394-1.016.667-2.178.743-3.886s.095-2.248.095-6.597-.019-4.889-.095-6.597c-.076-1.702-.349-2.864-.743-3.886-.406-1.054-.959-1.943-1.848-2.832S27.532 1.247 26.484.834C25.468.44 24.306.167 22.598.091c-1.714-.07-2.26-.089-6.603-.089zm0 7.778c-4.533 0-8.216 3.676-8.216 8.216s3.683 8.216 8.216 8.216 8.216-3.683 8.216-8.216-3.683-8.216-8.216-8.216zm0 13.549c-2.946 0-5.333-2.387-5.333-5.333s2.387-5.333 5.333-5.333 5.333 2.387 5.333 5.333-2.387 5.333-5.333 5.333zM26.451 7.457c0 1.059-.858 1.917-1.917 1.917s-1.917-.858-1.917-1.917c0-1.059.858-1.917 1.917-1.917s1.917.858 1.917 1.917z"></path>
        </svg>
    )
}

const svgFacebook = () => {
    return (
        <svg className="social_icons" viewBox="0 0 9 17">
            <path d="M5.842 17V9.246h2.653l.398-3.023h-3.05v-1.93c0-.874.246-1.47 1.526-1.47H9V.118C8.718.082 7.75 0 6.623 0 4.27 0 2.66 1.408 2.66 3.994v2.23H0v3.022h2.66V17h3.182z"></path>
        </svg>

    )
}
export { LoadingSpinner, svgDecrease, svgIncrease, svgHamburger, svgSearch, svgJhola, svgInsta, svgFacebook };