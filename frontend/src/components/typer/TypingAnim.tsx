import { TypeAnimation } from 'react-type-animation'

const TypingAnim = () => {
    return (
        <TypeAnimation
            sequence={[
                // Same substring at the start will only be typed out once, initially
                'Welcome to MyGPT 😎',
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'Built with OpenAI 💻',
                1000,
                'A failed attempt infact, lolll 🙂',
                1000,
                'But the learning curve was amazingggg 💜',
                1000
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: '60px', display: 'inline-block', color: "white", textShadow: "1px 1px 20px #000" }}
            repeat={Infinity}
        />
    )
}

export default TypingAnim