import { Link } from "react-router-dom"; // Link 컴포넌트를 가져옴
import "./card.scss"; // 스타일 시트를 가져옴

function Card({ item }) {
  return (
    <div className="card">
      {/* 이미지 컨테이너 */}
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" /> {/* 첫 번째 이미지를 표시 */}
      </Link>
      <div className="textContainer">
        {/* 제목 */}
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>{" "}
          {/* 제목을 링크로 표시 */}
        </h2>
        {/* 주소 */}
        <p className="address">
          <img src="/pin.png" alt="" /> {/* 핀 아이콘 */}
          <span>{item.address}</span> {/* 주소 텍스트 */}
        </p>
        {/* 가격 */}
        <p className="price">$ {item.price}</p> {/* 가격 표시 */}
        <div className="bottom">
          <div className="features">
            {/* 침실 수 */}
            <div className="feature">
              <img src="/bed.png" alt="" /> {/* 침대 아이콘 */}
              <span>{item.bedroom} bedroom</span> {/* 침실 수 텍스트 */}
            </div>
            {/* 욕실 수 */}
            <div className="feature">
              <img src="/bath.png" alt="" /> {/* 욕실 아이콘 */}
              <span>{item.bathroom} bathroom</span> {/* 욕실 수 텍스트 */}
            </div>
          </div>
          <div className="icons">
            {/* 저장 아이콘 */}
            <div className="icon">
              <img src="/save.png" alt="" />
            </div>
            {/* 채팅 아이콘 */}
            <div className="icon">
              <img src="/chat.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card; // Card 컴포넌트를 기본 내보내기로 내보냄
