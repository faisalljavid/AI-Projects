import parrotImg from "../images/parrot.png"
import worldMapImg from "../images/worldmap.png"

export default function Header() {
    return (
        <div className="header">
            <div className="header-content">
                <img className="parrot" src={parrotImg} alt="Polly the Parrot" />
                <div className="text-content">
                    <h1 className="title">PollyGlot</h1>
                    <p className="subtitle">Perfect Translation Every Time</p>
                </div>
            </div>
        </div>
    )
}