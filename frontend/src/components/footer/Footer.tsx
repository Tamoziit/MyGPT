import { SiLinkedin } from "react-icons/si";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
        <div
            style={{
                width: "100%",
                padding: 20,
                minHeight: "20vh",
                maxHeight: "30vh",
                marginTop: 60,
            }}
        >
            <p style={{ fontSize: "30px", textAlign: "center", padding: "20px" }}>
                Tamojit Das -
                <span>
                    <Link style={{color: "white"}} className="nav-link" to={"https://www.linkedin.com/in/tamojit-das-b77b62293"}target="_blank"><SiLinkedin /></Link>
                </span>
            </p>
        </div>
    </footer>
  )
}

export default Footer