import "./filter.scss"; // 스타일 시트를 가져옴
import { useState } from "react"; // useState 훅을 가져옴
import { useSearchParams } from "react-router-dom"; // useSearchParams 훅을 가져옴

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams(); // URL의 쿼리 파라미터를 관리하는 훅
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "", // 쿼리 파라미터에서 type 값을 가져옴
    city: searchParams.get("city") || "", // 쿼리 파라미터에서 city 값을 가져옴
    property: searchParams.get("property") || "", // 쿼리 파라미터에서 property 값을 가져옴
    minPrice: searchParams.get("minPrice") || 0, // 쿼리 파라미터에서 minPrice 값을 가져옴
    maxPrice: searchParams.get("maxPrice") || 10000, // 쿼리 파라미터에서 maxPrice 값을 가져옴
    bedroom: searchParams.get("bedroom") || 1, // 쿼리 파라미터에서 bedroom 값을 가져옴
  });

  // 입력 값 변경 핸들러
  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  // 필터 적용 핸들러
  const handleFilter = () => {
    setSearchParams(query); // 쿼리 파라미터를 업데이트
  };

  return (
    <div className="filter">
      <h1>
        Search result for <b>{query.city}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            onChange={handleChange}
            defaultValue={searchParams.get("city")}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            defaultValue={query.type}
          >
            <option value="">any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">Property</label>
          <select
            name="property"
            id="property"
            onChange={handleChange}
            defaultValue={query.property}
          >
            <option value="">any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.minPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="text"
            id="maxPrice"
            name="maxPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.maxPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="bedroom">Bedroom</label>
          <input
            type="text"
            id="bedroom"
            name="bedroom"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.bedroom}
          />
        </div>
        <button onClick={handleFilter}>
          <img src="/search.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Filter; // Filter 컴포넌트를 기본 내보내기로 내보냄
