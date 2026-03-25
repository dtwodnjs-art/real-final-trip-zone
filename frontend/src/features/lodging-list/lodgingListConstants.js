export const WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];
export const CHOSEONG = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

export const LODGING_TYPE_OPTIONS = [
  { label: "전체", value: "all" },
  { label: "호텔 · 리조트", value: "hotel" },
  { label: "독채", value: "private" },
  { label: "한옥", value: "hanok" },
  { label: "부티크", value: "boutique" },
];

export const LODGING_FEATURE_OPTIONS = [
  { label: "무료 취소", value: "cancel" },
  { label: "조식 포함", value: "breakfast" },
  { label: "오션뷰", value: "ocean" },
  { label: "연박 혜택", value: "stayDeal" },
  { label: "즉시 확정", value: "instant" },
  { label: "가성비", value: "deal" },
];

export const PRICE_BAND_OPTIONS = [
  { label: "전체", value: "all" },
  { label: "15만원 이하", value: "under150" },
  { label: "15만~18만원", value: "150to180" },
  { label: "18만~22만원", value: "180to220" },
  { label: "22만원 이상", value: "over220" },
];

export const REGION_FILTER_OPTIONS = [
  { label: "전체", value: "all" },
  { label: "서울", value: "서울" },
  { label: "경기 · 인천", value: "경기" },
  { label: "부산", value: "부산" },
  { label: "제주", value: "제주" },
  { label: "강원", value: "강원" },
  { label: "여수", value: "전남" },
  { label: "경주", value: "경북" },
];

export const TASTE_OPTIONS = [
  { label: "#가족여행숙소", value: "family" },
  { label: "#감성숙소", value: "emotional" },
  { label: "#뷰맛집", value: "view" },
  { label: "#연박특가", value: "longStay" },
  { label: "#리뷰좋은", value: "reviewed" },
  { label: "#BBQ", value: "bbq" },
  { label: "#온수풀", value: "pool" },
  { label: "#해돋이명소", value: "sunrise" },
];

export const DISCOUNT_OPTIONS = [
  { label: "쿠폰할인", value: "coupon" },
  { label: "무료 취소", value: "cancel" },
  { label: "할인특가", value: "deal" },
];

export const GRADE_OPTIONS = [
  { label: "5성급", value: "5star" },
  { label: "4성급", value: "4star" },
  { label: "풀빌라", value: "poolvilla" },
  { label: "블랙", value: "black" },
];

export const FACILITY_GROUPS = [
  {
    title: "공용시설",
    options: [
      { label: "수영장", value: "pool" },
      { label: "바베큐", value: "bbq" },
      { label: "레스토랑", value: "restaurant" },
      { label: "피트니스", value: "fitness" },
    ],
  },
  {
    title: "객실 내 시설",
    options: [
      { label: "객실스파", value: "spa" },
      { label: "무선인터넷", value: "wifi" },
      { label: "에어컨", value: "aircon" },
      { label: "욕실용품", value: "amenities" },
    ],
  },
  {
    title: "기타시설",
    options: [
      { label: "조식제공", value: "breakfast" },
      { label: "무료주차", value: "parking" },
      { label: "반려견동반", value: "pet" },
      { label: "객실내취사", value: "cook" },
    ],
  },
];
