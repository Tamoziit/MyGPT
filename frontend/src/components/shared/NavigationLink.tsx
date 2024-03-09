import { Link } from "react-router-dom"

type Props = {
    to: string; //redirection to a link (in string)
    bg: string;
    text: string;
    textColor: string;
    onClick?: () => Promise<void>; //for logout.
}

const NavigationLink = (props: Props) => {
    return (
        <Link
            onClick={props.onClick}
            className="nav-link"
            to={props.to}
            style={{ background: props.bg, color: props.textColor }}
        >
            {props.text}
        </Link>
    )
}

export default NavigationLink